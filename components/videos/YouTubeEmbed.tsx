import React from "react";

interface YouTubeEmbedProps {
  id: string;
  title?: string;
}

export default function YouTubeEmbed({ id, title = "Vidéo YouTube" }: YouTubeEmbedProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-xyrm-slate-200 bg-black shadow-md aspect-video">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
