// movie-details.js

document.addEventListener('DOMContentLoaded', function() {
    const movieTitleElement = document.getElementById('movie-title');
    const movieDescriptionElement = document.getElementById('movie-description');
    const castContainer = document.getElementById('cast-container');
    const movieRatingElement = document.getElementById('movie-rating');
    const ratingValueElement = document.getElementById('rating-value');
    const selectSeatsBtn = document.getElementById('select-seats-btn');

    // Get movie ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    // Use your TMDb API key here
    const apiKey = 'd5886e78cb2bcad1aece8a8638d5d558';

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(movie => {
            console.log('Movie Details:', movie);
            movieTitleElement.textContent = movie.title;
            movieDescriptionElement.textContent = movie.overview;
            displayCast(movieId);
            movieRatingElement.style.display = 'block';
            ratingValueElement.textContent = movie.vote_average;
        })
        .catch(error => console.error('Error fetching movie details:', error));

    // Set up a link to the seat selection page with the movie ID as a URL parameter
    selectSeatsBtn.href = `seat-selection.html?movieId=${movieId}`;
});

function displayCast(movieId) {
    // Use your TMDb API key here
    const apiKey = 'd5886e78cb2bcad1aece8a8638d5d558';

    // Fetch cast details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const cast = data.cast;
            const castContainer = document.getElementById('cast-container');

            // Display up to 5 cast members
            for (let i = 0; i < Math.min(cast.length, 5); i++) {
                const castMember = cast[i];
                const castCard = createCastCard(castMember);
                castContainer.appendChild(castCard);
            }
        })
        .catch(error => console.error('Error fetching cast details:', error));
}

function createCastCard(castMember) {
    const card = document.createElement('div');
    card.classList.add('cast-card');

    const profilePath = castMember.profile_path;
    const profileUrl = profilePath
        ? `https://image.tmdb.org/t/p/w185${profilePath}`
        : 'https://via.placeholder.com/185x278'; // Placeholder image if no profile picture

    const image = document.createElement('img');
    image.src = profileUrl;
    image.alt = castMember.name;

    const name = document.createElement('p');
    name.textContent = castMember.name;

    const character = document.createElement('p');
    character.textContent = `as ${castMember.character}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(character);

    return card;
}

