-- Insert sample users
-- use campus_event;
INSERT INTO user (username, name, email, password, user_type, contact_number) VALUES
('sanzid', 'Sanzid Islam', 'sanzid@example.com', 'password123', 'student', '01711111111'),
('jane_smith', 'Jane Smith', 'jane@example.com', 'password456', 'teacher', '01722222222'),
('arafat123', 'Arafat Sheikh', 'arafat@example.com', 'password789', 'student', '01733333333'),
('lisa_brown', 'Lisa Brown', 'lisa@example.com', 'password321', 'teacher', '01744444444'),
('nazmul', 'Nazmul Hasan', 'namzul@example.com', 'password654', 'student', '01755555555');

-- Insert sample students
INSERT INTO student (student_id, enrollment_date, username) VALUES
(22701065, '2022-01-15', 'Sanzid'),
(22701017, '2021-09-01', 'arafat123'),
(22701030, '2023-01-10', 'nazmul');

-- Insert sample teachers
INSERT INTO teacher (teacher_id, employment_date, username) VALUES
(101, '2020-03-20', 'jane_smith'),
(102, '2019-07-10', 'lisa_brown');



-- Insert sample locations
INSERT INTO location (location_name) VALUES
('Shahid Minar'),
('Botanical Gargen'),
('Engineering Faculty'),
('Science Faculty'),
('Central Field'),
('TeleTalk Pahar');

-- Insert sample venues
insert into Venue(venue_name,location_id) values
('Shahid Minar',1),
('Jarul Tola',1),
('room 413',3),
('room 412',3),
('Virtual Classroom',3),
('Physics Workshop',4),
('Badminton Ground 1',5),
('Teletalk Pahar',6);


-- Insert sample event categories
INSERT INTO event_category (category_name) VALUES
('Workshop'),
('Seminar'),
('Sports'),
('Adventure'),
('Cultural');

-- Insert sample events
INSERT INTO event (event_name, description, event_date, start_time, end_time, status, max_attendees, category_id, venue_id,username) VALUES
('Python Workshop', 'Learn Python programming basics ', '2024-12-01', '10:00:00', '13:00:00', 'pending', 50, 1, 5, 'sanzid'),
('Career Seminar', 'How to excel in your career', '2024-12-05', '14:00:00', '16:00:00', 'pending', 100, 2, 3, 'sanzid'),
('Badminton Match', 'Exciting match ', '2024-12-10', '09:00:00', '12:00:00', 'pending', 22, 3, 7, 'sanzid'),
('Hiking Trip', 'Weekend adventure to the hills', '2024-12-15', '06:00:00', '18:00:00', 'pending', 20, 4, 6, 'sanzid'),
('Music Fest', 'Annual cultural music festival', '2024-12-20', '18:00:00', '22:00:00', 'pending', 200, 5, 1, 'sanzid');

-- Insert sample organizers
-- INSERT INTO organized_by (username, event_id, organize_date) VALUES
-- ('jane_smith', 1, '2024-11-01'),
-- ('lisa_brown', 2, '2024-11-02'),
-- ('jane_smith', 3, '2024-11-03'),
-- ('lisa_brown', 4, '2024-11-04'),
-- ('jane_smith', 5, '2024-11-05');

-- Insert sample registrations
INSERT INTO registers (username, event_id, registration_date) VALUES
('sanzid', 1, '2024-11-15'),
('arafat123', 1, '2024-11-15'),
('nazmul', 2, '2024-11-16'),
('sanzid', 3, '2024-11-16'),
('arafat123', 4, '2024-11-17');

INSERT INTO registers (username, event_id, registration_date) VALUES
('Sanzid',2,current_date());

