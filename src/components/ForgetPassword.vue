<template>
    <Header></Header>

        <div class="content_forget">
            <section class ="container">
            <h1 class="animate__animated animate__bounce animate__repeat-2 forget_title">Entrez votre email</h1>
             <div v-if="error != ''" class="alert alert-danger fade in">
                   {{ error }}
                   </div>
                   <div v-if="succes != ''" class="alert alert-success" role="alert">
                   {{ succes }}
                   </div>
            <form  @submit.prevent="checkforgot" class="form_container">
                    <input v-model="forgetPass" type="email" class="champs_form" required  id="email" aria-describedby="emailHelp" placeholder="Entrez votre mail pour récupérer votre mot de passe">
                    <div CLASS="btn_container">
                        <button href="#" class="btn btn-help bnt_nul"><router-link to="/login">annuler</router-link></button>
                        <button type="submit" class="btn  btn_rec">recuperer</button>
                    </div>
            </form>
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
                <li class="menu_info"><router-link class="menu_ff" to="/">home</router-link></li>
                <li class="menu_info"><router-link class="menu_ff" to="/login"> login</router-link></li>
                <li class="menu_info"><router-link class="menu_ff" to="/signup">signup</router-link></li>
               
            </ul>

            <ul class="list_footer n2">
                <li class="menu_title"> reseaux </li>
                <hr>
                <div class="container_logo">
                   <li class="menu_logo">
                        <a href="https://www.instagram.com/terms/unblock/?next=/strassopoly/">
                            <img id="insta_size" src="../assets/instagram.png" alt="instagram">
                        </a>
                    </li>
                    <li class="menu_logo">
                        <a href="https://www.facebook.com/profile.php?id=100080875824582">
                            <img class="social fb" src="../assets/facebook.png" alt="facebook">
                        </a>
                    </li>
                    <li class="menu_logo">
                        <a href="https://twitter.com/PolyStras">
                            <img class="social twitter" src="../assets/twitter.png" alt="twitter">
                        </a>
                    </li>
                </div>
            </ul>
            <ul class="list_footer n3">
                <li class="menu_title"> liens</li>
                <hr>
                <li class="menu_info">cond_gene</li>
                <li class="menu_info">faq</li>
                <li class="menu_info">license</li>
                <li class="menu_info">aide</li>
            </ul>
        </div>
        
        <div class="store_bg">
            <p class="store_parag">
                 propagande1 
                <br>
                propagande2
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
</template>
<!-- Script JS -->
<script>
import Header from '../components/MyHeader'
export default {
    name: 'ForgetPage',
  props: {
      tit: String,
  },
  data () {
    return {
        email: '',
        error:"",
        succes:""
    }
  },
  
    methods: {
        checkforgot: function() {
            this.$store.dispatch('checkforgot', {
              forgetPass: this.forgetPass,
          }).then(() => {
              this.succes ="Please check your email";
          }) .catch((e) => {
                if (e.response.status === 404) {
                    this.error = "No account with this mail exits";
                }
                else {
                    this.error = "Please resell later.";
                }
    })   
    }
},

components: {
  Header,
}

}
</script>

<!-- style Css -->

<style>
    #app{
         background: url("../assets/background.png");
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width:auto;
    }

    .content_forget{
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 300px;
        max-width: 800px;
        background-color:#c6c6c6 ;
        border-radius:30px ;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        padding: 50px;
        }

    .form_container{
        display: flex;
        justify-content: center;
    }
    .champs_form{
        display: flex;
        width: 600px;
        padding:15px;
        border-radius:10px;
        border:1px solid #835B0E;
        background:white;
        height: 60px;
        margin-top:30px;
    }
    .forget_title{
        display: flex;
        justify-content: center;
        color:#835B0E;
        padding-left: auto;
        padding-right: auto;
    }
    .btn_forget{
        background:#d49b2f;
    }
    .btn_container{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        margin-top:30px;
    }
    .btn_rec{
        display: block;
        justify-content: center;
        background-color:#ca9735;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 10px;
        padding-top:10px;
    }
     .btn_rec:hover {
        background-color:#967027 ;
        }
    .btn_rec:active {
        background-color:#694f1b 
        }
    .bnt_nul{
        display: block;
        justify-content: center;
        background-color:grey;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 10px;
        padding-top:10px;

    }
     .bnt_nul:hover {
        background-color:#504b4b;
        }
    .btn_nul:active {
       background-color:#222121;
    }
    a {
    text-decoration: none;
    color:black;
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

    /* mode tablette*/
    @media screen and (max-width: 700px) {
        .champs_form{
            max-width: 500px;
        }
        .forget_title{
            font-size:30px;
            margin-top:10px;
        }
        .btn_container{
            flex-direction: column;
            align-items: center;
        }
        
        .btn{
            width:200px;
        }
        .content_forget{
            height:auto;
            width:90%;
        }
        .bnt_nul{
            order: 2;
        }
        .btn_rec{
            order: 1;
             margin-bottom: 15px;
        }
        .dropdown-toggle{
            max-width:125px;
        }

    }
    @media screen and (max-width: 450px) {
        .container{
            max-width:300px;
        }
        

    }

    @media screen  and (min-width: 450px) and (max-width: 700px) {
        .container{
            max-width:370px;
            margin-right: 30px;
        }
                

    }
    
</style>
