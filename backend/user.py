from stats import Stats
from gameboard import GameBoard

import firebase_admin
from firebase_admin import credentials, auth, firestore 

# Initialize Firebase
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)
db = firestore.client() 

class User:
    def __init__(self, username, email_address, password):

        self.game_settings = GameBoard() # need Game Board class 

    def createUser(cls, username, password, email_address):
        try: 
            # Create user in Firebase
            user_data = auth.create_user(
                email = email_address, 
                password = password, 
                display_name = username 
            )
            # Local instance 
            new_user = cls(username, email_address, password)
            new_user.userID = user_data.uid 
            return new_user
        
        except Exception as e: 
            return f"Error creating user: {e}"

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
        try:
            # Update the local instance
            self.username = new_username
            # Update the username in Firebase
            auth.change_username(
                self.userID,
                display_name=new_username
            )
            return "Username changed successfully."
        except Exception as e:
            return f"Error changing username: {e}"

    def changeProfile(self, new_profile_picture):
        try:
            # Update the local instance
            self.profile_picture = new_profile_picture
            # Additional logic to update the profile picture in Firestore or Storage, if needed
            return "Profile picture changed successfully."

        except Exception as e:
            return f"Error changing profile picture: {e}"
        
    def login(self, username, password):
        try:
            # Implement logic to log in the user using Firebase Authentication
            user = auth.sign_in(username, password)
            # sign it with user name and password
            self.userID = user['localId']
            return "Login successful."

        except Exception as e:
            return f"Error logging in: {e}"

    def logout(self):
        # Implement logic to log out the user
        # firebase has a sign out function
        self.userID = None
        return "Logout successful."

    def deleteUser(self):
        try:
            # Implement logic to delete the user account
            auth.delete_user(self.userID)
            # Additional logic to delete user data from Firestore, if needed
            return "User account deleted successfully."

        except Exception as e:
            return f"Error deleting user: {e}"