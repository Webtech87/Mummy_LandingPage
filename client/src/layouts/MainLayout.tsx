// src/layouts/MainLayout.tsx
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';

interface MainLayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Main>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </Main>
  );
};

export default MainLayout;