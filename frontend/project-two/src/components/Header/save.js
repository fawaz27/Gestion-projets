app.modal2.open(null, 'project/newtask_w','col-md-6 offset-md-3', [ ], newtask )
.then((d)=>{ 
    if(d==null)return;

    if(newtask.nom != undefined){
        
        
        newtask.date=utils.now();
        newtask.status='todo';
        newtask.assigns=[];
        newtask.assigns.push({
            date:utils.now(),
            owner:true,
            id_partners:app.userid()

        })
        if(newtask.validite==undefined){
            newtask.validite=false;
        }
        if (newtask.assigned!=undefined) {
            let assigned = newtask.assigned;
            newtask.assigns.push({
                date:utils.now(),
                owner:false,
                id_partners:assigned
    
            });
            
        }
        
        if (newtask.typedepends!=undefined && newtask.depends!=undefined) {
           
            let typedepends=newtask.typedepends;
            let id_task=newtask.depends;
            
            newtask.depends=[];
            newtask.depends.push({
                type:typedepends,
                id_task:id_task 
            });
        }
        delete newtask.assigned;
        delete newtask.typedepends;
        
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
        
        
        };
  

}) 

















module.export= ()=>{var taskoptions_modal=()=>{var tasks=[];var type=["START-START","FINISH-START","FINISH-FINISH"];var members=[];var membersmap=[];var tasksmap=[];var members_sec='';var tasks_sec='';var taskoptions_modal_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]);if (vnode.attrs.data.depends!=undefined) { vnode.attrs.data.id_depends= vnode.attrs.data.depends[0].id_task;        vnode.attrs.data.typedepends=vnode.attrs.data.depends[0].type;         tasks_sec=vnode.attrs.data.depends[0].nom;      }     if (vnode.attrs.data.assigns!=undefined) { vnode.attrs.data.assigned = vnode.attrs.data.assigns_others[0].id;                members_sec=vnode.attrs.data.assigns_others[0].partner.name;     }     members=app.get_userdata().members.filter(m => m.id!=parseInt(app.userid()) );   if(vnode.attrs.data.id!=undefined) {tasks=app.get_userdata().tasks.filter(t=>t.id!=vnode.attrs.data.id);} else{tasks=app.get_userdata().tasks}       membersmap=members.map(m=>m.partner.name);       tasksmap=tasks.map(t=>t.task.nom); },view:(vnode)=>{return [m('div',{class:'row',style:''}, [m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input6' },'Type depends'),m('input', {id:'input6',name:'input6',class:'form-control form-control-sm',type:'text',list:'input6_list',onchange:(e)=>{vnode.attrs.data.typedepends=e.target.value},value:vnode.attrs.data.typedepends}),m('datalist', {id:'input6_list'}, type.map((it)=>{return  m('option', {value: it}); }))])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input5' },'Depends on'),m('input', {id:'input5',name:'input5',class:'form-control form-control-sm',type:'text',list:'input5_list',onchange:(e)=>{for ( t of tasks){
    if(t.task.nom==e.target.value){
        vnode.attrs.data.id_depends=t.id;
        tasks_sec=e.target.value;
   }
     
  }},value:tasks_sec}),m('datalist', {id:'input5_list'}, tasksmap.map((it)=>{return  m('option', {value: it}); }))])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input7' },'Assigned to'),m('input', {id:'input7',name:'input7',class:'form-control form-control-sm',type:'text',list:'input7_list',onchange:(e)=>{for ( mem of members){
  if(mem.partner.name==e.target.value){
       vnode.attrs.data.assigned=mem.id;
       members_sec=e.target.value;
  }
   
}},value:members_sec}),m('datalist', {id:'input7_list'}, membersmap.map((it)=>{return  m('option', {value: it}); }))])])])];}};};var newtask_modal=()=>{var status=["todo","inprogress","close"]
;var task={};var validite=undefined;var newtask_modal_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]);if (vnode.attrs.data.validite==true) {          validite=true;     }},view:(vnode)=>{return [m('div',{class:'',style:''}, [m('div',{class:'row',style:''}, [m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('.form-check',[m('input.form-check-input',{type: 'checkbox',id:'checkbox17',checked:validite,onclick:(e)=>{if(vnode.attrs.data.validite==undefined){
validite=true;vnode.attrs.data.validite=validite;

}
else{
vnode.attrs.data.validite=!vnode.attrs.data.validite;
if(validite==undefined )
validite=true;
else
validite=undefined;
}


}}),m('label', {for:'checkbox17'},'Self-validity')])])]),m('div',{class:'col-md-12',style:''}, [m('.form-group',[m('label',{for:'input4' },'Task name'),m('input', {id:'input4',name:'input4',class:'form-control form-control-sm',type:'text',onchange:(e)=>{vnode.attrs.data.nom=e.target.value},value:vnode.attrs.data.nom})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input8' },'Start date'),m('input', {id:'input8',name:'input8',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.datestart=e.target.value},value:vnode.attrs.data.datestart})])]),m('div',{class:'col-md-6',style:''}, [m('.form-group',[m('label',{for:'input9' },'Close date'),m('input', {id:'input9',name:'input9',class:'form-control form-control-sm',type:'date',onchange:(e)=>{vnode.attrs.data.dateclose=e.target.value},value:vnode.attrs.data.dateclose})])])])])];}};};var headers=[{"name":"new task","content":newtask_modal},
{"name":"task options","content":taskoptions_modal}
];var newtask_w_cls = function(){return {};}();return {oninit:(vnode)=>{app.setActions([]);},view:(vnode)=>{return [m('div',{class:'',style:''}, [m(wizard2,{headers:headers,data:vnode.attrs.data})])];}};}

