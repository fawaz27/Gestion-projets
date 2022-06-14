taskupd=it;
if (taskupd.task.status!="close") {
    if(taskupd.task.validite==true)
        taskupd.task.status="close";
    else
        taskupd.task.status="waiting";
    viewonproject_cls.updatetask(project.id,taskupd.id,taskupd.task).then((d)=>{
        if(d && d.status=='ok'){
            it=taskupd;
            app.get_userdata().tasks=tasks;  
        }
    });
}






   tasks= [
		{
			"id": 13,
			"task": {
				"nom": "tast-test",
				"date": "2022-06-07",
				"status": "close",
				"assigned": 11,
                "dateassigned":"2022-06-16",
				"validite": true,
				"dateclose": "2022-06-16",
				"datestart": "2022-06-07",
                "depends":[{
                    "type":"START-START",
                    "id_task":5


                }]
			}
		}
	]











for ( mem of members){
  if(mem.partner.name==e.target.value){
       vnode.attrs.data.assigned=it.id;
       members_sec=e.target.value;
  }
   
}



app.modal2.open(null, 'project/newtask_w','col-md-6 offset-md-3', [ ], newtask )
    .then((d)=>{ 
        if(d==null)return;
        if(newtask.nom != undefined){
            let assigned;
            
            newtask.date=utils.now();
            if (newtask.status==undefined) {
                newtask.status='todo';
            }; 
            if(newtask.validite==undefined){
                newtask.validite=false;
            }
            if (newtask.assigned!=undefined) {
                assigned = newtask.assigned;
                delete newtask.assigned;
            }
            if (newtask.typedepends!=undefined && newtask.depends!=undefined) {
               
                let typedepends=newtask.typedepends;
                let id_task=newtask.depends;
                delete newtask.typedepends;
                delete newtask.depends;
                newtask.depends=[];
                newtask.depends.push({
                    type:typedepends,
                    id_task:id_task 
                });
            }
    
          
            app.request({method: 'post',url : '/project/projects/'+project.id+'/tasks',body : {task:newtask }})
                .then((dd)=>{
                            if(dd.status == 'ok'){
                                
                                if (assigned!=undefined) {
                                    let assign_info={
                                        date:utils.now()
                                    }
                                    viewonproject_cls.addtaskmembers(project.id,dd.data,assigned,assign_info).then((ddd)=>{
                                        if (ddd && ddd.status=='ok') {
                                           
                                        }
                                    })
                                
            
                                }
                                
                                
                                viewonproject_cls.gettasks(project.id)
                                    .then((data)=>{         
                                        if (data && data.status=='ok'){           
                                            tasks=data.data ; 
                                            app.get_userdata().tasks=tasks;            
                                        }  
                                        else {             
                                            app.alert('tasks not found ');              
                                        }            
                                    }); 
                        
                        
                            }
                        });
            newtask={};
            
            
            };
      
    
    }) 














































