const express = require('express');
const router = express.Router();
const { createUser, listPartners, findUserbyEmail, findUserbyId } = require('../services/partners');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,12}$/;



router.post('/register', async  (req,res) =>{

    if (!req.body.isadmin) {
      req.body.isadmin=false;
    }
    else
    req.body.isadmin=true;
    

   
    const partners={
      "email":req.body.email,
      "name" :req.body.name,
      "others":req.body.others,
      "password":req.body.password,
      "phone":req.body.phone,
      "isadmin":req.body.isadmin
    };


    if (partners.email == null || partners.name == null || partners.password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (partners.name.length >= 13 || partners.name.length <= 4) {
      return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }

    if (!EMAIL_REGEX.test(partners.email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(partners.password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 4 - 12 and include 1 number at least)' });
    }
    
    if (partners.password!=req.body.repassword) {
      return res.status(400).json({ 'error': 'password and retype password are not identical' });
    }
    
    const userExist = await findUserbyEmail(req.body.email);
    
    console.log(userExist);

    if(userExist[0].count!=0) {
      return res.status(400).json({'error':'Email is taken'});
    }
    console.log('pass');

    let passwordhash = bcrypt.hashSync(partners.password, 10);
    
    partners.password=passwordhash;

    console.log(partners);
    

    const result =  await createUser(partners);

  
    console.log(result);
    if (!result) {
      return res.status(400).json({ 'error': 'cannot add user' });
    
    }

    res.status(200).send(result);

})


router.get('/register', async (req, res) => {
    

    res.render('pages/signup',{test:'Salut'});
  });



router.get('/login',async (req,res)=>{
  

  res.render('pages/login');
});




/*router.post('/login',async(req,res)=>{
 
  try {

          if (req.body.email == "" ||  req.body.password == "") {
            return res.status(400).json({ 'error': 'missing parameters' });
          }

          const userExist = await findUserbyEmail(req.body.email);

        

          console.log(userExist);
          if(userExist[0].count!=1) {
            return res.status(401).send('Email not found');
          }
          const result= await findUserbyId(userExist[0].id);
        
          
          console.log(result[0].partner);
          
          bcrypt.compare(req.body.password,result[0].partner.password)
            .then(valid =>{
              
              if (!valid) {
                return res.status(401).json({ error: 'Incorrect password !' });
              }
              
              const token = jwt.sign(
                { userId :userExist[0].id,
                  isAdmin : result[0].partner.isadmin
                  },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              );
              console.log(token);
              /*localStorage.setItem('token', JSON.stringify(token));
              res.cookie('token',token,{ 
                httpOnly: true,
                // secure: true // - for secure, https only cookie
              });*/

              //res.render('/',);

              /*res.status(200).json({
                user_id :userExist[0].id,
                token: jwt.sign(
                  { userId :userExist[0].id,
                    isAdmin : result[0].partner.isadmin
                    },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              
              
              });
              
              /*const token = jwt.sign(
                { userId :userExist[0].id,
                  isAdmin : result[0].partner.isadmin
                  },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              );
           res.status(200).header('Authorization', 'Bearer '+ token).redirect('/');
            })
            .catch(error=>{
              res.status(500).json({ error });
            })

          
    
  } catch (err) {
    console.log('LOGIN ERROR', err);
    res.status(501).send("Signin failed");
  }


});

 */

router.get('/', async (req,res)=>{

  const result = await listPartners ();


  console.log(result);
  

  if (!result) {
    return res.status(400).json({sucess:false});
    
  }

    res.status(200).send(result);
  

})



router.get('/:usersID', async (req, res) => {
  
  const id=req.params.usersID
  const result = await findUserbyId(id);


  console.log(result);

  if (!result) {
    return res.status(400).json({sucess:false});
    
  }

    res.status(200).send(result);
    
  });


  module.exports.checkUser = (request, response) => {

    const { token = null } = (/token=(?<token>[^;]*)/.exec(request.headers.cookie) || {}).groups || {} // Or  better use  cookie-parser

    crudModel.verifyUser((result) => {
        if (Array.isArray(result) && result.length > 0) {
            if(result[0].email == request.body.email && result[0].password == request.body.password){
                let jwtToken = jwt.sign({
                    email: result[0].email,
                    user_id: result[0].uid
                }, "mohit_pandey_1996", {
                    expiresIn: 300000
                });


                response.cookie('token', jwtToken, { 
                    httpOnly: true,
                    // secure: true // - for secure, https only cookie
                });


                response.render('dashboardView'); // - now we don't need to appear token to the view, because it automatically appears in cookies in each request


            }

        } else {
            console.log('Invalid Username or Password');
            response.render('errorView');
        }

    }, token); // <- pass token


}



module.exports=router;