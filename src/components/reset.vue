<template>
    <Header></Header>
        <div class="content_forget">
           <form @submit.prevent="checkreset">
            <section class ="container">
            <h1 class="animate__animated animate__bounce animate__repeat-2 forget_title">{{ $t("Entrez votre Nouveau mot de passe")}}</h1>
               <input v-model="password" type="password" class="champs_form" required  id="zpassword" placeholder="Enter password">
               <input v-model="confirmpassword" type="password" class="champs_form" required  id="password" placeholder="Confirm password">
            </section>
            <div CLASS="btn_container">

                        <button href="#" class="btn btn-help bnt_nul">{{ $t("Annuler")}}</button>
                        <button type="submit" class="btn  btn_rec">{{ $t("Confirmer")}}</button>
            </div>
            </form>
        </div>
    <Footer></Footer>
</template>

<script>
import Footer from './MyFooter'
import Header from './MyHeader'
export default {
    name: 'ResetPage',
  props: {
      tit: String,
  },
    data () {
    return {
       password: '',
       confirmpassword: ''
    }
  },methods: {
      
        checkreset: function() {
            this.$store.dispatch('checkreset', {
              password: this.password,
              confirmpassword:this.confirmpassword,
              token :this.$route.params.token
          })    
    }
    },
components: {
    Header,
    Footer
}
}
</script>

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
        min-width: 600px;
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
    @media screen and (max-width: 450px){
    .champs_form{
        margin-left:0px;
        margin-top:5px;
        min-width: 370px
    }
    .content_forget{
        margin-left: -50px;
        }
    .container{
        margin-left: 0px;
    }
    }
</style>
