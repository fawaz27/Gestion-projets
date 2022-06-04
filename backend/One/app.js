#!/usr/bin/env nodemon
require('dotenv').config();

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
var cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser =require("body-parser");
const morgan     = require("morgan");
const cors = require('cors');
const path = require('path');
const { dirname } = require('path');

//Routes
 const usersRouter = require(__dirname+'/routes/users');
 const partnersRouter = require(__dirname+'/routes/partners');
 const projectsRouter = require(__dirname+'/routes/projects');
 const tasksRouter = require(__dirname+'/routes/tasks');


//Moteur de template 
app.set('view engine','ejs');


app.use(express.static(__dirname+'/views'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Middleware
//app.use(cookieSession({keys: ['key1', 'key2']}));
app.use(session({
  secret: 'thatsecretthinggoeshere',
  resave: false,
  saveUninitialized: true,
  
}));



app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.use(function(req, res, next){
  res.locals.message = req.flash('message');
  next();
});

 app.use('/partners', usersRouter);
 app.use('/', projectsRouter);
app.use('/partners', partnersRouter);

require('./config/passport')(passport)
tasks=[
  { "id":0,
  "task": {
      
      "nom":"Bonjour",
      "description":"L'objectif est de faire sur les besoins fonctionnels ainsi que les contraintes du projet. ",
      "date":"2021-07-20",
      "datestart":"2021-07-20",
      "deadline":"2021-09-20",
      "statut":"À faire",
      "priorite":"Normal",
      "duration":"48 heures",
      "depends":[
        {"id":5,"type":"fin-début"},
        {"id":8,"type":"fin-début"},
        {"id":9,"type":"fin-début"}
            ]
  }
   
  },
  { "id":1,
      "task": {
          
          "nom":" base de donnée",
          "description":"Réaliser la modélisation entité-association de notre problème.",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2021-10-30",
          "statut":"À faire",
          "priorite":"Normal",
          "duration":"48 heures",
          "depends":[
            
            {"id":6,"type":"fin-début"},
            {"id":7,"type":"fin-début"}
                ]
  
      }
       
  },
  { "id":2,
      "task": {
          
          "nom":"Maquette du site ",
          "description":"Décrire les vues du site tout en repérant les composants ainsi que les actions appliquer sur les vues. ",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2021-09-14",
          "statut":"À faire",
          "priorite":"Normal",
          "duration":"24 heures",
          "depends":[
            
            {"id":4,"type":"début-fin"}
            
                ]
  
      }
       
  },
  { "id":3,
      "task": {
          
          "nom":"Implémentation",
          "description":"Analyser les fonctionnalitées , trouver le ou les langages appropriés pour résoudre notre problème et écrire les codes dans les langages trouvés .",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2022-08-31",
          "statut":"En cours",
          "priorite":"Normal",
          "duration":"48 heures",
          "depends":[
            
            {"id":0,"type":"fin-début"}
            ]
                
  
      }
       
  },
{ "id":4,
      "task": {
          
          "nom":"Maintenance",
          "description":"Apporter des solutions aux insuffisances du site",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2023-08-31",
          "statut":"Terminé",
          "priorite":"Normal",
          "duration":"2540 heures",
          "depends":[
            
            {"id":3,"type":"fin-début"}
           ]
  
      },
    
       
  },
  { "id":5,
      "task": {
          
          "nom":"Maintenance",
          "description":"Apporter des solutions aux insuffisances du site",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2023-08-31",
          "statut":"Terminé",
          "priorite":"Normal",
          "duration":"2540 heures",
          "depends":[
            
            {"id":3,"type":"début-début"}
           ]
  
      },
    
       
  },
  { "id":6,
      "task": {
          
          "nom":"Maintenance",
          "description":"Apporter des solutions aux insuffisances du site",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2023-08-31",
          "statut":"Terminé",
          "priorite":"Normal",
          "duration":"2540 heures",
          "depends":[
            
            {"id":3,"type":"début-fin"}
           ]
  
      },
    
       
  },
  { "id":7,
      "task": {
          
          "nom":"Maintenance",
          "description":"Apporter des solutions aux insuffisances du site",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2023-08-31",
          "statut":"Terminé",
          "priorite":"Normal",
          "duration":"2540 heures",
          "depends":[
            
            {"id":3,"type":"début-fin"}
           ]
  
      },
    
       
  },
  { "id":8,
      "task": {
          
          "nom":"Maintenance",
          "description":"Apporter des solutions aux insuffisances du site",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2023-08-31",
          "statut":"Terminé",
          "priorite":"Normal",
          "duration":"2540 heures",
          "depends":[
            
            {"id":5,"type":"début-début"},
            {"id":9,"type":"début-début"}
           ]
  
      },
    
       
  },
  { "id":9,
      "task": {
          
          "nom":"Maintenance",
          "description":"Apporter des solutions aux insuffisances du site",
          "date":"2021-07-20",
          "datestart":"2021-07-20",
          "deadline":"2023-08-31",
          "statut":"Terminé",
          "priorite":"Normal",
          "duration":"2540 heures",
          "depends":[
            
            {"id":5,"type":"début-début"},
            {"id":8,"type":"début-début"}
            

           ]
  
      },
    
       
  }

]
t1=[]
t2=[]
t3=[]
t4=[]

function filtre(tasks){
  for (t of tasks){
    
    if(t.task.statut=='À faire'){
      t1.push(t)
    }
      
      
    else if(t.task.statut=='En varcours'){
      t2.push(t)
    }
      
    else if(t.task.statut=='Terminé'){
      t3.push(t)
    }
      
    else if(t.task.statut=='En attente'){
      t4.push(t)
    }
      
    
  }
};



function essai (tasks) {
   
}
t= {
    "nom":"Maintenances",
  "description":"Apporter des solutions aux insuffisances du site",
  "date":"2021-07-20",
  "datestart":"2021-07-20",
  "deadline":"2023-08-31",
  "statut":"Terminé",
  "priorite":"Normal",
  "duration":"2540 heures"

}
t.depends="salut"
//filtre(tasks)

console.log(t)


app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
  });
