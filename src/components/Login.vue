<template >
    <!-- <h3 class="title">{{ tit }}</h3> -->
    <h1 class="animate__animated animate__flipInX title">Page Login</h1>

    <div class="container_login">
        <div class="img_login">
            <img id="img_login" src="../assets/img_form.png" alt="">
        </div>

        <div class="content_login">
            <h1 class="animate__animated animate__bounce animate__repeat-2 login_title">LOGIN</h1>
            
            <form class="form_container">
               
                    <input type="text" class="champs_form" required  id="pseudo" aria-describedby="pseudo" placeholder="Entrer votre pseudo">
                                                
                    <input type="password" class="champs_form" required  id="password" placeholder="Password">
                    <div class="form-check">
                      <input class="form-check-input " type="radio" checked disabled>
                       
                      <label class="form-check-label"><router-link to="/forget">Mot de pass oublié</router-link> </label>
                      
                    </div>
                    
                    <button type="button" class="champs_form btn btn-submit btn-lg btn_login" >Se connecter</button>
            </form>
        </div>
      </div>
</template>

<!-- Script JS -->
<script>
export default {
  
  created () {
  },
     name: 'loginPage',
}


</script>

<!-- Style Css -->
<style scoped>
    #app{
        background-image: url("../assets/background.png");
    }

    .title{
        text-align: center;
        
    }
    ul{
        max-width:500px;
        background-color:rgb(211, 202, 202);
        margin-left:auto;
        margin-right:auto;
    }
   
    /* flexbox formulaire d'login */
    .container_login{
        display: flex;
        flex-direction: row;
        margin-top: 100px;
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
    
</style>