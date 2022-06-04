var db = require("../db/connect");

exports.listPartners =async ()=>{

    return db.any('select * from utils.partners ')
                .catch(error=>{console.log(error);return error;});
}

exports.createUser = async (partner)=> {

    return db.any('insert into utils.partners (partner)  values ($1) returning id', [partner] )
                .catch(error=>{console.log(error);return error;})
}

exports.findUserbyEmail = async (email)=> {
    
    
    return db.any("select * from utils.partners where partner->>'email'=$1",[email])
                .catch(error=>{console.log(error);return error;})  
}
exports.findUserbyUsername = async (username)=> {
    
    
    return db.any("select * from utils.partners where partner->>'username'=$1",[username])
                .catch(error=>{console.log(error);return error;})  
}