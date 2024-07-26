const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');
        const TVMAZE_API = `https://api.tvmaze.com/shows/${movieId}`;
        let movieDetailDiv = document.getElementById("movieDetail");

        axios.get(TVMAZE_API)
            .then(response => {
                const movie = response.data;
                const premiereDate = movie.premiered;
                const detailHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${movie.image.medium}" class="card-img-top" alt="${movie.name}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.name}</h5>
                            <p class="card-text">${movie.summary}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Premiere :</strong> ${premiereDate}</li>
                            <li class="list-group-item"><strong>IMDB Rating :</strong> ${movie.rating.average}</li>
                            <li class="list-group-item"><strong>Genres :</strong> ${movie.genres.join(', ')}</li>
                            <li class="list-group-item"><strong>Language :</strong> ${movie.language}</li>
                        </ul>
                        <div class="card-body">
                            <a href="${movie.officialSite}" class="btn btn-outline-success" target="_blank">Go to website</a>
                            <a href="http://127.0.0.1:5500/" class="btn btn-outline-secondary">Go back</a>
                        </div>
                    </div>
                `;
                movieDetailDiv.innerHTML = detailHTML;
            })
            .catch(error => console.error('Error fetching data:', error));