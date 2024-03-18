<template>
    <div class="player-profile">
      <img :src="imageUrl" :alt="altText" class="profile-image" @click="toggleZoom" />
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "PlayerProfile",
    props: {
      imageUrl: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        default: "Profile Picture"
      }
    },
    setup(props) {
      const isZoomed = ref(false);
  
      const toggleZoom = () => {
        isZoomed.value = !isZoomed.value;
      };
  
      return {
        isZoomed,
        toggleZoom
      };
    }
  };
  </script>
  
  <style scoped>
  .player-profile {
    display: inline-block;
    position: relative;
  }
  
  .profile-image {
    width: 100px; /* Adjust size as needed */
    height: 100px; /* Adjust size as needed */
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }
  
  .profile-image:hover {
    transform: scale(1.1);
  }
  
  .profile-image.zoomed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px; /* Adjust size as needed */
    height: 300px; /* Adjust size as needed */
    z-index: 1000;
  }
  </style>
  