<template>
  <div class="haut">

    <div class="top_bar">
      <img class="logo_coin" src="../assets/logo_couleur.png" alt="logo">
      <div class="login">  
        <router-link to="/inscription">Inscription</router-link>
        &nbsp;/&nbsp;
        <router-link to="/login">Connexion</router-link>
      </div>
      <div class="top_right">
        <div class="menu_mr">
        <router-link to="/lobby">Lobby</router-link>
        
        </div>
        <div class="menu_mr">
        <router-link to="/profile">Profil</router-link>
        <!-- &nbsp;|&nbsp; -->
        </div>
        <div class="menu_mr">
        <router-link to="/">Accueil  </router-link>
        <!-- &nbsp;|&nbsp;    -->
        </div> 
        <img class="options" src="../assets/traduction.png" alt="options">
      </div>
    </div>

    <!-- <div class="bottom_bar"> -->
      <!-- <img class="logo" src="../assets/logo_couleur.png" alt="logo"> -->
    <!-- </div> -->
  </div>
</template>

<style>

.haut {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 85vh;
  padding: 0% 0%;
  /* max-width: 100%; */
  background-image: url(../assets/stras.jpg);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  
 
  }

.top_bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  max-height: 11%;
  padding: 1% 3%;
}
.menu_mr{
  /* margin-left:25px; */
  margin-right:20px;
}

.logo_coin {
  height: 80px;
  max-width: inherit;
  padding-left: 12%;
}

a {
  text-decoration: none;
}
.login a {
  color: red;
}

.top_right a {
  color: black;
}
.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 600;
  color: red;
  background-color: white;
  border-radius: 8px;
}

.top_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 17%;
}

.options {
  width: 3vh;
}
.bottom_bar {
  display: flex;
  justify-content: center;
  padding-top: 5% ;
}

.logo{
  max-height: 100%;
  max-width: 100%;
  padding: 2% 5%;
}

a:hover {
  opacity: 0.5;
}


@media screen and (max-width: 480px) {
  
  .haut {
    height: 40vh;
    font-size: 15px;
  }
  .top_bar {
    justify-content: space-between;
    padding: 1% 0;
  }
  .logo_coin {
    height: 100%;
    padding-left: 1%;
    padding-right: 3% ;
  }
  .logo{
    max-height: 92%;
    max-width: 92%;
  }
  .login {
    width: 36%;
    height: 49%;
    font-size: 1.1vh;
  }

  .top_right {
    width: 20%;
  }

  .top_right a {
    font-size: 0.8vh;
  }

  .options {
    width: 3vh;
  }

}

@media screen and (min-width: 481px) and (max-width: 810px) {
  
  .logo_coin {
    padding-left: 5%;
  }

  .top_bar {
    padding: 1% 0;
  }

  .top_right a {
    font-size: 1.5vh;
  }

  .login {
    width: 22vh;
    height: 43%;
    font-size: 1.6vh;
  }

}

</style>
