<template>
    <div class="tile" @click="handleTileClick">
        <div class="tile-shown is-hidden" v-if="this.hidden"></div>
        <!-- <div class="tile-shown is-highlighted" v-else-if="this.highlighted">hello</div> -->
        <component v-else :is="getTileComponent()" :fillColor="this.color" :width="50" :height="50"/>
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
        color: String,
        shape: String,
        position: {
            type: Number,
            required: true
        },
        value: {
            type: Number, 
            required: true 
        },
        hidden: {
            type: Boolean,
            default: true,
        },
        // highlighted: {
        //     type: Boolean,
        //     default: false
        // }

    }, 
    setup(props, context) {
        const handleTileClick = () => {
            context.emit('select-tile', {
                position: props.position,
            })
        }
        return {
            handleTileClick,
        };
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
                case("star8pt"):
                default:
                    return 'Star8ptTile';
            }
        },
    }
 }
</script>

<style scoped>
.tile {
    position: relative;
    border: solid;
}

.tile-shown {
    width: 100%;
    height: 100%;
}
/* .tile-shown.is-highlighted {
    background-color: gray;
    position: absolute
} */

</style>

