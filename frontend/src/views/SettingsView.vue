<template>
  <div id="app">
    <NavBar />
    <div id="content">
      <header class="header">
        <h1 style="font-size: 80px">User Settings</h1>
      </header>
      <div id="topContainer">
        <div id="profile_picContainer">

          <div>
            <div v-if="open">
              <div>
                <form @click="openFilePicker">
                  <input type="file" accept="image/*" @change="handleFileChange" ref="fileInput" hidden />
                  <div v-if="photoURL">
                    <img :src="photoURL" :alt="fileName" class="profile-pic" />
                  </div>
                  <div v-else>
                    <div>Upload</div>
                    <div>
                      <button @click="closeModal">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <!-- <button @click="closeModal">Cancel</button> -->
                <!-- <button :disabled="loading || !photo" @click="handleUpload">
                  Upload
                </button> -->
              </div>
            </div>
          </div>
        </div>
        <div id="changePhotoBox">

          <button class="change-photo-button" @click="openModal">Change Photo</button>
          <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />


        </div>
        <div id="inputsContainer">
          <div class="innerBox">
            <div class="inputLabel">Username</div>
            <div class="inputHolder">
              <input type="text" class="inputBox" v-model="username" placeholder="Username" />
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
              <input type="text" class="inputBox" v-model="email" placeholder="Email Address" />
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
        <div id="returnToHomeText">
          <router-link to="/home" class="footText">Return to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #FDF5E6;
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
  font-family: 'Quicksand', sans-serif;
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
  font-family: 'Quicksand', sans-serif;
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

#returnToHomeText {
  margin-left: 850px;
  margin-top: -55px;
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
  width: 1190px;
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

<script>
import { storage, ref, uploadBytes, getDownloadURL, updateProfile } from "firebase/storage";
import { auth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import NavBar from "@/components/NavBar.vue";
export default {
  // ...
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
      // ...
    };
  },
  methods: {
    async created() {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(getFirestore(), "users", user.uid);
        const userDocData = await getDoc(userDoc);
        if (userDocData.exists()) {
          this.profile_pic = userDocData.data().profile_pic;
        }
      }
    },
    openModal() {
      this.open = true;
    },
    closeModal() {
      this.photo = null;
      this.photoURL = "";
      this.fileName = "No file selected";
      this.open = false;
    },
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      if (event.target.files[0]) {
        this.photo = event.target.files[0];
        this.fileName = event.target.files[0].name;
        this.photoURL = URL.createObjectURL(event.target.files[0]);
      }
    },
    async fetchUserInfo() {
      if (this.user?.photoURL) {
        this.profile_pic = this.user.photoURL;
      }

      await this.fetchUserName();

      this.infoLoading = false;
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      const user = auth.currentUser;
      await this.uploadProfilePic(file, user);
    },
    async uploadProfilePic(file, user) {
      try {
        const fileRef = ref(storage, user.uid + ".png");
        this.loading = true;
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(user, { photoURL });
        this.profile_pic = photoURL;

        // Add these lines to update the user's document in Firestore
        const db = getFirestore();
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { profile_pic: photoURL }, { merge: true });
        console.log("I hate this class");
        console.log(this.profile_pic);
        this.loading = false;
        alert("Uploaded Image!");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
      this.open = false; // Close the modal
    },
    // ...
  },
  // ...
};
// import NavBar from "@/components/NavBar.vue";
// import { getAuth } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';

// export default {
//   name: "SettingsView",
//   components: {
//     NavBar,
//   },
//   data() {
//     return {
//       username: null,
//       profile_pic: null,
//     };
//   },
//   async created() {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     const db = getFirestore();
//     const docRef = doc(db, 'users', user.uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const data = docSnap.data()
//       console.log("Document data:", data);
//       this.username = data.username;
//       this.profile_pic = data.profil_pic;
//       console.log(this.profile_pic);
//     }
//   }
// }
</script>
