class Tile:
    def __init__(self, value):
        self.value = value

class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0

class GameBoard:
    def __init__(self):
        self.tiles = []

class Gameplay:
    def __init__(self, player1, player2, game_board):
        self.player1 = player1
        self.player2 = player2
        self.game_board = game_board

    def createTiles(self, tiles):
        self.game_board.tiles = tiles

    def dealTiles(self, tiles):
        # Implementation for dealing tiles goes here
        pass

    def playTile(self, tile, position, player):
        # Implementation for playing a tile on the board goes here
        pass

    def updateBoard(self, tiles):
        # Implementation for updating the board goes here
        pass

    def updatePoints(self, player):
        player.score += 1

    def determineWinner(self):
        if self.player1.score > self.player2.score:
            return self.player1
        elif self.player2.score > self.player1.score:
            return self.player2
        else:
            return None