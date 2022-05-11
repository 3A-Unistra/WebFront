<template>
  <div id="app">
    <Header></Header>
    <div class="explication">
      <section>
        <img src="../assets/mrmonopoly.png" alt="image stras">
        <div class="bloc_texte">
          <h2> {{ $t("titre_texte1") }} </h2>
          <p>
            <br>
            {{ $t("texte1") }}
          </p>
        </div>
      </section>
      <section>
        <div class="bloc_texte">
          <h2> {{ $t("titre_texte2") }} </h2>
          <p>
            <br>
            {{ $t("texte2") }}
            <a :href="$t('regle')"> {{ $t("ici") }} </a>.
          </p>
        </div>
        <img src="../assets/mrmonopoly.png" alt="image strasbourg">
      </section>
    </div>
    <div class="bottom">
         <div> 
            <img id="le_chien" src="../assets/mascot_Footer.png" alt="pion chien">
        </div>
        <div id="liens">
            
            <ul class="list_footer n1">
                <li class="menu_title"> Menu </li>
                <hr>
                <li class="menu_info"><router-link class="menu_ff" to="/">{{ $t("home") }}</router-link></li>
                <li class="menu_info"><router-link class="menu_ff" to="/signup">{{ $t("signup") }}</router-link></li>
                <li class="menu_info"><router-link class="menu_ff" to="/login">{{ $t("login") }}</router-link></li> 
            </ul>

            <ul class="list_footer n2">
                <li class="menu_title"> {{ $t("reseaux") }} </li>
                <hr>
                <div class="container_logo">
                    <li class="menu_logo">
                        <a href="">
                            <img id="insta_size" src="../assets/instagram.png" alt="instagram">
                        </a>
                    </li>
                    <li class="menu_logo">
                        <a href="">
                            <img class="social fb" src="../assets/facebook.png" alt="facebook">
                        </a>
                    </li>
                    <li class="menu_logo">
                        <a href="">
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
  </div>
</template>

<script>
//import Footer from './MyFooter'
import Header from './MyHeader'

export default {
  name: 'HomePage',
  props: { 
    tit: String
  },

  components: {
    Header,
    //Footer
  },
}
</script>

<style>

 #app{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: url("../assets/background.png");  
}

.explication {
  font-family: 'Alata-regular';
  margin: 0;
  
}
h2 {
  color:#835B0E;
}

.explication{
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  /* padding-top: 8vh; */
  background: url("../assets/background.png");
}

section{
  display: flex;
  flex-direction:row ;
  justify-content: space-around;
  padding:4% 0%;
}

section img {
  width: 30vh;
  height: 50vh;
}

.bloc_texte {
  display: flex;
  flex-direction: column;
  width: 35%;
}
.bloc_texte h2 {
  font-size: 5.5vh;
  text-align:justify;
}
.bloc_texte p{
  text-align: justify;
  font-size: 3vh;
  text-align:justify;

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

@media screen and (max-width: 480px) {

  section {
    justify-content: initial;
    justify-content: center;
  }
  .bloc_texte {
    width: 100%;
  }

  .bloc_texte h2 {
    font-size: 5vh;
    text-align: center;
  }
  .bloc_texte p {
    padding: 3%;
    width: 100%;
    font-size: 16px;
    text-align: justify;
  }

  section img {
    display: none;
  }

  section {
    align-items: center;
  }

  .bottom {
    max-width: 100%;
  }

}

@media screen and (max-width: 810px) {

  section img {
    display: none;
  }
  section {
    padding-bottom: 3%;
  }

  .bloc_texte {
    width: 90%;
  }

  .bloc_texte p {
    font-size: 2.5vh;
  }

  .explication {
    padding-top: 1vh ;
  }

}
</style>
