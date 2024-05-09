<template>
  <div id="app" class="background">
    <NavBar />
    <div id="content">
      <header class="header">
        <h1 style="font-size: 80px">User Settings</h1>
      </header>
      <div id="topContainer">
        <div id="profile_picContainer">
          <img :src="this.profile_pic" class="profile-pic" />
        </div>
        <div id="changePhotoBox">
          <button class="change-photo-button" @click="openFilePicker">
            Change Photo
          </button>
          <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
        </div>
        <div id="inputsContainer">
          <div class="innerBox">
            <div class="inputLabel">Username</div>
            <div class="inputHolder">
              <input type="text" class="inputBox" v-model="username" />
            </div>
            <div class="passwordContainer">
              <div class="inputLabel">Password</div>
              <div class="forgotPassword">Forgot password?</div>
            </div>
            <div class="inputHolder" style="padding-bottom: 20px">
              <input type="password" class="inputBox" v-model="password" placeholder="Password" />
            </div>

            <div class="inputLabel" style="padding-top: 10px">Email</div>
            <div class="inputHolder" style="padding-bottom: 10px">
              <input type="text" class="inputBox" v-model="email" />
            </div>
          </div>
        </div>
      </div>

      <div id="volumeContainer">
        <div id="volumeTitle">Volume</div>
        <div class="slidecontainer">
          <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
        </div>
      </div>
      <div id="bottomContainer">
        <div id="colorblindModeBox">
          <div class="toggleContainer">
            <!-- This is the text -->

            <label for="colorblindModeToggle">Colorblind Mode </label>
            <!-- This is the toggle button -->

            <input type="checkbox" id="colorblindModeToggle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      open: false,
      loading: false,
      photoURL: "",
      photo: null,
      fileName: "No file selected",
      profile_pic:
        "https://i.stack.imgur.com/l60Hf.png",
      username: "",
      email: "",
    };
  },
  async created() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (!user) return;
    this.profile_pic = await getDownloadURL(
      ref(getStorage(), `${user.uid}.png`)
    );
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.username = data.username;
    }
    this.email = user.email;
  },
  methods: {
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      if (event.target.files[0]) {
        this.photo = event.target.files[0];
        this.fileName = event.target.files[0].name;
        this.photoURL = URL.createObjectURL(event.target.files[0]);
        const auth = getAuth();
        const file = event.target.files[0];
        const user = auth.currentUser;
        await this.uploadProfilePic(file, user);
      }
    },

    async uploadProfilePic(file, user) {
      try {
        const firebaseApp = getApp();
        console.log(firebaseApp);
        const storage = getStorage();
        const fileRef = ref(storage, user.uid + ".png");
        this.loading = true;
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(user, { photoURL });
        this.profile_pic = photoURL;

        this.user = { ...this.user, photoURL };

        // these lines update the user's document in Firestore
        const db = getFirestore();
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { profile_pic: photoURL }, { merge: true });
        this.loading = false;
        alert("Successfully Uploaded Image!");
      }
       catch(err) {
      console.error(err);
      alert(err.message);
    }
  },

},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

.background {
  background-color: #fdf5e6;
  min-height: 100vh;
}

.content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #fdf5e6;
}

.header {
  font-size: 2em;
  text-align: center;
  padding: 20px 0;
  margin-top: 50px;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  font-family: "Quicksand", sans-serif;
}

#title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 100px;
  font-weight: 80;
  color: black;
}

/* the position of the profile picture */
#profile_picContainer {
  position: center;
  z-index: 0;
  top: 100;
  left: 260px;
  width: 200px;
  height: 200px;
  position: relative;
  padding-bottom: 500px;
  padding-top: -100px;
}

/* the actual profile picture */
.profile-pic {
  width: 500px;
  height: 350px;
  border-radius: 10px;
  object-fit: cover;
  /* Ensures the aspect ratio of the image is maintained */
  margin-left: -60px;
}

#changePhotoBox {
  background: #b3daff;
  width: 500px;
  height: 20px;
  padding-left: 0px;
  padding-top: 30px;
  margin-top: 140px;
  margin-right: -500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  /* Adjust this value as needed */
}

label[for="changePhotoBox"] {
  font-size: 30px;
  font-weight: bold;
  color: black;
  position: relative;
  /* Added */
  z-index: 1;
  padding-bottom: 30px;
}

.change-photo-button {
  width: 500px;
  height: 200px;
  background-color: #b3daff;
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  cursor: pointer;
  padding-bottom: 20px;
  padding-top: 30px;
  transition: background-color 0.3s ease;
  border-radius: 10px;
}

.change-photo-button:hover {
  background-color: #a1c2ff;
}

.passwordContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.forgotPassword {
  color: blue;
  cursor: pointer;
  font-size: 15px;
}

.innerBox {
  width: 80%;
  margin-right: 20px;
}

#inputsContainer {
  background: #b3daff;
  width: 500px;
  height: 400px;
  padding-left: 60px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: 550px;
  margin-right: 200px;
  margin-top: -220px;
  border-radius: 10px;
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
  text-align: left;
}

#volumeTitle {
  position: absolute;
  top: -40px;
  left: 0;
  font-size: 35px;
  font-weight: bold;
  color: black;
}

#volumeContainer {
  background: #b3daff;
  width: 1260px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: -80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
}

.slidecontainer {
  width: 100%;
}

/* The slider itself */
.slider {
  -webkit-appearance: none;
  /* Override default CSS styles */
  appearance: none;
  width: 100%;
  /* Full-width */
  height: 25px;
  /* Specified height */
  background: #000000;
  /* Grey background */
  outline: none;
  /* Remove outline */
  opacity: 0.7;
  /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s;
  /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1;
  /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Override default look */
  appearance: none;
  width: 25px;
  /* Set a specific slider handle width */
  height: 25px;
  /* Slider handle height */
  background: #04aa6d;
  /* Green background */
  cursor: pointer;
  /* Cursor on hover */
}

.toggleContainer {
  display: flex;
  align-items: center;
}

#colorblindModeBox {
  background: #b3daff;
  width: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 60px;
  margin-top: 50px;
  border-radius: 10px;
}

label[for="colorblindModeToggle"] {
  font-size: 30px;
  font-weight: bold;
  color: black;
}

#colorblindModeToggle {
  transform: scale(3);
  /* Adjust this value to change the checkbox size */
  margin-right: 60px;
}

.bottomContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
}

#topContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footText {
  font-size: 35px;
  font-weight: 300;
  color: #2490f3;
  cursor: pointer;
}
</style>
