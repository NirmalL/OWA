var 
      http = require('http')
    , url  = require('url')
;

var port=1992, host='127.0.0.1';

http.createServer(function (req, res) {
    console.log(req.connection.remoteAddress, '=', url.parse(req.url, true).query);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('continue');
    res.end('\n');
}).listen(port, host);

console.log('Server running at http://'+host+':'+port+'/');
