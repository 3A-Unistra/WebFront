<template>
  <Header></Header>

  <section class="container">
    <section class="opt">
      <LogOutButton></LogOutButton>

      <button class="creer_partie" @click="this.$router.push('../components/PreLobby')" type="boutton">
        {{ $t("creer") }}
        <img class="icone" src="../assets/reseau.png" alt="icone reseau" />
      </button>
    </section>

    <section class="info_salon">
      <div class="lien">
        <input class="champLien" type="text" :placeholder="$t('entrer_lien')" />
        <button class="rejoindre" type="boutton">
          {{ $t("rejoindre") }}
          <img class="icone" src="../assets/verif.png" alt="icone verif" />
        </button>
      </div>
      <div
        class="liste_salon"
        v-for="salon in salonsAffichables"
        :key="salon.name"
      >
        <Salon
          :maxNbPlayers="salon.maxNbPlayers"
          :nameLobby="salon.name"
          :nbPlayers="salon.nbPlayers"
          :private="salon.private"
           @my-event="joinLobby"
        ></Salon>
      </div>
    </section>
  </section>

  <Footer></Footer>
</template>

<!-- Script JS -->
<script>
import LogOutButton from "../components/LogOutButton";
import Footer from "../components/MyFooter";
import Header from "../components/MyHeader";
import Salon from "../components/SalonComponent.vue";

export default {
  created: function () {
    if (this.lobbySocketState !== 0) return;
    this.lobbySocket = new WebSocket("wss://ws.ifelse.io");
    this.lobbySocketState = 1;
    this.lobbySocket.onopen = (e) => {
      console.log("open");
      console.log(e);
      this.lobbySocketState = 2;
    };
    this.lobbySocket.onerror = (e) => {
      console.log("error");
      console.log(e);
      this.lobbySocketState = 0;
    };

    this.lobbySocket.onclose = (e) => {
      console.log("close");
      console.log(e);
      this.lobbySocketState = 0;
    };
    this.lobbySocket.onmessage = (e) => {
      if (e.data === "Request served by d7e94330") {
        console.log("message");
      } else {
        let EnterRoomSucceed = JSON.parse(e.data);
        console.log(EnterRoomSucceed);
        if (EnterRoomSucceed.piece >=0) {
          this.piece = EnterRoomSucceed.piece;
        }
      }
    };
  },
  data() {
    return {
      lobbySocket: WebSocket,
      lobbySocketState: 0,
      listeSalons: [
        {id: 1, name: "salon1", private: true, nbPlayers: 8, maxNbPlayers: 8},
        {id: 2, name: "salon2", private: true, nbPlayers: 7, maxNbPlayers: 8},
        {id: 3, name: "salon3", private: false, nbPlayers: 3, maxNbPlayers: 8},
        {id: 4, name: "salon4", private: false, nbPlayers: 8, maxNbPlayers: 8},
      ],
      newSalon: {
        id: 2,
        name: "salon dynamique",
        private: true,
        nbPlayers: 10,
        maxNbPlayers: 7,
      },
    };
  },
  name: "PostLoginPage",
  components: {
    Header,
    Footer,
    Salon,
    LogOutButton,
  },
  methods: {
    logout: function () {
      this.$store.commit("clearUserData"), this.$router.push("/");
    },
    joinLobby: function () {
      let EnterRoom = {
        player_token: this.$store.state.id,
        game_token: this.$store.state.username,
      };
      if (this.lobbySocketState === 0){
        console.log("reconnexion")
        this.lobbySocket.onopen = (e) => {
      console.log("open");
      console.log(e);
      this.lobbySocketState = 2;       
     }
      }
      this.lobbySocket.send(JSON.stringify(EnterRoom));
      this.$router.push("/lobby");
    },

    receptionSalon: function (newSalon) {
      let foundSalon = 0;
      this.listeSalons.find((salon) => {
        if (salon.id == newSalon.id) {
          foundSalon = 1;
          this.replace(newSalon);
        }
      });
      if (foundSalon == 0) {
        this.addInstance(newSalon);
      }
    },

    replace: function (oldLobbyNewVersion) {
      //on cherche l'id dans la liste des salons déjà présents
      this.listeSalons.find((salon) => {
        if (salon.id === oldLobbyNewVersion.id) {
          salon.name = oldLobbyNewVersion.name;
          salon.nbPlayers = oldLobbyNewVersion.nbPlayers;
          salon.maxNbPlayers = oldLobbyNewVersion.maxNbPlayers;
          salon.private = oldLobbyNewVersion.private;
        }
      });
    },

    addInstance: function (newLobby) {
      this.listeSalons.push(newLobby);
      console.log("etape 2");
      console.log(newLobby.name + " a été ajouté a la liste");
    },
  },
  computed: {
    salonsAffichables: function () {
      return this.listeSalons.filter(
        (salon) => salon.private && salon.nbPlayers < salon.maxNbPlayers
      );
    },
  },
};
</script>

<!-- Style Css -->
<style>
#app {
  background-color: #edebe9;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 50px;
  margin-top: 20px;
  padding-bottom: 20px;
}

.info_salon {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 30px;
  padding: 30px 0px 30px 0px;
}

.info_salon {
  padding: 15px 70px 30px 70px;
  width: 80%;
  height: 550px;
  display: flex;
  background-color: #c6c6c6;
  border-radius: 15px;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  gap: 20px;
}

.deconnection,
.creer_partie,
.rejoindre {
  border-radius: 7px;
  width: 200px;
  font-weight: bold;
  border: none;
  outline: none;
}

.deconnection {
  color: #eceae7;
  background-color: black;
  margin-bottom: 30px;
}

.creer_partie {
  color: black;
  background-color: #c4c4c4;
}

.rejoindre {
  background-color: #fab532;
}

.creer_partie:hover {
  background-color: #999999;
}

.creer_partie:active {
  background-color: #c4c4c4 !important;
}

.deconnection:hover {
  background-color: rgb(48, 47, 47);
}

.deconnection:active {
  background-color: black !important;
}

.rejoindre:hover {
  background-color: #fda90b;
}

.rejoindre:active {
  background-color: #ff8f0f !important;
}

.icone {
  width: 40px;
  height: 40px;
}

.opt {
  width: 20%;
  height: 40%;
}

.lien {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
}

.champLien {
  width: 70vh;
  height: 50px;
  font-weight: bold;
  padding-left: 20px;
}

.opt {
  display: flex;
  flex-direction: column;
}

.liste_salon {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
