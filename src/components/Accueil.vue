<template>
  <div id="app">
    <Header></Header>
    <div class="explication">
      <section>
        <img src="../assets/mrmonopoly.png" alt="image stras">
        <div class="bloc_texte">
          <h2> {{ titre_texte1 }} </h2>
          <p>
            <br>
            {{ texte1 }}
          </p>
        </div>
      </section>
      <section>
        <div class="bloc_texte">
          <h2> {{ titre_texte2 }} </h2>
          <p>
            <br>
            {{ texte2 }}
            <a href="https://www.regledujeu.fr/monopoly/"> ici </a>.
          </p>
        </div>
        <img src="../assets/mrmonopoly.png" alt="image strasbourg">
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './MyFooter'
import Header from './MyHeader'

export default {
  name: 'AccueilPage',
  props: { /* Props  est un attribut que vous pouvez
              definir au niveau du composant qui sera
              transmis directement au template. */
    tit: String
  },

  components: {
    Header,
    Footer

  },
  data: function () {
    return {
      texte2: 'Mesurez-vous à l’intelligence artificielle spécialement conçue pour jouer avec les plus isolés d’entre nous. Même le fin fond de l’Ardèche ne vous empêchera pas de jouer à votre jeu de plateau favori. Retrouvez le détail des règles du jeu ',

      texte1: 'L’équipe 3A de la faculté de Math-Info de Strasbourg a développé pour vous la version alsacienne du jeu de plateau le plus connu au monde. Mettez à la paille des adversaires des quatre coins du globe en investissant dans les propriétés de la capitale européenne. Jouez en ligne en famille ou entre amis, et faites-leur découvrir la ville de Strasbourg à travers des parties riches en rebondissements !',

      titre_texte2: 'Pas d’amis ? Sans connexion ? Pas de panique !',

      titre_texte1: 'Jouez à la version strasbourgeoise du célèbre jeu Monopoly',

      reglefr: 'https://www.regledujeu.fr/monopoly/'
    }
  }
}
</script>

<style>


 #app{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

body {
  font-family: 'Alata-regular';
  margin: 0;
  
}
h2 {
  color:#835B0E;
}

h1,h2,h3 {
  font-family: 'MotionPicture';
}

.explication{
  display: flex;
  flex-direction: column;
  padding-top: 8vh;
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
  font-size: 7vh;
}
.bloc_texte p{
  text-align: justify;
  font-size: 3vh;
}

.explication section:nth-child(2){
  background: rgba(0,0,0,.04);

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
    font-size: 6vh;
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
