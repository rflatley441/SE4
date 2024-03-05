from flask import Flask, jsonify
from flask_cors import CORS
from gameplay import Gameplay
from player import Player
from gameboard import GameBoard

app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['GET', 'POST'])
def get_data():
    player1 = Player("1", 0)
    player2 = Player("2", 0)
    gameboard = GameBoard()
    gameplay = Gameplay(player1, player2, gameboard)
    gameplay.createTiles()
    print(gameboard.tiles)
    gameplay.dealTiles()
    print("Player hand: ", gameplay.player1.hand)
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


def get_player_hand():
    player1 = Player("1", 0)
    player2 = Player("2", 0)
    gameboard = GameBoard()
    gameplay = Gameplay(player1, player2, gameboard)
    gameplay.createTiles()
    print(gameboard.tiles)
    gameplay.dealTiles()
    print("Player hand: ", gameplay.player1.hand)
    return jsonify(gameplay.player1.hand)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
