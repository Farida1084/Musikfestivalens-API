const baseUrl = 'https://cdn.contentful.com/spaces/';

const SPACE_ID = localStorage.getItem("space_id");
const ACCESS_TOKEN = localStorage.getItem("access_token"); 

const apiURL = `${baseUrl}${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=artist`;

const fetchData = async () => {
    try{
        const response = await fetch(apiURL);

        if(!response.ok) {
            throw new Error("HTTP-fel! Något gick snett i förfrågan.");
        }

        const data = await response.json();
        console.log(data);

        const artistGenre = data.items.map((artist) => {
            const genreId = artist.fields.genre.sys.id;
            const stageId = artist.fields.stage.sys.id;
            const dayId = artist.fields.day.sys.id;
           console.log("genre id:", genreId);

           const genre = data.includes.Entry.find((entry) => entry.sys.id === genreId );
           const stage = data.includes.Entry.find((entry) => entry.sys.id === stageId);
           const day = data.includes.Entry.find((entry) => entry.sys.id === dayId);
           

        return {
            name: artist.fields.name,
            description: artist.fields.description,
            genre: genre.fields.name,
            stage: stage.fields.name,
            day: day.fields.date,
           
        }
        });

        const artistContainer = document.getElementById("artists-container");
    
        const artistHTML =  artistGenre.map((artist) => {
            console.log('artist:', artist);
            return`
            <div class="artist-table-container">
               <div class="artist-item">
               <span class="label">Namn:</span>
               <span class="value">${artist.name}</span>
               </div>
               <div class="artist-item">
               <span class="label">Datum:</span>
               <span class="value">${artist.day}</span>
               </div>
               <div class="artist-item">
               <span class="label">Scen:</span>
               <span class="value">${artist.stage}</span>
               </div>
               <div class="artist-item">
               <span class="label">Genre:</span>
               <span class="value">${artist.genre}</span>
               </div>
               <div class="artist-item">
               <span class="label">Beskrivning:</span>
               <span class="value">${artist.description}</span>
               </div>
         </div>`;
        });

        artistContainer.innerHTML =  artistHTML;   
        
    } catch (error) {

    }
};

fetchData();
