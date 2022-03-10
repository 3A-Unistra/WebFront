<template>
    <div class="bottom">
        <div id="liens">
            <ul>
                <li>Accueil</li>
                <li>Inscription</li>
                <li>Connexion</li>
                <li>Profil</li>
                <li>A propos</li>
            </ul>
            <ul>
                <li class="list">
                     <a href=""><img class="social" src="../assets/instagram.png" alt=""></a>
                </li>
                <li class="list">
                     <a href=""><img class="social" src="../assets/facebook.png" alt=""></a>
                </li>
                <li class="list">
                     <a href=""><img class="social" src="../assets/twitter.png" alt=""></a>
                </li>
            </ul>
            <ul>
                <li>Conditions générales</li>
                <li>FAQ</li>
                <li>License</li>
                <li>Aide</li>
            </ul>
        </div>
        <div class="bg-light text-center text-lg-start">
            <!-- Copyright -->
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                © 2022 Copyright:
                <a class="text-dark" href="https://mdbootstrap.com/">Strassopoly</a>
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
    display: flex;
    flex-direction: column;
    padding: 3% 0% 0% 0%;
    justify-content: center;
}

#liens {
    display: flex;
    flex-direction: row;
    margin-left:auto;
    margin-right: auto;
    height: 60%;
    width: 80vh;
    margin-bottom: 6vh;
    background-color: rgba(165, 42, 42, 0.967);
}

ul {
    list-style-type: none;
    padding: 1% 10%;
}

li {
    padding-top: 25%;
    font-size:2vh;
}
.social{
    max-height: 80px;
    max-width: 80px;
    padding-bottom: 25%;
}

@media screen and (max-width: 480px) {
    .bottom {
        max-width: 100%;
    }

    #liens{
        width: 100%;
        margin: 0;
        padding: 0 5%;
    }

    ul:last-child {
        padding-right: 0%;
    }

    ul:first-child {
        padding-left: 5%;
    }

    .social{
        max-height: 50px;
        max-width: 50px;
        padding-bottom: 25%;
    }
}

@media screen and (max-width: 810px) {
    ul {
        padding: 1% 5%;
    }

    ul:last-child {
        padding-right: 0;
    }
    #liens {
        justify-content: space-around;
        max-width: 100%;
    }
    .bottom {
        width: 100%;
    }

}

</style>
