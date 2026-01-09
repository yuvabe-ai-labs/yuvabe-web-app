import { Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PlaySolid } from "@/lib/utils/custom-Icons";
import type { Track } from "@/types/home.types";
import AudioPlayerModal from "./AudioPlayerModal";

// Define Tracks (Pointing to PUBLIC folder)
const tracks: Track[] = [
  {
    id: "wellness",
    file: "/audio/MindfullnessExcercise.mp3",
    title: "Mindfull Meditation",
    author: "Dr. Adhitya Varma",
    thumbnail: "/images/Mindfull_Meditation.png",
  },
  {
    id: "selfRealisation",
    file: "/audio/PQReps.mp3",
    title: "PQ Reps",
    author: "Dr. Shankar",
    thumbnail: "/images/PQ_Reps.png",
  },
];

export default function CalmingAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Initialize Audio Object
  useEffect(() => {
    audioRef.current = new Audio();

    // Listeners
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    // If same track, just toggle
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // New track
      audioRef.current.src = track.file;
      audioRef.current.load();
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const openModal = (track: Track) => {
    // If opening a different track via modal click, play it
    if (currentTrack?.id !== track.id) {
      playTrack(track);
    }
    setModalVisible(true);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTimeSimple = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-8 pr-4">
      <h2 className="text-[18px] font-bold text-text-primary mb-4 font-gilroy">
        Would you like to hear calming audio?
      </h2>

      <div className="space-y-0">
        {tracks.map((track, index) => {
          const isActive = currentTrack?.id === track.id;

          return (
            <div key={track.id}>
              <div className="flex flex-row items-center py-4">
                {/* Thumbnail */}
                <img
                  src={track.thumbnail}
                  alt="thumb"
                  className="w-15.75 h-15.75 rounded-xl mr-5 object-cover bg-gray-200"
                  onError={(e) => {
                    // Fallback if image missing
                    e.currentTarget.style.backgroundColor = "#ccc";
                  }}
                />

                {/* Text Info (Clickable to open modal) */}
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => openModal(track)}
                >
                  <h3 className="text-[16px] font-bold text-[#2F2F2F] font-gilroy">
                    {track.title}
                  </h3>
                  <p className="text-[14px] text-[#858585] mt-1 font-gilroy">
                    {track.author}
                  </p>

                  {isActive ? (
                    <p className="text-[12px] text-[#6C6C6C] mt-1 font-gilroy">
                      {formatTimeSimple(currentTime)} /{" "}
                      {formatTimeSimple(duration)}
                    </p>
                  ) : (
                    <p className="text-[12px] text-[#6C6C6C] mt-1 font-gilroy">
                      Tap to play
                    </p>
                  )}
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrack(track);
                  }}
                  className="p-2"
                >
                  {isActive && isPlaying ? (
                    <Pause size={26} className="text-primary" strokeWidth={2} />
                  ) : (
                    <PlaySolid className="text-primary w-4 h-4.5" />
                  )}
                </button>
              </div>

              {/* Separator */}
              {index !== tracks.length - 1 && (
                <div className="h-px bg-[#e6e6e6]" />
              )}
            </div>
          );
        })}
      </div>

      <AudioPlayerModal
        visible={modalVisible}
        track={currentTrack || tracks[0]} // Fallback to first track for UI
        onClose={() => setModalVisible(false)}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={() =>
          currentTrack ? playTrack(currentTrack) : playTrack(tracks[0])
        }
        onReset={handleReset}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onSeek={handleSeek}
      />
    </div>
  );
}
