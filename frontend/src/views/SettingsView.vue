<template>
    <div id="app">
        <NavBar />
      <div id="content">
        <div id="signuptitle">User Settings</div>
        <div id="inputsContainer">
            <div class="innerBox">
          <div class="inputLabel">Username</div>
          <div class="inputHolder">
            <input
              type="text"
              class="inputBox"
              v-model="username"
              placeholder="Username"
            />
          </div>
          <div class="passwordContainer">
    <div class="inputLabel">Password</div>
    <div class="forgotPassword">Forgot password?</div>
</div>
          <div class="inputHolder" style="padding-bottom: 20px">
            <input
              type="password"
              class="inputBox"
              v-model="password"
              placeholder="Password"
            />
          </div>
  
          <div class="inputLabel" style="padding-top: 10px">Email</div>
          <div class="inputHolder" style="padding-bottom: 10px">
            <input
              type="text"
              class="inputBox"
              v-model="email"
              placeholder="Email Address"
            />
          </div>
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
    margin-top: 20px; /* Adjust this value as needed */
}
  .innerBox {
    width: 80%; /* Adjust this value to make the box narrower */
    margin-right: 20px; /* Adjust this value to move the box to the right */
}
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

 
  #signuptitle {
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
    margin-left:550px;
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
import NavBar from '@/components/NavBar.vue';
export default {
    name: "SettingsView",
    components: {
        NavBar
    },
 }
 

  </script>
  