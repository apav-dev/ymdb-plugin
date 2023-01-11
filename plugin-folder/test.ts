import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { getGenres, getActorsForMovieId } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";

declare global {
  var MOVIE_DB_API_KEY: string;
}

const envVars = config();

globalThis.MOVIE_DB_API_KEY = envVars.MOVIE_DB_API_KEY;

Deno.test("test getGenres", () => {
  const genres = getGenres("878,12,28");
  assertEquals(genres, "Science Fiction, Adventure, Action");
});

Deno.test("test getActorsForMovieId", async () => {
  const actorDetailsStr = await getActorsForMovieId("76600");
  assertEquals(1, 2);
});
