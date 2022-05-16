<template>
  <Header></Header>
  <div v-for="salon in listeSalons" :key="salon.name">
    <div v-if="salon.public == true && salon.nbPlayers != salon.maxNbPlayers">{{ salon.name }}</div>
  </div>
  <button type="button" @click="setPrive(true)">salon privé</button>
  <button type="button" @click="setPrive(false)">salon public</button>

  <div class="bottom">
         <div> 
            <img id="le_chien" src="../assets/mascot_Footer.png" alt="pion chien">
        </div>
        <div id="liens">
            
            <ul class="list_footer n1">
                <li class="menu_title"> Menu </li>
                <hr>
                <li class="menu_info"><router-link class="menu_ff" to="/profile">{{ $t("profil") }}</router-link></li>
                <li class="menu_info"><router-link class="menu_ff" to="/post_login">{{ $t("postlogin") }}</router-link></li>
               
            </ul>

            <ul class="list_footer n2">
                <li class="menu_title"> {{ $t("reseaux") }} </li>
                <hr>
                <div class="container_logo">
                    <li class="menu_logo">
                        <a href="https://www.instagram.com/terms/unblock/?next=/strassopoly/">
                            <img id="insta_size" src="../assets/instagram.png" alt="instagram">
                        </a>
                    </li>
                    <li class="menu_logo">
                        <a href="https://www.facebook.com/profile.php?id=100080875824582">
                            <img class="social fb" src="../assets/facebook.png" alt="facebook">
                        </a>
                    </li>
                    <li class="menu_logo">
                        <a href="https://twitter.com/PolyStras">
                            <img class="social twitter" src="../assets/twitter.png" alt="twitter">
                        </a>
                    </li>
                </div>
            </ul>
            <ul class="list_footer n3">
                <li class="menu_title"> {{ $t("liens") }} </li>
                <hr>
                <li class="menu_info">{{ $t("cond_gene") }}</li>
                <li class="menu_info">{{ $t("faq") }}</li>
                <li class="menu_info">{{ $t("license") }}</li>
                <li class="menu_info">{{ $t("aide") }}</li>
            </ul>
        </div>
        
        <div class="store_bg">
            <p class="store_parag">
                {{ $t("propagande1") }} 
                <br>
                {{ $t("propagande2") }}
            </p>
            <div class="store_redirection">   
                <img class="logo_store" src="../assets/logo_appstore.png" alt="logo app store">
                <img class="logo_store" src="../assets/logo_playstore.png" alt="logo app store">
            </div>
        </div>

        <div class="text-center text-lg-start container_copyright">
            <!-- Copyright -->
            <div class="text-center p-3 copy">
                © 2022 Copyright:
                <a class="strasspoly_copy" >STRASSOPOLY GAME</a>
            </div>
            <!-- Copyright -->
        </div>
    
</div>
</template>

<script>
import Header from "../components/MyHeader";
import socket from "../services/ws";


export default {
  mounted () {
      if (!(this.$store.state.loggedin)) {
        this.$router.push('/login');
        this.$store.commit('clearUserData');
      }
  },
  name: "LoginPage",
  components: {
    Header,
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
