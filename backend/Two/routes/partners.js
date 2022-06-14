const express = require('express');
const router = express.Router();
const {createUser,listPartners,findUserbyEmail} =require('../services/partners')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
router.get('/', async (req,res)=>{

    const result = await listPartners ();
    
  
    console.log(result[0]);
    
  
    if (!result[0]) {
      return res.status(404).json({sucess:false,status:"ressources not found"});
      
    }
  
      res.status(200).send(result);
    
  
  })

  router.post('/login', async (req,res)=>{
    console.log(req.body);
    const mail=req.body.id;
    const username=req.body.id;
    const pass=req.body.password;
    const result1 = await findUserbyEmail (mail);
    
    
    console.log(result1[0]);
    
  
    if (!result1[0]) {
      return res.status(400).json({sucess:false,error:"The email address or username is incorrect"});
      
    }
    else{
        const password=result1[0].partner.password;
        bcrypt.compare(pass,password, (err, valid) => {
          if (err) {
              console.log("Error on password validation");
              console.log(err);
              return res.status(500).json({sucess:false,error:"Internal error"});
              
          }
          if (valid) {
              console.log('User [' + mail + '] has logged in.');
              delete result1[0].partner["password"];
              const result=result1[0];

              const token = jwt.sign(result, process.env.JWT_KEY);
             
              console.log(result);
              return res.status(200).json({sucess:true,data:{user:result,token:token}});

          } else {
              console.log("The password is incorrect");
              return res.status(400).json({sucess:false,error:"The password is incorrect"});
          }
        })

    }
  
      
    
  
  })

router.post('/register', async (req,res)=>{
    const partners={
        "username":req.body.username,
        "email":req.body.email,
        "name":req.body.name,
        "password":req.body.password
    };

    //console.log(typeof (req.body));
    let passwordhash = bcrypt.hashSync(partners.password, 10);
    partners.password=passwordhash;
    console.log(partners);
    const result =  await createUser(partners);

  
    console.log(result);
    if (!result) {
      return res.status(400).json({ status: 'error', data:null });
    
    }
    

    res.status(200).json({status: 'ok',data:result[0] });
    


})

module.exports=router;