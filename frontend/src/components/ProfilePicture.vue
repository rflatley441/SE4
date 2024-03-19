<template>
  <div class="profile-picture">
    <img :src="profilePictureUrl" alt="Profile Picture" @click="openImagePicker" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      profilePictureUrl: '', // Default profile picture URL
    };
  },
  methods: {
    openImagePicker() {
      // Logic to open image picker and update the profile picture URL
      // You can use a library like Vue File Agent or Vue Croppa for image uploading and cropping
    },
  },
};
</script>

<style scoped>
/* default profile picture  */
.profile-picture {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  overflow: hidden;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>