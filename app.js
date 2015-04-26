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

var port=8080, host='127.0.0.1';

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

    // API guide
});

// __/read/<area>/<division>/<device>/<month>/<day>/<count>

app.get('/read/*', function (req, res) {
    
    var rest=url.parse(req.url, true).path.split('/').reverse();
    rest.pop(); rest.pop();
    rest.reverse();
    
    connection.query(
        sq.select('*').from('data').order('id', false).limit(1)
        .toString(), 
        
        function (err, rows, fields) {

            if (err) throw err;

            res.json(rows[0]);
            console.log(JSON.stringify(rows[0]));

        }
    );

});

app.get('/plot', function(req, res){
    res.sendFile(__dirname + '/content/index.html');
});

app.use(express.static(__dirname+'/content'));

app.listen(port);

// connection.end();   // [] TODO: is commenting this, bad?

console.log('Server running at http://'+host+':'+port+'/');
