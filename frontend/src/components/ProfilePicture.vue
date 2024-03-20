<template>
  <div class="profile-picture">
    <component 
      v-if="randomTile" 
      :is="randomTile.component" 
      :color="randomTile.color" 
      :width="100" 
      :height="100"
      @click="openImagePicker"
    />
    <img v-else-if="profilePictureUrl" :src="profilePictureUrl" alt="Profile Picture" @click="openImagePicker" class="profile-picture-img" />
  </div>
</template>

<script>
import CircleTile from '@/assets/CircleTile.vue';
import CloverTile from '@/assets/CloverTile.vue';
import DiamondTile from '@/assets/DiamondTile.vue';
import SquareTile from '@/assets/SquareTile.vue';
import Star4ptTile from '@/assets/Star4ptTile.vue';
import Star8ptTile from '@/assets/Star8ptTile.vue';

export default {
  data() {
    return {
      tiles: [
        { component: CircleTile, colors: ['red', 'blue', 'green', 'yellow'] },
        { component: CloverTile, colors: ['red', 'blue', 'green', 'yellow'] },
        { component: DiamondTile, colors: ['red', 'blue', 'green', 'yellow'] },
        { component: SquareTile, colors: ['red', 'blue', 'green', 'yellow'] },
        { component: Star4ptTile, colors: ['red', 'blue', 'green', 'yellow'] },
        { component: Star8ptTile, colors: ['red', 'blue', 'green', 'yellow'] },
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
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture img, .profile-picture .tile {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>