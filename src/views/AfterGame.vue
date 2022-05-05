<template>
    <Header></Header>
    <div class="results">
        <div class="title_results">
            <img class="star_title_result" src="../assets/star.png" alt="logo app store">
            <span id="result_h1" @click="updateInfos(3,'ranking')"> {{ $t("resultat") }} </span>
            <img class="star_title_result"  src="../assets/star.png" alt="logo app store">
        </div>
        <div class="column_name">
            <span>{{ $t("rang") }}</span>
            <span id="title_player">{{ $t("joueurs") }}</span>
            <span>{{ $t("score") }}</span>
        </div>
        <PlayerResult id="loop_result" v-for="index in numberPlayers" :key="index-1" 
        :ranking= 'players[index-1].ranking' :namePlayer= 'players[index-1].namePlayer' :login= 'players[index-1].namePlayer' :profilePicture= 'players[index-1].profilePicture' :score= 'players[index-1].score'>
        </PlayerResult>
        <div class="button_row">
            <button class="bt_lobby" type=button><router-link to="/Lobby">{{ $t("return_lobby") }}</router-link></button>
            <button class="bt_quitter" type=button><router-link to="/">{{ $t("quitter") }}</router-link></button>
        </div>
    </div>
    <Footer></Footer>
</template>

<script>
import Footer from '../components/MyFooter'
import Header from '../components/MyHeader'
import PlayerResult from '../components/PlayerResult.vue'

export default {
    components: {
        Footer,
        Header,
        PlayerResult
    },
    mounted () {
        // à voir comment se passe la réception de données après la game
        this.$store.dispatch('verifToken');
  },
    methods: {
        updateInfos: function (numPlayer,toUpdate) { 
            // d'abord le numéro du joueur dans le tableau, puis le nom de la caractéristique à modifier (score,ranking,...)
            if (toUpdate == 'score') {
                this.players[numPlayer].score = 2;
            } else if(toUpdate == 'ranking') {
                this.players[numPlayer].ranking = 2;
            } else if(toUpdate == 'namePlayer') {
                this.players[numPlayer].namePlayer = 2;
            } else if(toUpdate == 'profilePicture') {
                this.players[numPlayer].profilePicture = 2;
            } else {
                console.log("paramètre non existant");
            }
        },
        getInfosPlayers(listPlayers) {
            this.players = listPlayers
        },
        
    },
    data : function () {
        return {
            numberPlayers: this.$store.state.numberPlayers,
            players: [
                {
                    profilePicture:require('../assets/grin.png'),
                    namePlayer:"ra",
                    login:"ra",
                    score:5,
                    ranking: 1
                },
                {
                    profilePicture: require('../assets/grin.png'),
                    namePlayer:"joueur2",
                    login:"",
                    score:4,
                    ranking: 2
                },
                {
                    profilePicture:require('../assets/grin.png'),
                    namePlayer:"joueur3",
                    login:"",
                    score:5,
                    ranking: 3
                },
                {
                    profilePicture:require('../assets/grin.png'),
                    namePlayer:"joueur4",
                    login:"",
                    score:5,
                    ranking: 4
                },
                {
                    profilePicture:"",
                    namePlayer:"",
                    login:"",
                    score:89,
                    ranking: 5
                },
                {
                    profilePicture:"",
                    namePlayer:"",
                    login:"",
                    score:89,
                    ranking: 5
                }                 
            ]
        }
    }
}
</script>

<style scoped>

.results {
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.title_results {
    display: flex;
    flex-direction: row;
    width: 68%;
    justify-content: space-evenly;
    align-items: center;
    padding: 5% 0;

}
#result_h1{
    padding: 4% 0 3% 0;
    margin:0;
    color: #cd823f;
    font-weight: 800;
    font-size: 6vh;
}

.star_title_result {
    width: 80px;
    height: 80px;
}

.column_name {
    height: 8vh;
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 78%;
    justify-content: space-around;
    font-weight: 900;
    font-size: 3vh;
    background-color: #CA9735;
}
#title_player {
    padding:0 9% 0 9%;
}
#loop_result {
    width: 78%;
}

.button_row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top: 10%;
    font-size: 3vh;
}
a {
    text-decoration: none;
    color: white;
}
.bt_lobby{
    border-radius: 15px;
    height: 10vh;
    width: 20%;
    font-weight: bold;
    border: none;
    outline: none;
    background-color: #d3aa5d ;
    color: #6e4d0b;
    margin-left: 15%;
}

.bt_lobby:hover{
  background-color:#b08d4d;
}

.bt_quitter{
    border-radius: 15px;
    height: 10vh;
    width: 20%;
    font-weight: bold;
    border: none;
    outline: none;
    background-color: #bba8a8;
    margin-right: 15%;
}

.bt_quitter:hover{
  background-color:#817373;
}
</style>