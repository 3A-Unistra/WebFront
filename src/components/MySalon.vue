<template>
<!-- v-for="gen in gens" :key="gen.pseudo" -->

    <div class="loop" v-for="salon in salons" :key="salon.num">
        <div class="salon">
            <p class="nom_salon">{{ $t("salon") }} N° {{salon.num}}</p>
            <p class="nbr_part">{{ $t("nb_participants") }}{{salon.part}}</p>
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
            num : '1',
            part: '6'
        },
        {
            num : '2',
            part: '4'
        },
        {
            num : '3',
            part: '7'
        },
        {
            num : '4',
            part: '5'
        },
        {
            num : '5',
            part: '8'
        },
        {
            num : '6',
            part: '4'
        },
        {
            num : '7',
            part: '8'
        },
        {
            num : '8',
            part: '6'
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