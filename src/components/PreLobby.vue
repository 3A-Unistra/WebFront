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


export default {
  name: "LoginPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      lobbySocket: WebSocket,
    };
  },

  created: function () {
    this.lobbySocket = new WebSocket('ws://monopoly.schawnndev.fr:80/ws/lobby?token=8a222daf-4b2f-4a32-936a-7820ba3f248a');
    this.lobbySocket.onopen = (e) => {
      console.log("open");
      console.log(e);
    };
    this.lobbySocket.onerror = (e) => {
      console.log("error");
      console.log(e);
    };

    this.lobbySocket.onclose = (e) => {
      console.log("close");
      console.log(e);
    };
    this.lobbySocket.onmessage = (e) => {
      let paquet = JSON.parse(e.data)
      if (paquet.name === 'CreateGameSucceed') {
        this.$store.commit("setPiece", paquet.piece);
        this.$store.commit("joinRoom", {
          photo: '',
          pseudo:this.$store.state.pseudo,
          username:this.$store.state.username,
        });
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
      };
      console.log("request for server (1) creating a game :\n " + JSON.stringify(paquet))
      this.lobbySocket.send(JSON.stringify(paquet));
    },
    setPrive: function (privateOrNot) {
      this.$store.commit("setLobby", privateOrNot);
      this.$store.commit("setHost", true);
      this.createGame();
    },
  },
};
</script>
