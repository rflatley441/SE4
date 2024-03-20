<template>
    <div id="app">
        <div id="content">
            <h1 style="font-size:80px"> Welcome, User!</h1>
            <h2 style="font-size:20px">What would you like to do today?<br></h2>
            <div id="inputsContainer">
                <button class="btn success" style="margin-top: 30px;">PLAY GAME</button>
                <br>
                <button class="btn success" style="margin-top: 30px;">VIEW PLAYER STATISTICS</button>
                <br>
                <button class="btn success" style="margin-top: 30px;">VIEW FRIENDS LIST</button>

                <!-- <div class="inputLabel">
                    Username
                </div>
                <div class="inputHolder">
                    <input type="text" class="inputBox" />
                </div>
                <div class="inputLabel" style="margin-top: 30px;">
                    Password
                </div>
                <div class="inputHolder" style="padding-bottom: 20px;">
                    <input type="button" class="inputBox" />
                </div> -->
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
    left: 100px;
    top: 450px;
}
#circleTile {
    position: absolute;
    right: -140px;
    top: 0px;
}
#diamondTile {
    position: absolute;
    right: -100px;
    bottom: -200px;
    width: 300;
    height: 300;
}
#star4ptTile {
    position: absolute;
    left: -50px;
    bottom: 500px;
    width: 125;
    height: 125;
}
#squareTile {
    position: absolute;
    left: -100px;
    bottom: -200px;
    width: 250;
    height: 250;
}
#cloverTile {
    position: absolute;
    right: -50px;
    bottom: 200px;

}

img {
    padding-bottom: 40px;
    padding-top: 30px;
}

#inputsContainer {
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
    background: #b3daff;
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

.btn {
  border: none;
  background-color: #b3daff;
  width: 800px;
  height: 70px;
  font-size: 30px;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  margin: auto;
  text-align: center;

}

h1 {
  color: blue;
}

/* On mouse-over */
.btn:hover {background: #eee;}

.success {color: black;}

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