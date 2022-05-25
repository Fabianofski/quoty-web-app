const moment = require('moment');
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const PORT = 3001; // npx kill-port 3001 (to kill process on port after firebase deploy)

const cors = require('cors')({origin: true});
app.use(cors);

const mysql = require('mysql');

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

  getLatestEntriesFromDatabase(database, numberOfEntries, page, (result) => res.json(result));
});

function getLatestEntriesFromDatabase(database, numberOfEntries, page, callback){
  con.query(`SELECT * FROM ${database} ORDER BY Start DESC LIMIT ${numberOfEntries * page}, ${numberOfEntries}`, function(err, result){
    if (err) throw err;
    return callback(result);
  });
}

app.get("/api/lineGraphData" ,(req, res) => {
  const database = req.query.database || "Voicetime";
  const time = req.query.time || "week";
  const numberOfData = (parseInt(req.query.numberOfData) ? parseInt(req.query.numberOfData) : 6) - 1;

  getLineGraphData(database, function(result){
    let data = [];
    result.forEach(element => {
      data.push(element["Time"]);
    });

    let month = moment().startOf("month");
    let labels = [month.format('MMM')];

    for (let i = 0; i < result.length - 1; i++) {
      month = month.subtract(1, "month");
      labels.push(month.format('MMM'));
    }
    labels.reverse();
    res.send({ labels: labels, data: data})
  });
});

function getLineGraphData(database, callback){
  let query = `SELECT SEC_TO_TIME(sum(TIME_TO_SEC(time))) AS Time FROM ${database} GROUP BY MONTH(Start)`;
  con.query(query, function(err, result){
    if (err) throw err;
    return callback(result);
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

exports.app = functions.https.onRequest(app);