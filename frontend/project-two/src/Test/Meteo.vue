<template >
    <div class="container">
       <h1 class="my-4">App météo avec Vue.js</h1>
        <div class="form-groupe mb-5">
            <label for="position">Entrer la latitude</label>
            <input type="text" id="position" class="form-control" v-model="lat" >
        </div>
        <div class="form-groupe mb-5">
            <label for="position">Entrer la longitude</label>
            <input type="text" id="position" class="form-control" v-model="lon" >
        </div>
        <button class="btn btn-primary" v-on:click="goMeteo">Valider</button>

        <div class="w-75 m-auto" v-if="temps">
            <h3 class="text-center p-5"> Position: {{temps.name}}</h3>
            <div class="card textcenter p-5">
                <p class="texte-affichage">
                Température : {{temps.main.temp.toFixed()}}°
                </p>
                <p class="texte-affichage">
                 Temps :    {{temps.weather[0].description}}
                </p>
            </div>
            

            
        </div>
    </div>
     
</template>
<script>
    import axios from 'axios'
    export default{
    
        // eslint-disable-next-line vue/multi-word-component-names
        name:'Meteo',
        data(){
            return{
                lat:undefined,
                lon:undefined,
                temps:undefined,
                api_code:'b12ea8e1b5ce97c994069f3c555896ad',
                url_search:'https://api.openweathermap.org/data/2.5/weather?'
            }
        },
        methods:{
        goMeteo:function(){
            
                axios
                .get(`${this.url_search}lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.api_code}&lang=fr`)
                .then(res=>{
                    //console.log(res.data)
                    this.temps=res.data 
                })
                this.lon=undefined
                this.lat=undefined
            
        }
        }

    }

</script>

<style>
.texte-affichage{
    font-size:30px;
    font-weight: 30px;
    line-height: 1.2;
}

</style>