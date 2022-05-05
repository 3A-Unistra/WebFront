<template>
<div id="app">
  <!-- obligatoire en vuejs3 c'est element parent-->
  <div class="apli"> 
    <!-- appel des fichier exemple header et footer dans app -->
    <!-- <inscriptionPage/> -->
    <!-- <loginPage tit="Login STRASSPOLY"/>
    <forgetPage tit="Forget Password"/> -->
  </div>
  <nav class="menu">
    <!--<router-link to="/login">Login</router-link> |
    <router-link to="/inscription">Inscription</router-link> |
    <router-link to="/profile">profile</router-link>
    <router-link to="/forget">ForgetPassword</router-link> -->
  </nav>
  <router-view/>

</div>
</template>

<script>
  // méme role que le href  
  // import inscriptionPage from './components/Inscription.vue'
  // import loginPage from './components/Login.vue'
  // import forgetPage from './components/ForgetPassword.vue'

export default {
  
  name: 'App',

  components: {
    // inscriptionPage,
    // loginPage,
    // forgetPage,
  },
}
</script>

<style>

  .menu{
    position: absolute;
    right: 0;
    margin: 30px;
  }
  #app{
    
  }


nav a.router-link-exact-active {
  color: #42b983;
}
</style>
