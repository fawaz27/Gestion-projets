const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {  createProject, findProject, listMembersOnProject, listProjects}= require('../services/projects');
const jwt = require('jsonwebtoken');
const {addMemberstoProject}= require('../services/members')

const passport = require('passport');
router.get('/register', (req, res) => {
    
})

router.get('/', async (req,res)=>{
    
    if (req.isAuthenticated()) {
       /* const result = await listProjects();

        console.log(result);

        if (!result) {
            res.status(400).json({sucess:false});
        }

        res.status(200).send(result);
        */ 
       console.log( req.session);
       console.log( req.user);
       res.render('pages/index', {
            title: 'Login',
            user: req.user[0].partner,
            message: res.locals.message
        })
    } else {
        res.render('pages/login', {
            title: 'Login',
            user: req.user,
            message: res.locals.message
        })
    }
});

router.get('/create', async (req,res)=>{
  
    res.render('pages/newproject');



});

 

router.post('/create', async (req,res)=>{

    const user_id=1;
    const today = new Date();
    const project={
        "name":req.body.name,
        "description":req.body.description,
        "date":today,
        "datestart":req.body.start,
        "deadline":req.body.echeance,
        "creator":"admin",
        "responsible":req.body.responsable,
        "status":"Open"
        }

    const result1 = await createProject(project,user_id);
    console.log(result1);

    if (!result1) {
            res.status(400).json({sucess:false,error:"project is not created"});
        }
    const result2 = await addMemberstoProject(user_id,result1[0].id)
    console.log(result2);

    if (!result2) {
            res.status(400).json({sucess:false,error:"members is not added"});
    }
    

    
    
    res.status(200).send(result2);
})




module.exports=router;