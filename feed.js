function addStoryToPage(feedItem, index) {
  const newsfeed = document.getElementById('newsfeed');
  const storyDiv = document.createElement('div');
  storyDiv.classList.add('feedItem');
  storyDiv.innerHTML = `
    <h2><a href="${feedItem.linkUrl}" target="_blank">${feedItem.title}</a></h2>
    <img src="${feedItem.imageUrl}" alt="${feedItem.title}" style="width:200px; height:auto;" />
    <p>${feedItem.body}</p>
    <button class="delete-button" onclick="deleteFeedItem(${index})">Delete</button>
  `;
  newsfeed.appendChild(storyDiv);
}

function getCurrentFeed() {
  fetch('/api/feedItems')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(feedItems => {
      const newsfeed = document.getElementById('newsfeed');
      newsfeed.innerHTML = '';  
      feedItems.forEach((item, index) => {
        addStoryToPage(item, index);
      });
    })
    .catch(error => {
      console.error('Error fetching feed:', error);
    });
}

function deleteFeedItem(index) {
  fetch(`/api/feedItems/${index}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to delete feed item');
      return response.json();
    })
    .then(() => {
      getCurrentFeed(); 
    })
    .catch(error => {
      console.error('Error deleting feed item:', error);
    });
}

window.addEventListener("load", () => {
  const addButton = document.getElementById("add-button");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const title = document.getElementById("title").value.trim();
      const body = document.getElementById("body").value.trim();
      const imageUrl = document.getElementById("imageUrl").value.trim();
      const linkUrl = document.getElementById("linkUrl").value.trim();

      // Validate required fields
      if (!title || !body) {
        alert("Title and Body are required.");
        return;
      }

      const newfeedItem = { title, body, imageUrl, linkUrl };

      fetch("/api/feedItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newfeedItem)
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to add feed item");
          return res.json();
        })
        .then(data => {
          console.log("Successfully added:", data);
          getCurrentFeed(); // <-- refresh the feed
          // Optional: clear input fields
          document.getElementById("title").value = '';
          document.getElementById("body").value = '';
          document.getElementById("imageUrl").value = '';
          document.getElementById("linkUrl").value = '';
        })
        .catch(err => {
          console.error("Error:", err);
          alert("Failed to add feed item. Check the console.");
        });
    });
  }
});
function postFeedItem(index) {
  fetch(`/api/feedItems/${index}`, { method: 'POST' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to add feed item');
      return response.json();
    })
    .then(() => {
      getCurrentFeed(); 
    })
    .catch(error => {
      console.error('Error adding feed item:', error);
    });
}

window.addEventListener('load', () => {
  
  const portal = document.getElementById('portal_button');
  if (portal) portal.addEventListener('click', () => {
    window.location.href = 'https://gkids.com/ghiblifest/';
  });


  
  getCurrentFeed();
});