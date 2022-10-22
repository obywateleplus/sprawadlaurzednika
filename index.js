const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const port = process.env.PORT || 3000;

function zeroPad(num) {
  return "00000000".slice(String(num).length) + num
}

function toBin(str, spaceSeparatedOctets) {
  return str.replace(/[\s\S]/g, function (str) {
      str = zeroPad(str.charCodeAt().toString(2));
      return !1 == spaceSeparatedOctets ? str : str + " "
  })
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:site', (req, res) => {
  res.sendFile(__dirname + '/' + req.params.site);
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  axios.get('http://localhost:2056/api/v1/chat?ticket=1', {
    headers: {
      'Authorization': '@nbrz3jN0w@k',
      'Caller': 'Andrzej-Nowak'
    }
  })
    .then(function (response) {
      const data = JSON.stringify(response.data);
      const bin = toBin(data);
      console.log("Sent: " + bin);
      io.emit('load', bin);
    });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
