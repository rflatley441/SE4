<template>
    <div id="navBar">
        <div class="navItems">
            <router-link to="/home" class="navItem">Home</router-link>    
            <router-link to="/game" class="navItem">Play Game</router-link>
            <router-link to="/faq" class="navItem">How to Play</router-link>
            <router-link to="/" class="navItem">Logout</router-link>
            <ProfilePicture v-if="showProfilePicture" class="navItem" style="margin-left: auto;" />      
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
    background-color: #ffffff;
    z-index: 1000;
    padding: 10px 20px;
}

.navItem {
    color: #333;
    text-decoration: none;
    margin-right: 20px;
    font-size: 25px;
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
