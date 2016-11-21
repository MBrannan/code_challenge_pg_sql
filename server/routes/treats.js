var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req, res) {
  console.log('get request');

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('Connection error ', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM treats', function(err, result) {
        done();

        if(err) {
          console.log('Error in query selection ', err);
          res.sendStatus(500);
        }
          res.send(result.rows);

      }
    );
  });
});

router.post('/', function(req, res) {
  var newTreat = req.body;
  console.log('new treat', newTreat);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('Connection error ', err);
      res.sendStatus(500);
    }
    client.query(
      'INSERT INTO treats(name, description, pic) VALUES ($1, $2, $3)',
      [newTreat.name, newTreat.description, newTreat.url],
      function(err, result) {
        done();

        if(err) {
          console.log('Error in query insertion ', err);
          res.sendStatus(500);
        } else {
          console.log("post successful");
          res.sendStatus(201);
        }
      }

    );
  });
});

router.get('/:name', function(req, res) {
  var treatSelect = req.params.name;
  console.log('treat to select ', treatSelect);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM treats WHERE name ILIKE $1;',
      [treatSelect],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
});
module.exports = router;
