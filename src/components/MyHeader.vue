<template>
<div class="headder">
  <a href="">
    <img class="logo" src="../assets/logo_couleur.png" alt="logo">
  </a>
  <h3>
    <a href="#">Accueil</a>
  </h3>
  <div class="login">
    <h3>
      <a href="#">inscription</a>/<a href="#">connexion</a>
    </h3>
    <a href=""><img class="social" src="../assets/rouage.png" alt="options"></a>
  </div>
</div>
</template>

<style>

.headder{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50vh;
  padding: 1% 2%;
  max-width: 100%;
  background-image: url(../assets/stras.jpg);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;}

.logo{
  padding-left: 59%;
  max-height: 350px;
  max-width: 650px;
}

.login {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
}

h3 a{
  text-decoration: none;
  color: inherit;
  font-size: 8vh;
}
h3 a:hover {
  opacity: 0.5;
}

@media screen and (max-width: 480px) {
  .headder {
    height: 20vh;
    justify-content: initial;
  }

  .headder > a {
    height: 100%;
    width: 28%;
  }

  h3 {
    padding-right: 6%;
  }

  .logo{
    max-height: 60%;
    max-width: 80%;
    margin-right: 0;
    padding-left:0 ;
  }

  h3 a {
    font-size: 4vh;
  }

}

@media screen and (max-width: 768px) {
  .headder {
    justify-content: space-between;
  }

  .headder a{
    max-height: 30%;
    max-width: 40%;
  }

  h3 a {
    font-size: 3vh;
  }
}

@media screen and (min-width: 769px) and (max-width: 810px) {
  .headder a{
    max-height: 60%;
    max-width: 80%;
    margin-right: 0;
    padding-left:0 ;
  }

  .logo {
    padding-left: 0;
  }

  h3 a {
    font-size: 4vh;
  }
}

</style>
