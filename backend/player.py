import backend

class Player:
    def __init__(self, userID, score=0):
        self.userID = userID
        self.score = score
        self.playableTiles = drawHandOfTiles()

    def updateScore(self, pointsToAdd):
        self.score += pointsToAdd
        return self.score
    
    def addTileToHand(self, bagOfTiles):
        self.playableTiles.append(drawNewTile(bagOfTiles))

    def forfeit(self): # Function stub
        pass

# Takes an array of tiles as input
def drawHandOfTiles(bagOfTiles):
    handOfTiles = list() #TODO: Function Stub - MUST UPDATE bagOfTiles
    return handOfTiles

def drawNewTile(bagOfTiles):
    newTile = backend.Tile() #TODO: Function Stub - MUST UPDATE bagOfTiles
    return newTile

