<template>
    <div id="navBar">
        <div class="navItems">
            <img src="../assets/Qwirkle.png"/>
            <router-link to="/home" class="navItem">Home</router-link>    
            <router-link to="/faq" class="navItem">How to Play</router-link>
            <router-link to="/settings" class="navItem">Settings</router-link>
            <router-link to="/" class="navItem">Logout</router-link>
            <ProfilePicture v-if="showProfilePicture" style="margin-left: auto;" />      
        </div>
    </div>
</template>

<style scoped>
#navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #FDF5E6;
    z-index: 1000;
    padding: 30px 20px;
    box-shadow: 0 2px 8px #D2B48C;
}

.navItem {
    color: #333;
    text-decoration: none;
    margin-right: 20px;
    font-size: 25px;
    font-weight: bold;
    color: #353839;
    font-family: 'Quicksand', sans-serif;
    padding: 10px;
}

img {
    width: 100px; 
    max-width: 100%;
    margin-right: 20px;
}

.navItem:hover {
    background-color: #EEDDBB;
    border-radius: 10px;
}

</style>

<script>
import ProfilePicture from './ProfilePicture.vue'; 

export default {
  name: "NavBar",
  components: {
        ProfilePicture
    },
computed: {
        showProfilePicture() {
            return this.$route.path !== '/' && this.$route.path !== '/login';
        }
    }
}
</script>
