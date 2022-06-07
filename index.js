const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app.config');
const http = require('http');
const server = http.createServer(app);
const { initMeetingServer } = require('./meeting-server');
//express is not installed
//TODO npm add socket.io@2.4.1
//to start use nodemon js


initMeetingServer(server);
//meeting-server
//initMeetingServer(server)

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected");
    }).catch((error) => {
            console.log("Database Connection Failed error");
        }

    );
app.use(express.json());
app.use("/api", require("./routes/app.routes"));
server.listen(process.env.port || 4000, function() {
    console.log("Ready to Go!");
});