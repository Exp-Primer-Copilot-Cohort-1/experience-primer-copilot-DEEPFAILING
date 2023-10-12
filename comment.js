// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var Post = require('./models/post');
var cors = require('cors');
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
mongoose.connect('mongodb://localhost:27017/comment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});
app.get('/', function(req, res) {
  res.send('Please use /api/comments');
});
app.get('/api/comments', function(req, res) {
  Comment.getComments(function(err, comments) {
    if(err) {
      throw err;
    }
    res.json(comments);
  });
});
app.get('/api/comments/:_id', function(req, res) {
  Comment.getCommentById(req.params._id, function(err, comment) {
    if(err) {
      throw err;
    }
    res.json(comment);
  });
});
app.post('/api/comments', function(req, res) {
  var comment = req.body;
  Comment.addComment(comment, function(err, comment) {
    if(err) {
      throw err;
    }
    res.json(comment);
  });
});
app.put('/api/comments/:_id', function(req, res) {
  var id = req.params._id;
  var comment = req.body;
  Comment.updateComment(id, comment, {}, function(err, comment) {
    if(err) {
      throw err;
    }
    res.json(comment);
  });
});
app.delete('/api/comments/:_id', function(req, res) {
  var id = req.params._id;
  Comment.removeComment(id, function(err, comment) {
    if(err) {
      throw err;
    }
    res.json(comment);
  });
});
app.listen(port);
console.log('Running on port ' + port);