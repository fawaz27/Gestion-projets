insert into project.projects (project) values ( '{"name":"foo", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"sqll" ,"id_parti":"1"}');
insert into project.projects (project) values ( '{"name":"fii", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"docker","id_parti":"2"}');
insert into project.projects (project) values ( '{"name":"bare", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"machine","id_parti":"2"}');
insert into project.projects (project) values ( '{"name":"baro", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"web","id_parti":"3"}');
insert into project.projects (project) values ( '{"name":"goku", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"java","id_parti":"1"}');

insert into utils.partners (partner) values ( '{"name":"CHABI","prenom":"Fawaz","password":"1234"}');
insert into utils.partners (partner) values ( '{"name":"ODJO","prenom":"Mike","password":"56789"}');
insert into utils.partners (partner) values ( '{"name":"AMADOU","prenom":"Ruchdane","password":"0000"}');
insert into utils.partners (partner) values ( '{"name":"DOSSEH","prenom":"David","password":"1456"}');
insert into utils.partners (partner) values ( '{"name":"YETO","prenom":"Danatien","password":"1555"}');
insert into utils.partners (partner) values ( '{"name":"DANLOME","prenom":"Pierre","password":"9521"}');
insert into utils.partners (partner) values ( '{"name":"AGBAHOLOU","prenom":"Murielle","password":"4631"}');


insert into project.tasks (task,id_projects) values ( '{"name":"bar", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"pr1"}',1);
insert into project.tasks (task,id_projects) values ( '{"name":"bar", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"pr2"}',2);
insert into project.tasks (task,id_projects) values ( '{"name":"bar", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"pr3"}',2);
insert into project.tasks (task,id_projects) values ( '{"name":"bar", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"pr4"}',3);
insert into project.tasks (task,id_projects) values ( '{"name":"bar", "datecre":"2012-07-20 00:00:00","dateact":"2012-08-20 00:00:00","desc":"pr5"}',4);

insert into utils.members (member,id_partners,id_projects) values ( '[]',4,2);
insert into utils.members (member,id_partners,id_projects) values ( '[]',3,2);
insert into utils.members (member,id_partners,id_projects) values ( '[]',3,1);
insert into utils.members (member,id_partners,id_projects) values ( '[]',3,4);
insert into utils.members (member,id_partners,id_projects) values ( '[]',1,4);
insert into utils.members (member,id_partners,id_projects) values ( '[]',2,4);

insert into project.users_tasks (id_tasks, id_partners,task) values (2,4,'[]');
insert into project.users_tasks (id_tasks, id_partners,task) values (2,1,'[]');
insert into project.users_tasks (id_tasks, id_partners,task) values (3,4,'[]');
insert into project.users_tasks (id_tasks, id_partners,task) values (1,2,'[]');
insert into project.users_tasks (id_tasks, id_partners,task) values (3,2,'[]');
insert into project.users_tasks (id_tasks, id_partners,task) values (1,1,'[]');
insert into project.users_tasks (id_tasks, id_partners,task) values (1,3,'[]');
--\copy project.members from lie.txt with delimiter  ',' null '';
--\copy project.users_tasks from effectue.txt with delimiter  ',' null '';
--insert into project.members (id_partners,id_projects,type) values (6,4,2);
--insert into project.users_tasks (id_tasks,id_partners) values (2,2);



insert into project.depends(id_tasks, id_tasks1, depend) values (2,4,'{"type":"début-début"}');
insert into project.depends(id_tasks, id_tasks1, depend) values (2,1,'{"type":"début-début"}');
insert into project.depends(id_tasks, id_tasks1, depend) values (2,3,'{"type":"fin-fin"}');
insert into project.depends(id_tasks, id_tasks1, depend) values (1,4,'{"type":"fin-début"}');
insert into project.depends(id_tasks, id_tasks1, depend) values (5,4,'{"type":"fin-fin"}');
insert into project.depends(id_tasks, id_tasks1, depend) values (5,3,'{"type":"fin-début"}');
insert into project.depends(id_tasks, id_tasks1, depend) values (3,4,'{"type":"début-début"}');









with np (ip) as 
    (insert into project.projects (project)  values ($1) returning id), 
        nm as (insert into project.members (id_partners,id_projects) values ($2, (select ip from np)) returning id_projects ) select * from nm;