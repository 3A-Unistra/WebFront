<template>
    <Header></Header>
    <div v-for="salon in listeSalons" :key="salon.name">
        <div v-if="salon.public == true && salon.nbPlayers != salon.maxNbPlayers">
            {{ salon.name }}
        </div>
    </div>
    <button type="button" @click="setPrive(true)">salon privé </button>
    <button type="button" @click="setPrive(false)">salon public</button>

    <Footer></Footer>
</template>

<script>

import Footer from '../components/MyFooter'
import Header from '../components/MyHeader'

export default {
  
  created () {
  },
     name: 'LoginPage',
     components: {
        Header,
        Footer
    },
    data () {
      return {
      }
  },
  methods: {
        setPrive: function (privateOrNot) {
                this.$store.commit('setLobby',privateOrNot)
                this.$store.commit('setHost',true)
                this.$router.push('/lobby')

        },
    }
    
}
</script>