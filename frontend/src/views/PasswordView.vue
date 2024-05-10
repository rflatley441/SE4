<template>
    <div id="app">
        <div class="content">
            <div class="contents-container">
                <div id =title>Password Reset</div>
                <div id="inputsContainer">
                    <div id="infoLabel">
                        Please enter the email address you'd like your password reset information to be sent to.
                    </div>
            
                    <div class="inputLabel" style="margin-top: 10px;">
                        Email Address
                    </div>
                    <div class="inputHolder" style="padding-bottom: 20px;">
                        <input type="text" class="inputBox" />
                    </div>

                    <button class="create-account-button">
                        Request Password Reset
                    </button>

                </div>
                <div id="footer">
                    <router-link to="/" class="footText">Return to Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#app {
    display: flex;
    position: relative;
    min-height: calc(100vh - 16px); 
    background-image: url("@/assets/background.svg");
    background-size: cover;
}

.content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 80px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
}

.contents-container {
    width: fit-content;
    padding: 40px;
    border-radius: 20px;
    background-color: rgba(238, 221, 221, 0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    margin: auto;
}

#diamondTile {
    position: absolute;
    left: -40px;
    top: 750px;
}
#circleTile {
    position: absolute;
    right: -60px;
    top: 700px;
}

#cloverTile {
    position: absolute;
    right: -70px;
    top: 200px;
}

#infoLabel {
    font-size: 30px;
    font-weight: 50;
    color: black;
    text-align: left;
}

#title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    padding-top: 20px;
    font-size: 90px;
    color: black;
    font-weight: 500;
}

#inputsContainer {
    background: #b3daff;
    width: 900px;
    border-radius: 20px;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 40px;
    padding-bottom: 40px;
}

.inputHolder {
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputBox {
    width: 900px;
    border: transparent;
    font-size: 30px;
    height: 60px;
    margin-top: 5px;
    padding-left: 10px;
    border-radius: 10px;
}

.inputLabel {
    font-size: 35px;
    font-weight: 600;
    color: black;
    text-align: left;
}
#passwordrequirments {
    font-size: 15px;
    font-weight: 100;
    color: black;
    text-align: right;
}

#footer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
}

.footText {
    font-size: 35px;
    font-weight: 500;
    color: #2490F3;
    cursor: pointer;
}

.create-account-button {
  background-color: #2490F3;
  border: transparent;
  color: white;
  padding: 20px 40px; /* Adjust the padding to match the button's height and width */
  text-align: center;
  display: inline-block;
  font-size: 40px; /* Adjust the font size as needed */
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px; /* Optional: if the button has rounded corners */
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
}

.create-account-button:hover {
  background-color: #0056b3; /* Darker blue on hover, adjust as needed */ 
  transform: translateY(2px); /* Optional: if the button moves slightly on hover */
}
</style>


<script>

 export default {
    name: "LoginView",
 }
</script>
