<template >

    <div>
        <h1>{{title}} </h1>

        <div class="title-list" >
            <h2> </h2>
        </div >

            

        <div v-if="novels!=[]" class="liste">
            <div class="row taille" v-for="(novel,index) in novels" v-bind:key="index">
                <div class="col-2">
                    <div>
                        <img :src=" require('@/assets/img/562121.png') " alt="" class="cover" width="182px" height="100px">
                    </div>
                </div>
                <div class="col-7">
                    <div class="details mt-2 ">
                        <div class="mb-2">
                            <span class="icon mr-2" >
                                <font-awesome-icon icon="book"/>
                            </span>
                        <a href="">{{novel.novel.name}}</a>
                        </div>
 
                        <div>
                            <span class="icon">
                            <font-awesome-icon icon="sitemap"/>
                            </span>
                            <span>
                                Source
                            </span>
                        </div>
                        
                        
                        

                    </div>
                </div>
                <div class="col-3">
                    <div class="text-info">
                        <div>
                            <a href=""> {{novel.novel.lastchap}}</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'home-novel',
    data(){
        return {
            title:'Novels',
            novels:[
                {   id:0,
                    novel:{
                        name:"Novel1",
                        lastchap:"Chapter 3256 : New Sect Master "
                    }
                },
                {   id:1,
                    novel:{
                        name:"Novel1",
                        lastchap:"Chapter 3256 : New Sect Master "
                    }
                },
                {   id:2,
                    novel:{
                        name:"Novel2",
                        lastchap:"Chapter 3256 : New Sect Master "
                    }
                }
            ]
        }
    }

}

</script>

<style>

    .title-list{
        text-align: left;
        height: 40px;
        text-transform: uppercase;
        border-bottom: 1px solid #CCC;
        position: relative;
        margin-bottom: 5px;
    }
    .cover{
        max-height: 100%;
        max-width: 100%;
        border: 1px solid #E7E7E7;
    }
    .icon{
        position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: normal;
        line-height: 1;
    }

    .taille{
        height: 121px;
        margin-bottom: 10px;
        border-bottom: 2px dashed #CCC;
    }
    .liste{
        margin-left: 15px;
    }
</style>