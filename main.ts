import { Hono } from 'hono'
import { cache } from 'hono/cache';
import { logger } from 'hono/logger';
import SpotifyWebApi from 'spotify-web-api-node';

const SPOTIFY_CLIENT_ID = Deno.env.get('SPOTIFY_CLIENT_ID')
const SPOTIFY_CLIENT_SECRET = Deno.env.get('SPOTIFY_CLIENT_SECRET')
const SPOTIFY_REDIRECT_URI = Deno.env.get('SPOTIFY_REDIRECT_URI')

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
  console.error('Missing required environment variables')
  Deno.exit(1)
}

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: SPOTIFY_REDIRECT_URI
})

let refreshToken = Deno.env.get('SPOTIFY_REFRESH_TOKEN') || '';


async function refreshAccessToken() {
  try {
    spotifyApi.setRefreshToken(refreshToken)
    const data = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(data.body.access_token)
    console.log('Access token refreshed')

    // Schedule next refresh before token expires
    setTimeout(refreshAccessToken, (data.body.expires_in - 60) * 1000)
  } catch (error) {
    console.error('Error refreshing access token:', error)
  }
}

refreshAccessToken()

export const api = new Hono().use(logger()).get('/api/spotify/now-playing', async (c) => {
  const CACHE_DURATION = 15 * 1000; // 15 seconds in milliseconds
  const cacheKey = c.req.url;
  try {
    const cache = await caches.open('spotify-cache');
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      // Check if the cache is still fresh
      const cachedData = await cachedResponse.json();
      const cacheTime = cachedData.cachedAt || 0;
      const now = Date.now();

      if (now - cacheTime < CACHE_DURATION) {
        // Cache is still fresh, return it
        return c.json(cachedData.data);
      }
      // Cache is stale, continue to fetch new data
    }
    const data = await spotifyApi.getMyCurrentPlaybackState();

    console.log(data)

    let responseData = { isPlaying: false };

    if (data.statusCode !== 204 && data.body && data.body.is_playing && data.body.item.type === 'track') {
      const track = {
        isPlaying: data.body.is_playing,
        title: data.body.item.name,
        artist: (data.body.item.artists.map((artist) => artist.name).join(', ') as string),
        album: data.body.item.album.name,
        albumImageUrl: data.body.item.album.images[0]?.url,
        songUrl: data.body.item.external_urls.spotify,
        progress: data.body.progress_ms,
        duration: data.body.item.duration_ms
      }

      responseData = track
    } else {
      responseData = { isPlaying: false }

    }
    const cacheData = {
      data: responseData,
      cachedAt: Date.now()
    }
    await cache.put(
      cacheKey,
      new Response(JSON.stringify(cacheData), {
        headers: { 'Content-Type': 'application/json' }
      })
    );

    return c.json(responseData);
  } catch (error) {
    console.error('Error fetching currently playing track:', error)
    return c.json({ error: 'Failed to fetch currently playing track', isPlaying: false }, 500)
  }
}).get('/api/spotify/login', (c) => {
  const scopes = ['user-read-currently-playing', 'user-read-playback-state']
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, "state")
  return c.redirect(authorizeURL)
}).get('/spotify/callback', async (c) => {
  const code = c.req.query('code')

  try {
    const data = await spotifyApi.authorizationCodeGrant(code)

    // Store these tokens securely - especially the refresh token!
    const accessToken = data.body.access_token
    refreshToken = data.body.refresh_token

    spotifyApi.setAccessToken(accessToken)

    return c.html(`
      <h1>Authorization Successful</h1>
      <p>Your refresh token: <code>${refreshToken}</code></p>
      <p>Store this token securely in your environment variables.</p>
    `)
  } catch (error) {
    console.error('Error getting tokens:', error)
    return c.text('Error getting tokens', 500)
  }
})

Deno.serve(api.fetch);