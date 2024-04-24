<template>
    <div id="app">
        <div id="content">
            <img src="../assets/qwirkle.webp" />
            <div id="inputsContainer">
                <div class="inputLabel">
                    Email
                </div>
                <div class="inputHolder">
                    <input type="email" class="inputBox" v-model="email" placeholder="Email" />
                </div>
                <div class="inputLabel" style="margin-top: 30px;">
                    Password
                </div>
                <div class="inputHolder" style="padding-bottom: 20px;">
                    <input type="password" class="inputBox" v-model="password" placeholder="Password" />
                </div>

                <button class="login-button" @click.prevent="login">
                    LOGIN
                </button>

            </div>

            <div id="footer">
                <router-link to="/signup" class="footText">Don't have an account?</router-link>
                <router-link to="/password" class="footText">Forgot password?</router-link>
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
}

#starTile {
    position: absolute;
    display: flex;
    left: -70px;
    top: 450px;
}
#circleTile {
    position: absolute;
    display: flex;
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

.login-button {
  background-color: #f6f1f1;
  border: 1px solid black;
  background-color: #f6f1f1;
  padding: 20px 40px; /* Adjust the padding to match the button's height and width */
  text-align: center;
  display: inline-block;
  font-size: 40px; /* Adjust the font size as needed */
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px; /* Optional: if the button has rounded corners */
}

.login-button:hover {
  background-color: #0056b3; /* Darker blue on hover, adjust as needed */ 
  transform: translateY(2px); /* Optional: if the button moves slightly on hover */
}
</style>


<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';  // Import Firestore methods
import { useRouter } from 'vue-router';
import Star8ptTile from '@/assets/Star8ptTile.vue';
import CircleTile from '@/assets/CircleTile.vue';

export default {
    name: "LoginView",
    components: {
        Star8ptTile, CircleTile
    },

    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter();

        const login = () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const db = getFirestore();  
                    const userDocRef = doc(db, 'users', userCredential.user.uid); 

                    return getDoc(userDocRef)  
                        .then(docSnapshot => {
                            if (docSnapshot.exists()) {
                                console.log("User document found:", docSnapshot.data());
                                router.push('/home');
                            } else {
                                console.log("No user document found");
                                errorMessage.value = "No user record found. Please complete your registration.";
                            }
                        });
                })
                .catch((error) => {
                    console.error("Authentication failed:", error);
                    errorMessage.value = error.message;
                });
        };

        return { email, password, errorMessage, login };
    }
 }
</script>
