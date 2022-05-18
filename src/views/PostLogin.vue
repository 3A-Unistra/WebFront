<template>
  <Header></Header>
  <section class="container">
    <section class="opt">
      <button class="creer_partie" @click="toPreLobby" type="boutton">
        {{ $t("creer") }}
        <i class="mdi mdi-sticker-plus-outline" ></i>
      </button>

      <button class="deco_button" @click="logout" type="boutton">
        {{ $t("deco") }}
          <i class="mdi mdi-logout-variant" ></i>
      </button>
    </section>

    <section class="info_salon">
      <div class="lien">
        <input class="champLien" type="text" :placeholder="$t('entrer_lien')" />
        <button class="rejoindre" type="boutton">
          {{ $t("rejoindre") }}
          <i class="mdi mdi-lock-open-plus-outline"></i>
        </button>
      </div>
      <div
        class="liste_salon"
        v-for="(salon, index) in salonsAffichables"
        :key="salon.name"
      >
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
import axios from "axios";
//axios.defaults.baseURL =process.env.VUE_APP_PATH_API
import Footer from "../components/MyFooter";
//import LogOutButton from "../components/LogOutButton";
import Header from "../components/MyHeader";
import Salon from "../components/SalonComponent.vue";

import socket from "../services/ws";

export default {
  mounted() {
    this.$store.commit("changePage", "postlogin");
    this.$store.dispatch("verifToken");
    this.dropdown_options();
  },
  created: function () {
    socket.onopen = (e) => {
      console.log("open");
      console.log(e);
    };
    socket.onerror = (e) => {
      console.log("error");
      console.log(e);
    };

    socket.onclose = (e) => {
      console.log("close");
      console.log(e);
    };
    socket.onmessage = (e) => {
      let paquet = JSON.parse(e.data);
      console.log(
        "contenu du paquet recu quand on envoie un paquet Postlogin : " +
          JSON.stringify(e.data)
      );
      if (paquet.name === "StatusRoom") {
        let index = 0;
        let playersData = paquet.players_data
        while (index < paquet.nb_players) {
            console.log("l'username du joueur" + index + " : "+ playersData[index].username)
          if (
            this.$store.state.listePlayers
              .map((object) => object.pseudo)
              .indexOf(playersData[index].username) === -1
          ) {
            this.$store.commit("joinRoom", {
              photo: playersData[index].avatar_url,
              pseudo: playersData[index].username,
              username: playersData[index].username,
            });
          }
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
      if (paquet.name === "BroadcastNewRoomToLobby") {
        if (
          this.$store.state.listeSalons
            .map((object) => object.id)
            .indexOf(paquet.game_token) !== -1
        ) {
          console.log("existe déja, ne pas afficher");
          return;
        }
        this.$store.commit("createSalon", {
          id: paquet.game_token,
          name: paquet.name,
          private: paquet.is_private,
          nbPlayers: paquet.nb_players,
          maxNbPlayers: 8,
        });
      }

      if (paquet.name === "EnterRoomSucceed") {
        this.$store.commit("gameToken", paquet.game_token);
        this.$store.state.piece = paquet.piece;
        this.$router.push("/lobby");
      }

      if (paquet.name === "BroadcastUpdateLobby") {
        let index = this.$store.state.listeSalons
          .map((object) => object.id)
          .indexOf(paquet.game_token);
        switch (paquet.reason) {
          case 1:
            console.log("nouveau joueur dans une room");
            if (index !== -1) {
              this.$store.state.listeSalons[index].nbPlayers++;
            }

            break;
          case 2:
            console.log("un joueur en moins dans la room");
            if (index !== -1) {
              this.$store.state.listeSalons[index].nbPlayers--;
              console.log("index du salon a modif" + index);
            }
            break;
          case 3:
            console.log("une room est supprimée");
            this.deleteSalon(index);
            console.log("index du salon a modif" + index);

            break;
          case 4:
            console.log("une room est crée");
            console.log("index du salon a modif") + index;

            break;
          case 5:
            console.log("nouveau host");

            break;
          case 6:
            console.log("la game est lancée");

            break;
          case 7:
            console.log("un bot est ajouté");
            if (index !== -1) {
              this.$store.state.listeSalons[index].nbPlayers++;
            }
            break;
          case 8:
            console.log("un bot est supprimée");

            if (index !== -1) {
              this.$store.state.listeSalons[index].nbPlayers--;
              console.log("index du salon a modif" + index);
            }
            break;
          default:
            console.log("unknow");
        }
      }
    };
  },
  data() {
    return {};
  },
  name: "PostLoginPage",
  components: {
    Header,
    Salon,
    Footer,
    //LogOutButton,
  },
  methods: {
    dropdown_options() {
      var click = document.getElementById("liste_option");

      if (click.style.display === "none") {
        click.style.display = "block";
      } else {
        click.style.display = "none";
      }
    },
    getUserProfile: function () {
      // vu que c'est son propre profil
      this.$store.commit("checkingSameProfile", true);

      // on stocke l'username cliqué dans le store et en localstorage
      this.$store.commit("changeUsrnameProfil", this.$store.state.username);
      localStorage.setItem("username-profil", this.$store.state.username);

      //puis on va sur le profil
      this.$router.push("/profile");
    },

    logout: function () {
      this.$store.commit("clearUserData");
      socket.close(); 
      this.$router.push("/");
    },
    affichetoken: function () {
      console.log(this.$store.state.username);
    },
    toPreLobby: function () {
      this.$store.dispatch("verifRequest", {
        idClient: this.$store.state.id,
        destPath: "prelobby",
      });
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
    postPost(idDuBoug) {
      axios
        .post("http://localhost:3000/api/users/getProfil", idDuBoug, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          console.log(error.message);
        });
    },
    postPostStore(idDuBoug) {
      this.$store.dispatch("postPost", idDuBoug);
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
    joinLobby: function (index) {
      let salonToJoin = this.$store.state.listeSalons[index].id;
      let EnterRoom = {
        name: "EnterRoom",
        player_token: this.$store.state.id,
        game_token: salonToJoin,
      };
      socket.send(JSON.stringify(EnterRoom));
    },
    joinLobbyWithToken: function (token) {
      let EnterRoom = {
        name: "EnterRoom",
        player_token: this.$store.state.id,
        game_token: token,
      };
      socket.send(JSON.stringify(EnterRoom));
    },


    deleteSalon: function (index) {
      this.$store.state.listeSalons.splice(index, 1);
    },
  },
  computed: {
    salonsAffichables: function () {
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
  justify-content: space-between;
  /* gap: 50px; */
  margin-top: 20px;
  padding-bottom: 20px;
  padding-right: 5px;
}

.mdi-logout-variant, .mdi-sticker-plus-outline {
  font-size: 50px;
}

.mdi-lock-open-plus-outline {
  font-size: 25px;
}

.info_salon {
  display: flex;
  flex-direction: column;
  width: auto;
  font-weight: bold;
  padding: 15px 20px 30px 20px;
  height: 550px;
  width: inherit;
  background-color: #c6c6c6;
  border-radius: 15px;
  font-size: 16px;
  gap: 20px;
}

.liste_salons {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  height: 100px;
}

.opt {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 29%;
  padding-right: 5%;
  height: inherit;
}

.deco_button {
  background-color: #942e14;
  align-items: center;
  height: 15vh;
  border-radius: 7px;
  font-size: 3vh;
  border: none;
  font-weight: 600;
  color: white;
  transition-duration: 200ms;
}

.deco_button:hover, .deco_button:active {
  background-color: #70220f;
  cursor: pointer;
}
.deco_button,
.creer_partie,
.rejoindre {
  outline: none;
  border: none;

}

.rejoindre {
  background-color: #fab532;
  border-radius: 7px;
  font-weight: bold;
  width: 15%;

}

.creer_partie {
  background-color: #8a5b4f;
  height: 15vh;
  border-radius: 7px;
  font-size: 3vh;
  font-weight: 600;
  color: white;
  transition-duration: 200ms;
}

.creer_partie:hover {
  transition-duration: 200ms;
  background-color: rgb(78, 47, 37);
}
.creer_partie:active {
  background-color: rgb(78, 47, 37);
}

.rejoindre:hover {
  background-color: #fda90b;
}

.rejoindre:active {
  background-color: #ff8f0f ;
}

.icone {
  width: 40px;
  height: 40px;
}

.lien {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
}

.champLien {
  height: 50px;
  font-weight: bold;
  border-radius: 10px;
  padding-left:10px;
  width: 60%;
}

@media screen and (max-width: 800px) {
  .container {
    flex-direction: column;
    vertical-align: center;
  }


.mdi-logout-variant, .mdi-sticker-plus-outline, .mdi-lock-open-plus-outline {
  font-size: 20px;
}

  .opt {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    height: 4vh;
    width: 100%;
  }

  .creer_partie,
  .deco_button {
    font-size: 1.5vh;
    width: 40%;
    height: inherit;
  }
  .info_salon {
    /*min-width: 90%;*/
    margin: 0px;
  }
  .champLien {
    margin-left: 10px;
    
  }
}

@media screen and (min-width: 800px) and (max-width: 1200px) {
  .container {
    flex-direction: column;
    vertical-align: center;
  }


.mdi-logout-variant , .mdi-sticker-plus-outline, .mdi-lock-open-plus-outline{
  font-size: 20px;
}

  .opt {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 30px;
    height: 3vh;
  }

  .creer_partie,
  .deco_button {
    width: 25%;
    height: inherit;
    font-size: 1.5vh;
  }

  .info_salon {
    margin: 0px;
  }

  .champLien {
    width: 50%;
    border-radius: 10px;
  }

  .salon {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    height: auto;
    padding-bottom: 10px;
  }
  .icone {
    display: none;
  }
  .nom_salon {
    display: block;
    margin-right: 15px;
  }
  .nbr_part {
    display: block;
    margin-right: 15px;
  }
  .rej_salon {
    display: block;
  }
  .rej_salon {
    margin-left: 10%;
  }
}

</style>
