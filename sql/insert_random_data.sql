-- Insert into `user` table
INSERT INTO user (username, name, email, password, user_type, department, contact_number)
VALUES 
('john_doe', 'John Doe', 'john@example.com', 'pass123', 'student', 'Computer Science', '12345678901'),
('jane_smith', 'Jane Smith', 'jane@example.com', 'pass456', 'teacher', 'Mathematics', '23456789012');

-- Insert into `student` table
INSERT INTO student (student_id, enrollment_date, username)
VALUES 
(1, '2021-09-01', 'john_doe');

-- Insert into `teacher` table
INSERT INTO teacher (teacher_id, employment_date, username)
VALUES 
(1, '2020-08-15', 'jane_smith');

-- Insert into `location` table
INSERT INTO location (address, description, is_available)
VALUES 
('Building A, Room 101', 'Main hall for large events', true),
('Building B, Room 202', 'Classroom with 50 seats', true);

-- Insert into `event_category` table
INSERT INTO event_category (category_name)
VALUES 
('Sports'),
('Adventure');

-- Insert into `event` table
INSERT INTO event (event_name, description, event_date, start_time, end_time, status, max_attendees, currently_registered, category_id, location_id)
VALUES 
('Football Match', 'Inter-departmental football match', '2024-12-01', '10:00:00', '12:00:00', 'pending', 50, 10, 1, 1),
('Mountain Hike', 'Adventure club hiking event', '2024-12-15', '07:00:00', '18:00:00', 'ongoing', 20, 15, 2, 2);

-- Insert into `registers` table
INSERT INTO registers (username, event_id, registration_date)
VALUES 
('john_doe', 1, '2024-11-14');

-- Insert into `organized_by` table
INSERT INTO organized_by (username, event_id)
VALUES 
('jane_smith', 1);
