<template>
  <div class="apli"> <!-- obligatoire en vuejs3 c'est element parent-->
    <inscriptionPage tit="Inscription STRASSPOLY"/>
    <loginPage tit="Login STRASSPOLY"/>
    
  </div>
</template>

<script>
  // méme role que le href
  import inscriptionPage from './components/Inscription.vue'
  import loginPage from './components/Login.vue'

export default {
  created () {
  },
  name: 'App',

  components: {
    inscriptionPage,
    loginPage,
  }
}
</script>

<style>
 

</style>
