<template >
    <Header></Header>
    
    <section class="container">
        <section class="opt">
            <button class="deconnection" type="boutton">{{ $t("deco") }}
                <img class="icone" src="../assets/deco.png" alt="icone deco">
            </button>
            <button class="creer_partie" type="boutton">{{ $t("creer") }}
                <img class="icone" src="../assets/reseau.png" alt="icone reseau">
            </button>        
        </section>
    

        <section class ="info_salon">
            <div class="lien">
                <input class="champLien" type="text" :placeholder='$t("entrer_lien")'>
                <button class="rejoindre" type="boutton">{{ $t("rejoindre") }}
                    <img class="icone" src="../assets/verif.png" alt="icone verif"/>
                </button>
            </div>
            <div class="liste_salon">
                <Salon></Salon>
            </div>
        </section>
    </section>

    <Footer></Footer>
</template>

<!-- Script JS -->
<script>

import Footer from '../components/MyFooter'
import Header from '../components/MyHeader'
import Salon  from '../components/MySalon.vue'

export default {
  
  created () {
  },
     name: 'PostLoginPage',
    components: {
        Header,
        Footer,
        Salon
}       
}
</script>

<!-- Style Css -->
<style>
    #app{
         background-color: #edebe9;
    }

    .container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 50px;
    margin-top:20px;
    padding-bottom: 20px;
    }

    .info_salon {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 30px;
    padding: 30px 0px 30px 0px;
    }

    .info_salon {
    padding: 15px 70px 30px 70px;
    width: 80%;
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
        width: 70vh;
        height: 50px;
        font-weight: bold;
        padding-left: 20px;
    }

    .opt{
        display: flex;
        flex-direction: column;
    }

    .liste_salon{
        overflow-x: hidden;
        overflow-y: auto;
    }

</style>