<template>
<div class="headerL">
  <a href="./components/Accueil.vue">
    <img class="logo" src="../assets/logo_couleur.png" alt="logo">
  </a>

  <div class="part_droite">
    <div class="accueil">
      <h3><a href="">Accueil</a></h3>
      <a href="./components/Accueil.vue"><img class="social" src="../assets/rouage.png" alt="option"></a>
    </div>

    <div class="zonelien">
        <p class="txtl">Lien du salon :</p>
        <input type="text" class="lien" value =" liennnnnnnnn" readonly>
        <button type="button" class="btn btn-dark">Copier</button>
    </div>

  </div>


</div>
</template>



<style>


.headerL{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 38vh;
  padding: 1% 2%;
  max-width: 100%;
  /**background-image: url(../assets/stras.jpg);**/
  background-color: rgba(95, 67, 57, 0.15);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;}

.logo{
  padding-left: 0%;
  max-height: 228px;
  max-width: 640px;
}

.part_droite{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

.accueil{
  display: flex;
  flex-direction: row;
  padding-left: 70%;
}

.social{
  padding-left: 20%;
}

.zonelien {
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgba(95, 67, 57, 0.53);
  border-radius: 5px;
  padding: 1%;
}

.txtl{
  margin: 0%;
  text-align: center;
  padding: 1rem 0.5rem 1rem 2rem;
}

.lien{
  background-color: #9f8e88;
  border: #9f8e88;
  border-bottom: 2px solid #212529 !important;
  margin: 1% 0% 1% 0%;
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
    margin: 0%;
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
