document.addEventListener('DOMContentLoaded', function() {
    const movieCardsContainer = document.getElementById('movie-cards');
    const searchInput = document.getElementById('search-input');
    const apiKey = 'd5886e78cb2bcad1aece8a8638d5d558';

    function fetchMovies(query) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const movies = data.results;
                movieCardsContainer.innerHTML = '';

                movies.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.innerHTML = `
                        <h3>${movie.title}</h3>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
                    `;
                    movieCard.addEventListener('click', () => redirectToMovieDetails(movie.id));
                    movieCardsContainer.appendChild(movieCard);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 0) {
            fetchMovies(query);
        } else {
            movieCardsContainer.innerHTML = '';
        }
    });

    function redirectToMovieDetails(movieId) {
        // Redirect to movie details page with the movie ID as a URL parameter
        window.location.href = `movie-details.html?movieId=${movieId}`;
    }
});
