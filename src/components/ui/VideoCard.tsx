interface Props {
  videoId: string;
  title: string;
}

const VideoCard = ({ videoId, title }: Props) => (
  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`}
        title={title}
        className="w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <h3 className="text-white font-heading font-bold text-lg">{title}</h3>
    </div>
  </div>
);

export default VideoCard;
