import styles from "./Hero.module.css"

function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.tagline}>BEST ONLINE RESUME BUILDER</p>

      <h1 className={styles.title}>
        Your success <span className={styles.highlight}>Story</span> Begins
        <br />
        with a <span className={styles.resume}>resume</span>
      </h1>

      <button className={styles.cta}>Order Now →</button>
    </section>
  )
}

export default Hero
