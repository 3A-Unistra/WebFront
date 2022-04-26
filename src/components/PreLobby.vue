<template>
  <Header></Header>
  <div v-for="salon in listeSalons" :key="salon.name">
    <div v-if="salon.public == true && salon.nbPlayers != salon.maxNbPlayers">{{ salon.name }}</div>
  </div>
  <button type="button" @click="setPrive(true)">salon privé</button>
  <button type="button" @click="setPrive(false)">salon public</button>

  <Footer></Footer>
</template>

<script>
import Footer from "../components/MyFooter";
import Header from "../components/MyHeader";
import socket from "../services/ws";


export default {
  name: "LoginPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
    };
  },

  created: function () {
    socket.onopen = (e) => {
      console.log("open preLobby");
      console.log(e);
    };
    socket.onerror = (e) => {
      console.log("error preLobby");
      console.log(e);
    };

    socket.onclose = (e) => {
      console.log("close preLobby");
      console.log(e);
    };
    socket.onmessage = (e) => {
      let paquet = JSON.parse(e.data)
      if (paquet.name === 'CreateGameSucceed') {
        this.$store.commit("gameToken",paquet.game_token)
        console.log(" id de la room aprs succss" +this.$store.state.gameToken)
        this.$store.commit("setPiece", paquet.piece);
        this.$router.push("/lobby");
      }
    };
  },
  methods: {
    createGame: function () {
      let paquet = {
        name: 'CreateGame',
        player_token: this.$store.state.id,
        is_private: this.$store.state.publicLobby,
        max_nb_players: 8
      };
      socket.send(JSON.stringify(paquet));
    },
    setPrive: function (privateOrNot) {
      this.$store.commit("setLobby", privateOrNot);
      this.$store.commit("setHost", true);
      this.createGame();
    },
  },
};
</script>
