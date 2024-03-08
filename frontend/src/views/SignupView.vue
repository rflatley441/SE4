<template>
    <div id="app">
        <div id="content">
            <div id = signuptitle>Sign Up</div>
            <div id="inputsContainer">
                <div class="inputLabel">
                    Username
                </div>
                <div class="inputHolder">
                    <input type="text" class="inputBox" />
                </div>
                <div class="inputLabel" style="margin-top: 30px;">
                    Email Address
                </div>
                <div class="inputHolder" style="padding-bottom: 10px;">
                    <input type="text" class="inputBox" />
                </div>

                <div class="inputLabel" style="margin-top: 10px;">
                    Password
                </div>
                <div id="passwordrequirments">
                    Password must contain at least 8 characters in length
                </div>
                <div class="inputHolder" style="padding-bottom: 20px;">
                    <input type="text" class="inputBox" />
                </div>

                <div class="inputLabel" style="margin-top: 10px;">
                    Confirm Password
                </div>
                <div class="inputHolder" style="padding-bottom: 20px;">
                    <input type="text" class="inputBox" />
                </div>

                <button class="create-account-button">
                    CREATE ACCOUNT
                </button>

            </div>
            <div id="footer">
                <div class="footText">RETURN TO LOGIN</div>
            </div>
            <DiamondTile id="diamondTile" fillColor="green" />
            <CircleTile id="circleTile" fillColor="red" />
            <CloverTile id="cloverTile" fillColor="orange" />
        </div>
    </div>
</template>

<style scoped>
#app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
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

#signuptitle {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 100px;
    font-weight: 80;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
}

#inputsContainer {
    background: #b3daff;
    width: 900px;
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
    border: none;
    font-size: 30px;
    height: 60px;
    margin-top: 5px;
    padding-left: 10px;
}

.inputLabel {
    font-size: 35px;
    font-weight: 600;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
}
#passwordrequirments {
    font-size: 15px;
    font-weight: 100;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    text-align: right;
}

#footer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
}

.footText {
    font-size: 35px;
    font-weight: 300;
    color: #2490F3;
    cursor: pointer;
}

.create-account-button {
  background-color: #2490F3;
  border: 1px solid black;
  color: white;
  padding: 20px 40px; /* Adjust the padding to match the button's height and width */
  text-align: center;
  display: inline-block;
  font-size: 40px; /* Adjust the font size as needed */
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px; /* Optional: if the button has rounded corners */
}

.create-account-button:hover {
  background-color: #0056b3; /* Darker blue on hover, adjust as needed */ 
  transform: translateY(2px); /* Optional: if the button moves slightly on hover */
}
</style>


<script>
import DiamondTile from '@/assets/DiamondTile.vue';
import CircleTile from '@/assets/CircleTile.vue';
import CloverTile from '@/assets/CloverTile.vue';


 export default {
    name: "LoginView",
    components: {
        DiamondTile, CircleTile,CloverTile
    }
 }
</script>
