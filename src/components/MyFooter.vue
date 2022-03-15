<template>
   
    <div class="bottom">
         <div> 
            <img id="le_chien" src="../assets/mascot_Footer.png" alt="pion chien">
        </div>
        <div id="liens">
            
            <ul>
                <li class="menu_title"> Menu </li>
                <hr>
                <li class="menu_info">Accueil</li>
                <li class="menu_info">Inscription/Connexion</li>
                <li class="menu_info">Profil</li>
                <li class="menu_info">A propos</li>
            </ul>
            <ul>
                <li class="menu_title"> Réseaux </li>
                <hr>
                <li>
                    <a href="">
                        <img id="insta_size" src="../assets/instagram.png" alt="instagram">
                    </a>
                </li>
                <li>
                    <a href="">
                        <img class="social" src="../assets/facebook.png" alt="facebook">
                    </a>
                </li>
                <li>
                    <a href="">
                        <img class="social" src="../assets/twitter.png" alt="twitter">
                    </a>
                </li>
            </ul>
            <ul>
                <li class="menu_title"> Liens </li>
                <hr>
                <li class="menu_info">Conditions générales</li>
                <li class="menu_info">FAQ</li>
                <li class="menu_info">License</li>
                <li class="menu_info">Aide</li>
            </ul>
        </div>
        <div class="store_redirection">
            <img class="logo_store" src="../assets/logo_appstore.png" alt="logo app store">
            <img class="logo_store" src="../assets/logo_playstore.png" alt="logo app store">
        </div>
        <div class="text-center text-lg-start container_copyright">
            <!-- Copyright -->
            <div class="text-center p-3 copy">
                © 2022 Copyright:
                <a class="strasspoly_copy" href="https://mdbootstrap.com/">STRASSPOLY GAME</a>
            </div>
            <!-- Copyright -->
        </div>
    </div>
</template>

<style>



.bg-light {
    width: 100%;
}

.bottom {
    font-family: Alata;
    display: flex;
    flex-direction: column;
    padding: 3% 0% 0% 0%;
    justify-content: center;
    z-index:2;
    
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
    
}

hr {
    width: 40px;
    color: #cd823f ; 
    margin: 0;
    border: solid;
}

ul {
    list-style-type: none;
    padding: 2% 8%;
    max-width: 100%;
}

li {
    padding-top: 30px;
    color: white; 
}

li:first-child {
    padding-top: 30px;
}

.social{
    max-height: 40px;
    max-width: 40px;
}

#insta_size {
    max-height: 50px;
    max-width: 50px;
}

.store_redirection {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0% 10% 0% 10%;
}

.logo_store {
    max-width: 40%;
    max-height: auto;
    margin:0;
    padding: 0;
    background-size: contain;
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
    font-size:18px;
}
.menu_title{
    font-size:30px;
}

@media screen and (max-width: 480px) {

    #liens{
        width: 100%;
        justify-content: space-around;
        height: 70%;
        margin-right: 0;
        margin-bottom: 3%;
        margin-left: 0;
        padding: 0 5%;
    }

    ul:last-child {
        margin-right: 2%;
        padding-right: 0;
    }

    ul:first-child {
        margin-left: 1%;
        padding-left: 2%;
        padding-right: 0;
    }
    #insta_size {
        max-height: 55px;
        max-width: 55px;
        padding-bottom: 25%;
    }

    .social{
        max-height: 50px;
        max-width: 50px;
        padding-bottom: 25%;
    }  

    #le_chien {
        display: none;
    }

    .menu_info{
    font-size:15px;
    }
}

@media screen  and (min-width: 481px) and (max-width: 810px) {
    ul {
        padding: 1% 5%;
    }
    #le_chien {
        margin-left: 73%;
    }
    ul:last-child {
        padding-right: 0;
    }
    #liens {
        justify-content: space-around;
        max-width: 100%;
        height: 50%;
    }
    .bottom {
        width: 100%;
    }

}

</style>
