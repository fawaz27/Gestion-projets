-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 0.9.4
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: new_database | type: DATABASE --
-- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- ddl-end --


-- object: project | type: SCHEMA --
-- DROP SCHEMA IF EXISTS project CASCADE;
CREATE SCHEMA project;
-- ddl-end --

-- object: utils | type: SCHEMA --
-- DROP SCHEMA IF EXISTS utils CASCADE;
CREATE SCHEMA utils;
-- ddl-end --

SET search_path TO pg_catalog,public,project,utils;
-- ddl-end --

-- object: project.tasks | type: TABLE --
-- DROP TABLE IF EXISTS project.tasks CASCADE;
CREATE TABLE project.tasks (
	id bigserial NOT NULL,
	task jsonb,
	id_projects bigint,
	CONSTRAINT tasks_pk PRIMARY KEY (id)
);
-- ddl-end --

-- object: project.projects | type: TABLE --
-- DROP TABLE IF EXISTS project.projects CASCADE;
CREATE TABLE project.projects (
	id bigserial NOT NULL,
	project jsonb,
	CONSTRAINT projects_pk PRIMARY KEY (id)
);
-- ddl-end --

-- object: projects_fk | type: CONSTRAINT --
-- ALTER TABLE project.tasks DROP CONSTRAINT IF EXISTS projects_fk CASCADE;
ALTER TABLE project.tasks ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects)
REFERENCES project.projects (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: utils.partners | type: TABLE --
-- DROP TABLE IF EXISTS utils.partners CASCADE;
CREATE TABLE utils.partners (
	id bigserial NOT NULL,
	partner jsonb,
	CONSTRAINT users_pk PRIMARY KEY (id)
);
-- ddl-end --

-- object: utils.members | type: TABLE --
-- DROP TABLE IF EXISTS utils.members CASCADE;
CREATE TABLE utils.members (
	id_partners bigint NOT NULL,
	id_projects bigint NOT NULL,
	member jsonb,
	CONSTRAINT members_pk PRIMARY KEY (id_partners,id_projects)
);
-- ddl-end --

-- object: partners_fk | type: CONSTRAINT --
-- ALTER TABLE utils.members DROP CONSTRAINT IF EXISTS partners_fk CASCADE;
ALTER TABLE utils.members ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners)
REFERENCES utils.partners (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: projects_fk | type: CONSTRAINT --
-- ALTER TABLE utils.members DROP CONSTRAINT IF EXISTS projects_fk CASCADE;
ALTER TABLE utils.members ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects)
REFERENCES project.projects (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: project.users_tasks | type: TABLE --
-- DROP TABLE IF EXISTS project.users_tasks CASCADE;
CREATE TABLE project.users_tasks (
	id_tasks bigint NOT NULL,
	id_partners bigint NOT NULL,
	task jsonb,
	CONSTRAINT users_tasks_pk PRIMARY KEY (id_tasks,id_partners)
);
-- ddl-end --

-- object: tasks_fk | type: CONSTRAINT --
-- ALTER TABLE project.users_tasks DROP CONSTRAINT IF EXISTS tasks_fk CASCADE;
ALTER TABLE project.users_tasks ADD CONSTRAINT tasks_fk FOREIGN KEY (id_tasks)
REFERENCES project.tasks (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: partners_fk | type: CONSTRAINT --
-- ALTER TABLE project.users_tasks DROP CONSTRAINT IF EXISTS partners_fk CASCADE;
ALTER TABLE project.users_tasks ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners)
REFERENCES utils.partners (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: project.depends | type: TABLE --
-- DROP TABLE IF EXISTS project.depends CASCADE;
CREATE TABLE project.depends (
	id_tasks bigint NOT NULL,
	id_tasks1 bigint NOT NULL,
	depend jsonb,
	CONSTRAINT depends_pk PRIMARY KEY (id_tasks,id_tasks1)
);
-- ddl-end --

-- object: tasks_fk | type: CONSTRAINT --
-- ALTER TABLE project.depends DROP CONSTRAINT IF EXISTS tasks_fk CASCADE;
ALTER TABLE project.depends ADD CONSTRAINT tasks_fk FOREIGN KEY (id_tasks)
REFERENCES project.tasks (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: tasks_fk1 | type: CONSTRAINT --
-- ALTER TABLE project.depends DROP CONSTRAINT IF EXISTS tasks_fk1 CASCADE;
ALTER TABLE project.depends ADD CONSTRAINT tasks_fk1 FOREIGN KEY (id_tasks1)
REFERENCES project.tasks (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: project.subprojects | type: TABLE --
-- DROP TABLE IF EXISTS project.subprojects CASCADE;
CREATE TABLE project.subprojects (
	id_projects bigint NOT NULL,
	id_projects1 bigint NOT NULL,
	subproject jsonb,
	CONSTRAINT subprojects_pk PRIMARY KEY (id_projects,id_projects1)
);
-- ddl-end --

-- object: projects_fk | type: CONSTRAINT --
-- ALTER TABLE project.subprojects DROP CONSTRAINT IF EXISTS projects_fk CASCADE;
ALTER TABLE project.subprojects ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects)
REFERENCES project.projects (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: projects_fk1 | type: CONSTRAINT --
-- ALTER TABLE project.subprojects DROP CONSTRAINT IF EXISTS projects_fk1 CASCADE;
ALTER TABLE project.subprojects ADD CONSTRAINT projects_fk1 FOREIGN KEY (id_projects1)
REFERENCES project.projects (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


