from flask import Flask, jsonify, request
from flask_cors import CORS
from gameplay import Gameplay
from player import Player
from gameboard import GameBoard
from tile import Tile


app = Flask(__name__)
CORS(app)

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
    try:
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
    except Exception as e:
        error_message = "An error occured while fetching the player hands: {}".format(
            str(e))
        return jsonify({"error": error_message}), 500


@app.route('/deck', methods=['GET'])
def get_game_deck():
    try:
        game_deck = [{"deckId": 0}, {
            "remaining": len(game_state.game_board.tiles)}]

        return jsonify(game_deck)
    except Exception as e:
        error_message = "An error occured while fetching the game deck: {}".format(
            str(e))
        return jsonify({"error": error_message}), 500


@app.route('/playerhand', methods=['POST'])
def update_player_hand():
    try:
        request_data = request.get_json()
        userId = request_data.get('userId')
        playerHand = request_data.get('hand')

        updated_hand = []
        for tile in playerHand:
            updated_hand.append(Tile(tile.get('shape'), tile.get('color')))

        game_state.getPlayerById(userId).hand = updated_hand

        return jsonify({'message': 'Player hand updated'}, request_data)
    except Exception as e:
        error_message = "An error occured while updating the player hand: {}".format(
            str(e))
        return jsonify({"error": error_message}), 500


@app.route('/playerscore', methods=['POST'])
def update_player_score():
    try:
        request_data = request.get_json()
        userId = request_data.get('userId')
        score = request_data.get('score')

        game_state.getPlayerById(userId).score = score

        return jsonify({'message': 'Player score updated'}, request_data)
    except Exception as e:
        error_message = "An error occured while updating the player score: {}".format(
            str(e))
        return jsonify({"error": error_message}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
