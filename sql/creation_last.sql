drop schema if exists campus_event;
create schema campus_event;
use campus_event;

create table user(
    user_id int primary key auto_increment,
    name varchar(50),
    email varchar(25),
    password varchar(50),
    contact_number varchar(11)    
);

alter table user modify password varchar(200);


create table location(
	location_id int primary key auto_increment,
	location_name varchar(25)

);

create table Venue(
	venue_id int primary key auto_increment,
    venue_name varchar(25),
    
    location_id int,
    foreign key(location_id) references location(location_id)
);

create table event_category(
	category_id int primary key auto_increment,
    category_name varchar(25)
);

create table event(
	event_id int primary key auto_increment ,
    event_name varchar(25),
    description varchar(100),
    event_date date,
    start_time time,
    end_time time,
    max_attendees int,
    
    category_id int,
    venue_id int,
    user_id int,
	foreign key (category_id) references event_category(category_id),
	foreign key (venue_id) references Venue(venue_id),
    foreign key (user_id) references user(user_id)

);


create table registers(
	user_id int,
    event_id int,
    registration_date date,
    
    primary key(user_id,event_id),
    foreign key (user_id) references user(user_id),
    foreign key(event_id) references event(event_id)
);



insert into location (location_name) values ('Faculty of engineering');

insert into location (location_name) values ('Faculty of Noobs');

insert into location (location_name) values ('Faculty of law');

insert into Venue(venue_name,location_id) values('room 413',1),('room 412',1);

insert into Venue(venue_name,location_id) values('auditorium',3),('field',3);

insert into event_category(category_name) values ('sports');

insert into event_category(category_name) values ('workshop');
select * from event_category;
select * from event;
SELECT v.venue_id as vanue_id, l.location_name as location_name FROM venue v join location l on v.location_id = l.location_id WHERE v.venue_id = 1;
select * from location;