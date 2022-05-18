<template >    
    <div id="app">
      <Header></Header>
    </div>
    <div class="container_login">
        <div class="img_login">
            <img id="img_login" src="../assets/img_form.png" alt="">
        </div>
        <div class="content_login">
            <h1 class="animate__animated animate__bounce animate__repeat-2 login_title">{{ $t("LOGIN") }}</h1>
           
            <form @submit.prevent="checkLogin" class="form_container">
                 <div v-if="error != ''" class="alert alert-danger fade in">
                   {{ error }}
                   </div>
                   <div v-if="succes != ''" class="alert alert-success" role="alert">
                   {{ succes }}
                   </div> 
                   <input  v-model.trim="username" required type="text" class="champs_form"   id="pseudo" aria-describedby="pseudo" :placeholder="$t('enter_name')">
                    <input v-model.trim="password" required type="password" class="champs_form"   id="password" :placeholder="$t('enter_password')">
      
                    <div class="form-check">             
                      <label class="form-check-label"><router-link to="/forget">{{ $t("forgot_passw") }}</router-link> </label> 
                    </div>
                    
                    <button type="submit" class="champs_form btn btn-submit btn-lg btn_login" >{{ $t("to_login") }}</button>
            
            
            </form>
        </div>
      </div>
     <Footer></Footer>
</template>

<!-- Script JS -->
<script>
import Footer from '../components/MyFooter'
import Header from '../components/MyHeader'
export default {
  mounted () {
    this.$store.commit('changePage','login');
  },
  created () {
  },
     name: 'LoginPage',
     components: {
        Header,
        Footer
    },
    data () {
      return {
        username: '',
        password: '',
        error:"",
        succes:""
      }
  },
  
    methods: {
        checkLogin: function() {
        this.$store.dispatch('checkLogin', {
          username: this.username,
          password: this.password,
    }).then(() => {
        this.$store.commit('rentreusrname', this.username); // on garde le nom pour comparer aux autres profils
        localStorage.setItem('own-username', this.username);
        this.$store.commit('gettingin', true); // on passe en état connecté
        this.succes ="vous etes bien connecter";
    }).catch((e) => {
        if (e.response.status === 404) {
            this.error = "Identifiants non reconnus.";
        }
        else if(e.response.status==403){
          this.error = "Invalid password.";
        }
        else {
           this.error = "Une erreur lors de connexion.";
        }
    })
},
        dropdown_options() {
          var click = document.getElementById("liste_option");  

          if(click.style.display ==="none") {  
            click.style.display ="block";  
          } 
          else {  
            click.style.display ="none"; 
          }
        },
    }
}



</script>

<!-- Style Css -->
<style>

    #app{
        background-image: url("../assets/background.png");
    }

    .title{
        text-align: center;
        
    }
    
    /* flexbox formulaire d'login */
    .container_login{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    #img_login{
        max-width: 300px;
        max-height: 500px;
    }
    .img_login{
        display: block;
        margin-left: 100px;
    }
    .content_login{
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
    .login_title{
        color:#835B0E;
    }
    .btn_login{
        background:#d49b2f;
    }
    .form-check-label{
      padding-bottom: 10px;
    }
@media screen and (max-width: 450px) {
    .img_login{
        margin-left: 0px;
    }
    input{
        min-width: 300px;
    }
    .content_login{
        max-width: 350px;
        margin-left: 0px;
    }
    .container_login{
        margin-left: 0px;
    }
}
    
</style>