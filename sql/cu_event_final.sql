drop database if exists cu_event;
create schema if not exists cu_event;
use cu_event;
create table user(
	user_id int primary key auto_increment,
    name varchar(50),
    email varchar(25),
    password varchar(200),
    contact_number varchar(11),
    profile_picture varchar(255)
);
create table location(
	location_id int primary key auto_increment,
    location_name varchar(100)
);
create table venue(
	venue_id int primary key auto_increment,
    venue_name varchar(25),
    location_id int,
    
    foreign key (location_id) references location(location_id)
);
create table event_category(
	category_id int primary key auto_increment,
    category_name varchar(25)
);
create table event(
	event_id int primary key auto_increment,
    event_name varchar(100),
    description varchar(250),
    event_date date,
    start_time time,
    end_time time,
    max_attendees int,
    category_id int,
    venue_id int,
    user_id int,
    created_at timestamp default current_timestamp,
    
    foreign key (category_id) references event_category(category_id),
    foreign key (venue_id) references venue(venue_id),
    foreign key (user_id) references user(user_id)
);


create table registers(
	user_id int ,
    event_id int,
    registration_date date,
    
    primary key (user_id,event_id)
);
create table reviews(
	review_id int primary key auto_increment,
    event_id int,
    user_id int,
    review_text text,
    rating int,
    review_date timestamp default current_timestamp,
    
    foreign key (event_id) references event(event_id),
    foreign key (user_id) references user(user_id)
);


create table notifications(
	notification_id int primary key auto_increment,
    event_id int,
    notification_text varchar(255),
    created_at timestamp default current_timestamp,
    
    foreign key (event_id) references event(event_id)
);

insert into location(location_name) values ("Rab Hall");

insert into venue (venue_name,location_id) values ("Pool",1);

insert into event_category (category_name) values ("sports");