--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Ubuntu 13.6-1.pgdg20.04+1+b1)
-- Dumped by pg_dump version 13.6 (Ubuntu 13.6-1.pgdg20.04+1+b1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: game; Type: SCHEMA; Schema: -; Owner: chabi
--

CREATE SCHEMA game;


ALTER SCHEMA game OWNER TO chabi;

--
-- Name: novel; Type: SCHEMA; Schema: -; Owner: chabi
--

CREATE SCHEMA novel;


ALTER SCHEMA novel OWNER TO chabi;

--
-- Name: project; Type: SCHEMA; Schema: -; Owner: chabi
--

CREATE SCHEMA project;


ALTER SCHEMA project OWNER TO chabi;

--
-- Name: utils; Type: SCHEMA; Schema: -; Owner: chabi
--

CREATE SCHEMA utils;


ALTER SCHEMA utils OWNER TO chabi;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chess; Type: TABLE; Schema: game; Owner: chabi
--

CREATE TABLE game.chess (
    id bigint NOT NULL,
    ches jsonb
);


ALTER TABLE game.chess OWNER TO chabi;

--
-- Name: chess_id_seq; Type: SEQUENCE; Schema: game; Owner: chabi
--

CREATE SEQUENCE game.chess_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE game.chess_id_seq OWNER TO chabi;

--
-- Name: chess_id_seq; Type: SEQUENCE OWNED BY; Schema: game; Owner: chabi
--

ALTER SEQUENCE game.chess_id_seq OWNED BY game.chess.id;


--
-- Name: playtic; Type: TABLE; Schema: game; Owner: chabi
--

CREATE TABLE game.playtic (
    "id_tic-tac" bigint NOT NULL,
    id_partners bigint NOT NULL
);


ALTER TABLE game.playtic OWNER TO chabi;

--
-- Name: tic-tac; Type: TABLE; Schema: game; Owner: chabi
--

CREATE TABLE game."tic-tac" (
    id bigint NOT NULL,
    tic jsonb
);


ALTER TABLE game."tic-tac" OWNER TO chabi;

--
-- Name: tic-tac_id_seq; Type: SEQUENCE; Schema: game; Owner: chabi
--

CREATE SEQUENCE game."tic-tac_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE game."tic-tac_id_seq" OWNER TO chabi;

--
-- Name: tic-tac_id_seq; Type: SEQUENCE OWNED BY; Schema: game; Owner: chabi
--

ALTER SEQUENCE game."tic-tac_id_seq" OWNED BY game."tic-tac".id;


--
-- Name: chapters; Type: TABLE; Schema: novel; Owner: chabi
--

CREATE TABLE novel.chapters (
    id bigint NOT NULL,
    chapter jsonb,
    id_novels bigint
);


ALTER TABLE novel.chapters OWNER TO chabi;

--
-- Name: chapters_id_seq; Type: SEQUENCE; Schema: novel; Owner: chabi
--

CREATE SEQUENCE novel.chapters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE novel.chapters_id_seq OWNER TO chabi;

--
-- Name: chapters_id_seq; Type: SEQUENCE OWNED BY; Schema: novel; Owner: chabi
--

ALTER SEQUENCE novel.chapters_id_seq OWNED BY novel.chapters.id;


--
-- Name: novels; Type: TABLE; Schema: novel; Owner: chabi
--

CREATE TABLE novel.novels (
    id bigint NOT NULL,
    novel jsonb
);


ALTER TABLE novel.novels OWNER TO chabi;

--
-- Name: novels_id_seq; Type: SEQUENCE; Schema: novel; Owner: chabi
--

CREATE SEQUENCE novel.novels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE novel.novels_id_seq OWNER TO chabi;

--
-- Name: novels_id_seq; Type: SEQUENCE OWNED BY; Schema: novel; Owner: chabi
--

ALTER SEQUENCE novel.novels_id_seq OWNED BY novel.novels.id;


--
-- Name: depends; Type: TABLE; Schema: project; Owner: chabi
--

CREATE TABLE project.depends (
    id_tasks bigint NOT NULL,
    id_tasks1 bigint NOT NULL,
    depend jsonb
);


ALTER TABLE project.depends OWNER TO chabi;

--
-- Name: projects; Type: TABLE; Schema: project; Owner: chabi
--

CREATE TABLE project.projects (
    id bigint NOT NULL,
    project jsonb
);


ALTER TABLE project.projects OWNER TO chabi;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: project; Owner: chabi
--

CREATE SEQUENCE project.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE project.projects_id_seq OWNER TO chabi;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: project; Owner: chabi
--

ALTER SEQUENCE project.projects_id_seq OWNED BY project.projects.id;


--
-- Name: subprojects; Type: TABLE; Schema: project; Owner: chabi
--

CREATE TABLE project.subprojects (
    id_projects bigint NOT NULL,
    id_projects1 bigint NOT NULL,
    subproject jsonb
);


ALTER TABLE project.subprojects OWNER TO chabi;

--
-- Name: tasks; Type: TABLE; Schema: project; Owner: chabi
--

CREATE TABLE project.tasks (
    id bigint NOT NULL,
    task jsonb,
    id_projects bigint
);


ALTER TABLE project.tasks OWNER TO chabi;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: project; Owner: chabi
--

CREATE SEQUENCE project.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE project.tasks_id_seq OWNER TO chabi;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: project; Owner: chabi
--

ALTER SEQUENCE project.tasks_id_seq OWNED BY project.tasks.id;


--
-- Name: users_tasks; Type: TABLE; Schema: project; Owner: chabi
--

CREATE TABLE project.users_tasks (
    id_tasks bigint NOT NULL,
    id_partners bigint NOT NULL,
    task jsonb
);


ALTER TABLE project.users_tasks OWNER TO chabi;

--
-- Name: bookmarks; Type: TABLE; Schema: utils; Owner: chabi
--

CREATE TABLE utils.bookmarks (
    id_partners bigint NOT NULL,
    id_novels bigint NOT NULL
);


ALTER TABLE utils.bookmarks OWNER TO chabi;

--
-- Name: members; Type: TABLE; Schema: utils; Owner: chabi
--

CREATE TABLE utils.members (
    id_partners bigint NOT NULL,
    id_projects bigint NOT NULL,
    member jsonb
);


ALTER TABLE utils.members OWNER TO chabi;

--
-- Name: modules; Type: TABLE; Schema: utils; Owner: chabi
--

CREATE TABLE utils.modules (
    id bigint NOT NULL,
    module jsonb
);


ALTER TABLE utils.modules OWNER TO chabi;

--
-- Name: modules_id_seq; Type: SEQUENCE; Schema: utils; Owner: chabi
--

CREATE SEQUENCE utils.modules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE utils.modules_id_seq OWNER TO chabi;

--
-- Name: modules_id_seq; Type: SEQUENCE OWNED BY; Schema: utils; Owner: chabi
--

ALTER SEQUENCE utils.modules_id_seq OWNED BY utils.modules.id;


--
-- Name: partners; Type: TABLE; Schema: utils; Owner: chabi
--

CREATE TABLE utils.partners (
    id bigint NOT NULL,
    partner jsonb
);


ALTER TABLE utils.partners OWNER TO chabi;

--
-- Name: partners_id_seq; Type: SEQUENCE; Schema: utils; Owner: chabi
--

CREATE SEQUENCE utils.partners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE utils.partners_id_seq OWNER TO chabi;

--
-- Name: partners_id_seq; Type: SEQUENCE OWNED BY; Schema: utils; Owner: chabi
--

ALTER SEQUENCE utils.partners_id_seq OWNED BY utils.partners.id;


--
-- Name: partners_modules; Type: TABLE; Schema: utils; Owner: chabi
--

CREATE TABLE utils.partners_modules (
    id_partners bigint NOT NULL,
    id_modules bigint NOT NULL
);


ALTER TABLE utils.partners_modules OWNER TO chabi;

--
-- Name: playchess; Type: TABLE; Schema: utils; Owner: chabi
--

CREATE TABLE utils.playchess (
    id_partners bigint NOT NULL,
    id_chess bigint NOT NULL
);


ALTER TABLE utils.playchess OWNER TO chabi;

--
-- Name: chess id; Type: DEFAULT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game.chess ALTER COLUMN id SET DEFAULT nextval('game.chess_id_seq'::regclass);


--
-- Name: tic-tac id; Type: DEFAULT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game."tic-tac" ALTER COLUMN id SET DEFAULT nextval('game."tic-tac_id_seq"'::regclass);


--
-- Name: chapters id; Type: DEFAULT; Schema: novel; Owner: chabi
--

ALTER TABLE ONLY novel.chapters ALTER COLUMN id SET DEFAULT nextval('novel.chapters_id_seq'::regclass);


--
-- Name: novels id; Type: DEFAULT; Schema: novel; Owner: chabi
--

ALTER TABLE ONLY novel.novels ALTER COLUMN id SET DEFAULT nextval('novel.novels_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.projects ALTER COLUMN id SET DEFAULT nextval('project.projects_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.tasks ALTER COLUMN id SET DEFAULT nextval('project.tasks_id_seq'::regclass);


--
-- Name: modules id; Type: DEFAULT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.modules ALTER COLUMN id SET DEFAULT nextval('utils.modules_id_seq'::regclass);


--
-- Name: partners id; Type: DEFAULT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.partners ALTER COLUMN id SET DEFAULT nextval('utils.partners_id_seq'::regclass);


--
-- Data for Name: chess; Type: TABLE DATA; Schema: game; Owner: chabi
--

COPY game.chess (id, ches) FROM stdin;
\.


--
-- Data for Name: playtic; Type: TABLE DATA; Schema: game; Owner: chabi
--

COPY game.playtic ("id_tic-tac", id_partners) FROM stdin;
\.


--
-- Data for Name: tic-tac; Type: TABLE DATA; Schema: game; Owner: chabi
--

COPY game."tic-tac" (id, tic) FROM stdin;
\.


--
-- Data for Name: chapters; Type: TABLE DATA; Schema: novel; Owner: chabi
--

COPY novel.chapters (id, chapter, id_novels) FROM stdin;
\.


--
-- Data for Name: novels; Type: TABLE DATA; Schema: novel; Owner: chabi
--

COPY novel.novels (id, novel) FROM stdin;
\.


--
-- Data for Name: depends; Type: TABLE DATA; Schema: project; Owner: chabi
--

COPY project.depends (id_tasks, id_tasks1, depend) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: project; Owner: chabi
--

COPY project.projects (id, project) FROM stdin;
\.


--
-- Data for Name: subprojects; Type: TABLE DATA; Schema: project; Owner: chabi
--

COPY project.subprojects (id_projects, id_projects1, subproject) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: project; Owner: chabi
--

COPY project.tasks (id, task, id_projects) FROM stdin;
\.


--
-- Data for Name: users_tasks; Type: TABLE DATA; Schema: project; Owner: chabi
--

COPY project.users_tasks (id_tasks, id_partners, task) FROM stdin;
\.


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: utils; Owner: chabi
--

COPY utils.bookmarks (id_partners, id_novels) FROM stdin;
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: utils; Owner: chabi
--

COPY utils.members (id_partners, id_projects, member) FROM stdin;
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: utils; Owner: chabi
--

COPY utils.modules (id, module) FROM stdin;
1	{"name": "project", "datecreate": "2022-06-04T12:56:05.468Z", "description": "Un module de gestion de projets"}
2	{"name": "novel", "datecreate": "2022-06-04T13:01:10.455Z", "description": "Traduction de novels\\n"}
3	{"name": "game", "datecreate": "2022-06-04T13:40:05.372Z", "description": "Créer des jeux"}
\.


--
-- Data for Name: partners; Type: TABLE DATA; Schema: utils; Owner: chabi
--

COPY utils.partners (id, partner) FROM stdin;
1	{"name": "CHABI BOUKARI Fawaz", "email": "boukarifawas27@gmail.com", "password": "$2a$10$JxTiMSXpdAZOXe4xVRyHEe.yXTB25EN11Za1l2.5qAcmdKJzrq2ru", "username": "fawaz02"}
\.


--
-- Data for Name: partners_modules; Type: TABLE DATA; Schema: utils; Owner: chabi
--

COPY utils.partners_modules (id_partners, id_modules) FROM stdin;
\.


--
-- Data for Name: playchess; Type: TABLE DATA; Schema: utils; Owner: chabi
--

COPY utils.playchess (id_partners, id_chess) FROM stdin;
\.


--
-- Name: chess_id_seq; Type: SEQUENCE SET; Schema: game; Owner: chabi
--

SELECT pg_catalog.setval('game.chess_id_seq', 1, false);


--
-- Name: tic-tac_id_seq; Type: SEQUENCE SET; Schema: game; Owner: chabi
--

SELECT pg_catalog.setval('game."tic-tac_id_seq"', 1, false);


--
-- Name: chapters_id_seq; Type: SEQUENCE SET; Schema: novel; Owner: chabi
--

SELECT pg_catalog.setval('novel.chapters_id_seq', 1, false);


--
-- Name: novels_id_seq; Type: SEQUENCE SET; Schema: novel; Owner: chabi
--

SELECT pg_catalog.setval('novel.novels_id_seq', 1, false);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: project; Owner: chabi
--

SELECT pg_catalog.setval('project.projects_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: project; Owner: chabi
--

SELECT pg_catalog.setval('project.tasks_id_seq', 1, false);


--
-- Name: modules_id_seq; Type: SEQUENCE SET; Schema: utils; Owner: chabi
--

SELECT pg_catalog.setval('utils.modules_id_seq', 3, true);


--
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: utils; Owner: chabi
--

SELECT pg_catalog.setval('utils.partners_id_seq', 1, true);


--
-- Name: chess chess_pk; Type: CONSTRAINT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game.chess
    ADD CONSTRAINT chess_pk PRIMARY KEY (id);


--
-- Name: playtic playtic_pk; Type: CONSTRAINT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game.playtic
    ADD CONSTRAINT playtic_pk PRIMARY KEY ("id_tic-tac", id_partners);


--
-- Name: tic-tac tic-tac_pk; Type: CONSTRAINT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game."tic-tac"
    ADD CONSTRAINT "tic-tac_pk" PRIMARY KEY (id);


--
-- Name: chapters chapters_pk; Type: CONSTRAINT; Schema: novel; Owner: chabi
--

ALTER TABLE ONLY novel.chapters
    ADD CONSTRAINT chapters_pk PRIMARY KEY (id);


--
-- Name: novels novels_pk; Type: CONSTRAINT; Schema: novel; Owner: chabi
--

ALTER TABLE ONLY novel.novels
    ADD CONSTRAINT novels_pk PRIMARY KEY (id);


--
-- Name: depends depends_pk; Type: CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.depends
    ADD CONSTRAINT depends_pk PRIMARY KEY (id_tasks, id_tasks1);


--
-- Name: projects projects_pk; Type: CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);


--
-- Name: subprojects subprojects_pk; Type: CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.subprojects
    ADD CONSTRAINT subprojects_pk PRIMARY KEY (id_projects, id_projects1);


--
-- Name: tasks tasks_pk; Type: CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.tasks
    ADD CONSTRAINT tasks_pk PRIMARY KEY (id);


--
-- Name: users_tasks users_tasks_pk; Type: CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.users_tasks
    ADD CONSTRAINT users_tasks_pk PRIMARY KEY (id_tasks, id_partners);


--
-- Name: bookmarks bookmarks_pk; Type: CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.bookmarks
    ADD CONSTRAINT bookmarks_pk PRIMARY KEY (id_partners, id_novels);


--
-- Name: members members_pk; Type: CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.members
    ADD CONSTRAINT members_pk PRIMARY KEY (id_partners, id_projects);


--
-- Name: modules modules_pk; Type: CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.modules
    ADD CONSTRAINT modules_pk PRIMARY KEY (id);


--
-- Name: partners_modules partners_modules_pk; Type: CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.partners_modules
    ADD CONSTRAINT partners_modules_pk PRIMARY KEY (id_partners, id_modules);


--
-- Name: playchess playchess_pk; Type: CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.playchess
    ADD CONSTRAINT playchess_pk PRIMARY KEY (id_partners, id_chess);


--
-- Name: partners users_pk; Type: CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.partners
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: playtic partners_fk; Type: FK CONSTRAINT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game.playtic
    ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners) REFERENCES utils.partners(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: playtic tic-tac_fk; Type: FK CONSTRAINT; Schema: game; Owner: chabi
--

ALTER TABLE ONLY game.playtic
    ADD CONSTRAINT "tic-tac_fk" FOREIGN KEY ("id_tic-tac") REFERENCES game."tic-tac"(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chapters novels_fk; Type: FK CONSTRAINT; Schema: novel; Owner: chabi
--

ALTER TABLE ONLY novel.chapters
    ADD CONSTRAINT novels_fk FOREIGN KEY (id_novels) REFERENCES novel.novels(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users_tasks partners_fk; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.users_tasks
    ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners) REFERENCES utils.partners(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks projects_fk; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.tasks
    ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects) REFERENCES project.projects(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: subprojects projects_fk; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.subprojects
    ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects) REFERENCES project.projects(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: subprojects projects_fk1; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.subprojects
    ADD CONSTRAINT projects_fk1 FOREIGN KEY (id_projects1) REFERENCES project.projects(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users_tasks tasks_fk; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.users_tasks
    ADD CONSTRAINT tasks_fk FOREIGN KEY (id_tasks) REFERENCES project.tasks(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: depends tasks_fk; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.depends
    ADD CONSTRAINT tasks_fk FOREIGN KEY (id_tasks) REFERENCES project.tasks(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: depends tasks_fk1; Type: FK CONSTRAINT; Schema: project; Owner: chabi
--

ALTER TABLE ONLY project.depends
    ADD CONSTRAINT tasks_fk1 FOREIGN KEY (id_tasks1) REFERENCES project.tasks(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: playchess chess_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.playchess
    ADD CONSTRAINT chess_fk FOREIGN KEY (id_chess) REFERENCES game.chess(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: partners_modules modules_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.partners_modules
    ADD CONSTRAINT modules_fk FOREIGN KEY (id_modules) REFERENCES utils.modules(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookmarks novels_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.bookmarks
    ADD CONSTRAINT novels_fk FOREIGN KEY (id_novels) REFERENCES novel.novels(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: members partners_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.members
    ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners) REFERENCES utils.partners(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookmarks partners_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.bookmarks
    ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners) REFERENCES utils.partners(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: playchess partners_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.playchess
    ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners) REFERENCES utils.partners(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: partners_modules partners_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.partners_modules
    ADD CONSTRAINT partners_fk FOREIGN KEY (id_partners) REFERENCES utils.partners(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: members projects_fk; Type: FK CONSTRAINT; Schema: utils; Owner: chabi
--

ALTER TABLE ONLY utils.members
    ADD CONSTRAINT projects_fk FOREIGN KEY (id_projects) REFERENCES project.projects(id) MATCH FULL ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

