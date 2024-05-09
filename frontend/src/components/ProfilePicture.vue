<template>
  <div class="profile-picture">
    <img :src="this.profile_pic" alt="Profile Picture" class="profile-picture-img" />
  </div>
</template>

<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
export default {
  data() {
    return {
      profile_pic: "https://i.stack.imgur.com/l60Hf.png",
    };
  },
  async created() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    if (!user) return;    
    onSnapshot(doc(db, "users", user.uid), async (docSnap) => {
    if (docSnap.exists()) {
      this.profile_pic = await getDownloadURL(ref(getStorage(), `${user.uid}.png`));
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