DROP DATABASE IF EXISTS fce;
CREATE DATABASE fce;
\c fce;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS comments;


CREATE TABLE trainers (
    trainer_id SERIAL primary key,
    picture VARCHAR (1000), 
    first_name VARCHAR (50),
    last_name VARCHAR (50),
    email VARCHAR (50),
    phone_number VARCHAR (15),
    bodybuilding boolean, 
    running boolean,
    power_lifting boolean,
    swimming boolean,
    cycling boolean
);

CREATE TABLE comments (
    comment_id SERIAL primary key,
    comment_body text,
    trainer_id integer not null references trainers(trainer_id) on delete cascade 
);
