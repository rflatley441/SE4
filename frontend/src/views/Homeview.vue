<template>
    <!-- <div id="menu">
        <img src="../assets/newuser.png" alt="Profile Picture" height="100px"/>
        <button class="btn top">LOG OUT</button>
        <img src="../assets/settings.png" alt="Profile Picture" height="100px"/>
    </div> -->
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
            </div>
            <Star8ptTile id="starTile" fillColor="red" />
            <!-- <CircleTile id="circleTile" fillColor="purple" /> -->
            <Star4ptTile id="star4ptTile" fillColor="blue" />
            <DiamondTile id="diamondTile" fillColor="orange" />
            <SquareTile id="squareTile" fillColor="yellow" />
            <CloverTile id="cloverTile" fillColor="green" />
        </div>
    </div>
</template>

<style scoped>

#menu{
    position: absolute;
    top: 10px;
    right: 10px;
    height: 100px;
}

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

.btn {
    border: none;
}

h1 {
  color: blue;
}

/* On mouse-over */
.btn:hover {background: #a8a5a5;}

.success {
    background-color: #b3daff;
    width: 800px;
    height: 70px;
    font-size: 30px;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    margin: auto;
    text-align: center;
    color: black;
}

.top{
    background-color: white;
    width: 200px;
    height: 100px;
    font-size: 30px;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    margin: auto;
    text-align: center;
    color: black;
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
// import CircleTile from '@/assets/CircleTile.vue';
import CloverTile from '@/assets/CloverTile.vue';
import DiamondTile from '@/assets/DiamondTile.vue';
import Star4ptTile from '@/assets/Star4ptTile.vue';
import SquareTile from '@/assets/SquareTile.vue';

 export default {
    name: "HomeView",
    components: {
        Star8ptTile, CloverTile, DiamondTile, Star4ptTile, SquareTile
        // ,CircleTile
    }
 }
</script>