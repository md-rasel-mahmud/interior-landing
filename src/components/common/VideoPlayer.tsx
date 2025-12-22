"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  src: string;
  poster?: string;

  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  controlsList?: string;
};

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  className,
  controlsList,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  const handleSeek = (value: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
    setProgress(value);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newVolume = videoRef.current.volume === 0 ? 1 : 0;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    containerRef.current?.requestFullscreen();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setTimeout(() => setShowControls(false), 2500);
    }
    return () => clearTimeout(timer);
  }, [playing]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full bg-black",
        controls && "cursor-pointer",
        className
      )}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        controlsList={controlsList}
        loop={loop}
        muted={muted}
        onTimeUpdate={handleTimeUpdate}
        onClick={controls ? togglePlay : undefined}
        className="w-full"
      />

      {/* Custom Controls */}
      {controls && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 transition-opacity duration-300",
            "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
            showControls ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Progress */}
          <input
            type="range"
            value={progress}
            onChange={(e) => handleSeek(+e.target.value)}
            className="mb-3 w-full cursor-pointer accent-primary"
          />

          {/* Buttons */}
          <div className="flex items-center gap-4 text-white">
            <button onClick={togglePlay}>
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button onClick={toggleMute}>
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => {
                const v = +e.target.value;
                if (videoRef.current) videoRef.current.volume = v;
                setVolume(v);
              }}
              className="w-24 accent-primary"
            />

            <div className="ml-auto">
              <button onClick={toggleFullscreen}>
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
