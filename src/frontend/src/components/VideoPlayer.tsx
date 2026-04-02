import { Play } from "lucide-react";
import { useState } from "react";

interface Props {
  url: string;
  title?: string;
}

function isYouTube(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}
function isVimeo(url: string) {
  return url.includes("vimeo.com");
}
function isEmbed(url: string) {
  return url.includes("/embed/");
}

function toEmbedUrl(url: string): string {
  if (isEmbed(url)) return url;
  // convert watch?v= to embed
  const ytMatch = url.match(/[?&]v=([^&]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // youtu.be short
  const ytShort = url.match(/youtu\.be\/([^?]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  return url;
}

export default function VideoPlayer({ url, title = "Service video" }: Props) {
  const [playing, setPlaying] = useState(false);

  if (isYouTube(url) || isVimeo(url)) {
    const embedUrl = toEmbedUrl(url);
    const autoplay = playing
      ? embedUrl.includes("?")
        ? "&autoplay=1"
        : "?autoplay=1"
      : "";
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-navy shadow-lift">
        {playing ? (
          <iframe
            src={`${embedUrl}${autoplay}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group bg-navy/80 hover:bg-navy/70 transition-colors"
            aria-label={`Play ${title}`}
            data-ocid="services.button"
          >
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-navy group-hover:scale-110 transition-transform duration-300">
              <Play
                className="w-8 h-8 text-navy ml-1"
                fill="currentColor"
                aria-hidden="true"
              />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Play Video
            </span>
          </button>
        )}
      </div>
    );
  }

  // Native video
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lift">
      <video
        src={url}
        controls
        className="w-full h-full object-cover"
        title={title}
        aria-label={title}
      >
        <track kind="captions" src="" label="Captions" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
