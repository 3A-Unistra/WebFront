<template >
    <Header></Header>
    <section class="container">
        <section class="pseudo_img">
            <div class = "titre_nom">
            {{ $t("compte") }}
            </div>
            <section class="pseudo_img">
               <div class = "img_cropper">
                    <img id="img_avatar" src="../assets/AvatarBateau.png" alt="">
                </div>

                <section class="pseudo_id">
                    <div>
                    {{ $t("pseudo") }}
                    </div>

                    <div class="id_number">
                     #2243
                    </div>
                </section>
            </section>
        </section>

        <section class ="information">
            <section class = "test">
                <div class = "info_titre">
                Information
                </div>
            </section>


            <section class ="info_txt">
                <div>
                    {{ $t("nom_joueur") }} :
                </div>

                <div>
                {{ $t("pseudo") }} : 
                </div>

                 <div>
                     {{ $t("high_score") }} :
                </div>

                <div>
                    {{ $t("fav_pion") }} :
                </div>
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
}
}
</script>

<!-- Style Css -->
<style scoped>

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

.titre_nom {
color: #977637;
font-size: 35px;
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
margin-top:200px;
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

</style>