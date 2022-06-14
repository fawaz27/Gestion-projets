

// format of task
task={
    id :5,
    task: {
        nom:"task1",
        date:"2022-06-10",
        datestart:"2022-07-05",
        dateclose:"2022-08-05",
        validite:true,
        status:"close",
        depends:[{type:"FINISH-START",id_task:1}],
        assigns:[3,5]
    },
    
}


// action newtask in viewonproject

newtask={};
tasks.forEach(t =>{t.checked=undefined ;});
newtask.type="add";


app.modal2.open(null, 'project/newtask_w','col-md-6 offset-md-3', [ ], newtask )
.then((d)=>{ 
    if(d==null) { newtask={};          return;}
    if(newtask.nom != undefined){
        
        
        newtask.date=utils.now();
        newtask.status='todo';
        newtask.assigns=[];
        newtask.assigns.push( parseInt(app.userid()));
        if(newtask.validite==undefined){
            newtask.validite=false;
        }
        if (newtask.assigned!=undefined) {
            let assigned = newtask.assigned;
            newtask.assigns.push(assigned);
            
        }
        
        if (newtask.typedepends!=undefined && newtask.id_depends!=undefined) {
           
            let typedepends=newtask.typedepends;
            let id_task=newtask.id_depends;
            
            newtask.depends=[];
            newtask.depends.push({
                type:typedepends,
                id_task:id_task 
            });
           
        }
        delete newtask.assigned;
        delete newtask.typedepends;
        delete newtask.id_depends;

        if (newtask.type=="add") {
            delete newtask.type;
            delete newtask.assigns_others;
            viewonproject_cls.newtask(project.id, newtask)
            .then((dd)=>{
                        if(dd.status == 'ok'){
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
        }
        else if(newtask.type=="update") {

            let id = newtask.id;
            delete newtask.id;
            delete newtask.type;
            delete newtask.assigns_others;
            viewonproject_cls.updatetask(project.id,id,newtask)
                .then((dd)=>{
                    if (dd && dd.status=='ok') {
                        viewonproject_cls.gettasks(project.id)
                            .then((data)=>{
                                if (data && data.status=='ok') {
                                    tasks=data.data ;
                                    app.get_userdata().tasks=tasks;} 
                                else {app.alert('tasks not found ');}  
                                
                            })
                        
                    }
                })
        }
        
        
        
        
        
        };
  

}) 












// oninit viewonproject

    project=app.get_userdata().project;   
    app.set_userdata({tasks:tasks});  
    viewonproject_cls.gettasks(project.id)
        .then((d)=>{                  
            if (d && d.status=='ok'){                          
                tasks=d.data ;              
                app.get_userdata().tasks=tasks;                   
            }                    
            else {                            
                app.alert('tasks not found ');                     
            }           
        });        
    app.request({method:'get',url:'/project/projects/'+project.id+'/members'})          
        .then((d)=>{                    
            if(d && d.status=='ok'){                          
                members=d.data;             
                var url='/project/partners?ids=[';                           
                members.map( (it,ix)=>{if (ix==0) url=url+it;else url=url+','+it;});                          
                url=url+']';                          
                app.request( {method: 'get',url : url} )                                  
                    .then((dd)=>{                                           
                        if(dd && dd.status){      
                            partners=dd.data;                                             
                            for (t of dd.data)                                                  
                            noms.push(t.partner.name);                                                   
                            app.get_userdata().members=dd.data;                                          
                        }                                  
                    })                         
            }          
        });
        
    tasks.forEach(t => {
        t.assigns_others= partners.filter(el => t.task.assigns.includes(el.id));
        if(t.task.depends!=undefined){
           t.task.depends.map((x,i)=>{
            
            x.nom=tasks.find(element => element.id ==x.id_task).task.nom;
            return x;
        }); 
        }
        
    });
        
    task={
        id :5,
        task: {
            nom:"task1",
            date:"2022-06-10",
            datestart:"2022-07-05",
            dateclose:"2022-08-05",
            validite:true,
            status:"close",
            depends:[{type:"FINISH-START",id_task:1}],
            assigns:[3,5]
        }
        
    }
    tasks=[{
        id :1,
        task: {
            nom:"task1",
            date:"2022-06-10",
            datestart:"2022-07-05",
            dateclose:"2022-08-05",
            validite:true,
            status:"close",
            depends:[{type:"FINISH-START",id_task:3}],
            assigns:[19,11]
        }
        
    },
    {
        id :2,
        task: {
            nom:"task2",
            date:"2022-06-10",
            datestart:"2022-07-05",
            dateclose:"2022-08-05",
            validite:true,
            status:"close",
            depends:[{type:"FINISH-START",id_task:3}],
            assigns:[19,13]
        }
        
    },
    {
        id :3,
        task: {
            nom:"task3",
            date:"2022-06-10",
            datestart:"2022-07-05",
            dateclose:"2022-08-05",
            validite:true,
            status:"close",
            depends:[{type:"FINISH-START",id_task:2}],
            assigns:[13,11]
        }
        
    }]


    partners=[
            {
                "id": 11,
                "createdt": "2020-12-01",
                "partner": {
                    "id": "",
                    "name": "padonou",
                    "refs": [
                        "users"
                    ],
                    "others": "bill laurel",
                    "contact": {
                        "email": "",
                        "phone": "97857860"
                    }
                }
            },
            {
                "id": 13,
                "createdt": "2020-12-01",
                "partner": {
                    "id": "",
                    "name": "gbe",
                    "refs": [
                        "users"
                    ],
                    "others": "gbe",
                    "contact": {
                        "email": "",
                        "phone": ""
                    }
                }
            },
            {
                "id": 19,
                "createdt": "2021-06-15",
                "partner": {
                    "name": "chabi boukari",
                    "refs": [
                        "users"
                    ],
                    "others": "fawaz",
                    "contact": {
                        "email": "",
                        "phone": "+22995661715"
                    }
                }
            }
        ]
    

        tasks.forEach(t =>{t.checked=undefined ;});

    selectproject=it;
    if(selectproject.project.statut!="close") {     
        selectproject.project.statut="close";

        home_cls.updateproject(selectproject.id,selectproject.project).then((d)=>{
            if(d && d.status=='ok'){
                it=selectproject;
                app.get_userdata().projects=projects;  
            }
        });
    }
    else{
        app.alert("This project is already closed")
    }


    progressstyle='width:'+functionprogress(tasks)+'; border-raduis:30px;';


    tasks.forEach(t => {         
        t.assigns_others= partners.filter(el => t.task.assigns.includes(el.id));         
        if(t.task.depends!=undefined){            
            t.task.depends.map((x,i)=>{x.nom=tasks.find(element => element.id ==x.id_task).task.nom;return x;});
        }              
    }); 













    newtask={};
tasks.forEach(t =>{t.checked=undefined ;});
newtask.type="add";


app.modal2.open(null, 'project/newtask_w','col-md-6 offset-md-3', [ ], newtask )
.then((d)=>{ 
    if(d==null) { newtask={};          return;}
    if(newtask.nom != undefined){
        
        
        newtask.date=utils.now();
        newtask.status='todo';
        newtask.assigns=[];
        newtask.assigns.push( parseInt(app.userid()));
        if(newtask.validite==undefined){
            newtask.validite=false;
        }
        if (newtask.assigned!=undefined) {
            let assigned = newtask.assigned;
            newtask.assigns.push(assigned);
            
        }
        
        if (newtask.typedepends!=undefined && newtask.id_depends!=undefined) {
           
            let typedepends=newtask.typedepends;
            let id_task=newtask.id_depends;
            
            newtask.depends=[];
            newtask.depends.push({
                type:typedepends,
                id_task:id_task 
            });
           
        }
        delete newtask.assigned;
        delete newtask.typedepends;
        delete newtask.id_depends;

        if (newtask.type=="add") {
            delete newtask.type;
            delete newtask.assigns_others;
            viewonproject_cls.newtask(project.id, newtask)
            .then((dd)=>{
                        if(dd.status == 'ok'){
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
            progressstyle='width:'+functionprogress(tasks)+'; border-raduis:30px;';
            newtask={};
        }
        else if(newtask.type=="update") {

            let id = newtask.id;
            delete newtask.id;
            delete newtask.type;
            delete newtask.assigns_others;
            viewonproject_cls.updatetask(project.id,id,newtask)
                .then((dd)=>{
                    if (dd && dd.status=='ok') {
                        viewonproject_cls.gettasks(project.id)
                            .then((data)=>{
                                if (data && data.status=='ok') {
                                    tasks=data.data ;
                                    app.get_userdata().tasks=tasks;} 
                                else {app.alert('tasks not found ');}  
                                
                            })
                        
                    }
                })
        }
        
        
        
        
        
        };
  

}) 

    if (vnode.attrs.data.depends!=undefined) { 
        vnode.attrs.data.id_depends= vnode.attrs.data.depends[0].id_task;        
        vnode.attrs.data.typedepends=vnode.attrs.data.depends[0].type;         
        vnode.attrs.data.taskdepends=vnode.attrs.data.depends[0].nom;      
    }     
    if (vnode.attrs.data.assigns!=undefined) { 
        vnode.attrs.data.assigned = vnode.attrs.data.assigns_others[0].id;                
        vnode.attrs.data.member=vnode.attrs.data.assigns_others[0].partner.name;     
    }     
      


if(app.get_userdata()){
    
    selecttask=it.task;
    selecttask.assigns_others=it.assigns_others;

    app.modal2.open(null, 'project/task_info','col-md-6 offset-md-3', [{type : 'button', click : app.modal2.cancel, text : 'close', class : 'btn btn-link'}], selecttask )
        .then((d)=>{
            selecttask={};
        });
}



module.export= ()=>{var task_info_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]);},view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'row',style:''}, [m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input4_6' },'Task name'),m('input[readonly]', {id:'input4_6',name:'input4_6',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.nom=e.target.value},value:vnode.attrs.data.nom})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input8_8' },'Start date'),m('input[readonly]', {id:'input8_8',name:'input8_8',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input9_10' },'Close date'),m('input[readonly]', {id:'input9_10',name:'input9_10',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.dateclose=e.target.value},value:vnode.attrs.data.dateclose})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input6_15' },'Type depends'),m('input[readonly]', {id:'input6_15',name:'input6_15',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.typedepends=e.target.value},value:vnode.attrs.data.typedepends})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input5_20' },'Depends on'),m('input[readonly]', {id:'input5_20',name:'input5_20',class:'form-control form-control-sm',type:'text',onchange:(e)=>{for ( t of tasks){
    if(t.task.nom==e.target.value){
         vnode.attrs.data.id_depends=t.id;
         tasks_sec=e.target.value;
    }
     
  }},value:vnode.attrs.data.taskdepends})])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input7_25' },'Assigned to'),m('input[readonly]', {id:'input7_25',name:'input7_25',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.member=e.target.value},value:vnode.attrs.data.member})])])])])];}};}
