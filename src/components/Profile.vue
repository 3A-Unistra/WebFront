<template >
    <Header></Header>
    <section class="container">
        <section class="pseudo_img">
            <div class="titre_edit">
                <div class = "titre_nom">
                {{ $t("compte") }}
                </div>
                <button v-if="edit==false" class="bt_edit" type="button" v-on:click="edit=true">
                    <img class="edit" src="../assets/edit.png">
                </button>
            </div>
                    
            <section class="pseudo_img">
                <div class = "img_cropper">
                    <img id="img_avatar" src="../assets/AvatarBateau.png" alt="">
                </div>

                <section class="pseudo_id">
                    <div>
                        {{pseudo}}
                    </div>

                    <div class="id_number">#2243</div>
                </section>
            </section>
        </section>

        <section class ="information">
            <section class = "test">
                <div class = "info_titInforma"></div>
            </section>

            <section class ="info_txt">
                <div class="txt_et_champ">
                    <div>
                        {{ $t("nom_joueur") }} :                    
                    </div>
                    <form>
                    <input v-if="edit == false" class="champP" type="text" v-model="nomJoueur" readonly>
                    <input v-else class="champP" type="text" v-model="nomJoueur" disabled>
                    </form>
                </div>

                <div class="txt_et_champ">
                    <div>
                        {{ $t("pseudo") }} :                    
                    </div>
                    <form>
                    <input v-if="edit == false" class="champP" type="text" v-model="pseudo" readonly>
                    <input v-else class="champEdit" type="text" v-model="pseudo">
                    </form>
                </div>

                <div class="txt_et_champ">
                    <div>
                        {{ $t("high_score") }} :                    
                    </div>
                    <form>
                    <input v-if="edit == false" class="champP" type="text" v-model="meilleurScore" readonly>
                    <input v-else class="champP" type="text" v-model="meilleurScore" disabled>
                    </form>
                </div>

                <div class="txt_et_champ">
                    <div>
                        {{ $t("fav_pion") }} :                    
                    </div>
                    <form>
                    <input v-if="edit == false" class="champP" type="text" v-model="pionFav" readonly>
                    <input v-else class="champEdit" type="text" v-model="pionFav">
                    </form>
                </div>
                <button v-if="edit == true" class="bt_save" type="button" v-on:click="edit=false">
                <img class="edit" src="../assets/save.png">
                </button>
                <div v-else class="saveplace"></div>                
            </section>

            <section class ="info_bouton">
                <button class="follow"
                type="button">
                {{ $t("suivre") }}
                </button>

                <button class="report"
                type="button">
                {{ $t("signaler") }}
                </button>
            </section>
        </section>
    </section>
    <Footer></Footer>
</template>

<!-- Script JS -->
<script>

import Footer from './MyFooter'
import Header from './MyHeader'


export default {
  
  created () {
  },
     name: 'profilePage',
     components: {
        Header,
        Footer
    },
    data() {
        return {
            edit: false,
            nomJoueur:'Nom',
            pseudo:'Pseudo',
            meilleurScore: '1234',
            pionFav: 'Pion 8'
        }
    },
}
</script>

<!-- Style Css -->
<style>
    #app{
         background: url("../assets/background.png");
    }

    #img_avatar {
    background-color: #624d24;
    display: inline;
    margin: 0 auto;
    height: 100%;
    margin-left:-40%;
    }

    .img_cropper {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    }

    .pseudo_id {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    font-weight: bold;
    justify-content: center;
    }

    .id_number{
    color: #989291;
    }

    .titre_edit, .txt_et_champ{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    }

    .titre_nom {
    color: #977637;
    font-size: 35px;
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 3px;
    }

    .bt_edit, .bt_save{
    width:  30px;
    height: 30px;    
    outline: none;
    border-radius: 50px;
    border: 2px solid #624d24;
    
    }

    .bt_edit{
    margin-top: 20px;
    margin-right: 190px;
    background-color: #edebe9;
    }

    .bt_save{
    margin-left: 90%;
    background-color: #c6c6c6;
    }

    .bt_edit:hover, .bt_save:hover{
    background-color:#a19375;
    }

    .saveplace{
    width: 30px;
    height: 30px;
    }

    .edit{
    width:  20px;
    height: 20px;
    padding-bottom: 2px;
    }

    .template {
    background-color:#eceae7 ;
    }

    .container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 50px;
    margin-top:20px;
    }

    .pseudo_img {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: 50px;
    }

    .info_titre {
    font-size: 25px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    }

    .info_txt {
    display: flex;
    flex-direction: column;
    font-weight: bold;

    gap: 30px;
    padding: 30px 0px 30px 0px;
    }

    .information {
    padding: 15px 70px 30px 70px;
    width: 60%;
    display: flex;
    background-color:#c6c6c6 ;
    border-radius: 15px;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    gap: 20px;
    }

    .info_bouton {
    display: flex;
    justify-content: center;
    gap: 50px;
    }

    .follow, .report {
    border-radius: 7px;
    height: 40px;
    width: 200px;
    font-weight: bold;
    border: none;
    outline: none;
    }

    .follow:hover {
    background-color:#967027 ;
    }

    .follow:active {
    background-color:#694f1b ;
    }

    .report:hover {
    background-color:#504b4b;
    }

    .report:active {
    background-color:#222121;
    }

    .follow{
    background-color:#ca9735
    }

    .report{
    background-color:#756e6e
    }

    .champP, .champEdit{
    width: 30ch;
    margin-right: 12vh;    
    background-color: #c6c6c6;
    padding-left: 20px;
    font-weight: bold;
    border: none;
    }

    .champEdit{
    border-bottom: 1px solid #222121;
    }

</style>