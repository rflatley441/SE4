import firebase_admin
from firebase_admin import firestore 

class Stats: 
    def __init__(self, userID, wins=0, ties=0, losses=0, forfeits=0, totalPoints=0, playerRank=0):
        self.userID = userID
        self.totalPoints = totalPoints
        self.playerRank = playerRank

    def updateStats(self):
        try:
            # Connect to Firestore
            db = firestore.client()

            # Create a reference to the 'stats' collection and the specific document using the user's ID
            # https://firebase.google.com/docs/firestore/query-data/get-data
            stats_ref = db.collection('stats').document(self.userID)

            # Fetch the document data from Firestore
            stats_data = stats_ref.get().to_dict()

            # If the document exists, update the instance variables with the fetched data
            if stats_data:
                self.wins = stats_data.get('wins', 0)
                self.ties = stats_data.get('ties', 0)
                self.losses = stats_data.get('losses', 0)
                self.forfeits = stats_data.get('forfeits', 0)
                self.totalPoints = stats_data.get('totalPoints', 0)
                self.playerRank = stats_data.get('playerRank', 0)

            return "Stats updated successfully."

        except Exception as e:
            return f"Error updating stats: {e}"

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