<template>
    <Header></Header>
    <div class="bodyL">
                      <!---------------------PARTICIPANTS-------------------->
        <div class="part">
          <h1 class="h1Lobby">Participants</h1>
          <ListeParticipants></ListeParticipants>
          
          <div class="infosb">
            <div class="titrebot">
              <img class="botbleu" src="../assets/botbleu.png" alt="robot bleu">
              <h1 class="bot">Bot</h1>
            </div>
            <div class="diff">
              <button type="button" class="btn btn-second btn-sm">+</button>
              <p class="txtdif">Difficulté du Bot</p>
              <button type="button" class="btn btn-second btn-sm">-</button>
            </div>
            <div class="bt_lancer bt_bot">
            <button type="button" class="btn btn-primary btn-lg btn_bot">Ajouter un Bot</button>
          </div>

            
          </div>
          
          
        </div>
                      <!----------------------PARAMETRES--------------------->
        <div class="param">
          <h1 class="h1Lobby">Paramètres du salon</h1>
          <fieldset>
            <p>Visibilité : </p>
            <div class="vchoix">
              <input type="radio" class="radio" name="x" value="y" id="y" />
              <label for="y">Public</label>
            </div>
            
            <div>
              <input type="radio" class="radio" name="x" value="z" id="z" />
              <label for="z">Privé</label>
            </div>
                        
          </fieldset>
          <!----------------------TOUR & DUREE--------------------->
          
            <div class="tour"> 
              <p>Nombre de tours : </p>
              <ChoixTour></ChoixTour>
            </div>
              
            <div class="tour">
              <p>Durée d'un tour (en min): </p>
              <ChoixDuree></ChoixDuree>
            </div>
          
        <!----------------------SOMME DEPART--------------------->
          <div class="sommeDepart">
            <p>Somme de départ :</p>
          </div>

        <!--------------------BT LANCER PARTIE------------------->
          <div class="bt_lancer">
            <button type="button" class="btn btn-primary btn-lg">Lancer la partie</button>
          </div>

          <div class="bt_quitter">
            <button type="button" class="btn btn-dark">Quitter</button>
          </div>
          <div class="taillepage"></div>
        </div>
                      <!----------------------FOLLOWS--------------------->  
        <div class="amis">
          <h1 class="h1Lobby">Amis connectés</h1>
          <ListeFollows></ListeFollows>
        </div>

    </div>
    <Footer></Footer>
</template>



<script>
import Footer from './MyFooter'
import Header from './HeaderLobby'
import ChoixTour from './ChoixTourParam.vue'
import ChoixDuree from './ChoixDuree.vue'
import ListeParticipants from './ListeParticipants.vue'
import ListeFollows from './ListeFollows.vue'

export default {
    name: 'LobbyPage',
    props: { /* Props  est un attribut que vous pouvez
                definir au niveau du composant qui sera
                transmis directement au template. */
      tit: String
    },

    components: {
    Header,
    Footer,
    ChoixTour,
    ChoixDuree,
    ListeParticipants,
    ListeFollows
}
}

</script>

<style>

.h1Lobby{
  margin-top: 30px;
  padding-bottom: 12px;
}

.bodyL{
  display: flex;
  flex-direction: row;
  border-top: 4px solid #5F4339;
  /*border: 2px solid red;*/
  
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

input[type=radio],
input.radio {
  float: left;
  clear: none;
  margin: 2px 0 0 2px;
}



.tour{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12vh;
}

.sommeDepart{
  padding: 0 12vh;
}

p{
  display: table-cell;
  padding: .375rem 1.75rem .375rem .0rem;;
  vertical-align: middle !important;
}

.btn-primary{
  color: inherit !important;
  background-color: rgba(206, 153, 54, 0.78) !important;
  border-color: #5F4339 !important;
}

.bt_lancer{
  margin-top: 6vh;
}

.bt_quitter{
  margin-top: 5vh;
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
  /*padding-left: 19%;*/
  max-height: 70px;
  max-width:  70px;
  padding: 0% 4% 4% 0%;
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
  color: #FFE100;
  padding: 5% 55% 0% 0%;  
}

.txtdif{
  padding: 0%;
  margin: 0%;
}

.botbleu{
  padding-left: 6%;
}
.bt_bot{
  margin-top: 6% !important;
  border-top: #F4F2EC !important;
}

.btn_bot{
  color:#212529 !important;
}

</style>