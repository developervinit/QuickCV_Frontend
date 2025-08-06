import styles from "./Landing.module.css"
import Header from '../../components/common/header/Header';
import Hero from '../../components/hero/Hero';
import ResumePreview from '../../components/resumePreview/ResumePreview';
import CompanyLogos from '../../components/companyLogos/CompanyLogos';


function LandingPage() {

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