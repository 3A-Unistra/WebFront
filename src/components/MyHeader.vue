<template>
  <div class="haut">

    <div class="top_bar">
      <img class="logo_coin" src="../assets/logo_couleur.png" alt="logo">
      <div class="login">
        <router-link to="/inscription">{{ $t("nav.signup") }}</router-link>
        &nbsp;/&nbsp;
        <router-link to="/login">{{ $t("nav.login") }}</router-link>
      </div>
      <div class="top_right">
        <router-link to="/lobby">{{ $t("nav.lobby") }}</router-link>
        &nbsp;|&nbsp;
        <router-link to="/profile">{{ $t("nav.profil") }}</router-link>
        &nbsp;|&nbsp;
        <router-link to="/">{{ $t("nav.home") }}</router-link>
        &nbsp;|&nbsp;    
        <img class="options" src="../assets/rouage.png" alt="options">
        <div class="locale-switcher">
          <select v-model="$i18n.locale">
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bottom_bar">
      <img class="logo" src="../assets/logo_couleur.png" alt="logo">
    </div>
  </div>
</template>

<style>


.haut {
  display: flex;
  flex-direction: column;
  height: 70vh;
  padding: 0% 0%;
  max-width: 100%;
  background-image: url(../assets/stras.jpg);
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  font-size: 2vh;
  z-index: 3;
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

.logo_coin {
  height: 80px;
  max-width: inherit;
  padding-right: 12%;
  padding-top: 1%;
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
  width: 18%;
  height: 90%;
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
  width: 5vh;
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
    padding-left: 3%;
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
