import React, { useState, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="video-section">
      <div className="video-section-container">
        {/* Text content */}
        <div className="video-section-content">
          {title && <h2 className="video-section-title">{title}</h2>}
          {description && <p className="video-section-description">{description}</p>}
        </div>
        
        {/* Video container */}
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="video-player"
            poster={posterSrc}
            controls={isPlaying}
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Custom play button overlay - only shows when video is not playing */}
          {!isPlaying && (
            <button 
              className="video-play-button"
              onClick={togglePlay}
              aria-label="Play video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.8"/>
                <path d="M16 12L10 16.5V7.5L16 12Z" fill="#A38200" />
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