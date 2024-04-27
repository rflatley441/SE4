from flask import Flask, jsonify, request
from flask_cors import CORS
from gameplay import Gameplay
from player import Player
from gameboard import GameBoard
from tile import Tile
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

game_state = None


def initialize_game():
    global game_state
    player1 = Player("0", 0)
    player2 = Player("1", 0)
    gameboard = GameBoard()
    game_state = Gameplay(player1, player2, gameboard)
    game_state.createTiles()


initialize_game()


@app.route('/api', methods=['GET', 'POST'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


@app.route('/playerhand', methods=['GET'])
def get_player_hands():
    userId = request.args.get('userId')  # Fetch userId from query parameters
    if not userId:
        return jsonify({'error': 'Missing userId parameter'}), 400

    print("error in app.py")
    # Assuming userIds '0' and '1' for player1 and player2 respectively.
    # You might need to adjust this based on how userIds are assigned in your game state.
    if userId == game_state.player1.userId:
        player = game_state.player1
    elif userId == game_state.player2.userId:
        player = game_state.player2
    else:
        return jsonify({'error': 'User not found'}), 404

    hand = []
    for tile in player.hand:
        hand.append([str(tile.shape), str(tile.color)])

    userHand = {
        'userId': userId,
        'hand': hand,
        'remaining': len(game_state.game_board.tiles)
    }

    return jsonify([userHand])


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


@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('message', 'Connected to server')


@socketio.on('disconnect')
def handle_connect():
    print('Client disconnected')
    emit('message', 'Disconnected to server')


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
