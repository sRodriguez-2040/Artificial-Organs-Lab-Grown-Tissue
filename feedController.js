const feedItem = require('../model/feedItem');
let item1 = feedItem.newfeedItem(
    'Ponyo', 
    'Ponyo is a Japanese animated film that tells the story of a goldfish named Ponyo who escapes from the ocean and is helped by a five-year-old human boy named SÅsuke.',
    'https://th.bing.com/th/id/OIP.jCWFJRIcXSyo_afIMpNyugHaEK?w=309&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', 
    'https://www.imdb.com/title/tt0876563/'
);
let item2 = feedItem.newfeedItem(
    'Spirited Away',
    'A young girl named Chihiro becomes trapped in a mysterious place; as Chihiro navigates this strange realm, she embarks on a journey to find a way back to her own world.',
    'https://www.liveabout.com/thmb/rD4CxUzijKaLQLVK8AR9xjqy0gQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/SpiritedAway-57a97fec5f9b58974af2187f.jpg', 
    'https://www.imdb.com/title/tt0245429/'
);
let item3 = feedItem.newfeedItem(
    'Grave of The Fireflies', 
    'Seit, a teenager charged with the care of his younger sister, Setsuko, after an American firebombing during World War II. The siblings rely completely on each other and struggle against all odds to stay together and stay alive.',
    'https://cdn2.shopify.com/s/files/1/0747/3829/products/HP2564_be44d685-49ba-4119-a5d6-4cdc0d5c5fd8_1024x1024.jpg?v=1515503862', 
    'https://www.imdb.com/title/tt0095327/'
);

const allFeedItems = [item1, item2, item3];
exports.allFeedItems = allFeedItems;

console.log(allFeedItems);

exports.getAllfeedItems = (req, res) => {
    res.json(allFeedItems);
};

exports.getfeedItems = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(allFeedItems));
    };

exports.getfeedItem = (req, res) => {
    const id = parseInt(req.params.feedItemId);
    if (isNaN(id) || id < 0 || id >= allFeedItems.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }
    console.log('Fetching feed item at index:', id);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(allFeedItems[id]));
};

exports.savefeedItem = function(req, res) {
    console.log('Incoming req.body:', req.body);
    const { title, body, imageUrl, linkUrl } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required.' });
    }
    const newfeedItem = feedItem.newfeedItem(
        title, 
        body, 
        imageUrl || 'image', 
        linkUrl || 'url'
    );
    allFeedItems.push(newfeedItem);
    res.status(201).json(newfeedItem); 
};

exports.deletefeedItem = (req, res) => {
    const id = parseInt(req.params.feedItemId);
    if (isNaN(id) || id < 0 || id >= allFeedItems.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }

    const deletedItem = allFeedItems.splice(id, 1); // remove 1 item at index
    res.json({ message: 'Feed item deleted', item: deletedItem[0] });
};

exports.updatefeedItem = (req, res) => {
    const id = parseInt(req.params.feedItemId);
    if (isNaN(id) || id < 0 || id >= allFeedItems.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }

    const item = allFeedItems[id];
    const { title, description, image, url } = req.body;

    if (title) item.title = title;
    if (description) item.description = description;
    if (image) item.image = image;
    if (url) item.url = url;

    res.json({ message: 'Feed item updated', item });
};