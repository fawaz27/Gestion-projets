#include<string.h>
#include<stdlib.h>
#include<api.h>
PLUG_PRIVATE void getprojects_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=1;
const char *params[nparams];
char *req="select json_agg (foo) from (select id , project from project.projects where id in (select id_projects from project.members where id_partners=$1)) foo;",*id=0;
id=api_get_userid(ctx);
params[0]=id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void getprojects(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, getprojects_cb);
}
PLUG_PRIVATE void newproject_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
cJSON *obj=0, *e;
int nparams=2;
const char *params[nparams];
char *req="with np (ip) as (insert into project.projects (project)  values ($1) returning id), nm as (insert into project.members (id_partners,id_projects) values ($2, (select ip from np)) returning id_projects ) select * from nm ",*project=0,*users_id=0,*in=api_get_in(ctx),*schema="{\"properties\":{},\"required\":[\"project\"]}";
if(!(obj=api_check_in(in, schema)))
{
api_error(ctx, "%s missing parameter", __func__);
return;
}
project=api_getplain_param(obj, "project");
users_id=api_get_userid(ctx);
params[0]=project;
params[1]=users_id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
if(project)free(project);
cJSON_Delete(obj);
}
PLUG_PRIVATE void newproject(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, newproject_cb);
}
PLUG_PRIVATE void getproject_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=1;
const char *params[nparams];
char *req="select project from project.projects  where id=$1;",id[64];
api_gettemplate_param2(ctx, "id", id, sizeof(id));
params[0]=id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void getproject(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, getproject_cb);
}
PLUG_PRIVATE void gettasks_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=2;
const char *params[nparams];
char *req="select json_agg (foo) from (select id , t.task , u.task as assign_infos from project.tasks t join  project.users_tasks u on t.id=u.id_tasks where id_projects=$1 and u.id_partners=$2) foo",id[64],*users_id=0;
api_gettemplate_param2(ctx, "id", id, sizeof(id));
users_id=api_get_userid(ctx);
params[0]=id;
params[1]=users_id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void gettasks(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, gettasks_cb);
}
PLUG_PRIVATE void newtask_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
cJSON *obj=0, *e;
int nparams=3;
const char *params[nparams];
char *req=" with np (ip) as (insert into project.tasks (task,id_projects)  values ($2,$1) returning id), nm as (insert into project.users_tasks (id_partners,id_tasks) values ($3, (select ip from np)) returning id_tasks ) select * from nm ;",id[64],*task=0,*users_id=0,*in=api_get_in(ctx),*schema="{\"properties\":{},\"required\":[\"task\"]}";
if(!(obj=api_check_in(in, schema)))
{
api_error(ctx, "%s missing parameter", __func__);
return;
}
api_gettemplate_param2(ctx, "id", id, sizeof(id));
task=api_getplain_param(obj, "task");
users_id=api_get_userid(ctx);
params[0]=id;
params[1]=task;
params[2]=users_id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
if(task)free(task);
cJSON_Delete(obj);
}
PLUG_PRIVATE void newtask(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, newtask_cb);
}
PLUG_PRIVATE void gettask_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=2;
const char *params[nparams];
char *req="select jsonb_build_object('id',id,'task',task) from project.tasks  where id=$2 and id_projects=$1;",id[64],idtask[64];
api_gettemplate_param2(ctx, "id", id, sizeof(id));
api_gettemplate_param2(ctx, "idtask", idtask, sizeof(idtask));
params[0]=id;
params[1]=idtask;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void gettask(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, gettask_cb);
}
PLUG_PRIVATE void updatetask_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
cJSON *obj=0, *e;
int nparams=3;
const char *params[nparams];
char *req="update project.tasks set task=$3 where id=$2 and id_projects=$1;",id[64],idtask[64],*task=0,*in=api_get_in(ctx),*schema="{\"properties\":{},\"required\":[\"task\"]}";
if(!(obj=api_check_in(in, schema)))
{
api_error(ctx, "%s missing parameter", __func__);
return;
}
api_gettemplate_param2(ctx, "id", id, sizeof(id));
api_gettemplate_param2(ctx, "idtask", idtask, sizeof(idtask));
task=api_getplain_param(obj, "task");
params[0]=id;
params[1]=idtask;
params[2]=task;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
if(task)free(task);
cJSON_Delete(obj);
}
PLUG_PRIVATE void updatetask(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, updatetask_cb);
}
PLUG_PRIVATE void getdependtask_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=2;
const char *params[nparams];
char *req="",id[64],idtask[64];
api_gettemplate_param2(ctx, "id", id, sizeof(id));
api_gettemplate_param2(ctx, "idtask", idtask, sizeof(idtask));
params[0]=id;
params[1]=idtask;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void getdependtask(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, getdependtask_cb);
}
PLUG_PRIVATE void gettaskmembers_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=2;
const char *params[nparams];
char *req="select project from project.projects  where id=$1;",id[64],idtask[64];
api_gettemplate_param2(ctx, "id", id, sizeof(id));
api_gettemplate_param2(ctx, "idtask", idtask, sizeof(idtask));
params[0]=id;
params[1]=idtask;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void gettaskmembers(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, gettaskmembers_cb);
}
PLUG_PRIVATE void addtaskmembers_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
cJSON *obj=0, *e;
int nparams=4;
const char *params[nparams];
char *req="insert into  project.users_tasks (id_tasks,id_partners,task) values ($2,$3,$4) returning $4,$1",id[64],idtask[64],*users_id=0,*assign_info=0,*in=api_get_in(ctx),*schema="{\"properties\":{\"assign_info\":{\"type\":\"object\",\"properties\":{\"date\":{\"type\":\"string\"}},\"required\":[]}},\"required\":[\"users_id\",\"assign_info\"]}";
if(!(obj=api_check_in(in, schema)))
{
api_error(ctx, "%s missing parameter", __func__);
return;
}
api_gettemplate_param2(ctx, "id", id, sizeof(id));
api_gettemplate_param2(ctx, "idtask", idtask, sizeof(idtask));
users_id=api_getplain_param(obj, "users_id");
assign_info=api_getplain_param(obj, "assign_info");
params[0]=id;
params[1]=idtask;
params[2]=users_id;
params[3]=assign_info;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
if(users_id)free(users_id);
if(assign_info)free(assign_info);
cJSON_Delete(obj);
}
PLUG_PRIVATE void addtaskmembers(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, addtaskmembers_cb);
}
PLUG_PRIVATE void addmembers_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
cJSON *obj=0, *e;
int nparams=2;
const char *params[nparams];
char *req="insert into  project.members (id_partners,id_projects) values ($2,$1) returning id_partners",id[64],*users_id=0,*in=api_get_in(ctx),*schema="{\"properties\":{},\"required\":[\"users_id\"]}";
if(!(obj=api_check_in(in, schema)))
{
api_error(ctx, "%s missing parameter", __func__);
return;
}
api_gettemplate_param2(ctx, "id", id, sizeof(id));
users_id=api_getplain_param(obj, "users_id");
params[0]=id;
params[1]=users_id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
if(users_id)free(users_id);
cJSON_Delete(obj);
}
PLUG_PRIVATE void addmembers(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, addmembers_cb);
}
PLUG_PRIVATE void getmembers_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=1;
const char *params[nparams];
char *req="select json_agg(id_partners) from project.members where id_projects=$1",id[64];
api_gettemplate_param2(ctx, "id", id, sizeof(id));
params[0]=id;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void getmembers(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, getmembers_cb);
}
PLUG_PRIVATE void getpartnerstask_cb(api_ctx *ctx)
{
PGconn *conn=api_get_pgconn(ctx);
struct rest *r=api_get_resource(ctx);
int nparams=2;
const char *params[nparams];
char *req="select project from project.projects  where id_tasks=$1 and  id_partners=$2 ",id[64],idtask[64];
api_gettemplate_param2(ctx, "id", id, sizeof(id));
api_gettemplate_param2(ctx, "idtask", idtask, sizeof(idtask));
params[0]=id;
params[1]=idtask;
if(!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
api_error(ctx, "%s: %s", __func__, PQerrorMessage(conn));
else
{ api_debug(ctx, "%s\n", __func__);
api_connection_onread(ctx, api_reply);
}
}
PLUG_PRIVATE void getpartnerstask(void *arg)
{
api_ctx *ctx = arg;
api_connection_get(ctx, getpartnerstask_cb);
}
PLUG_EXPORT int plugversion = PLUG_APIVER;
PLUG_EXPORT struct plugin_entry *project_register(void)
{
struct plugin_entry *e;
e = calloc(14, sizeof(struct plugin_entry));
e[0].name = "project_getprojects";
e[0].cb = getprojects;
e[1].name = "project_newproject";
e[1].cb = newproject;
e[2].name = "project_getproject";
e[2].cb = getproject;
e[3].name = "project_gettasks";
e[3].cb = gettasks;
e[4].name = "project_newtask";
e[4].cb = newtask;
e[5].name = "project_gettask";
e[5].cb = gettask;
e[6].name = "project_updatetask";
e[6].cb = updatetask;
e[7].name = "project_getdependtask";
e[7].cb = getdependtask;
e[8].name = "project_gettaskmembers";
e[8].cb = gettaskmembers;
e[9].name = "project_addtaskmembers";
e[9].cb = addtaskmembers;
e[10].name = "project_addmembers";
e[10].cb = addmembers;
e[11].name = "project_getmembers";
e[11].cb = getmembers;
e[12].name = "project_getpartnerstask";
e[12].cb = getpartnerstask;
return e;
}
