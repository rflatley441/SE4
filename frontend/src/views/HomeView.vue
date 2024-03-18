<template>
    <div id="app">
        <div id="content">
            <div id="inputsContainer">
                <button class="btn success">Success</button>
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
    min-height: calc(100vh - 16px);
    justify-content: center;
    align-items: center;
    width: 100vw;
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
    width: 600px;
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
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}

/* On mouse-over */
.btn:hover {background: #eee;}

.success {color: green;}

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