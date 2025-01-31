const db = require("../config/db");


const getMostPopularLocations = (req,res) =>{
    db.query("select count(e.event_id) as total_events,l.location_id, l.location_name from event e join venue v on e.venue_id = v.venue_id join location l on l.location_id = v.venue_id group by l.location_id order by count(e.event_id) desc limit 4;",
      (err,results)=> {
        if(err){
          console.error("Error retrieving locations:", err.message);
          return res.status(500).send("Error retrieving locations")
        }
        res.status(200).json(results);
      }
    )
  
  };

  const getTopCreators = (req,res) =>{
    db.query(`
      
        select  user.user_id ,count(event.event_id) as count_events, user.name, user.profile_picture
        from event join user on event.user_id = user.user_id
        group by(user_id)
        order by count(event.event_id) desc , user_id desc
        limit 4
        ;`,
      (err,results)=> {
        if(err){
          console.error("Error retrieving creators:", err.message);
          return res.status(500).send("Error retrieving creators")
        }
        res.status(200).json(results);
      }
    )
  
  };

module.exports = {getMostPopularLocations, getTopCreators}