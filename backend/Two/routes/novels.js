const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const {spawn }= require('child_process')
const {createNovel,listNovels} =require('../services/novels')


router.post('/', async (req,res)=>{
    console.log(req.body);

    const novel={
        "name":req.body.name,
        "author":req.body.author,
        "datecreate":req.body.datecreate,
        "source":req.body.source
    };

    const result = await createNovel(novel) ;
    console.log(result);

    if (!result[0]) {
        return res.status(400).json({ status: 'error', data:null });
    }
    res.status(200).json({status: 'ok',data:result[0] });
    


});

router.get('/', async (req,res)=>{
    const result =  await listNovels();
    console.log(result);

    if (!result[0]) {
        return res.status(404).json({sucess:false,status:"ressources not found"});
    }
    res.status(200).send(result);

});


router.post('/translate',async(req,res)=>{

});




router.post('/backup',  async (req,res)=>{
    let baseUrl=req.body.SiteUrl; 
    let Url=req.body.NovelUrl;  
    let nbrchap= req.body.NbreChap ;
    let nbrpages=req.body.NbrePage ;
    // let baseUrl='https://freewebnovel.com';
    // let Url= 'keyboard-immortal-novel';
    // let nbrchap=5;
    // let nbrpages=2;
    let dataToSend=' ';
    const python = spawn('python3', ['write.py', baseUrl, Url, nbrpages , nbrchap ]);

    
    
    python.stdout.on('data', function(data){
        dataToSend=dataToSend+data.toString();
        console.log(data.toString()); 


    });
    python.stderr.on('data',data=>{
        console.log(`stderr: ${data}`);
    })
    python.on('exit',(code)=>{ 
        
        console.log(`child process exited with code ${code}, \n ${dataToSend}`  );
        if (code==0) {
           
            return res.status(200).json({sucess:true,status:"backup is successful"});  
            
        }
        else{
            return res.status(500).json({sucess:false,status:"Internal error"});
        }   

      
    })

    

    

});

























// router.get('/',(req,res)=>{
    

//     axios({
//         method: 'get', //you can set what request you want to be
//         url: 'https://freewebnovel.com/keyboard-immortal-novel.html',
        
//         headers: {
//             'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0'
//         },
//         withCredentials: true
//       })
//       .then(res=>{

//             const pagebody=res.data;
//             var soup = new JSSoup(pagebody);
//             var chapters= getAllSoup(soup.findAll('ul','ul-list5'));
//             var name= gettext(soup.find('h1',{'class':'tit'}));

//             console.log(soup.findAll('ul','ul-list5')[0].contents);
//             // for (const iterator of chapters) {
//             //     console.log( iterator);
//             // }
            


        
//         })
//         .catch(err=>{
//         console.log(err)
//         })

// })

module.exports=router;

