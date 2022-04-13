<template>
    <div class="score_tab">
        <div class="player_rank">
            {{ranking}}
        </div>
        <div class="player_info">
            <img id="pfp_result" :src="profilePicture">
            <p>{{namePlayer}}</p>
        </div>
        <div class="player_score">
            {{score}}
        </div>
    </div>
</template>

<style scoped>

.score_tab {
    display:flex;
    flex-direction: row;
    width: 78%;
    height: 10vh;
    justify-content: space-around;
    border-top: 1px solid black;
    font-size: 2.2vh;
}

.result_line {
    display: flex;
    flex-direction: row;
}
.player_rank, .player_score, .player_info {
    height: inherit;
    margin-top:3%;
    display: flex;
    justify-content: center;
}

.player_info {
    flex-direction: row;
    width: 40%;
    vertical-align: middle;
}

.player_rank {
    width: 25%;
}

.player_score {
    width: 25%;
}

#pfp_result {
    height: 40px;
    padding-right: 8%;
    margin-top: -2%;
}

</style>

<script>
export default {
    props: {
        namePlayer: String,
        profilePicture: String,
        score: Number,
        ranking: Number
    },

    /*data: function() {
    return { 
        profilePicture:"",
        namePlayer:"",
        score:7,
        ranking
        }
    },*/
}
</script>