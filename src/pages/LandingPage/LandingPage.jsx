import React from 'react';
import Header from '../../components/common/header/Header';
import Hero from '../../components/hero/Hero';
import ResumePreview from '../../components/resumePreview/ResumePreview';
import CompanyLogos from '../../components/companyLogos/CompanyLogos';
import styles from "./LandingPage.module.css"


function LandingPage() {

    //way of using env variable with VITE
    const appName = import.meta.env.VITE_PUBLIC_APP_NAME;
    console.log(appName); // "QuickCV"

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <ResumePreview />
        <CompanyLogos />
      </main>
    </div>
  )
}

export default LandingPage