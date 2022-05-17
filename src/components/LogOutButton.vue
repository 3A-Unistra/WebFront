<template>
    <button @click="logout" class="deconnection" type="boutton" v-if="this.$store.state.loggedin">{{ $t("deco") }}
        <img class="icone" src="../assets/deco.png" alt="icone deco">
    </button>
</template>

<style scoped>
.deconnection {
    border-radius: 7px;
    width: 200px;
    font-weight: bold;
    border: none;
    outline: none;
    color: #eceae7;
    background-color: black;
    margin-bottom: 30px;
}

icone{
    width: 40px;
    height: 40px;
}
</style>

<script>

export default {
    methods: {
        logout: function() {
            this.$store.commit('clearUserData'),
            this.$router.push('/')
        }
    }       
}
</script>

  
