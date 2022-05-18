<template>
  <div class="haut">
    
    <div class="top_bar">
      
      <div class="Menu_principale dropdown">

          <button class="btn bg-white dropdown-toggle" type="button" data-toggle="dropdown" v-if="this.$store.state.username">
             <img class="gift" src="../assets/menu.png"/> 
            <!-- MENU -->
          </button>
            <ul class="dropdown-menu">
              
                <li class="drop_elem" v-if="this.$store.state.username &&this.$store.state.loggedin && this.$store.state.nomPage !== 'profile'"> <router-link to="/profile" @click="getUserProfile">{{ $t("profil") }}</router-link></li>
                
                <li class="drop_elem" v-if="this.$store.state.username && this.$store.state.loggedin && this.$store.state.nomPage !== 'postlogin'"> <router-link to="/post_login">{{ $t("post_login") }}</router-link></li>
            </ul>
          </div>
           <button class="login" v-if="!this.$store.state.username && this.$store.state.loggedin === false && this.$store.state.nomPage !== 'home'" @click="this.$router.push('/')">
                   {{ $t("home") }}
                    </button>
           <button v-if="!this.$store.state.username && this.$store.state.loggedin === false && this.$store.state.nomPage !== 'signup'"  @click="this.$router.push('/SignUp')" class="login">
              {{ $t("signup") }}
           </button>

             <button v-if="!this.$store.state.username && this.$store.state.loggedin === false && this.$store.state.nomPage !== 'login'"  @click="this.$router.push('/Login')" class="login">
              {{ $t("login") }}
             </button>

           <div class="options">
          <button @click="dropdown_options"></button>
          <ul id="liste_option">            
            <span class="titre_dropdown">
              {{ $t("langue") }}:
            </span>
            <li class="list_elem">
              <div class="locale-switcher">
                <select v-model="$i18n.locale">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
                
              </div> 
            </li>
            <LogOutButton style="margin-bottom: 0;"></LogOutButton>
          </ul>
        </div>
        </div>

        
       
    </div>


</template>

<script>
import LogOutButton from '../components/LogOutButton'

export default {        
    mounted() {
      this.dropdown_options();
    },
    components: {
      LogOutButton
    },
    
    data(){
      return{
      }
    },
    methods: {
        dropdown_options() {
          var click = document.getElementById("liste_option");  

          if(click.style.display ==="none") {  
            click.style.display ="block";  
          } 
          else {  
            click.style.display ="none"; 
          }
        },
        getUserProfile: function(){

          // vu que c'est son propre profil
          this.$store.commit('checkingSameProfile',true);

          // on stocke l'username cliqué dans le store et en localstorage
          this.$store.commit('changeUsrnameProfil',this.$store.state.username);
          localStorage.setItem('username-profil',this.$store.state.username);
            
  
          //puis on va sur le profil
          this.$router.push('/profile');
        }
    }
};
</script>  
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
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 2vh;
  z-index: 3;
  }
.login{
  margin-right: auto;
  margin-left: auto;
}
.dropdown-menu{
  padding:20px;
  min-width:200px;
  /* display: flex; */
  flex-direction: column;
  justify-content:space-around; 
}
.drop_elem{
  font-weight: bold;
  margin-bottom: 15px;
}
.top_bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  max-height: 11%;
  padding: 1% 3%;
  margin-left: 5%;
  margin-right: 5%;
}
.gift{
  max-width:30px;
  max-height: 30px;
}
.menu_mr{
  /* margin-left:25px; */
  margin-right:20px;
}
.name_menu{
  font-size:20px;
}

.logo_coin {
  height: 80px;
  max-width: inherit;
  padding-right: 12%;
  padding-top: 1%;
}

.top_right a {
  color: black;
  font-size: 18px;
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

.logo{
  max-height: 100%;
  max-width: 100%;
  padding: 2% 5%;
}

a:hover {
  opacity: 0.5;
}

 /*  DROPDOWN BELOW */
.options {
  display: block;
  width: 50px;
  height: 50px;
}
.dropdown-toggle{
  /* font-size: 18px; */
  padding:5px;
}


.options button {
  /* width: inherit;
  height: inherit; */
  background-image: url(../assets/settings.png);
  background-size: cover;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width:25px;
  height:25px;
  margin-left: 20px;
  margin-top: 10px;
}

#liste_option {
  display: none;
  list-style-type: none;
  z-index: 1;
  background-color: white;
  color: #cd823f;
  top: 7%;
  right: 1%;
  width: 20vh;
  border-radius: 25px;
  padding: 1% 0 2% 0;
  position: absolute;
}

#close_button {
  padding: 1% 0 2% 3% ;
  font-size: 5vh;
  cursor: pointer;
}

.list_elem:nth-child(2) {
  padding-bottom: 10%;
  padding-top: 4%;
  padding-left: 25% ;
}

.list_elem {
  padding-top: 0;
  padding-bottom: 4%;
  padding-left: 10%;
  font-size: 2vh;
}

.titre_dropdown:first-child {
  padding-top: 4%;
}

.titre_dropdown {
  font-size: 2.5vh;
  font-weight: 600;
  padding-left: 18%;
  height: 30%;
}

.bottom_bar {
  display: flex;
  justify-content: center;
  padding-top: 5% ;
}

#to_light_mode, #to_dark_mode {
  padding-top: 4% ;
  cursor: pointer;
}

#to_dark_mode:hover {
  color: white;
  background-color: #3a210c;
}

#to_light_mode:hover {
  color: #cd823f;
  background-color: rgba(255, 255, 255, 0.219);
}

/* fin dropdown */

/* TOGGLE SWITCH */

.change_mode {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 3%;
}

.symbol_mode {
  width: 31px;
  height: 31px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: black;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
button.deconnection{
  max-width:120px;
  height:100%;
  font-size:12px;
}
.deconnection .icone{
  max-width: 25%;
  max-height: 25%;
}

.drop_elem:hover {
  background-color:#f5d18b;
  
}
.drop_elem a{
  font-size:22px;
  font-weight: bold;
  padding:15px 20px 15px 20px;
}


/* Mode mobile */
@media screen and (max-width: 480px) {

  .haut {
    height: 40vh;
    font-size: 15px;
  }
  .login{
    /* margin-top:90px;
    margin-left:190px;
    padding:3px 10px 3px 10px;
    width:auto; */
    margin-left: 10px;
  }
  .top_bar{
    /* margin-left: -50px; */
    flex-direction:row;
    /* box-sizing:unset; */
    flex-wrap: wrap;
    justify-content:space-evenly;
  }
  .logo_coin{
    display:none;
  }
  .options{
   /* width: inherit;
  height: inherit;
   */
   margin-left: -25%;
   margin-right:0px;

  }
  .button.deconnection{
    margin-left: 40%;
  }
 

}

/* mode tablette */
@media screen and (min-width: 480px) and (max-width: 1000px) {
 
 .top_bar{
   flex-wrap: wrap;
   flex-direction:column;
   justify-content:center;
   box-sizing:unset;
 }
 .haut {
    height: 40vh;
    font-size: 15px;
  }
  .sp_menu{
    display: none;
  }

  .top_right{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    box-sizing:unset;
    margin-top:100px;
    margin-right:-90px;
  }
  .logo_coin{
    display:none;
  }
  /* .options button{
   width: inherit;
  height: inherit;
  } */
  
}

/*  */

/* Style the navigation menu */
.topnav {
  overflow: hidden;
  background-color: #333;
  position: relative;
}

/* Hide the links inside the navigation menu (except for logo/home) */
.topnav #myLinks {
  display: none;
}

/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

/* Style the hamburger menu */
.topnav a.icon {
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04AA6D;
  color: white;
}


</style>
