var db = require("../db");


exports.addMemberstoProject = async (id_user,id_project)=> {

   // return db.any('insert into project.projects (project)  values ($1) returning id', [project] );
    

     return db.any ("insert into project.members(id_partners,id_projects) values($1,$2) returning *",[id_user,id_project]);
    
}
