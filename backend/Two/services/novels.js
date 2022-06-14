var db = require("../db/connect");

exports.createNovel = async (novel)=> {

    return db.any('insert into novel.novels (novel)  values ($1) returning id', [novel] )
                .catch(error=>{console.log(error);return error;})
};

exports.listNovels = async ()=>{

    return db.any('select * from novel.novels ')
                .catch(error=>{console.log(error);return error;});
};