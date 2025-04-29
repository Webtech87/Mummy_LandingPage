import React, { useState, useRef, useEffect } from 'react';
import '../../styles/components/video-section.css';

interface VideoSectionProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  description?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  posterSrc,
  title = "Watch Our Clinic in Action",
  description = "Experience our state-of-the-art facilities and compassionate care team through this brief tour of our clinic."
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      togglePlay();
    }
  };

  useEffect(() => {
    // Preload video metadata for better UX
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        setIsReady(true);
      });
      return () => {
        videoRef.current?.removeEventListener('loadedmetadata', () => {});
      };
    }
  }, []);

  return (
    <section className="video-section" aria-labelledby="video-section-title">
      <div className="video-section-container">
        {/* Text content */}
        <div className="video-section-content">
          {title && <h2 id="video-section-title" className="video-section-title">{title}</h2>}
          {description && <p className="video-section-description">{description}</p>}
        </div>

        {/* Video container */}
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="video-player"
            src={videoSrc}
            poster={posterSrc}
            controls={isPlaying}
            preload="metadata"
            aria-label={title}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>

          {/* Custom play button overlay */}
          {!isPlaying && (
            <button
              className="video-play-button"
              onClick={togglePlay}
              onKeyDown={handleKeyDown}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              disabled={!isReady}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.5)" stroke="white" strokeWidth="2"/>
                <path d="M9 7L17 12L9 17V7Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <span>Play Video</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;