<template>
    <Header></Header>
        <div class="content_forget">
            <section class ="container">
            <h1 class="animate__animated animate__bounce animate__repeat-2 forget_title">Entrez votre email</h1>
            <form class="form_container">
                    <input type="email" class="champs_form" required  id="email" aria-describedby="emailHelp" placeholder="Entrez votre mail pour récupérer votre mot de passe">
            </form>

                <div CLASS="btn_container">

                        <button href="#" class="btn btn-help bnt_nul">annuler</button>
                        <button type="submit" class="btn  btn_rec">recuperer</button>
                    </div>
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

</style>