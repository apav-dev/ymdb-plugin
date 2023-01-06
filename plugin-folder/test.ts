import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { getMovie } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";

declare global {
  var RAPID_API_KEY: string;
}

const envVars = config();

globalThis.RAPID_API_KEY = envVars.RAPID_API_KEY;

const testData = "";

// write a deno test that checks if getMovie returns test data when passed the id tt11564570

Deno.test("test getMovie", async () => {
  const movie = await getMovie("tt11564570");

  assertEquals(movie, testData);
});
