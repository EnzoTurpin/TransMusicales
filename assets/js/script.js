document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get("id");

  // Supposons que vous ayez une API ou un fichier JSON local pour charger les données
  fetch(`path/to/your/data/artist${artistId}.json`)
    .then((response) => response.json())
    .then((artist) => {
      document.getElementById("artistName").textContent = artist.name;
      document.getElementById("artistDate").textContent = artist.date;
      document.getElementById("artistBio").textContent = artist.bio;
      document.getElementById("artistImage").src = artist.image;
    })
    .catch((error) => console.error("Failed to load artist data:", error));
});
