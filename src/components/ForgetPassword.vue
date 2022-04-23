<template>
    <Header></Header>
        <div class="content_forget">
            <section class ="container">
            <h1 class="animate__animated animate__bounce animate__repeat-2 forget_title">{{ $t("Entrez votre email") }}</h1>
            <form  @submit.prevent="checkforgot" class="form_container">
                    <input v-model="forgetPass" type="email" class="champs_form" required  id="email" aria-describedby="emailHelp" :placeholder=" $t('Entrez votre mail pour modifier votre mot de passe')">
                    <div CLASS="btn_container">

                        <button class="btn btn-help bnt_nul" type="button"><router-link to="/Login">{{ $t("Annuler") }}</router-link></button>
                        <button type="submit" class="btn  btn_rec">{{ $t("recuperer") }}</button>
                    </div>
            </form>
            </section>
        </div>
    <Footer></Footer>
</template>

<!-- Script JS -->

<script>
import Footer from './MyFooter'
import Header from './MyHeader'
export default {
    name: 'ForgetPage',
  props: {
      tit: String,
  },
  data () {
    return {
        email: '',
    }
  },
  
    methods: {
        checkforgot: function() {
            this.$store.dispatch('checkforgot', {
              forgetPass: this.forgetPass,
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

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        display: flex;
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
        display: flex;
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
        .bnt_nul{
            margin-bottom: 15px;
        }
        .btn{
            width:200px;
        }
        .content_forget{
            height:auto;
            width:90%;
        }
    }

    /* mode telephone */
    @media screen and (max-width: 480px){

    }
</style>