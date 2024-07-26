const TVMAZE_API = "https://api.tvmaze.com/shows";
let moviesDiv = document.getElementById("moviesDiv");

axios.get(TVMAZE_API)
    .then(response => {
        moviesDiv.innerHTML = '';

        response.data.forEach(movie => {
            const imdbRating = movie.externals && movie.externals.imdb ? movie.externals.imdb : 'N/A';
            const imdbRatingScore = imdbRating !== 'N/A' ? parseFloat(imdbRating.replace(/https:\/\/www\.imdb\.com\/title\/tt/, '')).toFixed(1) : 'N/A';
            const premiereDate = movie.premiered ? new Date(movie.premiered).toLocaleDateString() : 'N/A';
            const cardHTML = `
                <div class="col-md-3 mb-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${movie.image.medium}" class="card-img-top" alt="${movie.name}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.name}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Premiere :</strong> ${movie.premiered}</li>
                            <li class="list-group-item"><strong>IMDB Rating :</strong> ${movie.rating.average}</li>
                            <li class="list-group-item"><strong>Genres :</strong> ${movie.genres.join(', ')}</li>
                            <li class="list-group-item"><strong>Language :</strong> ${movie.language}</li>
                        </ul>
                        <div class="card-body">
                            <a href="${movie.url}" class="btn btn-primary" target="_blank">Go to website</a>
                            <a href="detail.html?id=${movie.id}" class="btn btn-success" target="_blank">Go to detail</a>
                        </div>
                    </div>
                </div>
            `;
            moviesDiv.innerHTML += cardHTML;
        });
    })
    .catch(error => console.error('Error fetching data:', error));