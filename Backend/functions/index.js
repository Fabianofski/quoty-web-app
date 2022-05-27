const Moment = require('moment');
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const PORT = 3001; // npx kill-port 3001 (to kill process on port after firebase deploy)
const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client({intents: ["GUILDS"]});
bot.login(config.BOT_TOKEN);


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

function performQuery(query, callback){
  con.query(query, function(err, result){
    if (err) throw err;
    return callback(result);
  });
}

app.get("/api/latestEntries", (req, res) => {
  
  const database = req.query.database || "Voicetime";
  const numberOfEntries = parseInt(req.query.numberOfEntries) ? parseInt(req.query.numberOfEntries) : 10;
  const page = (parseInt(req.query.page) ? parseInt(req.query.page) : 1) - 1;

  const query = `SELECT * FROM ${database} ORDER BY Start DESC LIMIT ${numberOfEntries * page}, ${numberOfEntries}`;
  performQuery(query, (result) => res.json(result));
});


app.get("/api/Ranking", (req, res) => {
  
  const database = req.query.database || "Voicetime";
  const numberOfEntries = parseInt(req.query.numberOfEntries) ? parseInt(req.query.numberOfEntries) : 10;

  const query = `SELECT DISTINCT UserID, Username, SEC_TO_TIME(SUM(TIME_TO_SEC(time))) AS Time 
                 FROM ${database}
                 WHERE ServerID='426358403917676546'
                 GROUP BY UserID ORDER BY time DESC
                 LIMIT ${numberOfEntries}`;
  performQuery(query, (result) => res.json(result));
});



app.get("/api/lineGraphData" ,(req, res) => {
  const database = req.query.database || "Voicetime";
  let timeInterval = req.query.time || "week";
  const numberOfData = parseInt(req.query.numberOfData) ? parseInt(req.query.numberOfData) : 6;

  timeInterval = timeInterval == "day" ? "DATE" : timeInterval;
  const query = `SELECT ${timeInterval}(Start) AS Time, SEC_TO_TIME(sum(TIME_TO_SEC(time))) AS Duration 
               FROM ${database}
               WHERE ServerID='426358403917676546'
               GROUP BY ${timeInterval}(Start)`;

  performQuery(query, function(result){
    let data = [];
    let labels = [];
    result = result.slice(result.length - numberOfData);
    result.forEach(element => {
      data.push(element["Duration"]);
      labels.push(format(element["Time"], timeInterval));
    });

    res.send({ labels: labels, data: data})
  });
});

function format(date, timeInterval){
  if(timeInterval == "month")
    return Moment().month(date - 1).format('MMM');
  else if(timeInterval == "week")
    return "KW " + date;
  else if(timeInterval == "DATE")
    return Moment(date).format('DD.MM');
}

app.get("/api/getAllUsers" ,(req, res) => {
  
  function fetchUserUrls(UserIDs){
    console.log(UserIDs);
    let Json = {};
    UserIDs.forEach((element, index) => {
      bot.users.fetch(element['UserID'])
      .then(user => {
        Json[element['UserID']] = user.displayAvatarURL();
        if(index===UserIDs.length-1) res.json(Json);
      })
      .catch(console.error);
    });
  }

  const query = `SELECT DISTINCT UserID FROM Voicetime GROUP BY UserID`;
  performQuery(query, (UserIDs) => {
    fetchUserUrls(UserIDs);
  });
});

app.get("/api/getProfilePicture", (req, res) => {
  const UserID = req.query.userID;
  bot.users.fetch(UserID)
  .then(user => {
    res.send(user.displayAvatarURL());
  })
  .catch(console.error);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

exports.app = functions.https.onRequest(app);