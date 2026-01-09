import type { Track } from "@/types/home.types";
import {
  ChevronDown,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  track: Track | null;
  onClose: () => void;
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds
  onPlayPause: () => void;
  onReset: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onSeek: (time: number) => void;
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function AudioPlayerModal({
  visible,
  track,
  onClose,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onReset,
  isMuted,
  onToggleMute,
  onSeek,
}: Props) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  if (!visible || !track) return null;

  return (
    <>
      {/* Dim Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container (Bottom Sheet Simulation) */}
      <div className="fixed bottom-0 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-100 z-50 bg-white rounded-t-3xl border-t border-[#592AC7] shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="p-8 pb-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronDown size={28} className="text-gray-600" />
            </button>
            <h3 className="text-lg font-medium text-gray-800">{track.title}</h3>
            <div className="w-8" /> {/* Spacer */}
          </div>

          {/* Thumbnail */}
          <div className="w-full aspect-square max-w-70 mx-auto mb-6 rounded-2xl overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center">
            <img
              src={track.thumbnail}
              alt={track.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title & Author */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#222] font-clash">
              {track.title}
            </h2>
            <p className="text-[#666] mt-1 font-gilroy">{track.author}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-1 bg-[#E8DAF7] rounded-lg appearance-none cursor-pointer accent-[#592AC7]"
              style={{
                background: `linear-gradient(to right, #592AC7 ${
                  (currentTime / duration) * 100
                }%, #E8DAF7 ${(currentTime / duration) * 100}%)`,
              }}
            />
          </div>

          {/* Timestamps */}
          <div className="flex justify-between text-xs text-[#BBB1FA] font-gilroy mb-8">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex justify-around items-center">
            <button
              onClick={onToggleMute}
              className="text-[#444] p-2 hover:bg-gray-100 rounded-full"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            <button
              onClick={onPlayPause}
              className="w-16 h-16 bg-[#592AC7] rounded-full flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause fill="white" className="text-white" size={28} />
              ) : (
                <Play fill="white" className="text-white ml-1" size={28} />
              )}
            </button>

            <button
              onClick={onReset}
              className="text-[#444] p-2 hover:bg-gray-100 rounded-full"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
