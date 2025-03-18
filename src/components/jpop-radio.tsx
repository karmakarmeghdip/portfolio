import { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Volume2, VolumeX, PlayCircle, PauseCircle, Radio } from "lucide-react";

interface TrackInfo {
  title: string;
  artists: { name: string; nameRomaji: string | null }[];
  albums?: { name: string; image: string | null }[];
  favorite: boolean;
}

interface ListenMoeData {
  song: TrackInfo;
  requester: { name: string } | null;
  event: { name: string } | null;
  startTime: string;
  lastPlayed: TrackInfo[];
  listeners: number;
}

export default function JpopRadio() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [trackInfo, setTrackInfo] = useState<ListenMoeData | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Connect to WebSocket
  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("wss://listen.moe/gateway_v2");
      wsRef.current = ws;

      ws.onopen = () => {
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }
      };

      ws.onmessage = (message) => {
        if (!message.data.length) return;
        let response;
        try {
          response = JSON.parse(message.data);
        } catch (error) {
          return;
        }

        switch (response.op) {
          case 0:
            ws.send(JSON.stringify({ op: 9 }));
            heartbeatIntervalRef.current = setInterval(() => {
              ws.send(JSON.stringify({ op: 9 }));
            }, response.d.heartbeat);
            break;
          case 1:
            if (
              response.t !== "TRACK_UPDATE" &&
              response.t !== "TRACK_UPDATE_REQUEST"
            )
              break;
            setTrackInfo(response.d);
            console.log(response.d);
            break;
          default:
            break;
        }
      };

      ws.onclose = () => {
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        setTimeout(() => connect(), 5000);
      };
    };

    connect();

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Set up audio element
  useEffect(() => {
    audioRef.current = new Audio("https://listen.moe/stream");
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle play/pause
  const togglePlay = () => {
    if (playing) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      // Create new audio element to get the current stream
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio("https://listen.moe/stream");
      audioRef.current.volume = muted ? 0 : volume;
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setPlaying(!playing);
  };

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
  };

  // Get album art URL if available
  const getAlbumArt = () => {
    if (
      !trackInfo ||
      !trackInfo.song.albums ||
      trackInfo.song.albums.length === 0 ||
      !trackInfo.song.albums[0].image
    ) {
      console.log("No album art available");
      return null;
    }

    // Construct full URL if it's just a filename
    const imageUrl = trackInfo.song.albums[0].image;

    return `https://cdn.listen.moe/covers/${imageUrl}`;

  };

  const albumArt = getAlbumArt();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Radio className="h-5 w-5" />
          {playing && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] sm:w-[350px] p-4 overflow-hidden"
        side="bottom"
        align="center"
      >
        <div className="relative z-10 space-y-4">
          {/* Album art background */}
          {albumArt && (
            <div
              className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
              style={{
                backgroundImage: `url(${albumArt})`,
                filter: 'blur(2px)'
              }}
            />
          )}

          {/* Overlay gradient to improve text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95 z-0" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">LISTEN.moe Radio</h4>
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-2 accent-primary"
                />
              </div>
            </div>

            {/* Album art in the player (larger view) */}
            {albumArt && (
              <div className="flex justify-center">
                <img
                  src={albumArt}
                  alt="Album Cover"
                  className="h-24 w-24 object-cover rounded-md shadow-md"
                />
              </div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={togglePlay}
                variant="ghost"
                className="rounded-full h-12 w-12 p-0 hover:bg-secondary/80"
              >
                {playing ? (
                  <PauseCircle className="h-10 w-10" />
                ) : (
                  <PlayCircle className="h-10 w-10" />
                )}
              </Button>
            </div>

            {trackInfo ? (
              <div className="space-y-2 text-sm">
                <div className="font-medium">Now Playing</div>
                <div className="flex flex-col">
                  <span className="font-semibold truncate">{trackInfo.song.title}</span>
                  <span className="text-muted-foreground truncate">
                    {trackInfo.song.artists.map((artist) => artist.name).join(", ")}
                  </span>
                  {trackInfo.song.albums && trackInfo.song.albums.length > 0 && (
                    <span className="text-muted-foreground text-xs">
                      {trackInfo.song.albums[0].name}
                    </span>
                  )}
                </div>
                {trackInfo.requester && (
                  <div className="text-xs text-muted-foreground">
                    Requested by: {trackInfo.requester.name}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Listeners: {trackInfo.listeners}
                </div>

                {trackInfo.lastPlayed.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="font-medium mb-2">Recently played</div>
                    <div className="space-y-2">
                      {trackInfo.lastPlayed.map((track, i) => (
                        <div key={i} className="text-xs">
                          <div className="font-medium truncate">{track.title}</div>
                          <div className="text-muted-foreground truncate">
                            {track.artists.map((artist) => artist.name).join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-2 text-center text-sm text-muted-foreground">
                Loading radio information...
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}