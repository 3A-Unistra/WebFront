<template >
    <!-- <h3 class="title">{{ tit }}</h3> 
    <h1 class="animate__animated animate__flipInX title">Page d'INSCRIPTION</h1>-->
    <Header></Header>

    <div class="container_inscription">
        <div class="img_inscription">
            <img id="img_inscription" src="../assets/img_form.png" alt="">
        </div>

        <div class="content_inscription">
            <h1 class="animate__animated animate__bounce animate__repeat-2 inscription_title">{{ $t("SIGNUP") }}</h1>

            <form @submit.prevent="createAccount" class="form_container">
               
                    <input v-model="login" type="text" class="champs_form" required  id="pseudo" aria-describedby="pseudo" :placeholder="$t('enter_pseudo')">
                
                    <input v-model="name" type="text" class="champs_form" required  id="nom" aria-describedby="nom" :placeholder="$t('enter_name')">
                
                    <input v-model="email" type="email" class="champs_form" required  id="email" aria-describedby="emailHelp" :placeholder="$t('enter_mail')">
                
                    <input v-model="password" type="password" class="champs_form" required  id="password" :placeholder="$t('enter_password')">

                    <input v-model="verifPassword" type="password" class="champs_form" required  id="password" :placeholder="$t('confirm_password')">
                
                    <button type="submit" class="champs_form btn btn-submit btn-lg btn_inscription" >{{ $t("signup") }}</button>
            
            </form>
        </div>
      </div>
      <Footer></Footer>

    <!-- <a class="uk-button uk-button-primary" href="#target" uk-scroll>  Scroll up </a>
    <a href="#" uk-totop uk-scroll> </a> -->

</template>

<!-- Script JS -->

<script>

import Footer from './MyFooter'
import Header from './MyHeader'


export default {
    name: 'inscriptionPage',
  props: {/* Props  est un attribut que vous pouvez 
              definir au niveau du composant qui sera 
              transmis directement au template.*/
      tit: String,
  },
  data () {
      return {
        login: '',
        password: '',
        email: '',
        name:'',
        verifPassword: ''
      }
  },
  methods: {
      createAccount: function () {
          this.$store.dispatch('createAccount', {
              email:this.email,
              name :this.name ,
              login: this.login,
              password: this.password,
          })
      }
  },
  components: {
    Header,
    Footer
}
    
}
</script>

<!-- style Css -->

<style>
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
