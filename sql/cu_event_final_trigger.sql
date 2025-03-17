-- Step 1: Set a new delimiter
DELIMITER //

-- Step 2: Create the trigger
CREATE TRIGGER after_event_date_time_update 
AFTER UPDATE ON event 
FOR EACH ROW 
BEGIN
    -- Insert the notification only if date, time, or venue has changed
    IF (OLD.event_date <> NEW.event_date) 
        OR (OLD.start_time <> NEW.start_time) 
        OR (OLD.end_time <> NEW.end_time) 
        OR (OLD.venue_id <> NEW.venue_id) THEN
        
        INSERT INTO notifications (event_id, notification_text)
        VALUES (
            NEW.event_id, 
            CONCAT(
                'Event "', NEW.event_name, '" has been updated.',
                IF(OLD.event_date <> NEW.event_date, CONCAT(' New Date: ', NEW.event_date), ''),
                IF(OLD.start_time <> NEW.start_time, CONCAT(' Start Time: ', NEW.start_time), ''),
                IF(OLD.end_time <> NEW.end_time, CONCAT(' End Time: ', NEW.end_time), ''),
                IF(OLD.venue_id <> NEW.venue_id, 
                    CONCAT(' Venue changed from "', 
                        (SELECT venue_name FROM venue WHERE venue_id = OLD.venue_id LIMIT 1), 
                        '" to "', 
                        (SELECT venue_name FROM venue WHERE venue_id = NEW.venue_id LIMIT 1),
                        '".'), ''), 
                '.'
            )
        );
    END IF;
END//

-- Step 3: Reset the delimiter back to the semicolon
DELIMITER ;
