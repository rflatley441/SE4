

<template>
    <div id="app">
        <div id="content">
            <img src="../assets/qwirkle.webp" />
            <div id="inputsContainer">
                <div class="inputLabel">
                    Username
                </div>
                <div class="inputHolder">
                    <input type="text" class="inputBox" />
                </div>
                <div class="inputLabel" style="margin-top: 30px;">
                    Password
                </div>
                <div class="inputHolder" style="padding-bottom: 20px;">
                    <input type="text" class="inputBox" />
                </div>

                <button class="create-account-button">
                    LOGIN
                </button>

            </div>

            <div id="footer">
                <div class="footText">Don't have an account?</div>
            </div>


            <Star8ptTile id="starTile" fillColor="red" />
            <CircleTile id="circleTile" fillColor="purple" />
        </div>
    </div>
</template>

<style scoped>
#app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    transform: scale(0.92);
}

#starTile {
    position: absolute;
    left: -70px;
    top: 450px;
}
#circleTile {
    position: absolute;
    right: -70px;
    top: 200px;
}

img {
    padding-bottom: 40px;
    padding-top: 30px;
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

</style>


<script>
import Star8ptTile from '@/assets/Star8ptTile.vue';
import CircleTile from '@/assets/CircleTile.vue';

 export default {
    name: "LoginView",
    components: {
        Star8ptTile, CircleTile
    }
 }
</script>

