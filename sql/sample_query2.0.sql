-- upcoming events and their organizer
select u.username, e.event_name, e.event_date
from event e
join organized_by ob
	on e.event_id = ob.event_id
join user u
	on u.username = ob.username
where e.event_date > current_date()
;


-- total number of registration on a given event
select * -- ,count(*)
from event e
join registers r
	on r.event_id = e.event_id
where e.event_name = 'Career Seminar';