// --- HÄMTA ARTISTER VIA VERCEL API ---
async function fetchArtists() {
  try {
    const res = await fetch("/api/artists"); // Vercel API
    if (!res.ok) throw new Error("Kunde inte hämta artister");

    const data = await res.json();

    const artistData = data.items.map((artist) => {
      const genreId = artist.fields.genre?.sys.id;
      const stageId = artist.fields.stage?.sys.id;
      const dayId = artist.fields.day?.sys.id;

      const genre = data.includes?.Entry?.find(e => e.sys.id === genreId);
      const stage = data.includes?.Entry?.find(e => e.sys.id === stageId);
      const day = data.includes?.Entry?.find(e => e.sys.id === dayId);

      return {
        name: artist.fields.name || "Okänt namn",
        description: artist.fields.description || "Ingen beskrivning",
        genre: genre?.fields.name || "Okänd",
        stage: stage?.fields.name || "Okänd",
        day: day?.fields.date || "Okänt datum",
      };
    });

    renderArtists(artistData);
  } catch (err) {
    console.error(err);
    document.getElementById("artists-container").innerHTML =
      "<p>Kunde inte ladda artister just nu.</p>";
  }
}

// --- RENDERA ARTISTER ---
function renderArtists(artists) {
  const container = document.getElementById("artists-container");

  if (!artists || artists.length === 0) {
    container.innerHTML = "<p>Inga artister att visa.</p>";
    return;
  }

  container.innerHTML = artists.map(artist => `
    <div class="artist-card">
      <div class="artist-header">
        <h3 class="artist-name">${artist.name}</h3>
        <div class="artist-day">${artist.day}</div>
      </div>
      <div class="artist-meta">
        <span><strong>Scen:</strong> ${artist.stage}</span>
        <span><strong>Genre:</strong> ${artist.genre}</span>
      </div>
      <p class="artist-desc">${artist.description}</p>
    </div>
  `).join("");
}

// Kör scriptet direkt
fetchArtists();
