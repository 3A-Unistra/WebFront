<template>
  <Header></Header>
  <div class="bodyL">
    <!---------------------PARTICIPANTS-------------------->
    <div class="part">
      <h1 class="h1Lobby">{{ $t("participants") }}</h1>

      <div class="infos" v-for="(player,index) in players" :key="player.pseudo">
        <div v-if="player.username != ''">
          <img class="pp" v-bind:src="player.photo" alt="photo de profil" />
          <div class="txtzone">
            <div class="pseudo" @click="checkFollow(player.pseudo)">
              {{ player.pseudo }}
            </div>
            <div v-if="player.username === 'BOT'">
            <button @click="deleteBot(index)">
              supprimer
            </button>
            </div>

            <!-- PARTIE TOGGLE -->
            <label
              class="switch prt"
              v-if="this.$store.state.username === player.username"
            >
              <input
                type="checkbox"
                class="t_attente"
                :disabled="this.$store.state.isFollowing == true"
              />
              <span
                class="slider round prts"
                :disabled="this.$store.state.isFollowing == true"
              ></span>
              <span
                class="labels"
                data-on="PRÊT!"
                data-off=""
                :disabled="this.$store.state.isFollowing == true"
              ></span>
            </label>
          </div>
        </div>
      </div>

      <div class="infosb">
        <div class="titrebot">
          <img class="botbleu" src="../assets/botbleu.png" alt="robot bleu" />
          <h1 class="bot">BOT</h1>
        </div>
        <div class="diff">
          <button type="button" @click="modifyBotLevel(-1)" class="diff_bot">
            <img
              class="chevron"
              @click="modifyBotLevel(-1)"
              src="../assets/chevrons_gauche.png"
            />
          </button>
          <div class="lobby_title" id="txtdif">
            {{ $t("difficulte_bot") }}:
            <input
              type="text"
              style="width: 40px"
              v-model="botDifficulty"
              readonly
            />
          </div>
          <button type="button" class="diff_bot">
            <img
              class="chevron"
              @click="modifyBotLevel(1)"
              src="../assets/chevrons_droite.png"
            />
          </button>
        </div>

        <button type="button" @click="ajoutBot" class="bt_ajout_bot">
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
            :disabled="this.$store.state.isHost == false"
            v-model="tempsAction"
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
            v-model="tempsAction"
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
            v-model="tourMax"
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
            v-model="sommeDepart"
          />
        </form>
      </div>
      <!--------------------BT LANCER PARTIE------------------->

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
    <!----------------------FOLLOWS--------------------->
    <div class="amis">
      <h1 class="h1Lobby">{{ $t("amis_co") }}</h1>
      <div class="infos" v-for="player in players" :key="player.pseudo">
        <img class="pp" v-bind:src="player.photo" alt="photo de profil" />
        <div class="txtzone">
          <div class="pseudo" @click="checkFollow(player.pseudo)">
            {{ player.pseudo }}
          </div>
          <button type="button" class="bt_inviter">{{ $t("inviter") }}</button>
        </div>
      </div>
      <h3 style="padding-top: 15%">Room ID:</h3>
      <input type="text" style="width: 100%" v-model="roomId" readonly />
    </div>
  </div>
  <Footer></Footer>
</template>

<script>

//window.addEventListener('load', switchToggle);
import Footer from './MyFooter'
import Header from './MyHeader'

export default {
    name: 'LobbyPage',
    props: {
    },

    components: {
    Header,
    Footer
  },


  data: function() {
    return {
      lobbySocket: WebSocket,

      players: [
        {
            photo : '',
            pseudo : '',
            username: '',
        },
      ],

      tempsAction: '30',
      tourMax : 2,
      sommeDepart : 0 ,
      botDifficulty: 0  ,
      roomId: 3345
    }
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
        let StatusRoom = JSON.parse(e.data);
        if (StatusRoom.player_token) {
        this.playerJoined('','test',StatusRoom.player_token)
        }
      }
    };
  },
  methods: {
    tempsCheck(str){
      var entree = str.split(':'),
          sec = 0, min = 1,
          booleen = true;

      while(entree.length > 0){
        sec += min * parseInt(entree.pop(), 10);
        min *= 60;
      }
      if ( (sec < 30) || (sec > 120) || isNaN(sec)) {
        booleen = false;
      }
      return booleen;
    },
    checkPlayer: function(){
    },
    leaveRoom: function () {
      let LeaveRoom = {
        player_token: this.$store.state.id,
        game_token: 'this.$store.state.publicLobby',
      };
      this.lobbySocket.send(JSON.stringify(LeaveRoom));
      console.log("ici on quitte la room"+JSON.stringify(LeaveRoom))
    },
    addBot: function() {
     let AddBot = {
        player_token: this.$store.state.id,
        game_token: 'game_token',
      };
      this.lobbySocket.send(JSON.stringify(AddBot));
      console.log("ici on ajoute un bot"+JSON.stringify(AddBot))
    },

    // METHODES BOT
    modifyBotLevel: function(ajout)
    {
      console.log(ajout +" "+ this.botDifficulty)
      if(!((this.botDifficulty == 0 && ajout < 0) || (ajout > 0 && this.botDifficulty == 8)))
      {
        this.botDifficulty += ajout
        console.log(this.botDifficulty)
      }
    console.log("username"+this.$store.state.username)
    },

    ajoutBot: function() {
    const bot = {
        photo :require("../assets/botnoir.png"),
        pseudo : 'BOT',
        username: 'BOT',
    }
    if (this.players.length<8) {
    this.players.push(bot)
    this.addBot()
    }
    },

    playerJoined: function(photo, pseudo, username){
    const player = {
        photo: photo,
        pseudo:pseudo,
        username:username,
    }
 if (this.players.length<8) {
    this.players.push(player)
 }
    },

    deleteBot: function(index){
        this.players.splice(index,1)
    },

    //METHODE RECUPERANT LA LISTE DES JOUEURS RECUE DANS LE PAQUET
    updateListPlayers(message)
    {
      console.log(message.listPlayers)
      this.players = message.listPlayers
    },


    wantToQuit: function() {
      if(this.$store.state.isHost == true)
      {
        console.log("chancher de host de manière aléatoire")
        this.leaveRoom() // paquet DeleteRoom envoyé par host
      } else {
        this.leaveRoom()
      }
     // this.$router.push('/post_login')
    },
    startGame: function()
    {
      console.log(this.$store.state.id) // paquet LaunchGame
    }
  }
}
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
  height: 12%;
  width: 70%;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: #d3aa5d;
  color: #6e4d0b;
  margin-top: 10%;
  margin-left: 15%;
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
  margin-left: 36%;
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

.infosb {
  border-bottom: 2px solid #f4f2ec;
  padding: 2.5% 0% 2.5% 0%;
  display: flex;
  flex-direction: column;
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
}
.bt_inviter:hover {
  background-color: #e5e5e5;
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
  margin: 10% 0% 10% 5%;
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
</style>
