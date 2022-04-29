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
import LogOutButton from "../components/LogOutButton";
import Footer from "../components/MyFooter";
import Header from "../components/MyHeader";
import Salon from "../components/SalonComponent.vue";
import socket from "../services/ws";

export default {
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
              console.log("index du salon a modif"+ index);
            }
            break;
          case 3:
            console.log("une room est supprimée");
            this.deleteSalon(index);
            console.log("index du salon a modif" + index);

            break;
          case 4:
            console.log("une room est crée");
            console.log("index du salon a modif")+ index;

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
              console.log("index du salon a modif"+ index);
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
    Footer,
    Salon,
    LogOutButton,
  },
  methods: {
    logout: function () {
      socket.close();
      this.$store.commit("clearUserData"), this.$router.push("/");
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
    #app{
         background-color: #edebe9;
    }

    .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* gap: 50px; */
    margin-top:20px;
    padding-bottom: 20px;
    }

    .info_salon {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    /* gap: 30px; */
    padding: 30px 0px 30px 0px;
    }

    .info_salon {
    padding: 15px 20px 30px 20px;
    /* width: 80%; */
    height: 550px;
    display: flex;
    background-color:#c6c6c6 ;
    border-radius: 15px;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    gap: 20px;
    }

    .deconnection, .creer_partie, .rejoindre {
    border-radius: 7px;
    width: 200px;
    font-weight: bold;
    border: none;
    outline: none;
    }

    .deconnection{
        color: #eceae7;
        background-color: black;
        margin-bottom: 30px;
    }

    .creer_partie{
        color: black;
        background-color: #c4c4c4;
    }

    .rejoindre{
        background-color: #fab532;
    }

    .creer_partie:hover {
    background-color: #999999;
    }

    .creer_partie:active {
    background-color: #c4c4c4 !important;
    }

    .deconnection:hover {
    background-color: rgb(48, 47, 47) ;
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

    .icone{
        width: 40px;
        height: 40px;
    }

    .opt{
        width: 20%;
        height: 40%;
    }

    .lien{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .champLien{
        width: 600px;
        height: 50px;
        font-weight: bold;
        padding-left: 20px;
        border-radius:10px;
        margin-right:20px;
    }

    .opt{
        display: flex;
        flex-direction: column;
    }

    @media screen and (min-width: 850px) and (max-width: 1200px) {
        .container{
            flex-direction: column;
            justify-content:center;
        }
        .opt{
            margin-bottom: 30px;
            margin-left:30%;
        }
        .info_salon{
            min-width:90%;
            margin: 0px;
        }
        .champLien{
            border-radius:10px;
            margin-left: 10px;
        }

    }
     @media screen and (min-width: 300px) and (max-width: 850px) {
         .container{
            flex-direction: column;
            justify-content:center;
        }
        .opt{
            margin-bottom: 30px;
            margin-left:30%;
        }
        .info_salon{
            min-width:90%;
            margin: 0px;
        }
        .champLien{
            border-radius:10px;
            padding-left:15px;
            /* margin-left: 10px; */
        }
         .salon{
             display:flex;
             flex-direction:row;
             flex-wrap: wrap;
             justify-content: space-around;
             max-width: 500px;
             height:auto;
             padding-bottom: 10px;
             /* padding-top: 10px; */
         }
         .icone{
             display: none;
         }
         .nom_salon{
             display: block;
             margin-right: 15px;
         }
         .nbr_part{
             display: block;
            margin-right: 15px;

         }
         .rej_salon{
             display: block;
         }
         .rej_salon{
             margin-left: 10%;
         }
     }


</style>
