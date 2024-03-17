from tile import Tile

class Player:
    def __init__(self, userID, score=0, profile_picture=None):
        self.userID = userID
        self.score = score
        self.hand = []
        self.profile_picture = profile_picture

    def updateScore(self, pointsToAdd):
        self.score += pointsToAdd
        return self.score

    def addTileToHand(self, tile):
        self.hand.append(tile)

    def setProfilePicture(self, profile_picture):
        self.profile_picture = profile_picture

    def getProfilePicture(self):
        return self.profile_picture