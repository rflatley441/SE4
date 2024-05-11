<template>
  <div class="profile-picture">
    <img :src="profile_pic" alt="Profile Picture" class="profile-picture-img" />
  </div>
</template>

<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

export default {
  data() {
    return {
      // default pfp image url 
      profile_pic: "https://i.stack.imgur.com/l60Hf.png",
    };
  },
  async created() {
    // auth instance
    const auth = getAuth();
    // get current user
    const user = auth.currentUser;
    // firestore instance
    const db = getFirestore();
    // reference to the user document
    const docRef = doc(db, "users", user.uid);

    // Setting up a real-time listener on the document 
    onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        if (data.profile_pic) {
          this.profile_pic = await getDownloadURL(ref(getStorage(), `${user.uid}.png`));
        }
      }
    });
  },
};
</script>

<style scoped>
.profile-picture {
  position: fixed;
  top: 10px;
  right: 20px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>