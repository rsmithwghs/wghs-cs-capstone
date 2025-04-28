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
function getAlbum(apiKey){
    // alert("Button call to function successful"); for testing button, no longer needed.
    let artistName = document.getElementById("artistName").value; // Get the name input from the HTML page.
    let albumName = document.getElementById("albumName").value; // Get the Album input from the HTML page.
    fetch("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apiKey +"&artist="+artistName + "&album=" + albumName +"&format=json", httpsArgs)
        // Make the API call to Last.FM using key and inputs.
        .then(response => response.json()) // Convert response to JSON.
        .then(data => { // This is where we begin to work with the data.

            const container = document.querySelector("#albumContainer");
            const album = document.createElement("div");
            container.appendChild(album);
            album.classList.add("fetchedAlbum");

            const aName = document.createElement("h2");
            aName.textContent = data.album.name;

            const artist = document.createElement("h3");
            artist.textContent = data.album.artist;

            const art = document.createElement("img");
            art.src = data.album.image[2]["#text"];

            const trackCount = data.album.tracks.track.length;

            // console.log(trackCount); no longer needed.
            const info = document.createElement("p");
            info.textContent = trackCount + " tracks * " + data.album.listeners + " listeners";

            album.appendChild(art);
            album.appendChild(aName);
            album.appendChild(artist);
            album.appendChild(info);
            container.appendChild(album);

            // console.log(data); for debugging; no longer needed
        })
}

