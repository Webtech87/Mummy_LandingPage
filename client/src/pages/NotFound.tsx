// src/pages/NotFound.tsx
import React from 'react';
import '../styles/pages/notFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a href="/">Go back to home</a>
    </div>
  );
};

export default NotFound; // Add this line to make it a default export