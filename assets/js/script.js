document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = parseInt(urlParams.get("id"));

  fetch("assets/data/id.json")
    .then((response) => response.json())
    .then((artists) => {
      const artist = artists.find((a) => a.id === artistId);
      if (artist) {
        document.getElementById("artistName").textContent = artist.name;
        const imgElement = document.getElementById("artistImage");
        imgElement.src = artist.image;
        imgElement.alt = "Image de " + artist.name;
        document.getElementById("artistBio").textContent = artist.bio;

        const performancesContainer = document.getElementById("performances");
        performancesContainer.innerHTML = "";
        artist.performances.forEach((performance) => {
          const performanceElement = document.createElement("div");
          performanceElement.className = "performance";
          performanceElement.innerHTML = `
            <p>Date: <strong>${performance.date}</strong></p>
            <p>Horaire: <strong>${performance.time}</strong></p>
            <p>Scène: <strong>${performance.scene}</strong></p>`;
          performancesContainer.appendChild(performanceElement);
        });

        if (artist.spotifyId) {
          const spotifyPlayer = document.createElement("iframe");
          spotifyPlayer.setAttribute(
            "style",
            "width:100%; height:380px; border:none;"
          );
          spotifyPlayer.setAttribute("allow", "encrypted-media");
          spotifyPlayer.src = `https://open.spotify.com/embed/artist/${artist.spotifyId}`;
          document.querySelector(".artist-details").appendChild(spotifyPlayer);
        }
      } else {
        console.log("Artist not found");
      }
    })
    .catch((error) => console.error("Failed to load artist data:", error));
});
