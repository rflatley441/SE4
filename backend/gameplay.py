from random import shuffle
from tile import Tile, TileColor, TileShape

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

    def dealTiles(self):
        # Implementation for dealing tiles goes here
        while len(self.player1.hand) < 6 and len(self.game_board.tiles) != 0:
            self.player1.addTileToHand(self.game_board.tiles.pop())

        while len(self.player2.hand) < 6 and len(self.game_board.tiles) != 0:
            self.player2.addTileToHand(self.game_board.tiles.pop())

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
