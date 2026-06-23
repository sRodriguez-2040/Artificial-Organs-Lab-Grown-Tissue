function feedItem(title, body, imageUrl, linkUrl) {
    this.title = title;
    this.body = body;
    this.imageUrl = imageUrl;
    this.linkUrl = linkUrl;

}

const newfeedItem = (title, body, imageUrl, linkUrl) => {
    return new feedItem(title, body, imageUrl, linkUrl);
};

module.exports = {
    feedItem,
    newfeedItem
};