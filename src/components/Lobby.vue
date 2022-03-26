<template>
  <Header></Header>
    <div class="bodyL">
                      <!---------------------PARTICIPANTS-------------------->
        <div class="part">
          <h1 class="h1Lobby">Participants</h1>
            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" disabled>Prêt !</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-dark btn-sm" disabled>En attente</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-dark btn-sm" disabled>En attente</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" disabled>Prêt !</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" disabled>Prêt !</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-dark btn-sm" disabled>En attente</button>
                </div>
              </div>
            </div>
          
          <div class="infosb">
            <div class="titrebot">
              <img class="botbleu" src="../assets/botbleu.png" alt="robot bleu">
              <h1 class="bot">Bot</h1>
            </div>
            <div class="diff">
              <button type="button" class="btn btn-second btn-sm">+</button>
              <div class="lobby_title" id="txtdif">Difficulté du Bot</div>
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
            <div class="lobby_title">Visibilité : </div>
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
              <div class="lobby_title">Nombre de tours : </div>
                  <form>
                    <div class="form-row align-items-center">
                      <div class="col-auto my-1">
                        <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                          <option selected>...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="3">4</option>
                          <option value="3">5</option>
                          <option value="3">6</option>
                          <option value="3">7</option>
                          <option value="3">8</option>
                          <option value="3">9</option>
                          <option value="3">10</option>
                          <option value="1">11</option>
                          <option value="2">12</option>
                          <option value="3">13</option>
                          <option value="3">14</option>
                          <option value="3">15</option>
                          <option value="3">16</option>
                          <option value="3">17</option>
                          <option value="3">18</option>
                          <option value="3">19</option>
                          <option value="3">20</option>
                          <option value="3">21</option>
                          <option value="3">22</option>
                          <option value="3">23</option>
                          <option value="3">24</option>
                          <option value="3">25</option>

                        </select>
                      </div>
                    </div>
                  </form>
            </div>
              
            <div class="tour">
              <div class="lobby_title">Durée d'un tour (en min): </div>
              <form>
                <div class="form-row align-items-center">
                  <div class="col-auto my-1">
                    <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option selected>...</option>
                      <option value="1">∞</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                      <option value="3">5</option>
                      <option value="3">6</option>
                      <option value="3">7</option>
                      <option value="3">8</option>
                      <option value="3">9</option>
                      <option value="3">10</option>               
                    </select>
                  </div>
                </div>
              </form>
            </div>
          
        <!----------------------SOMME DEPART--------------------->
          <div class="sommeDepart">
            <div class="lobby_title">Somme de départ :</div>
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
            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil"> 
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" >Inviter</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" >Inviter</button>
                </div>
              </div>
            </div>   

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" >Inviter</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" >Inviter</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" >Inviter</button>
                </div>
              </div>
            </div>

            <div class="infos">
              <img class="pp" src="../assets/grin.png" alt="photo de profil">
              <div class="txtzone">
                <div class="pseudo"> Joueur
                </div>
                <div class="bt_pret">
                  <button type="button" class="btn btn-light btn-sm" >Inviter</button>
                </div>
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

/*p{
  display: table-cell;
  padding: .375rem 1.75rem .375rem .0rem;;
  vertical-align: middle !important;
}*/

.lobby_title{
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

#txtdif{
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