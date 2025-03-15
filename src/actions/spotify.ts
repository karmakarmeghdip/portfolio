import { defineAction } from "astro:actions";
import SpotifyWebApi from "spotify-web-api-node";
import {
  getSecret,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from "astro:env/server";

export const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI,
});

let refreshToken = getSecret("SPOTIFY_REFRESH_TOKEN") || "";

async function refreshAccessToken() {
  try {
    spotifyApi.setRefreshToken(refreshToken);
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token);
    console.log("Access token refreshed");

    // Schedule next refresh before token expires
    setTimeout(refreshAccessToken, (data.body.expires_in - 60) * 1000);
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
}

refreshAccessToken();

export const getSpotifyData = defineAction({
  handler: async (_i, ctx) => {
    try {
      const data = await spotifyApi.getMyCurrentPlaybackState();
      let responseData = { isPlaying: false };

      if (
        data.statusCode !== 204 && data.body && data.body.is_playing &&
        data.body.item && data.body.item.type === "track"
      ) {
        const track = {
          isPlaying: data.body.is_playing,
          title: data.body.item.name,
          artist: (data.body.item.artists.map((artist) =>
            artist.name
          ).join(", ") as string),
          album: data.body.item.album.name,
          albumImageUrl: data.body.item.album.images[0]?.url,
          songUrl: data.body.item.external_urls.spotify,
          progress: data.body.progress_ms,
          duration: data.body.item.duration_ms,
        };

        responseData = track;
      } else {
        responseData = { isPlaying: false };
      }

      return responseData;
    } catch (err) {
      console.error(err);
      console.log({
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REDIRECT_URI,
      });
      throw new Error(
        "Failed to fetch currently playing track " + JSON.stringify(err),
      );
    }
  },
});
