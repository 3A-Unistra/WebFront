<template>
  <div id="app">
    <Header></Header>
    <!--------------------------------------------------------->
    <div class="explication">
      <section>
        <img src="../assets/mrmonopoly.png" alt="image stras">
        <div class="bloc_texte">
          <h2> {{ $t("titre_texte1") }} </h2>
          <p>
            <br>
            {{ $t("texte1") }}
          </p>
        </div>
      </section>
      <section>
        <div class="bloc_texte">
          <h2> {{ $t("titre_texte2") }} </h2>
          <p>
            <br>
            {{ $t("texte2") }}
            <a :href="$t('regle')"> {{ $t("ici") }} </a>.
          </p>
        </div>
        <img src="../assets/mrmonopoly.png" alt="image strasbourg">
      </section>
    </div>
    </div>
     <Footer></Footer>
</template>

<script>
import Footer from './MyFooter'
import Header from './MyHeader'

export default {
  mounted () {
    this.$store.commit('changePage','home');
  },
  name: 'HomePage',
  props: { 
    tit: String
  },

  components: {
    Header,
    Footer
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
        }
}}
</script>

<style>
 #app{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: url("../assets/background.png");  
}

.explication {
  font-family: 'Alata-regular';
  margin: 0;
  
}
h2 {
  color:#835B0E;
}

.explication{
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  /* padding-top: 8vh; */
  background: url("../assets/background.png");
}

section{
  display: flex;
  flex-direction:row ;
  justify-content: space-around;
  padding:4% 0%;
}

section img {
  width: 30vh;
  height: 50vh;
}

.bloc_texte {
  display: flex;
  flex-direction: column;
  width: 35%;
}
.bloc_texte h2 {
  font-size: 5.5vh;
  text-align:justify;
}
.bloc_texte p{
  text-align: justify;
  font-size: 3vh;
  text-align:justify;

}

@media screen and (max-width: 480px) {

  section {
    justify-content: initial;
    justify-content: center;
  }
  .bloc_texte {
    width: 100%;
  }

  .bloc_texte h2 {
    font-size: 5vh;
    text-align: center;
  }
  .bloc_texte p {
    padding: 3%;
    width: 100%;
    font-size: 16px;
    text-align: justify;
  }

  section img {
    display: none;
  }

  section {
    align-items: center;
  }

  .bottom {
    max-width: 100%;
  }

}

@media screen and (max-width: 810px) {

  section img {
    display: none;
  }
  section {
    padding-bottom: 3%;
  }

  .bloc_texte {
    width: 90%;
  }

  .bloc_texte p {
    font-size: 2.5vh;
  }

  .explication {
    padding-top: 1vh ;
  }

}
</style>
