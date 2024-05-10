from tile import Tile


class Player:
    def __init__(self, userId, score=0):
        self.userId = userId
        self.score = score
        self.hand = []

    def addTileToHand(self, tile):
        self.hand.append(tile)
