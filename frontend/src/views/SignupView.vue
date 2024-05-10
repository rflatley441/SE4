<template>
  <div id="app">
      <div class="content">
          <div class="contents-container">
              <div id = signuptitle>Sign Up</div>
              <div id="inputsContainer">

                  <div class="inputLabel">
                      Username
                  </div>
              <div class="inputHolder">
                  <input type="text" class="inputBox" v-model="username" placeholder="Username" />
              </div>

              <div class="inputLabel" style = "padding-top: 10px;">
                      Email
                  </div>
              <div class="inputHolder" style="padding-bottom: 10px;">
                  <input type="text" class="inputBox" v-model="email" placeholder="Email Address" />
              </div>

              <div class="inputLabel" style = "padding-top: 10px;">
                      Password
                  </div>
              <div class="inputHolder" style="padding-bottom: 20px;">
                  <input type="password" class="inputBox" v-model="password" placeholder="Password" />
              </div>

                  <button class="create-account-button" @click.prevent="signUp">
                  Create Account
                  </button>
              </div>
              <div id="footer">
                  <router-link to="/" class="footText">Return to Login</router-link>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from 'vue-router'; 

export default {
  name: "LoginView",

  setup() {
    const router = useRouter();
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const signUp = () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          console.log("Account creation successful", userCredential.user);
          const db = getFirestore(); 
          const userDoc = doc(db, 'users', userCredential.user.uid);
          return setDoc(userDoc, {
            username: username.value,
            email: email.value
          });
        })
        .then(() => {
          console.log("User data stored in Firestore");
          router.push('/Home');
        })
        .catch((error) => {
          console.error("Signup failed", error);
          errorMessage.value = error.message;
        });
    };

    return { username, email, password, errorMessage, signUp };
  },
};
</script>

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

#signuptitle {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 100px;
    font-weight: 500;
    color: black;
}

#inputsContainer {
    background: #b3daff;
    width: 900px;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 20px;
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
  background-color: #f6f1f1;
  border: transparent;
  background-color: #f6f1f1;
  padding: 20px 40px; /* Adjust the padding to match the button's height and width */
  text-align: center;
  display: inline-block;
  font-size: 40px; /* Adjust the font size as needed */
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px; /* Optional: if the button has rounded corners */
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
}

.create-account-button:hover {
  background-color: #0056b3; /* Darker blue on hover, adjust as needed */ 
  transform: translateY(2px); /* Optional: if the button moves slightly on hover */
}
</style>