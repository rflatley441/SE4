<template>
    <div id="app">
        <div id="content">
            <div class="contents-container">
                <img src="../assets/Qwirkle.png" />
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
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore
import { useRouter } from 'vue-router';

export default {
    name: "LoginView",
    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter();

        const login = async () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then(async (userCredential) => {
                    const db = getFirestore(); 
                    const userDoc = doc(db, "users", userCredential.user.uid); 

                    try {
                        const docSnap = await getDoc(userDoc);
                        if (docSnap.exists()) {
                            router.push('/home');
                        } else {
                            console.log("No such document!");
                        }
                    } catch (error) {
                        console.error("Error getting document:", error);
                        errorMessage.value = "Failed to fetch user details.";
                    }
                })
                .catch((error) => {
                    errorMessage.value = error.message;
                });
        };

        return { email, password, errorMessage, login };
    }
}
</script>

<style scoped>
#app {
    display: flex;
    position: relative;
    min-height: calc(100vh - 16px); 
    justify-content: center;
    background-image: url("@/assets/background.svg");
    background-size: cover;
}

.content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
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

img {
    position: relative;
    display: block;
    margin: auto;
    padding-bottom: 40px;
    padding-top: 30px;
}

#inputsContainer {
    position: relative;
    background: #ceceff;
    width: 900px;
    padding: 40px 60px; 
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.inputHolder {
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputBox {
    width: 900px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 10px;
    font-size: 30px;
    height: 60px;
    margin-top: 5px;
    padding-left: 10px;
}

.inputLabel {
    font-size: 35px;
    font-weight: 600;
    color: black;
    text-align: left;
}

#footer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
    position: relative;
}

.footText {
    font-size: 35px;
    font-weight: 500;
    color: #2490F3;
    cursor: pointer;
}

.login-button {
  background-color: #f6f1f1;
  border: transparent;
  border-radius: 20px;
  background-color: #f6f1f1;
  font-weight: 600;
  font-family: 'Quicksand', sans-serif;
  padding: 20px 40px; 
  text-align: center;
  display: inline-block;
  font-size: 30px; 
  margin: 4px 2px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3; 
  transform: translateY(2px); 
}
</style>