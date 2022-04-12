<template>
  <Header></Header>
    <div class="bodyL">
                      <!---------------------PARTICIPANTS-------------------->
        <div class="part">
          <h1 class="h1Lobby">{{ $t("participants") }}</h1>

          <div class="infos" v-for="gen in gens" :key="gen.pseudo" >
            <img class="pp" v-bind:src="gen.photo" alt="photo de profil">
            <div class="txtzone">
              <div class="pseudo" @click="checkFollow(gen.pseudo)">{{gen.pseudo}}</div>
              <label class="switch prt">
                <input type="checkbox" class="t_attente">
                <span class="slider round prts"></span>
                <span class="labels" data-on="PRÊT!" data-off=""></span>
              </label>          
            </div>
          </div>

          <div class="infosb">
            <div class="titrebot">
              <img class="botbleu" src="../assets/botbleu.png" alt="robot bleu">
              <h1 class="bot">BOT</h1>
            </div>
            <div class="diff">
              <button type="button" class="diff_bot"><img class="chevron" src="../assets/chevrons_gauche.png"></button>
              <div class="lobby_title" id="txtdif">{{ $t("difficulte_bot") }}</div>
              <button type="button" class="diff_bot"><img class="chevron" src="../assets/chevrons_droite.png"></button>
            </div>
            
          <button type="button" class="bt_ajout_bot">{{ $t("ajout_bot") }} <img class="botnoir" src="../assets/botnoir.png"></button>
          </div>
          
          
        </div>
                      <!----------------------PARAMETRES--------------------->
        <div class="param">
          <h1 class="h1Lobby">{{ $t("param_salon") }}</h1>
          <fieldset>
            <div class="lobby_title">{{ $t("visibilite") }} </div>
            <div class="vchoix">
              <input type="radio" class="radio" name="x" value="y" id="y" />
              <label for="y">{{ $t("public") }}</label>
            </div>
            
            <div>
              <input type="radio" class="radio" name="x" value="z" id="z" />
              <label for="z">{{ $t("prive") }}</label>
            </div>
                        
          </fieldset>
          <!----------------------ENCHERE--------------------->
          
            <div class="toggle"> 
              <div class="lobby_title">{{ $t("encheres") }} : </div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>

          <!----------------------DOUBLER ARGENT--------------------->
          
            <div class="toggle"> 
              <div class="lobby_title">{{ $t("double_sur_depart") }} </div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>

          <!----------------------ACHAT 1ER TOUR--------------------->
            <div class="toggle"> 
              <div class="lobby_title">{{ $t("achat_prem_tour") }}</div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          <!----------------------TEMPS D'ACTIONS--------------------->

            <div v-if="tempsCheck(tempsAction) == true" class="tour"> 
              <div class="lobby_title">{{ $t("temps_tour") }}</div>
                  <form>
                    <input class="champ" type="text" v-model="tempsAction">
                  </form>
            </div>

            <div v-else class="tour">
              <div class="lobby_title">{{ $t("temps_tour") }} <span class="cdt">{{ $t("duree_exemple") }} </span> </div>
                  <form>
                    <input class="champF" type="text" v-model="tempsAction">
                  </form>
            </div>
          <!----------------------TOUR MAX--------------------->
          
            <div class="tour"> 
              <div class="lobby_title">{{ $t("nbr_tour_max") }} </div>
                  <form>
                    <input class="champ" type="text" v-model="tourMax">
                  </form>
            </div>         
        <!----------------------SOMME DEPART--------------------->
            <div class="tour"> 
              <div class="lobby_title">{{ $t("somme_depart") }}</div>
                  <form>
                    <input class="champ" type="text" v-model="sommeDepart">
                  </form>
            </div> 
        <!--------------------BT LANCER PARTIE------------------->
          
          <button type="button" class="bt_lancer" v-on:click="tempsCheck(tempsAction)"><h1 class="Lancer">{{ $t("lancer_partie") }}</h1></button>
          
          <button type="button" class="bt_quitter">{{ $t("quitter") }}</button>
        </div>
                      <!----------------------FOLLOWS--------------------->     
        <div class="amis">
          <h1 class="h1Lobby">{{ $t("amis_co") }}</h1>
            <div class="infos" v-for="gen in gens" :key="gen.pseudo" >
            <img class="pp" v-bind:src="gen.photo" alt="photo de profil"> 
              <div class="txtzone">
                <div class="pseudo" @click="checkFollow(gen.pseudo)">{{gen.pseudo}}</div>
                <button type="button" class="bt_inviter" >{{ $t("inviter") }}</button>
              </div>
            </div>
        </div>
    </div>
  <Footer></Footer>
</template>



<script>
import Footer from './MyFooter'
import Header from './MyHeader'

export default {
    name: 'LobbyPage',
    props: { /* Props  est un attribut que vous pouvez
                definir au niveau du composant qui sera
                transmis directement au template. */
      tit: String
    },

    components: {
    Header,
    Footer
  },
  data: function() {
    return { 
      gens: [
        {
            photo : require('../assets/grin.png'),
            pseudo : 'pla'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 2'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 3'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 4'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 5'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 6'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 7'
        },
        {
            photo : require('../assets/grin.png'),
            pseudo : 'Joueur 8'
        }
      ],

      tempsAction: '30',
      tourMax : 2,
      sommeDepart : 0      
    }
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
    checkSameProfil(nameProfile) {
      if (nameProfile == this.$store.state.username) {
          this.$store.commit('checkingSameProfile',true);       
      } else {
          this.$store.commit('checkingSameProfile',false);
      }
    },
    checkFollow: function(pseudoClickedOn) {
      this.$store.commit('updatePseudoClickedOn',pseudoClickedOn);
      this.$store.dispatch('getIds', {
        otherName: pseudoClickedOn,
        ownName: this.$store.state.username
      })
      this.$store.commit('changeFollowState',true);
    }
  }
}

</script>

<style>

.h1Lobby{
  margin-top: 30px;
  padding-bottom: 12px;
}

.bodyL{
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: row;
  border-top: 4px solid #5F4339;
  /*border: 2px solid red;*/
  z-index: 1;
  
}

.part{
  display: flex;
  flex-direction: column;
  background-color: rgb(128, 104, 97);
  /*border: 2px solid red;*/
  width: 25%;
  color: white;
  text-align: center;

}

.param{
  display: flex;
  flex-direction: column;
  background-color: rgb(244, 237, 237);
  /*border: 2px solid red;*/
  width: 60%;
  text-align: center;

}

.amis{
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
  background-color: #5F4339;
}

input:focus + .slider {
  box-shadow: 0 0 1px #5F4339;
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

.prt{
  margin-left: 40%;
  width: 80px;
}

.prts:before{
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

.prt input:checked~.labels::after {
  opacity: 0;
}

.prt input:checked~.labels::before {
  opacity: 1;
}

.t_attente:checked + .prts {
  background-color: #d3aa5d;
}

.t_attente:focus + .prts {
  box-shadow: 0 0 1px #5F4339;
}


.tour, .toggle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12vh;
}



.sommeDepart{
  padding: 0 12vh;
}



.lobby_title{
  display: table-cell;
  padding: .375rem 1.75rem .375rem .0rem;;
  vertical-align: middle !important;
}

.Lancer{
  font-weight: bold;
}

.bt_lancer{
border-radius: 15px;
height: 12%;
width: 70%;
font-weight: bold;
border: none;
outline: none;
background-color: #d3aa5d ;
color: #6e4d0b;
margin-top: 10%;
margin-left: 15%;
}

.bt_lancer:hover{
  background-color:#b08d4d;
}

.bt_quitter{
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
color : #c6c6c6;
}
.bt_quitter:hover{
  background-color:#3a3838;
}

.taillepage{
  margin-top: 40vh;
}

/* Participants */

.infos{
  border-bottom: 2px solid #F4F2EC;
  padding: 2.5% 0% 2.5% 0%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.infosb{
  border-bottom: 2px solid #F4F2EC;
  padding: 2.5% 0% 2.5% 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}


.pp{
  max-height: 60px;
  max-width:  60px;
  padding: 0% 4% 4% 0%;
}

.pseudo{
  font-weight: bold;
  margin-right: 40% ;
}

.bt_inviter{
  width: 91px;
  height: 31px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #F4F2EC;
  font-weight: bold;
  margin-left: 40%;
}
.bt_inviter:hover{
  background-color:#e5e5e5;
}

.txtzone{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

/* Bot section */

.diff{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 6%;
  padding-bottom: 7%;
  border-bottom: 2px solid #F4F2EC;
  font-weight: bold;
}

.titrebot{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.bot{
  max-height: 70px;
  max-width:  70px;
  font-weight: bold;
  color: #FFE100;
  padding: 2% 55% 0% 0%;  
}

#txtdif{
  padding: 0%;
  margin: 0%;
}

.botbleu{
  padding-left: 6%;
  width:  80px;
  height: 60px;
}

.botnoir{
  width: 40px;
  padding-bottom: 7px;
}

.bt_ajout_bot{
  border-radius: 15px;
  height: 50px;
  width: 270px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: #d3aa5d ;
  color: black;
  margin: 10% 0% 10% 5%;
}

.bt_ajout_bot:hover{
  background-color:#b08d4d;
}

.btn_bot{
  color:#212529 !important;
}

.diff_bot{
  border-radius: 13px;
  width: 45px;
  height: 30px;
  border: none;
  outline: none;
}


.chevron{
  padding-bottom: 50px;
}

.champ, .champF{
  background-color: #f4eded;
  border: #9f8e88;
  border-bottom: 2px solid #212529 !important;
  margin: 1% 0% 1% 0%;
  text-align: center;
}
.champF{
  border: #eb0707;
  border-bottom: 2px solid #eb0707!important;
  background-color: #fc8080;
}
.cdt{
  color: #eb0707;
  font-weight: bold;
}

</style>