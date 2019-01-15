"use strict";

const infoList = [ {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    rating: "Rating: 7",
    release: "Released: 2007/05/04"
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    rating: "Rating: 10",
    release: "Released: 2000/01/05"
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    rating: "Rating: 5",
    release: "Released: 1980/06/10"
  }
];

function createMovieCard( { img, title, text, link, rating, release } ) {
  const movie = document.createElement( "div" );
  movie.classList.add( "movie" );

  const movieImage = document.createElement( "img" );
  movieImage.classList.add( "movie__image" );
  movieImage.setAttribute( "src", `${img}` );
  movieImage.setAttribute( "alt", "movie image" );

  const movieTitle = document.createElement( "h2" );
  movieTitle.classList.add( "movie__title" );
  movieTitle.textContent = `${title}`;

  const movieDescription = document.createElement( "p" );
  movieDescription.classList.add( "movie__description" );
  movieDescription.textContent = `${text}`;

  const movieDate = document.createElement( "p" );
  movieDate.classList.add( "movie__date" );
  movieDate.textContent = `${release}`;

  const movieRating = document.createElement( "p" );
  movieRating.classList.add( "movie__date" );
  movieRating.textContent = `${rating}`;

  movie.append(
    movieImage,
    movieTitle,
    movieDescription,
    movieDate,
    movieRating
  );
  return movie;
}

function createCards( info ) {
  return info.map( card => createMovieCard( card ) );
}

const container = document.querySelector( ".container" );
const cards = createCards( infoList );
container.append( ...cards );
