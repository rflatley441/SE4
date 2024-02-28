class Stats: 
    def __init__(self, userID, wins=0, ties=0, losses=0, forfeits=0, totalPoints=0, playerRank=0):
        self.userID = userID
        self.wins = wins
        self.ties = ties
        self.losses = losses
        self.forfeits = forfeits
        self.totalPoints = totalPoints
        self.playerRank = playerRank

    def getWins(self):
        # You may implement logic to fetch wins for the specified user ID
        return self.wins

    def getTies(self):
        # You may implement logic to fetch ties for the specified user ID
        return self.ties

    def getLosses(self):
        # You may implement logic to fetch losses for the specified user ID
        return self.losses

    def getForfeits(self):
        # You may implement logic to fetch forfeits for the specified user ID
        return self.forfeits

    def getTotalPoints(self):
        # You may implement logic to fetch total points for the specified user ID
        return self.totalPoints
