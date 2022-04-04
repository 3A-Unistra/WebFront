<template>
    <div class="loop" v-for="salon in salons" :key="salon.id_salon">
        <div class="salon">
            <p class="nom_salon">{{ $t("salon") }} N° {{salon.id_salon}}</p>
            <p class="nbr_part">{{ $t("nb_participants") }}{{salon.nb_participants}}</p>
            <button class="rej_salon" type="boutton">{{ $t("rejoindre") }}</button>
        </div>
    </div>

        

</template>

<script>
export default {
    data: function() {
    return { 
      salons: [
        {
            id_salon : '1',
            nb_participants: '6'
        },
        {
            id_salon : '2',
            nb_participants: '4'
        },
        {
            id_salon : '3',
            nb_participants: '7'
        },
        {
            id_salon : '4',
            nb_participants: '5'
        },
        {
            id_salon : '5',
            nb_participants: '8'
        },
        {
            id_salon : '6',
            nb_participants: '4'
        },
        {
            id_salon : '7',
            nb_participants: '8'
        },
        {
            id_salon : '8',
            nb_participants: '6'
        }
      ]
    }
}}
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