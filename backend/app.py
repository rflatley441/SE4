from flask import Flask, jsonify, request
from flask_cors import CORS
from gameplay import Gameplay
from player import Player
from gameboard import GameBoard
from tile import Tile
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from flask_socketio import emit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

game_state = None
# a list of all rooms and the users within them
joined_users = {}


def initialize_game(player1_id, player2_id):
    """
    initializes the game with the given player ids
    """
    global game_state
    player1 = Player(player1_id, 0)
    player2 = Player(player2_id, 0)
    gameboard = GameBoard()
    game_state = Gameplay(player1, player2, gameboard)
    game_state.createTiles()


@app.route('/playerhand', methods=['GET'])
def get_player_hands():
    """
    deals tiles to the players at the start of a game and returns the hands of the players with the remaining tiles in the deck
    """
    game_state.dealTiles()

    player1Hand = []
    # deals tiles to player 1
    for tile in game_state.player1.hand:
        player1Hand.append([str(tile.shape), str(tile.color)])

    player2Hand = []
    # deals tiles to player 2
    for tile in game_state.player2.hand:
        player2Hand.append([str(tile.shape), str(tile.color)])

    userHands = [{"remaining": len(game_state.game_board.tiles)}, {'userId': game_state.player1.userId, 'hand': player1Hand},
                 {'userId': game_state.player2.userId, 'hand': player2Hand}]

    return jsonify(userHands)


@app.route('/deck', methods=['GET'])
def get_game_deck():
    """
    returns the number of tiles remaining in the deck
    """
    game_deck = [{
        "remaining": len(game_state.game_board.tiles)}]

    return jsonify(game_deck)


@app.route('/playerhand', methods=['POST'])
def update_player_hand():
    """
    updates the hand of the player with the given userId
    """
    request_data = request.get_json()
    # user id of the player
    userId = request_data.get('userId')
    playerHand = request_data.get('hand')

    updated_hand = []
    # appends the hand of the player to the updated_hand list
    for tile in playerHand:
        updated_hand.append(Tile(tile.get('shape'), tile.get('color')))
    # updates the hand of the player on the backend game state
    game_state.getPlayerById(userId).hand = updated_hand

    return jsonify({'message': 'Player hand updated'}, request_data)


@app.route('/playerscore', methods=['POST'])
def update_player_score():
    """
    updates the score of the player with the given userId
    """
    request_data = request.get_json()
    userId = request_data.get('userId')
    score = request_data.get('score')
    # updates the score of the player on the backend game state
    game_state.getPlayerById(userId).score = score

    return jsonify({'message': 'Player score updated'}, request_data)


@app.route('/initialize_game', methods=['POST'])
def web_initialize_game():
    """
    initializes the game given the game gets initialized on the frontend
    """
    data = request.get_json()
    player1_id = data.get('player1_id')
    player2_id = data.get('player2_id')
    initialize_game(player1_id, player2_id)
    return jsonify({'message': 'Game initialized successfully'})


@socketio.on('connect')
def handle_connect():
    """
    connects the client to the server
    """
    print('Client connected')
    emit('message', 'Connected to server')


@socketio.on('disconnect')
def handle_disconnect():
    """
    disconnects the client from the server
    """
    print('Client disconnected')
    emit('message', 'Disconnected to server')


@socketio.on('join')
def on_join(data):
    """
    joins the user to a game room on the server
    """
    username = data['username']
    userId = data['userId']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room' + room, to=room)
    # checks if room exists in joined_users
    if room not in joined_users:
        joined_users[room] = []
    # adds user to room
    joined_users[room].append({'userId': userId, 'username': username})
    # if room has 2 users, navigate to game
    if len(joined_users[room]) == 2:
        emit('navigateToGame', room, room=room)
    else:
        send('waiting', to=room)


@socketio.on('start-game')
def handle_start_game(data):
    """
    starts the game when the room has 2 players
    """
    room = data['room']
    players = joined_users.get(room)
    data = {'players': players, 'room': room}
    if (players):
        emit('game-started', data, room=room)


@socketio.on('leave')
def on_leave(data):
    """
    handles the user leaving the game room
    """
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
    # removes room from joined users
    if room in joined_users:
        del joined_users[room]


@socketio.on('end-turn')
def on_end_turn(data):
    """
    updates the game state for all players in the room once a player has ended their turn
    """
    room = data['room_id']
    emit('update-game-state', data['gameState'], room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
