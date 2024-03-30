<template>
    <div id="app">
        <div id="content">
            <div id = signuptitle>Sign Up</div>
            <div id="inputsContainer">

            <div class="inputHolder">
                <input type="text" class="inputBox" v-model="username" placeholder="Username" />
            </div>

            <div class="inputHolder" style="padding-bottom: 10px;">
                <input type="text" class="inputBox" v-model="email" placeholder="Email Address" />
            </div>

            <div class="inputHolder" style="padding-bottom: 20px;">
                <input type="password" class="inputBox" v-model="password" placeholder="Password" />
            </div>

                <button class="create-account-button" @click.prevent="signUp">
                CREATE ACCOUNT
                </button>
            </div>
            <div id="footer">
                <router-link to="/" class="footText">Return to Login</router-link>
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
  background-color: #f6f1f1;
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
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DiamondTile from '@/assets/DiamondTile.vue';
import CircleTile from '@/assets/CircleTile.vue';
import CloverTile from '@/assets/CloverTile.vue';

 export default {
    name: "LoginView",
    components: {
        DiamondTile, CircleTile,CloverTile
    },

    setup() {
        const email = ref("");
        const password = ref("");
        const errorMessage = ref("");
     
        const signUp = () => {
    console.log("Sign Up clicked"); // Debugging line
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Success", userCredential.user);
        })
        .catch((error) => {
            console.error("Signup failed", error);
            errorMessage.value = error.message;
        });
};

        return { email, password, errorMessage, signUp };
    }

 }
</script>
