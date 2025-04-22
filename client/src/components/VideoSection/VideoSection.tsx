// src/components/VideoSection/VideoSection.tsx
import ReactPlayer from 'react-player';
import { 
  VideoSectionContainer, 
  VideoWrapper, 
  VideoTitle, 
  VideoDescription 
} from './VideoSection.styles';

const VideoSection = () => {
  return (
    <VideoSectionContainer>
      <div className="container">
        <VideoTitle>See Our Services in Action</VideoTitle>
        <VideoDescription>
          Watch this short video to learn more about how we can help you.
        </VideoDescription>
        
        <VideoWrapper>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=your-video-id"
            width="100%"
            height="100%"
            controls={true}
            light={true} // Shows thumbnail before playing
          />
        </VideoWrapper>
      </div>
    </VideoSectionContainer>
  );
};

export default VideoSection;