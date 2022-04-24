<template>
  <Header></Header>

  <section class="container">
    <section class="opt">
      <LogOutButton></LogOutButton>

      <button
        class="creer_partie"
        @click="this.$router.push('../components/PreLobby')"
        type="boutton"
      >
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
      <div class="liste_salon" v-for="(salon,index) in salonsAffichables" :key="salon.name">
        <Salon
          :maxNbPlayers="salon.maxNbPlayers"
          :nameLobby="salon.name"
          :nbPlayers="salon.nbPlayers"
          :private="salon.private"
          @my-event="joinLobby(index)"
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
      let paquet = JSON.parse(e.data);
      console.log("contenu du paquet recu quand on envoie un paquet Postlogin : " + e.data)
      if (paquet.name === "BroadcastNewRoomToLobby") {
        console.log("un salon a été crée (2). Modification de la liste :")
        this.$store.commit("createSalon", {
          id: paquet.game_token,
          name: paquet.name,
          private: paquet.is_private,
          nbPlayers: paquet.nb_players,
          maxNbPlayers: 8
        });
        console.log(this.$store.state.listeSalons)
        console.log(this.$store.state.listePlayers)
        console.log("succes")
      }

      if (paquet.name === "EnterRoomSucceed") {
        console.log("le joueur a rejoins avec succès le lobby")
        this.$store.state.piece = paquet.piece
        this.$router.push("/lobby");
      }
      /*if (paquet.name === "BroadcastUpdateLobby") {
  let index = this.$store.state.listeSalons.indexOf(paquet.token)
   console.log("index du tableau a mettre a jour : "+ index);
    switch (paquet.reason) {
          case 1:
            console.log("on ajoute un joueur, raison 1")
            this.$store.commit("ajoutJoueur", index);
            break;
          case 2:
            //this.$store.commit("suppressionJoueur", index);
            console.log("suppression joueur")
            break;
          case 7:
            console.log("on ajoute un bot, raison 7")
            this.$store.commit("ajoutJoueur", index);
            break;
          default:
            console.log("ne concerne pas la mise a jour de lobby");
        }
    this.$store.commit("updateSalon",{
      reason : paquet.reason, 
      token : paquet.game_token,
    });
}*/
    }
  },
  data() {
    return {
      lobbySocket: WebSocket,
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
    joinLobby: function (index) {
      let salonToJoin = this.$store.state.listeSalons[index].id
      let EnterRoom = {
        name: "EnterRoom",
        player_token: this.$store.state.id,
        game_token: salonToJoin,
      };
      console.log("paquet envoyé quand on join la room : " + JSON.stringify(EnterRoom))
      this.lobbySocket.send(JSON.stringify(EnterRoom));
    },

    deleteSalon: function (index) {
      this.salon.splice(index, 1)
    },

    updateSalon: function (gameToken, updateReason) {

      this.listeSalons.find((salon) => {

        if (salon.id === gameToken) {
          switch (updateReason) {
            case 1:
              console.log(salon)
              salon.nbPlayers++;
              break;
            case 2:
              salon.nbPlayers--;
              break;
            default:
              console.log("ne concerne pas la mise a jour de lobby");
          }
        }
      });
    },
  },
  computed: {
    salonsAffichables: function () {
      console.log("tout les salosn a afficher" + JSON.stringify(this.$store.state.listeSalons))
      return this.$store.state.listeSalons.filter(
        (salon) => !salon.private && salon.nbPlayers < salon.maxNbPlayers
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
