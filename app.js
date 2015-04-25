var   
      mysql = require('mysql')
    , express = require('express')
    , url   = require('url')
    , http  = require('http')
    , sq    = require('squel')
;

/* DATABASE */

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'weather'
});

connection.connect();


/* SERVER */

var app=express();

var port=1992, host='127.0.0.1';

app.get('/save', function (req, res) {
    
    var queryData=url.parse(req.url, true).query;
    // console.log(req.connection.remoteAddress, '=', queryData);

    // TODO [ok]
    //  check if query actually contains the parameters
    //  [] test:
    if (!queryData['id'] || !queryData['temp'] || !queryData['wind'] || !queryData['humid']) {
        console.err('Bad /save?.. request');
        return;
    };

    connection.query(
        sq.insert().into("data")
            .set("devID", parseInt(queryData['id']))
            .set("temp", parseFloat(queryData['temp']))
            .set("wind", parseFloat(queryData['wind']))
            .set("humid", parseFloat(queryData['humid']))
                .toString(), function (err, rows, fields) {
        if (!err) {
            // console.log('sol =', rows);
            console.log(queryData);
        } else {
            console.log(err);
        };
    });

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('continue');
    res.end('\n');

});

app.get('/read', function (req, res) {
    
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.json({'a':'b'});
    // res.end('\n');

})

app.listen(port);

// connection.end();   // [] TODO is commenting this bad?

console.log('Server running at http://'+host+':'+port+'/');
