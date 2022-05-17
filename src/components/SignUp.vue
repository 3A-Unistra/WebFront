<template >
    <!-- <h3 class="title">{{ tit }}</h3> 
    <h1 class="animate__animated animate__flipInX title">Page d'INSCRIPTION</h1>-->
     <div class="haut">
    <Header></Header>
    
</div>
    <div class="container_inscription">
        <div class="img_inscription">
            <img id="img_inscription" src="../assets/img_form.png" alt="">
        </div>

        <div class="content_inscription">
            <h1 class="animate__animated animate__bounce animate__repeat-2 inscription_title">{{ $t("SIGNUP") }}</h1>

            <form @submit.prevent="createAccount" class="form_container">
                     <div v-if="error != ''" class="alert alert-danger fade in">
                        {{ error }}
                   </div>
                   <div v-if="succes != ''" class="alert alert-success" role="alert">
                            {{ succes }}
                   </div>
                    <input v-model="name" type="text" class="champs_form" required  id="pseudo" aria-describedby="pseudo" :placeholder="$t('enter_name')">
                
                    <input v-model="login" type="text" class="champs_form" required  id="nom" aria-describedby="nom" :placeholder="$t('enter_pseudo')">
                
                    <input v-model="email" type="email" class="champs_form" required  id="email" aria-describedby="emailHelp" :placeholder="$t('enter_mail')">
                
                    <input v-model="password" type="password" class="champs_form" required  id="password" :placeholder="$t('enter_password')">

                    <input v-model="verifPassword" type="password" class="champs_form" required  id="password" :placeholder="$t('confirm_password')">
                
                    <button :disabled="PasswordDontMatch" type="submit" class="champs_form btn btn-submit btn-lg btn_inscription" >{{ $t("signup") }}</button>
            
            </form>
        </div>
      </div>
     
<Footer></Footer>
</template>

<!-- Script JS -->

<script>

import Header from './MyHeader'
import Footer from './MyFooter'

export default {
  mounted () {
    this.$store.commit('changePage','signup');
  },
    name: 'SignUpPage',
  props: {
      tit: String,
  },
  data () {
      return {
        login: '',
        password: '',
        email: '',
        name:'',
        verifPassword: '',
        error:"",
        succes:""
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
        createAccount: function() {
          this.$store.dispatch('createAccount', {
              email:this.email,
              name :this.name ,
              login: this.login,
              password: this.password,
          }).then(() => {
              this.succes ="vous etes bien inscrit";
          }).catch((e) => {
                if (e.response.status === 409) {
                this.error = "User already exists.";
            }
                else if(e.response.status==500){
                this.error = "Icannot find user'.";
                }
                else {
                    this.error = "Une erreur lors de l'inscription.";
                }
    })
  },
  },
  computed: {
        PasswordDontMatch: function () {
          if (this.password == this.verifPassword) {
              return false;
          } else {
              return true;
          }
          
      },
  },
  components: {
    Header,
    Footer
    
}
}
</script>

<!-- style Css -->

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




    #app{
         background: url("../assets/background.png");
    }
   
    .title{
        text-align: center;  
    }
   
    /* flexbox formulaire d'inscription */
    .container_inscription{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        flex-wrap: wrap;
        justify-content: space-evenly;
         background: url("../assets/background.png");
    }
    #img_inscription{
        max-width: 300px;
        max-height: 500px;
    }
    .img_inscription{
        display: block;
        margin-left: 100px;
    }
    .content_inscription{
        display: block;
        margin-left: 100px;
        margin-right:50px;
    }

    .form_container{
        display: flex;
        flex-direction: column;
    }
    .champs_form{
        display: block;
        margin-bottom: 10px;
        padding: 8px;
        min-width:400px;
        border:1px solid #835B0E;
        background:white
    }
    .inscription_title{
        color:#835B0E;
    }
    .btn_inscription{
        background:#d49b2f;
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
    max-width: 180px;
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

    @media screen and (max-width: 450px) {
        .img_inscription{
            margin-left: 0px;
        }
        input{
            min-width: 300px;
        }
        .content_inscription{
            max-width: 350px;
            margin-left: 0px;
        }
        .container_inscription{
            margin-left: 0px;
        }
}
        
</style>
