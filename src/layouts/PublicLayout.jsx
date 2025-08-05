// This layout is used for public-facing pages (e.g., home, about us, contact) where you want to include things like a navbar and footer.
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
