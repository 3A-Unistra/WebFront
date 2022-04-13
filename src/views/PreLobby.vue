<template>
    <Header></Header>
    <div v-for="salon in listeSalons" :key="salon.name">
        <div v-if="salon.public == true"> 
            {{ salon.name }}
        </div>
    </div>
    <button type="button" @click="changeSalon3Visibilite">clique pour changer la visibilité de salon3 </button>
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
        listeSalons: [
            { name:'salon1', public: true },
            { name:'salon2', public: true },
            { name:'salon3', public: false },
            { name:'salon4', public: true },
            { name:'salon5', public: false },

        ],
      }
  },
  methods: {
        changeSalon3Visibilite: function () {
            if (this.listeSalons[3].public == true) {
                this.listeSalons[3].public = false
            } else {
                this.listeSalons[3].public = true
            }
        }
    }
}
</script>