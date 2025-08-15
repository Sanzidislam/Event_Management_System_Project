const db = require("../config/db");

const getUpdateNotsForUser = (req, res) => {
    const userId = req.user.user_id;
  
    const query = `
      SELECT n.notification_id, n.event_id, n.notification_text, n.created_at
      FROM notifications n
      JOIN registers r ON r.event_id = n.event_id
      WHERE r.user_id = ?
      order by n.created_at desc
      ;
    `;
  
    db.execute(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching notifications:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(201).json({ message: 'No notifications found for this user.' });
      }
  
      res.status(200).json({ notifications: results });
    });
};

module.exports = {getUpdateNotsForUser};


  