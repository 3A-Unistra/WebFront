<template>
  <Header></Header>
  <div v-for="salon in listeSalons" :key="salon.name">
    <div v-if="salon.public == true && salon.nbPlayers != salon.maxNbPlayers">
      {{ salon.name }}
    </div>
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
    this.lobbySocket = new WebSocket("wss://ws.ifelse.io");
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
      if (e.data === "Request served by d7e94330") {
        console.log("message");
      } else {
        let CreateGameSucceed = JSON.parse(e.data);
        console.log(CreateGameSucceed);
      }
    };
  },
  methods: {
    createGame: function () {
      let CreateGame = {
        player_token: this.$store.state.id,
        is_private: this.$store.state.publicLobby,
      };
      this.lobbySocket.send(JSON.stringify(CreateGame));
      //this.$router.push("/lobby");
    },
    setPrive: function (privateOrNot) {
      console.log("test");
      this.$store.commit("setLobby", privateOrNot);
      this.$store.commit("setHost", true);
      this.createGame();
    },
  },
};
</script>
