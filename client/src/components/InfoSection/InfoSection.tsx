// src/components/InfoSection/InfoSection.tsx
import { FaCheck } from 'react-icons/fa';
import {
  InfoSectionContainer,
  InfoTitle,
  InfoContent,
  InfoText,
  InfoImage,
  InfoFeatures,
  InfoFeatureItem
} from './InfoSection.styles';

const InfoSection = () => {
  return (
    <InfoSectionContainer id="about">
      <div className="container">
        <InfoTitle>About Our Services</InfoTitle>
        
        <InfoContent>
          <InfoText>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus 
              hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut 
              eleifend nibh porttitor.
            </p>
            
            <p>
              Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. 
              Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.
            </p>
            
            <InfoFeatures>
              <InfoFeatureItem>
                <FaCheck className="icon" />
                <span>Feature 1: High-quality service guaranteed</span>
              </InfoFeatureItem>
              <InfoFeatureItem>
                <FaCheck className="icon" />
                <span>Feature 2: 24/7 customer support</span>
              </InfoFeatureItem>
              <InfoFeatureItem>
                <FaCheck className="icon" />
                <span>Feature 3: Affordable pricing options</span>
              </InfoFeatureItem>
              <InfoFeatureItem>
                <FaCheck className="icon" />
                <span>Feature 4: Quick turnaround time</span>
              </InfoFeatureItem>
            </InfoFeatures>
          </InfoText>
          
          <InfoImage>
            <img src="/src/assets/about-image.jpg" alt="About our services" />
          </InfoImage>
        </InfoContent>
      </div>
    </InfoSectionContainer>
  );
};

export default InfoSection;