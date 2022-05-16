<template >
    <!-- <h3 class="title">{{ tit }}</h3> -->
    <!--<h1 class="animate__animated animate__flipInX title">Page Login</h1>-->
    <Header></Header>
    <div class="container_login">
        <div class="img_login">
            <img id="img_login" src="../assets/img_form.png" alt="">
        </div>

        <div class="content_login">
            <h1 class="animate__animated animate__bounce animate__repeat-2 login_title">{{ $t("LOGIN") }}</h1>
            
            <form @submit.prevent="checkLogin" class="form_container">
               
                    <input  v-model.trim="username" required type="text" class="champs_form"   id="pseudo" aria-describedby="pseudo" :placeholder="$t('enter_name')">
                    <!-- <span v-if="!$v.username.required && $v.username$dirty" class="text-danger">Name is required!</span>   -->

                    <input v-model.trim="password" required type="password" class="champs_form"   id="password" :placeholder="$t('enter_password')">
                    <!-- <span v-if="!$v.password.required && $v.password$dirty" class="text-danger">Username is required!</span> -->

                    <div class="form-check">
                      <input class="form-check-input " type="radio" checked disabled>
                       
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

import Footer from './MyFooter'
import Header from './MyHeader'
import { required, alpha } from 'vuelidate/lib/validators'

export default {
  
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
        password: ''
      }
  },
  validation: {
      username: {
          required,
          alpha
      },
      password: {
          required
          
      }

  },
    methods: {
        checkLogin: function() {
            this.$store.dispatch('checkLogin', {
              username: this.username,
              password: this.password,
          }),
            this.$store.commit('rentreusrname',this.username); // on garde le nom pour comparer aux autres profils
            localStorage.setItem('own-username',this.username);
            this.$store.commit('gettingin',true); // on passe en état connecté

            
        },

        // submitForm(){
        //     this.$v.$touch();
        //     if(! this.$v.$invalid){
        //         console.log(`username: ${this.username}, password: ${this.password}`)
        //     }
        // }
        
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