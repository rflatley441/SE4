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

joined_users = {}


def initialize_game(player1_id, player2_id):
    global game_state
    player1 = Player(player1_id, 0) 
    player2 = Player(player2_id, 0)
    gameboard = GameBoard()
    game_state = Gameplay(player1, player2, gameboard)
    game_state.createTiles()


# initialize_game()


@app.route('/api', methods=['GET', 'POST'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


@app.route('/playerhand', methods=['GET'])
def get_player_hands():
    game_state.dealTiles()

    player1Hand = []

    for tile in game_state.player1.hand:
        player1Hand.append([str(tile.shape), str(tile.color)])

    player2Hand = []

    for tile in game_state.player2.hand:
        player2Hand.append([str(tile.shape), str(tile.color)])

    userHands = [{"remaining": len(game_state.game_board.tiles)}, {'userId': game_state.player1.userId, 'hand': player1Hand},
                 {'userId': game_state.player2.userId, 'hand': player2Hand}]

    return jsonify(userHands)



@app.route('/deck', methods=['GET'])
def get_game_deck():
    game_deck = [{"deckId": 0}, {
        "remaining": len(game_state.game_board.tiles)}]

    return jsonify(game_deck)


@app.route('/playerhand', methods=['POST'])
def update_player_hand():
    request_data = request.get_json()
    userId = request_data.get('userId')
    playerHand = request_data.get('hand')

    updated_hand = []
    for tile in playerHand:
        updated_hand.append(Tile(tile.get('shape'), tile.get('color')))

    game_state.getPlayerById(userId).hand = updated_hand

    return jsonify({'message': 'Player hand updated'}, request_data)


@app.route('/playerscore', methods=['POST'])
def update_player_score():
    request_data = request.get_json()
    userId = request_data.get('userId')
    score = request_data.get('score')

    game_state.getPlayerById(userId).score = score

    return jsonify({'message': 'Player score updated'}, request_data)


@app.route('/initialize_game', methods=['POST'])
def web_initialize_game():
    data = request.get_json()
    player1_id = data.get('player1_id')
    player2_id = data.get('player2_id')
    initialize_game(player1_id, player2_id)
    return jsonify({'message': 'Game initialized successfully'})

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('message', 'Connected to server')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
    emit('message', 'Disconnected to server')


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room' + room, to=room)

    if room not in joined_users:
        joined_users[room] = []
    joined_users[room].append(username)

    if len(joined_users[room]) == 2:
        emit('navigateToGame', room, room=room)
    else:
        send('waiting', to=room)


@socketio.on('start-game')
def handle_start_game(data):
    room = data['room']
    emit('game-started', room, room=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@socketio.on('end-turn')
def on_end_turn(data):
    room = data['room_id']
    emit('update-game-state', data['gameState'], room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
