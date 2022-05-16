<template>
  <Header></Header>
  <div class="choice_lobby">

    <h1 id="type_lobby"> {{ $t("type_lobby") }}</h1>
    <h3  id="ask_name_lobby"> {{ $t("enter_name_lobby") }}</h3>

    <input  v-model="nameLobby" v-bind:style="{ border: borderStyle }" required type="text" class="champs_nom_lobby" aria-describedby="pseudo" :placeholder="$t('forbidden_char')">

    <div class="diff_options">
      <div class="button_lobby" @click="setPrive(true)"><p>{{ $t("prive") }}</p></div>
      <div class="button_lobby" @click="setPrive(false)"><p>{{ $t("public") }}</p></div>
    </div>

  </div>
  

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
      nameLobby:'',
      borderStyle:'2px solid black',
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
      if(!(/^[A-Za-z0-9 - _]*$/.test(this.nameLobby)) || (this.nameLobby ===""))
      {
        this.borderStyle = "2px solid red";
        this.nameLobby= '';
      }
      else {
        this.borderStyle="2px solid black";

        this.createGame();
        
      }
    },
  },
};
</script>
<style scoped>

.choice_lobby {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#ask_name_lobby{
  color:  rgb(128, 104, 97);
  font-size:2vh ;
}
.champs_nom_lobby {
  padding: 8px;
  min-width:400px;
  border:1px solid #835B0E;
  background:white;
  margin-bottom:10% ;
}
#type_lobby {
  color:  rgb(128, 104, 97);
  font-size: 4vh;
  font-weight: 700;
  padding: 1% 0 3% 0;
}
.diff_options {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 40vh;
}

.button_lobby {
  display: flex;
  justify-content: center;
  border: 4px solid  rgb(128, 104, 97);
  background-color: white;
  border-radius: 3%;
  width: 40%;
  align-items: center;
  font-size:3vh;
  font-weight: 500;
  color:  rgb(128, 104, 97) ;
}

.button_lobby:hover {
  transition-duration: 200ms;
  background-color:  rgb(128, 104, 97) ;
  border: 4px solid  white;
  color: white;
  cursor: pointer;

}

  @media screen and (max-width: 550px)  {

    .diff_options{
      height: 12vh;
    }

  .champs_nom_lobby {
    min-width:300px;
    }

  .button_lobby:active {
    transition-duration: 200ms;
    background-color:  rgb(128, 104, 97) ;
    border: 4px solid  white;
    color: white;
    cursor: pointer;
    }
  }

  @media screen and (max-width: 820px)  {

    .diff_options{
      height: 22vh;
    }

  .button_lobby:active {
    transition-duration: 200ms;
    background-color:  rgb(128, 104, 97) ;
    border: 4px solid  white;
    color: white;
    cursor: pointer;
    }
  }
</style>
