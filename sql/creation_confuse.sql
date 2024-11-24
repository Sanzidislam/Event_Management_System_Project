drop schema if exists campus_event;
create schema campus_event;
use campus_event;

-- create table department(
-- 	department_id int primary key auto_increment,
--     department_name varchar(20)
-- );

create table user(
    username varchar(25) primary key,
    name varchar(50),
    email varchar(25),
    password varchar(50),
    user_type enum('student','teacher'),
    contact_number varchar(11)    
);

create table student(
    student_id int primary key,
    enrollment_date date,
	username varchar(25),
	
    foreign key (username) references user(username)
);
create table teacher(
    teacher_id int primary key,
    employment_date date,
    username varchar(25),

	foreign key (username) references user(username)	
);

-- create table zilla
-- create table upazilla(
-- 	upazilla_id int primary key auto_increment,
--     upazilla_name varchar(25)
-- );
create table location(
	location_id int primary key auto_increment,
	location_name varchar(25)
    
	-- upazilla_id int,
	-- foreign key (upazilla_id) references upazilla(upazilla_id)
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
    status enum('pending','ongoing','finished') default 'pending',
    max_attendees int,
    
    category_id int,
    venue_id int,
    username varchar(25),
	foreign key (category_id) references event_category(category_id),
	foreign key (venue_id) references Venue(venue_id),
    foreign key (username) references user(username)

);


create table registers(
	username varchar(25),
    event_id int,
    registration_date date,
    
    primary key(username,event_id),
    foreign key (username) references user(username),
    foreign key(event_id) references event(event_id)
);


-- create table organized_by(
-- 	username varchar(25),
--     event_id int,
--     organize_date date,
--     primary key(username,event_id),
--     
--     foreign key (username) references user(username),
--     foreign key(event_id) references event(event_id)
-- );