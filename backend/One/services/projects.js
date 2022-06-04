var db = require("../db");


exports.createProject = async (project)=> {

    return db.any('insert into project.projects (project)  values ($1) returning id', [project] );
    

    // return db.any ("insert into project.members(id_partners,id_projects) values($1,$2)",[id,d]);
    
}



exports.listProjects =async ()=>{

    return db.any('select * from project.projects ');
}


exports.findProject= async (id)=>{
    return db.any('select * from project.projects where id=$1',[id]);
}




exports.deleteProjectbyId = async (id)=>{
    return db.any('delete from project.projects where id=$1',[id]);
}

exports.listMembersOnProject = async (id_projects)=> {
   
    return db.any("select jsonb_agg (jsonb_build_object('id',id,'partner',partner)) from project.partners join project.members on id_partners=project.partners.id and id_projects=$1", [id_projects] )
        
}

