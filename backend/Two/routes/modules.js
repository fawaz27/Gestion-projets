const express = require('express');
const router = express.Router();
const {createModule,listModules}= require('../services/modules')


router.post('/', async (req,res)=>{
    const module={
        "name":req.body.name,
        "description":req.body.description,
        "datecreate":req.body.datecreate
    }
    console.log(module);
    const result = await createModule(module);
    console.log(result);

    if (!result) {
        return res.status(400).json({ status: 'error', data:null });
      
      }
    res.status(200).json({status: 'ok',data:result[0] });
})

router.get('/',async(req,res)=>{
    const result= await listModules();

    console.log(result);

    if (!result[0]) {
        return res.status(404).json({sucess:false,status:"ressources not found"});
        
      }
    
    res.status(200).send(result);
})

module.exports=router;