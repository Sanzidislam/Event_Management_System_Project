SELECT e.event_name, e.event_date, e.start_time, e.end_time, l.building, l.room_number, l.capacity 
FROM event e
JOIN location l ON e.location_id = l.location_id
WHERE e.event_date >= CURDATE();


SELECT u.username, u.email, u.contact_number, d.department_name 
FROM registers r
JOIN user u ON r.user_id = u.user_id
JOIN student s ON s.user_id = u.user_id
JOIN department d ON u.department_id = d.department_id
WHERE r.event_id = 1;  -- Replace '1' with the desired event_id
