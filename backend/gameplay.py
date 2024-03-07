from enum import Enum
from random import shuffle
from tile import Tile
from player import Player


class TileColor(Enum):
    RED = 1
    ORANGE = 2
    YELLOW = 3
    GREEN = 4
    BLUE = 5
    PURPLE = 6


class TileShape(Enum):
    CIRCLE = 1
    CLOVER = 2
    DIAMOND = 3
    SQUARE = 4
    STAR_4PT = 5
    STAR_8PT = 6

class Gameplay:
    def __init__(self, player1, player2, game_board):
        self.player1 = player1
        self.player2 = player2
        self.game_board = game_board

    def createTiles(self):
        tiles = []
        colors = list(TileColor)
        shapes = list(TileShape)

        tiles_per_combination = 108 // (len(colors) * len(shapes))

        tiles = []

        for i in range(tiles_per_combination):
            for color in colors:
                for shape in shapes:
                    tiles.append(Tile(shape, color))

        shuffle(tiles)

        self.game_board.setTiles(tiles[:108])

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
