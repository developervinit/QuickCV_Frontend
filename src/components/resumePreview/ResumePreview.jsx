import styles from "./ResumePreview.module.css"

function ResumePreview() {
  return (
    <div className={styles.preview}>
      <div className={styles.resumeCard}>
        <div className={styles.leftSide}>
          <div className={styles.profile}>
            <div className={styles.avatar}></div>
            <div className={styles.info}>
              <h3>Amalia Murdom</h3>
              <p>photographer</p>
            </div>
          </div>

          <div className={styles.about}>
            <h4>About me</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat.
            </p>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.contact}>
            <h4>Contact</h4>
            <p>+1 654 646 55</p>
            <p>www.company-name.com</p>
            <p>name.contact@contact.com</p>
          </div>

          <div className={styles.experience}>
            <h4>EXPERIENCE</h4>
            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <span>POSITION TITLE</span>
                <span>(2015-2018)</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
