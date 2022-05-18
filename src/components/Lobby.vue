<template>
  <Header></Header>
  <div class="bodyL">
    <!---------------------PARTICIPANTS-------------------->
    <div class="part">
      <h1 class="h1Lobby">{{ $t("participants") }}</h1>

      <div
        class="infos"
        v-for="(player, index) in joueurs"
        :key="player.pseudo"
      >
        <div v-if="player.username != ''">
          <div class="joueur">
            <img class="pp" :src="player.photo" alt="photo de profil" />
            <div class="txtzone">
              <div class="pseudo" @click="checkFollow(player.pseudo)">
                {{ player.pseudo }}
              </div>
            </div>
            <div v-if="player.username === 'BOT'">
              <button @click="deleteBot(index)">supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          v-if="this.$store.state.isHost"
          @click="ajoutBot"
          class="bt_ajout_bot"
        >
          {{ $t("ajout_bot") }}
          <img class="botnoir" src="../assets/botnoir.png" />
        </button>
      </div>
    </div>
    <!----------------------PARAMETRES--------------------->
    <div class="param">
      <h1 class="h1Lobby">{{ $t("param_salon") }}</h1>

      <!----------------------ENCHERE--------------------->

      <div class="toggle">
        <div class="lobby_title">{{ $t("encheres") }} :</div>
        <label class="switch">
          <input
            type="checkbox"
            :disabled="this.$store.state.isHost == false"
            v-model="this.$store.state.auctions"
            v-on:click="changeAuctions()"
          />
          <span class="slider round"></span>
        </label>
      </div>

      <!----------------------DOUBLER ARGENT--------------------->

      <div class="toggle">
        <div class="lobby_title">{{ $t("double_sur_depart") }}</div>
        <label class="switch">
          <input
            type="checkbox"
            :disabled="this.$store.state.isHost == false"
            v-model="this.$store.state.doubleGO"
            v-on:click="changeDoubleGO()"
          />
          <span class="slider round"></span>
        </label>
      </div>

      <!----------------------ACHAT 1ER TOUR--------------------->
      <div class="toggle">
        <div class="lobby_title">{{ $t("achat_prem_tour") }}</div>
        <label class="switch">
          <input
            type="checkbox"
            :disabled="this.$store.state.isHost == false"
            v-model="this.$store.state.buyFirstRound"
            v-on:click="changeBuyFirstRound()"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <!----------------------TEMPS D'ACTIONS--------------------->

      <div v-if="tempsCheck(tempsAction) == true" class="tour">
        <div class="lobby_title">{{ $t("temps_tour") }}</div>
        <form>
          <input
            class="champ"
            type="text"
            v-model="this.$store.state.timePerRound"
            :disabled="this.$store.state.isHost == false"
            v-on:change="changeTimePerRound()"
          />
        </form>
      </div>

      <div v-else class="tour">
        <div class="lobby_title">
          {{ $t("temps_tour") }}
          <span class="cdt">{{ $t("duree_exemple") }} </span>
        </div>
        <form>
          <input
            class="champF"
            type="text"
            :disabled="this.$store.state.isHost == false"
          />
        </form>
      </div>
      <!----------------------TOUR MAX--------------------->

      <div class="tour">
        <div class="lobby_title">{{ $t("nbr_tour_max") }}</div>
        <form>
          <input
            class="champ"
            type="text"
            :disabled="this.$store.state.isHost == false"
            v-model="this.$store.state.maxRound"
            v-on:change="changeTimePerRound()"
          />
        </form>
      </div>
      <!----------------------SOMME DEPART--------------------->
      <div class="tour">
        <div class="lobby_title">{{ $t("somme_depart") }}</div>
        <form>
          <input
            class="champ"
            type="text"
            :disabled="this.$store.state.isHost == false"
            v-model="this.$store.state.starterMoney"
            v-on:change="changeStarterMoney()"
          />
        </form>
      </div>
      <!--------------------BT LANCER PARTIE------------------->

      <div class="lancement">
        <button
          type="button"
          @click="startGame"
          class="bt_lancer"
          v-if="this.$store.state.isHost"
          v-on:click="tempsCheck(tempsAction)"
        >
          <h1 class="Lancer">{{ $t("lancer_partie") }}</h1>
        </button>

        <button type="button" @click="wantToQuit" class="bt_quitter">
          {{ $t("quitter") }}
        </button>
      </div>
    </div>
    <!----------------------FOLLOWS--------------------->
    <div class="amis">
      <h3>Room ID:</h3>
      <div>{{ this.$store.state.gameToken }}</div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
//window.addEventListener('load', switchToggle);
import Footer from "./MyFooter";
import Header from "./MyHeader";
import {mapState} from "vuex";
import socket from "../services/ws";

export default {
  mounted() {
    // à modifier vu que le lobby ça peut être particulier
    this.$store.dispatch("verifToken");
  },
  name: "LobbyPage",
  props: {},

  components: {
    Header,
    Footer,
  },

  data: function () {
    return {
      tempsAction: "30",
      tourMax: 2,
      sommeDepart: 0,
      botDifficulty: 0,
      pions: [
        require("../assets/appercuPions/0_Bretzel.png"),
        require("../assets/appercuPions/1_Biere.png"),
        require("../assets/appercuPions/2_Bike.png"),
        require("../assets/appercuPions/3_Bugatti.png"),
        require("../assets/appercuPions/4_Cigogne.png"),
        require("../assets/appercuPions/5_Gargouille.png"),
        require("../assets/appercuPions/6_Hamster.png"),
        require("../assets/appercuPions/7_Mannele.png"),
      ],
    };
  },
  created: function () {
    socket.onopen = (e) => {
      console.log("open Lobby");
      console.log(e);
    };
    socket.onerror = (e) => {
      console.log("error Lobby");
      console.log(e);
    };

    socket.onclose = (e) => {
      console.log("close Lobby");
      console.log(e);
    };
    socket.onmessage = (e) => {
      let paquet = JSON.parse(e.data);
      console.log(
        "contenu du paquet recu quand on envoie un paquet Lobby : " +
          JSON.stringify(paquet)
      );

      if (paquet.name === "LeaveRoomSucceed") {
        this.$store.state.listePlayers = [];
        this.$router.push("/post_login");
      }

      if (paquet.name === "BroadcastUpdateRoom") {
        let index = this.$store.state.listePlayers
          .map((object) => object.id)
          .indexOf(paquet.player);
        const found = this.$store.state.listePlayers.some(
          (player) => player.id === paquet.player
        );
        switch (paquet.reason) {
          case 1:
            console.log("nouveau joueur dans une room avec l'index :" + index);
            if (!found) {
              this.$store.commit("joinRoom", {
                photo: this.pions[paquet.piece],
                pseudo: paquet.username,
                username: paquet.username,
              });
              console.log("la pièce du boug:"+this.$store.state.piece)
              console.log ("l'image du boug :"+ this.pions[this.$store.state.piece],)
              console.log(
                "on a bien ajouté " +
                  JSON.stringify(this.$store.state.listePlayers) +
                  " dans la room"
              );
            }
            break;
          case 2:
            console.log("un joueur en moins dans la room");
            this.deletePlayer(index);
            console.log("index du salon a modif" + index);
            break;
          case 3:
            console.log("une room est supprimée");
            break;
          case 4:
            console.log("une room est crée");
            break;
          case 5:
            console.log("nouveau host");
            break;
          case 6:
            console.log("la game est lancée");
            break;
          case 7:
            console.log("un bot est ajouté");
            break;
          case 8:
            console.log("un bot est supprimé");
            break;
          default:
            console.log("unknow");
        }
      }

      if (paquet.name === "StatusRoom") {
        let index = 0;
        let playersData = paquet.players_data;
        while (index < paquet.nb_players) {
          console.log(
            "l'username du joueur" + index + " : " + playersData[index].username
          );
          if (
            this.$store.state.listePlayers
              .map((object) => object.pseudo)
              .indexOf(playersData[index].username) === -1
          ) {
            this.$store.commit("joinRoom", {
              photo: this.pions[playersData[index].piece],
              pseudo: playersData[index].username,
              username: playersData[index].username,
            });
          }
        console.log(" la liste des pièces par joueur :"+this.pions[playersData[index].piece]);

          index++;
        }
        this.$store.state.gameToken = paquet.game_token;
        this.$store.state.auctions = paquet.option_auction;
        this.$store.state.doubleGO = paquet.option_double_on_start;
        this.$store.state.buyFirstRound = paquet.option_first_round_buy;
        this.$store.state.timePerRound = paquet.option_max_time;
        this.$store.state.maxRound = paquet.option_max_rounds;
        this.$store.state.starterMoney = paquet.starting_balance;
      }

      if (paquet.name === "AppletPrepare") {
        console.log("reception unity");
        socket.close();
        this.$router.push("/webGL");
      }
    };
  },
  methods: {
    changeAuctions: function () {
      let statusRoom = {
        name: "StatusRoom",
        game_token: this.$store.state.gameToken,
        option_auction: !this.$store.state.auctions,
        option_first_round_buy: this.$store.state.buyFirstRound,
        option_double_on_start: this.$store.state.doubleGO,
        option_max_time: this.$store.state.timePerRound,
        option_max_rounds: this.$store.state.maxRound,
        starting_balance: this.$store.state.starterMoney,
        max_nb_players: 8,
      };
      console.log(
        "on envoie ça si on change l'option auction : " +
          JSON.stringify(statusRoom)
      );
      socket.send(JSON.stringify(statusRoom));
      return !this.$store.state.auction;
    },
    changeDoubleGO: function () {
      let statusRoom = {
        name: "StatusRoom",
        game_token: this.$store.state.gameToken,
        option_auction: this.$store.state.auctions,
        option_double_on_start: !this.$store.state.doubleGO,
        option_first_round_buy: this.$store.state.buyFirstRound,
        option_max_time: this.$store.state.timePerRound,
        option_max_rounds: this.$store.state.maxRound,
        starting_balance: this.$store.state.starterMoney,
        max_nb_players: 8,
      };
      console.log(
        "on envoie ça si on change l'option double go : " +
          JSON.stringify(statusRoom)
      );
      socket.send(JSON.stringify(statusRoom));
      return !this.$store.state.doubleGO;
    },
    changeBuyFirstRound: function () {
      let statusRoom = {
        name: "StatusRoom",
        game_token: this.$store.state.gameToken,
        option_auction: this.$store.state.auctions,
        option_double_on_start: this.$store.state.doubleGO,
        option_first_round_buy: !this.$store.state.buyFirstRound,
        option_max_time: this.$store.state.timePerRound,
        option_max_rounds: this.$store.state.maxRound,
        starting_balance: this.$store.state.starterMoney,
        max_nb_players: 8,
      };
      socket.send(JSON.stringify(statusRoom));
      return !this.$store.state.buyFirstRound;
    },
    changeTimePerRound: function () {
      let statusRoom = {
        name: "StatusRoom",
        game_token: this.$store.state.gameToken,
        option_auction: this.$store.state.auctions,
        option_double_on_start: this.$store.state.doubleGO,
        option_first_round_buy: this.$store.state.buyFirstRound,
        option_max_time: this.$store.state.timePerRound,
        option_max_rounds: this.$store.state.maxRound,
        starting_balance: this.$store.state.starterMoney,
        max_nb_players: 8,
      };
      socket.send(JSON.stringify(statusRoom));
    },
    changeBuyMaxRound: function () {
      let statusRoom = {
        name: "StatusRoom",
        game_token: this.$store.state.gameToken,
        option_auction: this.$store.state.auctions,
        option_double_on_start: this.$store.state.doubleGO,
        option_first_round_buy: this.$store.state.buyFirstRound,
        option_max_time: this.$store.state.timePerRound,
        option_max_rounds: this.$store.state.maxRound,
        starting_balance: this.$store.state.starterMoney,
        max_nb_players: 8,
      };
      socket.send(JSON.stringify(statusRoom));
    },
    changeStarterMoney: function () {
      let statusRoom = {
        name: "StatusRoom",
        game_token: this.$store.state.gameToken,
        option_auction: this.$store.state.auctions,
        option_double_on_start: this.$store.state.doubleGO,
        option_first_round_buy: this.$store.state.buyFirstRound,
        option_max_time: this.$store.state.timePerRound,
        option_max_rounds: this.$store.state.maxRound,
        starting_balance: this.$store.state.starterMoney,
        max_nb_players: 8,
      };
      socket.send(JSON.stringify(statusRoom));
    },
    tempsCheck(str) {
      var entree = str.split(":"),
        sec = 0,
        min = 1,
        booleen = true;

      while (entree.length > 0) {
        sec += min * parseInt(entree.pop(), 10);
        min *= 60;
      }
      if (sec < 30 || sec > 120 || isNaN(sec)) {
        booleen = false;
      }
      return booleen;
    },

    deletePlayer: function (index) {
      this.$store.state.listePlayers.splice(index, 1);
    },

    leaveRoom: function () {
      let LeaveRoom = {
        name: "LeaveRoom",
        player_token: this.$store.state.id,
        game_token: this.$store.state.gameToken,
      };
      socket.send(JSON.stringify(LeaveRoom));
      console.log("ici on quitte la room" + JSON.stringify(LeaveRoom));
    },
    addBot: function () {
      let AddBot = {
        name: "AddBot",
        player_token: this.$store.state.id,
        game_token: this.$store.state.gameToken,
      };
      socket.send(JSON.stringify(AddBot));
      console.log("ici on ajoute un bot" + JSON.stringify(AddBot));
    },

    // METHODES BOT
    modifyBotLevel: function (ajout) {
      console.log(ajout + " " + this.botDifficulty);
      if (
        !(
          (this.botDifficulty == 0 && ajout < 0) ||
          (ajout > 0 && this.botDifficulty == 8)
        )
      ) {
        this.botDifficulty += ajout;
      }
      console.log("username" + this.$store.state.username);
    },

    ajoutBot: function () {
      const bot = {
        photo: require("../assets/botnoir.png"),
        pseudo: "BOT",
        username: "BOT",
      };
      if (this.$store.state.listePlayers.length < 8) {
        this.$store.commit("joinRoom", bot);
        this.addBot();
      }
    },

    deleteBot: function (index) {
      this.deletePlayer(index);
    },

    //METHODE RECUPERANT LA LISTE DES JOUEURS RECUE DANS LE PAQUET
    updateListPlayers(message) {
      console.log(message.listPlayers);
      this.players = message.listPlayers;
    },

    wantToQuit: function () {
      if (this.$store.state.isHost === true) {
        console.log("chancher de host de manière aléatoire");
        this.$store.state.isHost = false;
        this.leaveRoom(); // paquet DeleteRoom envoyé par host
      } else {
        this.leaveRoom();
      }
      // this.$router.push('/post_login')
    },
    startGame: function () {
      let playerId = {
        name: "LaunchGame",
        player_token: this.$store.state.id,
      };
      console.log("on envoie launchgame :" + JSON.stringify(playerId));
      socket.send(JSON.stringify(playerId));
    },
  },
  computed: {
    joueurs: function () {
      return this.$store.state.listePlayers;
    },
    ...mapState({
      nomJoueur: "usernameProfil",
      pseudo: "loginProfil",
      piece: "pawnProfil",
      photo: "photoProfil",
    }),
  },
};
</script>

<style>
.h1Lobby {
  margin-top: 30px;
  padding-bottom: 12px;
}

.bodyL {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: row;
  border-top: 4px solid #5f4339;
  /*border: 2px solid red;*/
  z-index: 1;
}

.part {
  display: flex;
  flex-direction: column;
  background-color: rgb(128, 104, 97);
  /*border: 2px solid red;*/
  width: 25%;
  color: white;
  text-align: center;
  justify-content: space-evenly;
}

.param {
  display: flex;
  flex-direction: column;
  background-color: rgb(244, 237, 237);
  /*border: 2px solid red;*/
  width: 60%;
  text-align: center;
}

.amis {
  display: flex;
  flex-direction: column;
  background-color: rgb(128, 104, 97);
  /*border: 2px solid red;*/
  width: 25%;
  color: white;
  text-align: center;
}

fieldset {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12vh;
  padding-top: 25px;
  padding-bottom: 12px;
  text-align: center;
  float: left;
  clear: none;
}

label {
  float: left;
  clear: none;
  display: block;
  padding: 0px 1em 0px 8px;
}
/*Encheres*/

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #5f4339;
}

input:focus + .slider {
  box-shadow: 0 0 1px #5f4339;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.prt {
  margin-left: 40%;
  width: 80px;
}

.prts:before {
  left: 19px;
}

/*ajout texte toggle*/

.prt .labels {
  position: absolute;
  top: 8px;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.4s ease-in-out;
}

.prt .labels::after {
  content: attr(data-off);
  position: absolute;
  right: 5px;
  color: #4d4d4d;
  opacity: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease-in-out;
}

.prt .labels::before {
  content: attr(data-on);
  position: absolute;
  left: 5px;
  color: #3a3838;
  opacity: 0;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
  transition: all 0.4s ease-in-out;
}

.prt input:checked ~ .labels::after {
  opacity: 0;
}

.prt input:checked ~ .labels::before {
  opacity: 1;
}

.t_attente:checked + .prts {
  background-color: #d3aa5d;
}

.t_attente:focus + .prts {
  box-shadow: 0 0 1px #5f4339;
}

.tour,
.toggle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12vh;
}

.sommeDepart {
  padding: 0 12vh;
}

.lobby_title {
  display: table-cell;
  padding: 0.375rem 1.75rem 0.375rem 0rem;
  vertical-align: middle !important;
}

.Lancer {
  font-weight: bold;
}

.bt_lancer {
  border-radius: 15px;
  width: 60%;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: #d3aa5d;
  color: #6e4d0b;
  margin-top: 10%;
}

.bt_lancer:hover {
  background-color: #b08d4d;
}

.bt_quitter {
  border-radius: 7px;
  height: 60px;
  width: 200px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-top: 5vh;
  background-color: #272626;
  font-size: x-large;
  color: #c6c6c6;
}
.bt_quitter:hover {
  background-color: #3a3838;
}

.taillepage {
  margin-top: 40vh;
}

/* Participants */

.infos {
  border-bottom: 2px solid #f4f2ec;
  padding: 2.5% 0% 2.5% 0%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.pp {
  max-height: 60px;
  max-width: 60px;
  padding: 0% 4% 4% 0%;
}

.pseudo {
  font-weight: bold;
  margin-right: 40%;
  margin-top: 15px;
}

.bt_inviter {
  width: 91px;
  height: 31px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #f4f2ec;
  font-weight: bold;
  margin-left: 40%;
  color: black;
}
.bt_inviter:hover {
  background-color: #e5e5e5;
}
input {
  color: #212529;
}

.txtzone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

/* Bot section */

.diff {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 6%;
  padding-bottom: 7%;
  border-bottom: 2px solid #f4f2ec;
  font-weight: bold;
}

.titrebot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.bot {
  max-height: 70px;
  max-width: 70px;
  font-weight: bold;
  color: #ffe100;
  padding: 2% 55% 0% 0%;
}

#txtdif {
  padding: 0%;
  margin: 0%;
}

.botbleu {
  padding-left: 6%;
  width: 80px;
  height: 60px;
}

.botnoir {
  width: 40px;
  padding-bottom: 7px;
}

.bt_ajout_bot {
  border-radius: 15px;
  height: 50px;
  width: 270px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: #d3aa5d;
  color: black;
  margin: 5% 0% 5% 0%;
}

.lancement {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bt_ajout_bot:hover {
  background-color: #b08d4d;
}

.btn_bot {
  color: #212529 !important;
}

.diff_bot {
  border-radius: 13px;
  width: 45px;
  height: 30px;
  border: none;
  outline: none;
}

.chevron {
  padding-bottom: 50px;
}

.champ,
.champF {
  background-color: #f4eded;
  border: #9f8e88;
  border-bottom: 2px solid #212529 !important;
  margin: 1% 0% 1% 0%;
  text-align: center;
}
.champF {
  border: #eb0707;
  border-bottom: 2px solid #eb0707 !important;
  background-color: #fc8080;
}
.cdt {
  color: #eb0707;
  font-weight: bold;
}
.amis input {
  max-width: 80%;
}

/* mode tablette */
@media screen and (max-width: 1040px) {
  .bt_inviter {
    margin-left: -3%;
  }
  .bodyL {
    flex-direction: column;
  }

  .part {
    display: block;
    width: 100%;
  }
  .amis {
    display: block;
    width: 100%;
  }

  .param {
    width: 100%;
    padding-bottom: 50px;
  }
  .champ {
    max-width: 170px;
  }
  .container_amis_part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .bt_ajout_bot {
    max-width: 200px;
  }
  .h1Lobby {
    font-size: 30px;
  }
}
/* mode telephone */
@media screen and (max-width: 550px) {
  .container_amis_part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .bt_ajout_bot {
    max-width: 200px;
    margin-left: 0px;
  }
  .botnoir {
    display: none;
    padding: 0px;
  }
  .h1Lobby {
    font-size: 25px;
  }
  .slider {
    min-width: 70px;
  }
  .toggle,
  .tour {
    margin-left: 0px;
    padding-left: 0px;
  }
  .lobby_title {
    width: 250px;
    margin-left: 20px;
    text-align: start;
    margin-right: 20px;
  }
  .slider {
    margin-left: 95%;
  }
}
/* mode pc */
@media screen and (min-width: 1040px) {
  .container_amis_part {
    display: contents;
  }
  .part {
    order: 1;
  }
  .param {
    order: 2;
    width: 60%;
  }
  .amis {
    order: 3;
  }
  .bt_inviter {
    margin-left: -1%;
  }
  .amis input {
    margin-left: 1.5em;
  }
  .haut {
    height: 10vh;
    padding-top: 30px;
    background-size: inherit;
  }

  .login {
    display: none;
  }

  .joueur {
    display: flex;
    gap: 10px;
    text-align: center;
  }
}
</style>
