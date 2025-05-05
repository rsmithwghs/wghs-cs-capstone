let httpsArgs = {
    method: "GET",
    headers: {
        'user-agent': "Album Fetcher",
        'Content-Type': 'application/json'
    }
}

let apiKey = "Get your own darn key!";

/**
 * Fetches Album name, Artist, track count, and Last.FM listener count via Last.FM APIs.
 *
 */
function getAlbum(){
    // alert("Button call to function successful"); for testing button, no longer needed.
    let artistName = document.getElementById("artistName").value; // Get the name input from the HTML page.
    let albumName = document.getElementById("albumName").value; // Get the Album input from the HTML page.
    fetch("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apiKey +"&artist="+artistName + "&album=" + albumName +"&format=json", httpsArgs)
        // Make the API call to Last.FM using key and inputs.
        .then(response => response.json()) // Convert response to JSON.
        .then(data => { // This is where we begin to work with the data.
            // This is where we set up the DOM stuff for outputting the data to the page.
            const container = document.querySelector("#albumContainer");
            const album = document.createElement("div");
            container.appendChild(album);
            album.classList.add("fetchedAlbum");

            const aName = document.createElement("h2"); // Set up album name header for HTML.
            aName.textContent = data.album.name; // Set that H2 to the Album name.

            const artist = document.createElement("h3"); // Set up header 3
            artist.textContent = data.album.artist; // Set H3 to the Artist name.

            const art = document.createElement("img"); // Set up img tag for album artwork.
            art.src = data.album.image[2]["#text"]; // Set image source to the LastFM URL for the artwork.

            const trackCount = data.album.tracks.track.length; // Get track count for the album.

            // console.log(trackCount); no longer needed.
            const info = document.createElement("p");
            info.textContent = trackCount + " tracks * " + data.album.listeners + " listeners"; // Add info to the card.

            album.appendChild(art);
            album.appendChild(aName);
            album.appendChild(artist);
            album.appendChild(info);
            container.appendChild(album); // Wrap it all up and send it to the container.

            // console.log(data); for debugging; no longer needed
        })
}

