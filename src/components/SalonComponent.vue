<template>
        <div class="salon">
            <p class="nom_salon"> {{nameLobby}}</p>
            <p class="nbr_part">{{ $t("nb_participants") }}</p>
            <p class="nbr_part">{{nbPlayers}} / {{maxNbPlayers}}</p>
            <button class="rej_salon" @click="joinLobby" type="boutton">{{ $t("rejoindre") }}</button>
    </div>  
</template>

<script>
export default {
    props: {
        nbPlayers: Number,
        nameLobby: String,
        maxNbPlayers: Number,
        public: Boolean,
        id: Number
    },

    methods: {
        joinLobby: function() {
            console.log(this.id+"\n"+this.$state.store.username)
        }
    }
}
</script>

<style>
    .salon{
        display: flex;
        flex-direction: row;
        justify-content: space-between;        
        background-color: #f5d18b;
        height: 60px;
        border-radius: 15px;
        padding-top: 15px;
    }

    .nom_salon{
        padding-top: 3px;
        padding-left: 30px;
        margin: 0%;
        font-weight: bold;
    }

    .rej_salon{
    border-radius: 20px;
    height: 30px;
    width: 100px;
    font-weight: bold;
    border: none;
    outline: none;
    background-color: #756e6e;
    color: #eceae7;
    margin-right: 30px;
    }

    .rej_salon:hover {
    background-color: #575151;
    }

    .creer_partie:active {
    background-color: #c4c4c4;
    }

    .nbr_part{
        padding-top: 3px;
    }

    .loop{
        padding-bottom: 20px;
        padding-right: 20px;
    }


</style>