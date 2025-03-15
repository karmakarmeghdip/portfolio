import { Button } from "@/components/ui/button.tsx";
import { actions } from "astro:actions";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { useEffect, useState } from "react";
// import { BASE_URL } from "@/lib/constants.ts";

const BASE_URL = "/";

// const client = hc<Api>(BASE_URL);

export const SpotifyCard = () => {
  const [track, setTrack] = useState<{
    isPlaying: true;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    progress: number;
    duration: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await actions.getSpotifyData();
        const data = response.data
        setTrack(data as {
          isPlaying: true;
          title: string;
          artist: string;
          album: string;
          albumImageUrl: string;
          songUrl: string;
          progress: number;
          duration: number;
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch currently playing track<br>' + err);
        setLoading(false);
      }
    };

    fetchNowPlaying();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);
  return <Card>
    <CardHeader>
      <CardTitle>Spotify</CardTitle>
      <CardDescription>{track?.isPlaying ? "Now playing" : "Not playing"}</CardDescription>
    </CardHeader>
    <CardContent className="h-40">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : !track?.isPlaying ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground">Nothing playing right now</p>
        </div>
      ) : (
        <div className="flex h-full gap-4">
          <div className="flex-shrink-0">
            <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={track.albumImageUrl}
                alt={`${track.album} cover`}
                className="h-32 w-32 rounded-md shadow-sm"
              />
            </a>
          </div>
          <div className="flex flex-col justify-between flex-grow overflow-hidden">
            <div>
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lg truncate block hover:underline"
              >
                {track.title}
              </a>
              <p className="text-muted-foreground text-sm truncate">
                {track.artist}
              </p>
              <p className="text-muted-foreground text-xs truncate">
                {track.album}
              </p>
            </div>

            <div className="w-full">
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(track.progress / track.duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{formatTime(track.progress)}</span>
                <span>{formatTime(track.duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContent>
    <CardFooter>
      <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm">
          Open Spotify
        </Button>
      </a>
    </CardFooter>
  </Card>
}

// Helper function to format milliseconds to mm:ss
function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}