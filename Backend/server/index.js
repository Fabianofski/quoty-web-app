const express = require("express");
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;
const app = express();

const con = mysql.createConnection({
  host:"quoty-bot.cowcx6ea0nka.us-east-2.rds.amazonaws.com",
  user:"admin",
  password:"5U4YW*d$Gb#D&JRX",
  database:"ChannelStatistics"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/api/latestEntries", (req, res) => {
  
  const database = req.query.database || "Voicetime";
  const numberOfEntries = parseInt(req.query.numberOfEntries) ? parseInt(req.query.numberOfEntries) : 10;
  const page = (parseInt(req.query.page) ? parseInt(req.query.page) : 1) - 1;

  getLatestEntriesFromDatabase(database, numberOfEntries, page, function(result){
      res.json(result); 
  })
});

function getLatestEntriesFromDatabase(database, numberOfEntries, page, callback){
  con.query(`SELECT * FROM ${database} ORDER BY Start DESC LIMIT ${numberOfEntries * page}, ${numberOfEntries}`, function(err, result){
    if (err) throw err;
    return callback(result);
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});