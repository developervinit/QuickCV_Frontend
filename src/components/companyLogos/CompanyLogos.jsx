import styles from "./CompanyLogos.module.css"

function CompanyLogos() {
  const companies = ["Google", "facebook", "Microsoft", "amazon", "airbnb"]

  return (
    <div className={styles.logos}>
      {companies.map((company, index) => (
        <div key={index} className={styles.logo}>
          {company}
        </div>
      ))}
    </div>
  )
}

export default CompanyLogos
