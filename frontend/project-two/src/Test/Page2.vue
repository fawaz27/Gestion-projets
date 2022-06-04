<template >
    <div>
        <h1>Voici Page2</h1>
        <div class="btn btn-warning" v-on:click="goDebut">Retour au début</div>

    </div>
    
</template>
<script>
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Page2',
    methods:{
        goDebut: function(){
            this.$router.push('./')
        }
    }

}

</script>

<style>


</style>