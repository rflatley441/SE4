from flask import Flask, jsonify
from flask_cors import CORS
from gameplay import Gameplay
from player import Player
from gameboard import GameBoard


app = Flask(__name__)
CORS(app)

game_state = None


def initialize_game():
    global game_state
    player1 = Player("0", 0)
    player2 = Player("1", 0)
    gameboard = GameBoard()
    gameplay = Gameplay(player1, player2, gameboard)
    gameplay.createTiles()
    gameplay.dealTiles()
    game_state = gameplay


initialize_game()


@app.route('/api', methods=['GET', 'POST'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


@app.route('/playerhand', methods=['GET'])
def get_player_hands():
    player1Hand = []

    for tile in game_state.player1.hand:
        player1Hand.append([str(tile.shape), str(tile.color)])

    player2Hand = []

    for tile in game_state.player2.hand:
        player2Hand.append([str(tile.shape), str(tile.color)])

    userHands = [{"remaining": 0}, {'userId': game_state.player1.userID, 'hand': player1Hand},
                 {'userId': game_state.player2.userID, 'hand': player2Hand}]

    return jsonify(userHands)


@app.route('/deck', methods=['GET'])
def get_game_deck():
    game_deck = [{"deckId": 0}, {
        "remaining": len(game_state.game_board.tiles)}]

    return jsonify(game_deck)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
