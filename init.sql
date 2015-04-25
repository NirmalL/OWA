create database weather;
use weather;

create table devs (
    id       int     not null    primary key    auto_increment
);

create table data (
    id       int     not null    primary key    auto_increment,

    devID    int     not null,
    foreign key (devID) references devs (ID),

    temp     float,
    wind     float,
    humid    float
);

-- insert into devs (id) values (1)
