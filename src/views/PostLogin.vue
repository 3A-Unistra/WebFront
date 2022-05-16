<template>
  <div class="haut">
    
    <div class="top_bar">
      
      <div class="Menu_principale dropdown">

          <button class="btn bg-white dropdown-toggle" type="button" data-toggle="dropdown" v-if="this.$store.state.username">
             <img class="gift" src="../assets/menu.png"/> 
            <!-- MENU -->
          </button>
            <ul class="dropdown-menu">

                <li class="drop_elem" v-if="this.$store.state.username"> <router-link to="/profile" @click="getUserProfile">{{ $t("profil") }}</router-link></li>
                
                
            </ul>
          </div>

           <button v-if="!this.$store.state.username"  @click="this.$router.push('/SignUp')" class="login">
              {{ $t("signup") }}
           </button>

             <button v-if="!this.$store.state.username"  @click="this.$router.push('/Login')" class="login">
              {{ $t("login") }}
             </button>

           <div class="options">
          <button @click="dropdown_options"></button>
          <ul id="liste_option">            
            <span class="titre_dropdown">
              {{ $t("langue") }}:
            </span>
            <li class="list_elem">
              <div class="locale-switcher">
                <select v-model="$i18n.locale">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
                
              </div> 
            </li>
            <LogOutButton style="margin-bottom: 0;"></LogOutButton>
          </ul>
        </div>
        </div>

        
      <!-- <img class="logo_coin" src="../assets/logo_couleur.png" alt="logo"> -->
       
    </div>

  <section class="container">
    <section class="opt">
      <LogOutButton></LogOutButton>
      <button class="creer_partie" @click="toPreLobby" type="boutton">{{ $t("creer") }}
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

  <div class="bottom">
         <div> 
            <img id="le_chien" src="../assets/mascot_Footer.png" alt="pion chien">
        </div>
        <div id="liens">
            
            <ul class="list_footer n1">
                <li class="menu_title"> Menu </li>
                <hr>
                <li class="menu_info" v-if="this.$store.state.username" ><router-link class="menu_ff" to="/profile" @click="getUserProfile">{{ $t("profil") }}</router-link></li>
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

<!-- Script JS -->
<script>
import axios from 'axios';
//axios.defaults.baseURL =process.env.VUE_APP_PATH_API

import LogOutButton from '../components/LogOutButton'
//import Header from '../components/MyHeader'
import Salon  from '../components/SalonComponent.vue'

import socket from "../services/ws";

export default {
  mounted () {
    this.$store.dispatch('verifToken');
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
    //Header,
    Salon,
    LogOutButton,
  },
    methods: {
           dropdown_options() {
          var click = document.getElementById("liste_option");  

          if(click.style.display ==="none") {  
            click.style.display ="block";  
          } 
          else {  
            click.style.display ="none"; 
          }
        },
        getUserProfile: function(){

          // vu que c'est son propre profil
          this.$store.commit('checkingSameProfile',true);

          // on stocke l'username cliqué dans le store et en localstorage
          this.$store.commit('changeUsrnameProfil',this.$store.state.username);
          localStorage.setItem('username-profil',this.$store.state.username);
            
  
          //puis on va sur le profil
          this.$router.push('/profile');
        },
    
        logout: function() {
            this.$store.commit('clearUserData'),
            this.$router.push('/')
        },
        affichetoken: function() {
            console.log(this.$store.state.username)
        },
        toPreLobby: function() {
          this.$store.dispatch('verifRequest',{
            idClient: this.$store.state.id,
            destPath: 'prelobby'
            })
        },

        receptionSalon: function(newSalon) {
            let foundSalon = 0 ;
            this.listeSalons.find(salon => {
                if(salon.id == newSalon.id)
                {
                    foundSalon = 1;
                    this.replace(newSalon)
                }
            }) 
            if(foundSalon == 0) {
                this.addInstance(newSalon)
            } 
        },
        postPost(idDuBoug) {
            axios.post('http://localhost:3000/api/users/getProfil',idDuBoug, {
                
            headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error.response);
                console.log(error.message);

            }); 
        },
        postPostStore(idDuBoug) {
            this.$store.dispatch('postPost',idDuBoug);
       },

        replace: function(oldLobbyNewVersion) {

            //on cherche l'id dans la liste des salons déjà présents
            this.listeSalons.find(salon => {
                if (salon.id === oldLobbyNewVersion.id) {

                    salon.name = oldLobbyNewVersion.name ;
                    salon.nbPlayers = oldLobbyNewVersion.nbPlayers ;
                    salon.maxNbPlayers = oldLobbyNewVersion.maxNbPlayers ;
                    salon.private = oldLobbyNewVersion.private ;

                }
            })
        },

        addInstance: function(newLobby) {
            this.listeSalons.push(newLobby);
            console.log("etape 2")
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

    deleteSalon: function (index) {
      this.$store.state.listeSalons.splice(index, 1);
    },
  },
  computed: {
    salonsAffichables: function () {
      return this.$store.state.listeSalons.filter(
        (salon) => !salon.private && salon.nbPlayers < salon.maxNbPlayers
      );
    }
  },

   
}
</script>

<!-- Style Css -->
<style>



.haut {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 85vh;
  padding: 0% 0%;
  /* max-width: 100%; */
  background-image: url(../assets/stras.jpg);
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 2vh;
  z-index: 3;
  }
.login{
  margin-right: auto;
  margin-left: auto;
}
.dropdown-menu{
  padding:20px;
  min-width:200px;
  /* display: flex; */
  flex-direction: column;
  justify-content:space-around; 
}
.drop_elem{
  font-weight: bold;
  margin-bottom: 15px;
}
.top_bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  max-height: 11%;
  padding: 1% 3%;
  margin-left: 5%;
  margin-right: 5%;
}
.gift{
  max-width:30px;
  max-height: 30px;
}
.menu_mr{
  /* margin-left:25px; */
  margin-right:20px;
}
.name_menu{
  font-size:20px;
}

.logo_coin {
  height: 80px;
  max-width: inherit;
  padding-right: 12%;
  padding-top: 1%;
}

.top_right a {
  color: black;
  font-size: 18px;
}
.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 600;
  color: red;
  background-color: white;
  border-radius: 8px;
}

.top_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 17%;
}

.logo{
  max-height: 100%;
  max-width: 100%;
  padding: 2% 5%;
}

a:hover {
  opacity: 0.5;
}

 /*  DROPDOWN BELOW */
.options {
  display: block;
  width: 50px;
  height: 50px;
}
.dropdown-toggle{
  /* font-size: 18px; */
  padding:5px;
}


.options button {
  /* width: inherit;
  height: inherit; */
  background-image: url(../assets/settings.png);
  background-size: cover;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width:25px;
  height:25px;
  margin-left: 20px;
  margin-top: 10px;
}

#liste_option {
  display: none;
  list-style-type: none;
  z-index: 1;
  background-color: white;
  color: #cd823f;
  top: 7%;
  right: 1%;
  width: 20vh;
  border-radius: 25px;
  padding: 1% 0 2% 0;
  position: absolute;
}

#close_button {
  padding: 1% 0 2% 3% ;
  font-size: 5vh;
  cursor: pointer;
}

.list_elem:nth-child(2) {
  padding-bottom: 10%;
  padding-top: 4%;
  padding-left: 25% ;
}

.list_elem {
  padding-top: 0;
  padding-bottom: 4%;
  padding-left: 10%;
  font-size: 2vh;
}

.titre_dropdown:first-child {
  padding-top: 4%;
}

.titre_dropdown {
  font-size: 2.5vh;
  font-weight: 600;
  padding-left: 18%;
  height: 30%;
}

.bottom_bar {
  display: flex;
  justify-content: center;
  padding-top: 5% ;
}

#to_light_mode, #to_dark_mode {
  padding-top: 4% ;
  cursor: pointer;
}

#to_dark_mode:hover {
  color: white;
  background-color: #3a210c;
}

#to_light_mode:hover {
  color: #cd823f;
  background-color: rgba(255, 255, 255, 0.219);
}

/* fin dropdown */

/* TOGGLE SWITCH */

.change_mode {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 3%;
}

.symbol_mode {
  width: 31px;
  height: 31px;
}

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
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: black;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
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
button.deconnection{
  max-width:120px;
  height:100%;
  font-size:12px;
}
.deconnection .icone{
  max-width: 25%;
  max-height: 25%;
}

.drop_elem:hover {
  background-color:#f5d18b;
  
}
.drop_elem a{
  font-size:22px;
  font-weight: bold;
  padding:15px 20px 15px 20px;
}


/* Mode mobile */
@media screen and (max-width: 480px) {

  .haut {
    height: 40vh;
    font-size: 15px;
  }
  .login{
    /* margin-top:90px;
    margin-left:190px;
    padding:3px 10px 3px 10px;
    width:auto; */
    margin-left: 10px;
  }
  .top_bar{
    /* margin-left: -50px; */
    flex-direction:row;
    /* box-sizing:unset; */
    flex-wrap: wrap;
    justify-content:space-evenly;
  }
  .logo_coin{
    display:none;
  }
  .options{
   /* width: inherit;
  height: inherit;
   */
   margin-left: -25%;
   margin-right:0px;

  }
  .button.deconnection{
    margin-left: 40%;
  }
 

}

/* mode tablette */
@media screen and (min-width: 480px) and (max-width: 1000px) {
 
 .top_bar{
   flex-wrap: wrap;
   flex-direction:column;
   justify-content:center;
   box-sizing:unset;
 }
 .haut {
    height: 40vh;
    font-size: 15px;
  }
  .sp_menu{
    display: none;
  }

  .top_right{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    box-sizing:unset;
    margin-top:100px;
    margin-right:-90px;
  }
  .logo_coin{
    display:none;
  }
  /* .options button{
   width: inherit;
  height: inherit;
  } */
  
}

/*  */

/* Style the navigation menu */
.topnav {
  overflow: hidden;
  background-color: #333;
  position: relative;
}

/* Hide the links inside the navigation menu (except for logo/home) */
.topnav #myLinks {
  display: none;
}

/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

/* Style the hamburger menu */
.topnav a.icon {
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04AA6D;
  color: white;
}
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
    .store_bg{
    background-image: url("../assets/bgmarron.png");
    margin-top:-200px;
}

.bg-light {
    width: 100%;
}
.store_parag{
    text-align: center;
    font-size: 25px;
    color:white;
    max-width: 700px;
    padding-top:160px;
    margin-left:auto;
    margin-right: auto;
}

.bottom {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    padding: 3% 0% 0% 0%;
    justify-content: center;
    z-index:2;
    margin-top: 150px;
}

#liens {
    display: flex;
    flex-direction: row;
    margin-left:auto;
    margin-right: auto;
    height: 40%;
    width: 70%;
    margin-bottom: 6vh;
    background-image: url("../assets/BG_Footer.png");
    margin-top: -50px;
    justify-content:space-between;
    z-index:1;
    position:relative;
    padding-bottom:20px;
   
}


#le_chien {
    margin-left:75%;
    max-width:200px;
    position:inherit;
    z-index:3;
    position:relative;
    margin-top:-200px;
    
}

hr {
    width: 40px;
    color: #cd823f ; 
    margin: 0;
    border: solid;
}

.list_footer {
    list-style-type: none;
    padding: 2% 8%;
    max-width: 100%;
}

.menu_title:first-child {
    padding-top: 30px;
}

.social{
    max-height: 40px;
    max-width: 40px;
    margin-left: 3%;
}

#insta_size {
    max-height: 50px;
    max-width: 50px;
}

.store_redirection {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.logo_store {
    display: inline-block;
    max-width: 200px;
    max-height: 150px;
}   
.container_copyright{
    background:black;
}
.strasspoly_copy{
    color:white;
}
.copy{
    color:white;
}
.menu_info{
    padding-top: 30px;
    color: white; 
    font-size:18px;
}

.menu_ff{
    text-decoration: none;
    color: white;
}
.menu_ff:hover{
    color: #cd823f;
}

.menu_logo {
    padding-top: 30px;
}
.menu_title{
    padding-top: 30px;
    color: white; 
    font-size:30px;
}


@media screen and (max-width: 700px) {
    
    #liens{
       display:flex;
       flex-direction:column;
       flex-wrap: wrap;
       justify-content:flex-start;
       background-image: url("../assets/BG_Footer.png");
       background-size: cover;
       width: 100%;  
       padding-bottom:20px;
    }
  

    .list_footer:last-child {
        margin-right: 2%;
        padding-right: 0;
        padding-left: 0%;
    }

    .list_footer:first-child {
        margin-left: 1%;
        padding-left: 2%;
        padding-right: 0;
    }
   

    #le_chien {
        display: none;
    }
    .store_parag{

        padding-top:40px;
        
    }
    .store_bg{
        
        margin-top:-55px;
        
    }
    .menu_info{
        font-size:15px;
    }
    .n2{
        margin-left: -20px;
    
    }
   
    .fb{
        margin-left: 3px;
    }
    .twitter{
        margin-left: 0px;
    }
    .n3{
        margin-left: 20px;
    }
    .store_redirection{
        max-width: 500px;
    }
    .container_logo{
        display:flex;
        flex-direction: row;
        justify-content:space-around;
    }
    .menu_logo{
        display:block;
        margin-bottom: -30px;
    }
}
 .store_bg{
    background-image: url("../assets/bgmarron.png");
    margin-top:-200px;
}

.bg-light {
    width: 100%;
}
.store_parag{
    text-align: center;
    font-size: 25px;
    color:white;
    max-width: 700px;
    padding-top:160px;
    margin-left:auto;
    margin-right: auto;
}

.bottom {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    padding: 3% 0% 0% 0%;
    justify-content: center;
    z-index:2;
    margin-top: 150px;
}

#liens {
    display: flex;
    flex-direction: row;
    margin-left:auto;
    margin-right: auto;
    height: 40%;
    width: 70%;
    margin-bottom: 6vh;
    background-image: url("../assets/BG_Footer.png");
    margin-top: -50px;
    justify-content:space-between;
    z-index:1;
    position:relative;
    padding-bottom:20px;
   
}


#le_chien {
    margin-left:75%;
    max-width:200px;
    position:inherit;
    z-index:3;
    position:relative;
    margin-top:-200px;
    
}

hr {
    width: 40px;
    color: #cd823f ; 
    margin: 0;
    border: solid;
}

.list_footer {
    list-style-type: none;
    padding: 2% 8%;
    max-width: 100%;
}

.menu_title:first-child {
    padding-top: 30px;
}

.social{
    max-height: 40px;
    max-width: 40px;
    margin-left: 3%;
}

#insta_size {
    max-height: 50px;
    max-width: 50px;
}

.store_redirection {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.logo_store {
    display: inline-block;
    max-width: 200px;
    max-height: 150px;
}   
.container_copyright{
    background:black;
}
.strasspoly_copy{
    color:white;
}
.copy{
    color:white;
}
.menu_info{
    padding-top: 30px;
    color: white; 
    font-size:18px;
}

.menu_ff{
    text-decoration: none;
    color: white;
}
.menu_ff:hover{
    color: #cd823f;
}

.menu_logo {
    padding-top: 30px;
}
.menu_title{
    padding-top: 30px;
    color: white; 
    font-size:30px;
}


@media screen and (max-width: 700px) {
    
    #liens{
       display:flex;
       flex-direction:column;
       flex-wrap: wrap;
       justify-content:flex-start;
       background-image: url("../assets/BG_Footer.png");
       background-size: cover;
       width: 100%;  
       padding-bottom:20px;
    }
  

    .list_footer:last-child {
        margin-right: 2%;
        padding-right: 0;
        padding-left: 0%;
    }

    .list_footer:first-child {
        margin-left: 1%;
        padding-left: 2%;
        padding-right: 0;
    }
   

    #le_chien {
        display: none;
    }
    .store_parag{

        padding-top:40px;
        
    }
    .store_bg{
        
        margin-top:-55px;
        
    }
    .menu_info{
        font-size:15px;
    }
    .n2{
        margin-left: -20px;
    
    }
   
    .fb{
        margin-left: 3px;
    }
    .twitter{
        margin-left: 0px;
    }
    .n3{
        margin-left: 20px;
    }
    .store_redirection{
        max-width: 500px;
    }
    .container_logo{
        display:flex;
        flex-direction: row;
        justify-content:space-around;
    }
    .menu_logo{
        display:block;
        margin-bottom: -30px;
    }
}

@media screen  and (min-width: 700px) and (max-width: 1010px) {
    .list_footer {
        padding: 1% 5%;
    }
    #le_chien {
        display:none;
    }
    .list_footer:last-child {
        padding-right: 5%;
    }
    #liens {
        justify-content: space-around;
        max-width: 100%;
        height: 50%;
        width:90%;
    }
    .bottom {
        width: 100%;
    }
    
}

@media screen  and (min-width: 700px) and (max-width: 1010px) {
    .list_footer {
        padding: 1% 5%;
    }
    #le_chien {
        display:none;
    }
    .list_footer:last-child {
        padding-right: 5%;
    }
    #liens {
        justify-content: space-around;
        max-width: 100%;
        height: 50%;
        width:90%;
    }
    .bottom {
        width: 100%;
    }
    
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
