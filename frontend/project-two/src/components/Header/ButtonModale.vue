<template >
    <div>
        <button v-on:click="evenement" class="btn-active-modale"> {{txt}}</button>

    </div>
</template>
<script>

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'button-modale',
    data(){
        return{
            
        }
    },
    props:["txt","evenement"]

}

</script>

<style>
.btn-active-modale{
    color: rgb(87, 69, 69);
    font-weight: 600;
    display: inline-block;
    padding: 5px 15px;
    border: 2px solid rgb(87, 69, 69);
    border-radius: 30px;
    transition: all .3s;
}

.btn-active-modale:hover{
    cursor: pointer;
    background-color: #0f0f0f;
    border-color: #0f0f0f;
    color: #fff
}

</style>