<template>
    <div id="app">
        <div id="content">
            <img src="../assets/qwirkle.webp" />
            <div id="inputsContainer">
                <div class="inputLabel">
                    Username
                </div>
                <div class="inputHolder">
                    <input type="text" class="inputBox" />
                </div>
                <div class="inputLabel" style="margin-top: 30px;">
                    Password
                </div>
                <div class="inputHolder" style="padding-bottom: 20px;">
                    <input type="text" class="inputBox" />
                </div>
            </div>
            <div id="footer">
                <div class="footText">Don't have an account?</div>
                <div class="footText">Forgot password?</div>
            </div>
            <Star8ptTile id="starTile" fillColor="red" />
            <CircleTile id="circleTile" fillColor="purple" />
            <Star4ptTile id="star4ptTile" fillColor="blue" />
            <DiamondTile id="diamondTile" fillColor="orange" />
            <SquareTile id="squareTile" fillColor="yellow" />
            <CloverTile id="cloverTile" fillColor="green" />
        </div>
    </div>
</template>

<style scoped>
#app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    transform: scale(0.9);
}

#starTile {
    position: absolute;
    left: -70px;
    top: 450px;
}
#circleTile {
    position: absolute;
    right: -70px;
    top: 200px;
}
#diamondTile {
    position: absolute;
    right: 70px;
    top: 200px;
}
#star4ptTile {
    position: absolute;
    right: -70px;
    top: 200px;
}
#squareTile {
    position: absolute;
    right: -600px;
    bottom: -200px;
    width: 300;
    height: 300;
}
#cloverTile {
    position: absolute;
    right: -70px;
    top: 200px;
}

img {
    padding-bottom: 40px;
    padding-top: 30px;
}

#inputsContainer {
    background: #b3daff;
    width: 900px;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 40px;
    padding-bottom: 40px;
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
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
}

#footer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
}

.footText {
    font-size: 35px;
    font-weight: 300;
    color: #2490F3;
    cursor: pointer;
}
</style>


<script>
import Star8ptTile from '@/assets/Star8ptTile.vue';
import CircleTile from '@/assets/CircleTile.vue';
import CloverTile from '@/assets/CloverTile.vue';
import DiamondTile from '@/assets/DiamondTile.vue';
import Star4ptTile from '@/assets/Star4ptTile.vue';
import SquareTile from '@/assets/SquareTile.vue';

 export default {
    name: "HomeView",
    components: {
        Star8ptTile, CircleTile, CloverTile, DiamondTile, Star4ptTile, SquareTile
    }
 }
</script>