import Stats, GameBoard 
import firebase_admin

# why is it not allowing me to pip install firebase-admin

class User:
    def __init__(self, username, email_address, password):
        self.username = username
        self.email_address = email_address 
        self.profile_picture = None
        self.userID = None
        self.stats = Stats() # need stats class for this
        self.game_settings = GameBoard() # need Game Board class 


    def createUser(cls, username, password, emailAddress):
        # You may want to implement logic to check if the username or email address is unique
        new_user = cls(username, emailAddress, password)
        # Additional logic to create a new user in the system
        return new_user

    def changePassword(self, new_password):
        # Implement logic to change the password
        # if firebase has its own password requirements, do we have to verify new passwords ourselves in this function
        # or will firebase handle it 
        self.password = new_password
        return "Password changed successfully."

    def changeUsername(self, new_username):
        # Implement logic to change the username
        self.username = new_username
        return "Username changed successfully."

    def changeProfile(self, new_profile_picture):
        # Implement logic to change the profile picture
        self.profilePicture = new_profile_picture
        return "Profile picture changed successfully."

    def logIn(self, userID):
        # Implement logic to log in the user and assign a userID
        self.userID = userID
        return "Login successful."

    def logout(self):
        # Implement logic to log out the user
        self.userID = None
        return "Logout successful."

    def deleteUser(self):
        # Implement logic to delete the user account
        # You may want to ask for confirmation before deleting
        return "User account deleted successfully."