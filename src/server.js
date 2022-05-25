const express = require('express');

const cors = require('cors');
const mongodb = require("./database/conn");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);



//Instanceando o banco
mongodb.init()

const connectedUsers = {};

io.on('connection', socket => {
  const { user} = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.json({
        message: "Please use /api for this application"
    })
})
app.use("/api", require("./routes"));




//Rodando o app
server.listen(3333 || process.env.PORT, () => console.log("EXPRESS SERVER RUNNING"));