<template>
  <div class="apli"> <!-- obligatoire en vuejs3 c'est element parent-->
    <inscriptionPage tit="Inscription STRASSPOLY"/>
    <loginPage tit="Login STRASSPOLY"/>
    <accueilPage tit="Accueil STRASSPOLY"/>

  </div>
</template>

<script>
// méme role que le href
import accueilPage from './components/Accueil.vue'
import inscriptionPage from './components/Inscription.vue'
import loginPage from './components/Login.vue'

export default {
  created () {
  },
  name: 'App',

  components: {
    inscriptionPage,
    loginPage,
    accueilPage
  }
}
</script>

<style>

</style>
