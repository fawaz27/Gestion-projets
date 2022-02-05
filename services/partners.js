var db = require("../db");


exports.createUser = async (partner)=> {

    return db.any('insert into project.partners (partner)  values ($1) returning id', [partner] ).catch(error=>{console.log(error);return error;})
}

exports.listPartners =async ()=>{

    return db.any('select * from project.partners ').catch(error=>{console.log(error);return error;});
}

exports.findUserbyId = async (id)=> {

    return db.any("select partner from project.partners where id=$1", [id] ).catch(error=>{console.log(error);return error;})
}

exports.findUserbyEmail = async (email)=> {
    /*
    const re ="select id, count(id) from project.partners where partner->>'email'="+email+" group by id";
    console.log(re);
    return db.any("select id, count(id) from project.partners where partner->>'email'=$1 group by id" , [email] ).catch(error=>{console.log(error);return error;})*/
    
    return    db.any("select jsonb_build_object('id',id,'partner',partner) as partners from project.partners")
                .then(data=>{
                    var cpt=0;
                    
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        var mail=data[i].partners.partner.email;
                        var id=data[i].partners.id;
                        
                        if (mail==email) {
                            cpt++;
                            return [{"count":cpt,"id":id}];       
                         }
                    }
                    return [{"count":cpt,"id":null}];
                })
                .catch(error=>{
                    console.log(error);
                });  
    }



exports.deleteProjectbyId = async (id)=>{
    return db.any('delete from project.partners where id=$1',[id]).catch(error=>{console.log(error);return error;});
}

exports.deleteProjectbyEmail = async (email)=>{
    return db.any("delete from project.partners where partner->>'email'='$1'",[email]).catch(error=>{console.log(error);return error;});
}


