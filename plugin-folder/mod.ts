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

    console.log(movie);

    return `
    ${movie.title.title}|
    ${movie.title.image.url}|
    ${movie.genres}|
    ${movie.plotOutline ? movie.plotOutline.text : ""}|
    ${movie.plotSummary ? movie.plotSummary.text : ""}`;
  }
};
