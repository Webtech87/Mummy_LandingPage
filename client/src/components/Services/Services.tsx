// src/components/Services/Services.tsx
import { FaCog, FaChartLine, FaShieldAlt, FaClock } from 'react-icons/fa';
import {
  ServicesContainer,
  SectionTitle,
  SectionDescription,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription
} from './Services.styles';

const services = [
  {
    id: 1,
    icon: <FaCog size={32} />,
    title: 'Customizable Solutions',
    description: 'We provide fully customizable solutions to meet your specific needs and requirements.'
  },
  {
    id: 2,
    icon: <FaChartLine size={32} />,
    title: 'Data Analytics',
    description: 'Advanced analytics to help you make better decisions and improve your business outcomes.'
  },
  {
    id: 3,
    icon: <FaShieldAlt size={32} />,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security to keep your data safe and your systems running smoothly.'
  },
  {
    id: 4,
    icon: <FaClock size={32} />,
    title: '24/7 Support',
    description: 'Round-the-clock support to ensure your systems are always up and running.'
  }
];

const Services = () => {
  return (
    <ServicesContainer id="services">
      <div className="container">
        <SectionTitle>Our Services</SectionTitle>
        <SectionDescription>
          We offer a range of services to help you achieve your business goals.
        </SectionDescription>
        
        <ServicesGrid>
          {services.map(service => (
            <ServiceCard key={service.id}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </div>
    </ServicesContainer>
  );
};

export default Services;