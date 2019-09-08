// var connect = require('connect');
// var serveStatic = require('serve-static');
// connect().use(serveStatic(__dirname + '/public')).listen(process.env.PORT || 8080, function(){
//     console.log('Server running on 8080...');
// });
const fs = require('fs'),
      path = require('path'),    
      filePath = path.join(__dirname, 'index.html'),
      http = require('http'),
      port = process.env.PORT || 3000
      
//var countTimes = 0 
var player1 = '', player2 = ''

const requestHandler = (request, response) => {
  console.log(request.url)
  //if (request.url != '/favicon.ico') countTimes = countTimes + 1
  //response.end('<html><head></head><body><h1>Hello Node.js Server!' + countTimes + '</h1></body></html>')
  if (request.url.includes('setp1_')) {
    player1 = request.url.slice(request.url.indexOf('_') + 1)
    return response.end()
  }
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data.replace('{player1}', player1).replace('{player2}', player2));
        response.end();
    } else {
        console.log(err);
    }
});
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})



