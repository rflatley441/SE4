<template>
    <div>
        <component :is="getTileComponent()" :fillColor="this.color"/>
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
    name: "BoardTile",
    components: {
        CircleTile,
        CloverTile,
        DiamondTile,
        SquareTile,
        Star4ptTile,
        Star8ptTile
    },
    props: {
        color: String, // change type
        shape: String // change type
    }, 
    methods: {
        getTileComponent() {
            switch(this.shape) {
                case ("circle"):
                    return 'CircleTile';
                case ("clover"):
                    return 'CloverTile';
                case ("diamond"):
                    return 'DiamondTile';
                case ("square"):
                    return 'SquareTile';
                case ("star4pt"): 
                    return 'Star4ptTile';
                default:
                    return 'Star8ptTile';
            }
        }
    }
 }
</script>

<style scoped>

</style>