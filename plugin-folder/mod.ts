import { ActorDetails, WebhookPayload } from "./types.ts";

declare const MOVIE_DB_API_KEY: string;

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

export const getActorsForMovieId = async (id: string) => {
  let actorDetailsStr = "";

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${MOVIE_DB_API_KEY}&language=en-US`
  ).catch((err) => {
    console.log(err.message);
  });

  if (response) {
    const actorsResp = await response.json();
    const actorsIds = actorsResp.cast.slice(0, 3) as { id: string }[];

    const actorPromises = actorsIds.map((actorId) => {
      return getActorDetails(actorId.id);
    });

    const actors = await Promise.allSettled(actorPromises);
    actors.forEach((actor, i) => {
      if (actor.status === "fulfilled") {
        const details = actor.value;
        console.log(details);
        actorDetailsStr += `${details.id}|${details.name}|${
          details.biography
        }|${details.birthday ? details.birthday : ""}|${
          details.place_of_birth ? details.place_of_birth : ""
        }|https://image.tmdb.org/t/p/original/${details.profile_path}`;
        if (i < actors.length - 1) actorDetailsStr += "!!";
      } else {
        console.log(`Couldn't get actor details: ${actor.reason}`);
      }
    });
  }

  return actorDetailsStr;
};

const getActorDetails = async (id: string): Promise<ActorDetails> => {
  const detailsResp = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${MOVIE_DB_API_KEY}&language=en-US`
  ).catch((err) => {
    console.log(err.message);
    throw err;
  });

  return detailsResp.json();
};

await getActorsForMovieId("76600");

export const handleWebhook = async (event: WebhookPayload) => {
  const { entityId, meta, changedFields, primaryProfile } = event;

  await fetch(
    `https://hooks.slack.com/services/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`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `Entity ${entityId} was ${
          meta.eventType === "ENTITY_CREATED" ? "created" : "updated"
        }. Changed fields: ${changedFields.fieldNames.join(
          ", "
        )} See details here: https://sandbox.yext.com/s/3191694/entity/edit3?entityIds=${
          primaryProfile.meta.uid
        }`,
      }),
    }
  ).catch((err) => {
    console.log(err.message);
  });
};
