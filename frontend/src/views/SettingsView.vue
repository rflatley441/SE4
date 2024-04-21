<template>
    <div id="app">
        <NavBar />
        <div id="content">
            <div id="title">User Settings</div>
            <div id="inputsContainer">
                <div class="innerBox">
                    <div class="inputLabel">Username</div>
                    <div class="inputHolder">
                        <input type="text" class="inputBox" v-model="username" placeholder="Username" />
                    </div>
                    <div class="passwordContainer">
                        <div class="inputLabel">Password</div>
                        <div class="forgotPassword">Forgot password?</div>
                    </div>
                    <div class="inputHolder" style="padding-bottom: 20px">
                        <input type="password" class="inputBox" v-model="password" placeholder="Password" />
                    </div>

                    <div class="inputLabel" style="padding-top: 10px">Email</div>
                    <div class="inputHolder" style="padding-bottom: 10px">
                        <input type="text" class="inputBox" v-model="email" placeholder="Email Address" />
                    </div>
                </div>
            </div>

            <div id="volumeContainer">
                <div id="volumeTitle">Volume</div>
                <div class="slidecontainer">
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                </div>
            </div>
<div id="bottomContainer">
            <div id="colorblindModeBox">
                <div class="toggleContainer">
                    <!-- This is the text -->

                    <label for="colorblindModeToggle">Colorblind Mode </label>
                    <!-- This is the toggle button -->

                    <input type="checkbox" id="colorblindModeToggle" />
                </div>
                <!-- Your other colorblind mode box content here -->
            </div>
            <div id="returnToHomeText">
                <router-link to="/home" class="footText">Return to Home</router-link>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.passwordContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
}

.forgotPassword {
    color: blue;
    cursor: pointer;
    font-size: 15px;
}

#content {
    margin-top: 20px;
    /* Adjust this value as needed */
}

.innerBox {
    width: 80%;
    /* Adjust this value to make the box narrower */
    margin-right: 20px;
    /* Adjust this value to move the box to the right */
}

#app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
}

#title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 100px;
    font-weight: 80;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
}

#inputsContainer {
    background: #b3daff;
    width: 500px;
    padding-left: 60px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-left: 550px;
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
#returnToHomeText {
    margin-left: 850px; /* Add this line to create space between the #colorblindModeBox and the text */
    margin-top: -55px; /* Add this line to move the text up */}

.inputLabel {
    font-size: 35px;
    font-weight: 600;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
}

#volumeTitle {
    position: absolute;
    /* Change this from relative to absolute */
    top: -40px;
    /* Adjust this value to move the title up */
    left: 0;
    /* Adjust this value to move the title to the left */
    font-size: 35px;
    /* Adjust this value to change the title size */
    font-weight: bold;
}
.colorblindContainer {
    display: flex; /* Add this line */
    align-items: center; /* Add this line */
}



#volumeContainer {
    background: #b3daff;
    width: 990px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 60px;
    padding-right: 60px;
    margin-top: 50px;
    position: relative;
    display: flex;
    /* Add this line */
    justify-content: center;
    /* Add this line */
    align-items: center;
    /* Add this line */
    flex-direction: column;
    /* Add this line */
}

.slidecontainer {
    width: 80%;
}

/* The slider itself */
.slider {
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    width: 100%;
    /* Full-width */
    height: 25px;
    /* Specified height */
    background: #000000;
    /* Grey background */
    outline: none;
    /* Remove outline */
    opacity: 0.7;
    /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: 0.2s;
    /* 0.2 seconds transition on hover */
    transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
    opacity: 1;
    /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    width: 25px;
    /* Set a specific slider handle width */
    height: 25px;
    /* Slider handle height */
    background: #04aa6d;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
}

.toggleContainer {
    display: flex;
    /* Add this line */
    align-items: center;
    /* Add this line */
}

#colorblindModeBox {
    background: #b3daff;
    width: 300px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 60px;
    margin-top: 50px;

}

label[for="colorblindModeToggle"] {
    font-size: 30px;
    /* Adjust this value to change the text size */
    font-weight: bold;
    /* This makes the text bold */
}

#colorblindModeToggle {
    transform: scale(3);
    /* Adjust this value to change the checkbox size */
    margin-right: 60px;
}

.bottomContainer {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Add this line */
    padding-top: 20px;
}

#passwordrequirments {
    font-size: 15px;
    font-weight: 100;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    text-align: right;
}

#footer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
}

.footText {
    font-size: 35px;
    font-weight: 300;
    color: #2490f3;
    cursor: pointer;
}
</style>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
    name: "SettingsView",
    components: {
        NavBar,
    },
};
</script>
