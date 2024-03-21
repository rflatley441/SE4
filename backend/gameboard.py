class GameBoard:
    def __init__(self):
        self.tiles = []

    def setTiles(self, tiles):
        self.tiles = tiles

    # def isValidMove(self, tile, position):
    #     # Get all the touching tiles
    #     touching_tiles = self.getTouchingTiles(position)

    #     # Check if all the touching tiles share either a color or shape attribute
    #     for touching_tile in touching_tiles:
    #         if touching_tile.color != tile.color and touching_tile.shape != tile.shape:
    #             return False

    #     return True

    # def addTile(self, tile, position):
    #     # Add the tile to the board at the given position
    #     self.board[position[0]][position[1]] = tile

    # def getTouchingTiles(self, position):
    #     touching_tiles = []

    #     # Check the positions to the north, south, east, west, northeast, northwest, southeast, and southwest
    #     for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
    #         new_position = (position[0] + dx, position[1] + dy)

    #         # If the new position is within the bounds of the board and there is a tile at that position
    #         if (0 <= new_position[0] < len(self.board)) and (0 <= new_position[1] < len(self.board[0])) and self.board[new_position[0]][new_position[1]] is not None:
    #             touching_tiles.append(self.board[new_position[0]][new_position[1]])

    #     return touching_tiles