var db = require("../db/connect");

exports.listModules =async ()=>{

    return db.any('select * from utils.modules ')
                .catch(error=>{console.log(error);return error;});
}
exports.createModule = async (module)=> {

    return db.any('insert into utils.modules (module)  values ($1) returning id', [module] )
                .catch(error=>{console.log(error);return error;})
}