<template>
    <div class="profile-picture">
      <!-- The component tag is used to dynamically render a component -->
      <!-- If randomTile is truthy, it renders the component specified by randomTile.component -->
      <!-- The fill-color, width, and height props are passed to the component -->
      <!-- The click event listener calls the openImagePicker method when the component is clicked -->
      <component 
        v-if="randomTile" 
        :is="randomTile.component" 
        :fill-color="randomTile.color" 
        :width="75" 
        :height="75"
        @click="openImagePicker"
      />
      <!-- If randomTile is falsy and profilePictureUrl is truthy, it renders an img tag -->
      <!-- The src attribute is set to profilePictureUrl, and the alt attribute is set to "Profile Picture" -->
      <!-- The click event listener calls the openImagePicker method when the img is clicked -->
      <img v-else-if="profilePictureUrl" :src="profilePictureUrl" alt="Profile Picture" @click="openImagePicker" class="profile-picture-img" />
    </div>
  </template>
  
  <script>
  import CircleTile from '@/components/CircleTile.vue';
  import CloverTile from '@/components/CloverTile.vue';
  import DiamondTile from '@/components/DiamondTile.vue';
  import SquareTile from '@/components/SquareTile.vue';
  import Star4ptTile from '@/components/Star4ptTile.vue';
  import Star8ptTile from '@/components/Star8ptTile.vue';
  
  export default {
    data() {
      return {
        tiles: [
          { component: CircleTile, colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
          { component: CloverTile, colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
          { component: DiamondTile, colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
          { component: SquareTile, colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
          { component: Star4ptTile, colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
          { component: Star8ptTile, colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
        ],
        profilePictureUrl: null,
      };
    },
    computed: {
      randomTile() {
        const randomTile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
        const randomColor = randomTile.colors[Math.floor(Math.random() * randomTile.colors.length)];
        return { component: randomTile.component, color: randomColor };
      },
    },
    methods: {
      openImagePicker() {
        // implement the method to open the image picker and set the profilePictureUrl
      },
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
  
  .profile-picture img, .profile-picture .tile {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  </style>
  