import { Hono } from 'hono'
import { cache } from 'hono/cache';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

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

export const api = new Hono().get('/api/spotify/now-playing', cache({ cacheName: 'spotify', cacheControl: 'max-age=15' }), async (c) => {
  try {
    const data = await spotifyApi.getMyCurrentPlaybackState();

    if (data.statusCode !== 204 && data.body && data.body.is_playing && data.body.item.type === 'track') {
      const track = {
        isPlaying: data.body.is_playing,
        title: data.body.item.name,
        artist: (data.body.item.artists.map(artist => artist.name).join(', ') as string),
        album: data.body.item.album.name,
        albumImageUrl: data.body.item.album.images[0]?.url,
        songUrl: data.body.item.external_urls.spotify,
        progress: data.body.progress_ms,
        duration: data.body.item.duration_ms
      }

      return c.json(track)
    } else {
      return c.json({ isPlaying: false })

    }
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

export type Api = typeof api;