<template >
    <Header></Header>
    <section class="container">
        <!--        A ENLEVER
        <p @click="changesameProfil(0)">passer sameprofil à true </p>
        <p @click="changesameProfil(1)">passer sameprofil à false </p>
        -->
        <section class="pseudo_img">
            <div class="titre_edit">
                <div v-if="this.$store.state.sameProfile==true" class = "titre_nom">
                {{ $t("compte") }}
                </div>
                <div v-else class="titre_nom">
                    <div>
                        {{pseudo}}
                    </div>
                </div>
            </div>
                    
            <section class="pseudo_img">
                <div class = "img_cropper">
                
                <div :id="'img_avatar'+this.$store.state.pawnProfil">
                </div>
            
                <!--
                    <img id="img_avatar" src="../assets/AvatarBateau.png" alt="">
                -->
                </div>
            </section>
        </section>

        <section class ="information">
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
                    <input v-else class="champEdit" type="text" v-model="this.$store.state.loginProfil">
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

                <div class="txt_et_appercu">
                    <div>
                        {{ $t("fav_pion") }}:                    
                    </div>
                    <form>
                    
                    <div v-if="edit == false" class="choixPion editf" >  
                        <button class="bt_pion" :id="'id_bt_pion'+ this.$store.state.pawnProfil" type="button" >                           
                        </button>
                    </div>

                    <div v-else class="choixPion" >  
                        <button class="bt_pion"  v-for="pion in pions" :key="pion.idPion" :id="'id_bt_pion'+ pion.idPion" type="button" @click="this.$store.state.pawnProfil=pion.idPion" :src="pion.appercu" >                           
                        </button>
                    </div>
                    </form>
                </div>              
            </section>
                
            <form class ="info_bouton" @submit.prevent="changeNamePawn">
                <button v-if="this.$store.state.sameProfile == true" class="bt_edit" type="button" @click="edit=true" :hidden="edit==true">
                    {{$t("editer")}}
                </button>
                
                <button v-else-if="verif_follow == false" class="follow"
                type="button">
                    {{ $t("follow") }}
                </button>
                <button  v-else @click="Unfollow" class="follow" type="button">
                    {{ $t("unfollow") }}
                </button>
                <!--
                
                -->
                
                <button v-if="this.$store.state.sameProfile == true" class="bt_save" type="submit" v-on:click="edit=false" :hidden="edit==false">
                {{$t("enregistrer")}}
                </button>

                <button v-if="this.$store.state.sameProfile == true" class="bt_supp" type="button" :hidden="edit==true">
                {{$t("supprimer")}}
                </button>

                <button v-else class="report" type="button" v-on:click="edit=false">
                {{ $t("signaler") }}
                </button>
            </form>
        </section>
    </section>
    <Footer></Footer>
</template>

<!-- Script JS -->
<script>

import Footer from './MyFooter'
import Header from './MyHeader'
import { mapState } from 'vuex'
//import func from 'vue-editor-bridge'

export default {
  
    mounted() {
        this.$store.dispatch('verifToken');
        this.$store.dispatch('getUserProfile',{
            username: localStorage.getItem('username-profil')
        })
    },
     name: 'profilePage',
     components: {
        Header,
        Footer
    },
    data() {
        return {
            edit: false,
            meilleurScore: '0',
            verif_follow:this.$store.state.IsFollowing,
            pions: 
            [
                {
                    appercu:'0_Bretzel.png',
                    idPion: 0
                },
                {
                    appercu:'1_Biere.png', 
                    idPion: 1
                },
                {
                    appercu:'2_Bike.png', 
                    idPion: 2
                },
                {
                    appercu:'3_Bugatti.png',
                    idPion: 3
                },
                {
                    appercu:'4_Cigogne.png',
                    idPion: 4
                },
                {
                    appercu:'5_Gargouille.png',
                    idPion: 5
                },
                {
                    appercu:'6_Hamster.png',
                    idPion: 6
                },
                {
                    appercu:'7_Mannele.png',
                    idPion: 7
                },
            ]
      
        }
    },
    methods: {
        /*  A ENLEVER ( fait pour tester la dynamicité des v-if avec changement de state)
        changesameProfil: function(entier) {
            if(entier == 0) { 
               this.$store.commit('checkingSameProfile',true);  
                console.log(this.$store.state.sameProfil);
            } else {
                this.$store.commit('checkingSameProfile',false);  
                console.log(this.$store.state.sameProfil);
            }
        },*/
        verifState: function () {
            console.log(this.$store.state.usernameProfil);
            console.log(this.$store.state.loginProfil);
            console.log(this.$store.state.pawnProfil);
        },

        changeNamePawn: function() {
            console.log(this.pseudo);
            this.$store.dispatch('changeNamePawn',{
                username:this.$store.state.username,
                login:this.pseudo,
                pawn:this.pionFav
            })
        },
        
        Follow: function() {
            this.$store.dispatch('Follow', {
                otherName: this.$store.state.usernameProfil, // recup en cliquant sur le nom du joueur menant à sa page
                ownName: this.$store.state.username // stocké depuis notre connexion
            })
            this.$store.commit('changeFollowState',true);
        },
        Unfollow: function () {
            this.$store.dispatch('Unfollow', {
                otherName: this.$store.state.usernameProfil, // recup en cliquant sur le nom du joueur menant à sa page
                ownName: this.$store.state.username // stocké depuis notre connexion
            })
            this.$store.commit('changeFollowState',false);
        }
    },
    computed :{
    ...mapState({
        nomJoueur: 'usernameProfil',
        pseudo: 'loginProfil',
        pionFav: 'pawnProfil'
    }) 
}
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
    
    .txt_et_appercu{
    display: flex;
    flex-direction: row;
    width: 470px;
    height: 60px;
    }
    
    .titre_nom {
    display: flex;
    flex-direction: row;
    color: #977637;
    font-size: 35px;
    padding-left: 3%;
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 3px;
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

    .follow, .report, .bt_edit, .bt_save, .bt_supp {
    border-radius: 7px;
    height: 40px;
    width: 200px;
    font-weight: bold;
    border: none;
    outline: none;
    }

    .follow:hover, .bt_edit:hover {
    background-color:#967027 ;
    }

    .follow:active, .bt_edit:active {
    background-color:#694f1b ;
    }

    .report:hover, .bt_save:hover, .bt_supp:hover {
    background-color:#504b4b;
    }

    .report:active, .bt_save:active, .bt_supp:active, .bt_pion:active {
    background-color:#222121;
    }

    .follow, .bt_edit{
    background-color:#ca9735
    }

    .report, .bt_save, .bt_supp{
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

    .bt_pion{        
        width:  60px;
        height: 60px;
        margin-right: 10px;
        border: none;
    }

    #img_avatar0{
        background: url('../assets/0.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar1{
        background: url('../assets/1.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar2{
        background: url('../assets/2.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar3{
        background: url('../assets/3.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar4{
        background: url('../assets/4.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar5{
        background: url('../assets/5.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar6{
        background: url('../assets/6.png');
        width:  366px;
        height: 200px;
    }
    #img_avatar7{
        background: url('../assets/7.png');
        width:  366px;
        height: 200px;
    }

    #id_bt_pion0{
        background: url('../assets/appercuPions/0_Bretzel.png');
    }
    #id_bt_pion1{
        background: url('../assets/appercuPions/1_Biere.png');
    }
    #id_bt_pion2{
        background: url('../assets/appercuPions/2_Bike.png');
    }
    #id_bt_pion3{
        background: url('../assets/appercuPions/3_Bugatti.png');
    }
    #id_bt_pion4{
        background: url('../assets/appercuPions/4_Cigogne.png');
    }
    #id_bt_pion5{
        background: url('../assets/appercuPions/5_Gargouille.png');
    }
    #id_bt_pion6{
        background: url('../assets/appercuPions/6_Hamster.png');
    }
    #id_bt_pion7{
        background: url('../assets/appercuPions/7_Mannele.png');
    }

    .choixPion{
        margin-left: 20px;
        max-width: 430px;
        max-height: 80px;
        overflow-x: auto;
        white-space: nowrap;
    }

    .editf{
        padding-left: 30px;
    }


    /* Version mobile */
    @media screen and (max-width: 480px) {
        .container{
            display:flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
        .info_txt{
            margin-left:-50px;
        }
        /* .txt_et_champ{
            width:100px;
        } */
        .titre_nom{
            min-width: 250px;
        }
        .img_cropper{
            margin-left: 125%;
        }
        .champP{
            max-width: 100px;
        }
        input{
            max-width: 220px;
        }
        .information{
            min-width:100%;
        }
        .txt_et_champ div{
            min-width:130px;
        }
        .info_bouton{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .champEdit{
            max-width: 150px;
        }
    }
    /* version tablette */
    @media screen and (min-width: 480px) and (max-width: 1200px) {
         .container{
            display:flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
        .info_txt{
            margin-left:-50px;
        }
        /* .txt_et_champ{
            width:100px;
        } */
        .titre_nom{
            min-width: 250px;
        }
        .img_cropper{
            margin-left: 125%;
        }
        .champP{
            max-width: 100px;
        }
        .information{
            min-width:100%;
        }
        .txt_et_champ div{
            min-width:130px;
        }
        .info_bouton{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .champEdit{
            max-width: 150px;
        }
    }

</style>