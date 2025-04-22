// src/components/InfoSection/InfoSection.styles.ts
import styled from 'styled-components';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: {
      xxl: string;
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };
    colors: {
      lightGray: string;
      primary: string;
    };
    breakpoints: {
      tablet: string;
    };
  }
}

export const InfoSectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const InfoTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const InfoContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InfoText = styled.div`
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: 1.1rem;
  }
`;

export const InfoImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`;

export const InfoFeatures = styled.ul`
  list-style: none;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const InfoFeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  .icon {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
    margin-top: 4px;
  }
`;