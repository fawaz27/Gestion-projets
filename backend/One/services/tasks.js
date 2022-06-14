var db = require("../db");

exports.createTask = async (task)=> {
   
    return db.any('insert into project.tasks (task)  values ($1) returning id', [task] )
        
}

exports.findTask= async (id)=>{
    return db.any('select * from project.tasks where id=$1',[id]);
}


exports.deleteProjectbyId = async (id)=>{
    return db.any('delete from project.tasks where id=$1',[id]);
}


