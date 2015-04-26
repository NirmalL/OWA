var
	mysql	= require('mysql'),
	express	= require('express'),
	sq 		= require('squel')
	;

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

app.get('/read/*', function (req, res) {

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



app.listen(port);

// ?? needed?
// connection.end();
