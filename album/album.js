let httpsArgs = {
    method: "GET",
    headers: {
        'user-agent': "Album Fetcher",
        'Content-Type': 'application/json'
    }
}

var apiKey = "Get your own darn key!";

/**
 * Fetches Album name, Artist, track count, and Last.FM listener count via Last.FM APIs.
 * @param {string} key - API key for Last.FM; must be obtained by user
 */
function getAlbum(key){
    // alert("Button call to function successful"); for testing button, no longer needed.
    let artistName = document.getElementById("artistName").value;
    let albumName = document.getElementById("albumName").value;
    fetch("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + key +"&artist="+artistName + "&album=" + albumName +"&format=json", httpsArgs)
        .then(response => response.json())
        .then(data => {

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

