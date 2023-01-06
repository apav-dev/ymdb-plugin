declare const RAPID_API_KEY: string;

// write a function that takes a movie id as a parameter and returns the movie object

export const getMovie = async (id: string) => {
  const response = await fetch(
    "https://online-movie-database.p.rapidapi.com/title/get-overview-details?limit=10&currentCountry=US&tconst=" +
      id,
    {
      headers: {
        "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY,
      },
    }
  ).catch((err) => {
    console.log(err.message);
  });

  if (response) {
    const movie = await response.json();

    return `${movie.title.title}|${movie.title.image.url}|${movie.genres}|${
      movie.plotOutline ? movie.plotOutline.text : ""
    }|${movie.plotSummary ? movie.plotSummary.text : ""}`;
  }
};

const genres: Record<string, string> = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "99": "Documentary",
  "18": "Drama",
  "10751": "Family",
  "14": "Fantasy",
  "36": "History",
  "27": "Horror",
  "10402": "Music",
  "9648": "Mystery",
  "10749": "Romance",
  "878": "Science Fiction",
  "10770": "TV Movie",
  "53": "Thriller",
  "10752": "War",
  "37": "Western",
};

export const getGenres = (genreIdStr: string) => {
  const genreIds = genreIdStr.split(",");
  const genreNames = genreIds.map((id) => genres[id]);
  return genreNames.join(", ");
};
