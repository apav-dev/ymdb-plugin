import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { getMovie, getGenres } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";

declare global {
  var RAPID_API_KEY: string;
}

const envVars = config();

globalThis.RAPID_API_KEY = envVars.RAPID_API_KEY;

Deno.test("test getMovie", async () => {
  const movieDetailsString = await getMovie("tt11564570");
  const movieDetailsArray = movieDetailsString?.split("|");

  assertEquals(movieDetailsArray?.[0], "Glass Onion: A Knives Out Mystery");
  assertEquals(
    movieDetailsArray?.[1],
    "https://m.media-amazon.com/images/M/MV5BYmZlZDZkZjYtNzE5Mi00ODFhLTk2OTgtZWVmODBiZTI4NGFiXkEyXkFqcGdeQXVyMTE5MTg5NDIw._V1_.jpg"
  );
  assertEquals(movieDetailsArray?.[2], "Comedy,Crime,Drama,Mystery,Thriller");
  assertEquals(
    movieDetailsArray?.[3],
    "Famed Southern detective Benoit Blanc travels to Greece for his latest case."
  );
  assertEquals(
    movieDetailsArray?.[4],
    "Five long-time friends are invited to the Greek island home of billionaire Miles Bron. All five know Bron from way back and owe their current wealth, fame and careers to him. The main event is a murder weekend game with Bron to be the victim. In reality, they all have reasons to kill him. Also invited is Benoit Blanc, the world's greatest detective."
  );
});

Deno.test("test getGenres", () => {
  const genres = getGenres("878,12,28");
  assertEquals(genres, "Science Fiction, Adventure, Action");
});
