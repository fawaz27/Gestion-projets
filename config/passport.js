const bcrypt= require('bcryptjs');

const db = require('../db');

var LocalStrategy = require('passport-local').Strategy;

let accData = []

module.exports = function (passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        db.any("select partner from project.partners where id=$1", [user.id] )
            .then(user=>{
                return done(null, user) 
                        })
            .catch(err=>{
                console.log(err);
                return done(err);
            })                
                    
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        loginUser()
        async function loginUser() {
            const client =await db.connect();
            try {
                
                db.any("select jsonb_build_object('id',id,'partner',partner) as partners from project.partners")
                .then(data=>{
                    var cpt=0;
                        
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        var name=data[i].partners.partner.username;
                        var id=data[i].partners.id;
                            
                        if (name==req.body.username) {
                            cpt++;
                            return [{"count":cpt,"id":id}];       
                        }
                    }
                    return [{"count":cpt,"id":null}];
                })
                .then(result=>{
                    console.log(result);
                    if(result[0].count!=1) {
                        return done(null, false, req.flash('message', "Username not found"))
                       }
                    var user=db.any("select * from project.partners where id=$1", [result[0].id] )
                            .catch(err=>{
                                console.log(err);
                                return done(err);
                            })
                            
                    return user;

                })
                .then(data=>{
                    console.log(data);
                    bcrypt.compare(password, data[0].partner.password, (err, valid) => {
                        if (err) {
                            console.log("Error on password validation");
                            return done(err)
                        }
                        if (valid) {
                            console.log('User [' + req.body.username + '] has logged in.')
                            var user={id:data[0].id,username: data[0].partner.name}
                            return done(null,user);
                        } else {
                            return done(null, false, req.flash('message', "Incorrect username or password"))
                        }
                })})
                .catch(error=>{
                   
                    return done(error)
                });  
                
            } catch (error) {
                return done(error)
            }
        }
    }));

    passport.use('register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done){
        registerUser()
        async function registerUser() {
            const client =await db.connect();
            try {
                let passwordhash = bcrypt.hashSync(req.body.password, 10);

                if (!testUser(req.body.username)) {
                    return done(null, false, req.flash('message', 'Please provide a valid username'));
                    
                }

                else if (!testEmail(req.body.email)) { 
                    return done(null, false, req.flash('message', 'Please provide a valid email'));
                }

                else if (!testPass(req.body.password)) { 
                    return done(null, false, req.flash('message', 'Please provide a valid password'));
                }
                
                else{
                    console.log("result");
                    db.any("select jsonb_build_object('id',id,'partner',partner) as partners from project.partners")
                    
                    .then(data=>{
                        var cpt=0;
                            
                        for (let i = 0; i < data.length; i++) {
                            const element = data[i];
                            var name=data[i].partners.partner.username;
                            var mail=data[i].partners.partner.email;
                            var id=data[i].partners.id;
                                
                            if (name==req.body.username ){
                                cpt=1;
                                return [{"count":cpt,"id":id}]; 
                            }
                            else if( mail==req.body.email ) {
                                cpt=2;
                                return [{"count":cpt,"id":id}];       
                            }
                        }
                        return [{"count":cpt,"id":null}];
                    })
                    .then(result=>{
                        console.log(result);
                        
                        if(result[0].count==1) {
                            return done(null, false, req.flash('message', "Sorry, this username is already taken."));
                        }
                        else if(result[0].count==2) {
                            return done(null, false, req.flash('message', "Sorry, this email is already taken."));
                        }
                        else{

                            if(!req.body.isadmin) {
                                req.body.isadmin=false;
                            }
                            else
                                req.body.isadmin=true;
                            
                            const partner={
                                    "email":req.body.email,
                                    "username" :req.body.username,
                                    "others":req.body.others,
                                    "password":passwordhash,
                                    "phone":req.body.phone,
                                    "isadmin":req.body.isadmin
                                };
                                console.log(partner);
                            
                           
                            db.any('insert into project.partners (partner)  values ($1) returning id', [partner])
                                .then(result=>{
                                    console.log(result);
                                        
                                    console.log('User [' + req.body.username + '] has registered with id='+result[0].id+'.');
                                    var user={id:result[0].id, username: req.body.username};
                                    return done(null,user );
                                })
                                .catch(error=>{
                                    console.log(error); 
                                })

                        
                            

                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }


                            
       
                
                
            } catch (error) {
                return done(error);
            };
            
        }

    }));

}



function testUser(input) {
    let format = /^[a-zA-Z0-9_-]{4,16}$/
    return format.test(input)
}
function testPass(input) {
    let format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/
    return format.test(input)
}
function testEmail(input) {
    let format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return format.test(input)
}