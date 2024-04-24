// Écoute de l'événement "DOMContentLoaded" pour s'assurer que le DOM est entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
  // Récupération des paramètres de l'URL pour obtenir l'identifiant de l'artiste
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = parseInt(urlParams.get("id")); // Convertit l'identifiant de l'artiste en entier

  // Requête AJAX pour récupérer les données de l'artiste depuis un fichier JSON
  fetch("assets/data/id.json")
    .then((response) => response.json()) // Conversion de la réponse en JSON
    .then((artists) => {
      // Recherche de l'artiste dans l'ensemble des données en utilisant l'identifiant
      const artist = artists.find((a) => a.id === artistId);

      // Si l'artiste est trouvé, mise à jour du contenu de la page avec ses données
      if (artist) {
        document.getElementById("artistName").textContent = artist.name; // Nom de l'artiste
        const imgElement = document.getElementById("artistImage"); // Élément image de l'artiste
        imgElement.src = artist.image; // Source de l'image
        imgElement.alt = "Image de " + artist.name; // Texte alternatif de l'image

        document.getElementById("artistBio").textContent = artist.bio; // Biographie de l'artiste

        // Mise à jour des performances de l'artiste
        const performancesContainer = document.getElementById("performances");
        performancesContainer.innerHTML = ""; // Nettoyage du conteneur de performances
        artist.performances.forEach((performance) => {
          const performanceElement = document.createElement("div");
          performanceElement.className = "performance"; // Classe pour le style
          performanceElement.innerHTML = `
            <p>Date: <strong>${performance.date}</strong></p>
            <p>Horaire: <strong>${performance.time}</strong></p>
            <p>Scène: <strong>${performance.scene}</strong></p>`; // Détails de la performance
          performancesContainer.appendChild(performanceElement); // Ajout de la performance dans le DOM
        });

        // Si l'artiste a un identifiant Spotify, ajout d'un lecteur Spotify à la page
        if (artist.spotifyId) {
          const spotifyPlayer = document.createElement("iframe");
          spotifyPlayer.setAttribute(
            "style",
            "width:100%; height:380px; border:none;"
          );
          spotifyPlayer.setAttribute("allow", "encrypted-media"); // Permissions pour le lecteur Spotify
          spotifyPlayer.src = `https://open.spotify.com/embed/artist/${artist.spotifyId}`; // URL du lecteur Spotify
          document.querySelector(".artist-details").appendChild(spotifyPlayer); // Ajout du lecteur Spotify au DOM
        }
      } else {
        console.log("Artist not found"); // Log en cas d'artiste non trouvé
      }
    })
    .catch((error) => console.error("Failed to load artist data:", error)); // Gestion des erreurs de la requête
});
