const express = require('express')
const app = express();
app.use(express.json());
app.use(express.static('client/public'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {root: './client/views'})
});

app.get('/feed', function(req, res) {
    res.sendFile('feed.html', {root: './client/views'});
});

const feedController = require('./controller/feedController');

app.route("/api/feedItems")
    .get(feedController.getAllfeedItems);

app.route('/api/feedItems')
    .get(feedController.getAllfeedItems) 
    .post(feedController.savefeedItem) 

app.route('/api/feedItems/:feedItemId')
    .get(feedController.getfeedItem) 
    .delete(feedController.deletefeedItem) 
    .patch(feedController.updatefeedItem) 

app.listen(1337, () => console.log('Listening on port 1337!'));