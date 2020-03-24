--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: xy
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name text,
    instructors text
);


ALTER TABLE public.courses OWNER TO xy;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: xy
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO xy;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xy
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: exams; Type: TABLE; Schema: public; Owner: xy
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    exam_name text,
    description text,
    course_id integer,
    year integer,
    term character varying(10),
    avg double precision,
    min double precision,
    max double precision,
    std_dev double precision
);


ALTER TABLE public.exams OWNER TO xy;

--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: xy
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exams_id_seq OWNER TO xy;

--
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xy
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: xy
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    topic_id integer[],
    exam_id integer,
    question_num integer,
    url text,
    avg double precision,
    std_dev double precision,
    correlation double precision
);


ALTER TABLE public.questions OWNER TO xy;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: xy
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO xy;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xy
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: xy
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.topics OWNER TO xy;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: xy
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO xy;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xy
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: xy
--

COPY public.courses (id, name, instructors) FROM stdin;
1	PHYS101	1prof, 2prof
\.


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: xy
--

COPY public.exams (id, exam_name, description, course_id, year, term, avg, min, max, std_dev) FROM stdin;
1	PHYS101midterm	testing	1	2020	SPRING	50	20	90	30
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: xy
--

COPY public.questions (id, topic_id, exam_id, question_num, url, avg, std_dev, correlation) FROM stdin;
1	{1,3}	1	7	no url yet	50.5	16.78	0.9
2	{1,3}	1	6	no url yet	40.5	17.89	-0.1
3	{1,3}	1	5	no url yet	90	17.89	0.1
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: xy
--

COPY public.topics (id, name) FROM stdin;
1	1topic
2	2topic
3	3topic
\.


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xy
--

SELECT pg_catalog.setval('public.courses_id_seq', 1, true);


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xy
--

SELECT pg_catalog.setval('public.exams_id_seq', 1, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xy
--

SELECT pg_catalog.setval('public.questions_id_seq', 3, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xy
--

SELECT pg_catalog.setval('public.topics_id_seq', 3, true);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: xy
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

