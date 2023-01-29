import Image from "next/image";
import styles from './Experience.module.css';

function Experience() {
  return (
    <section id={styles.experience}>
      <h1 className={styles.title}>Experience</h1>
      <div className={styles.divider}></div>
      <h3 className={styles.description} >Magic, but I have the knowledge and patience required to make just about anything</h3>
      <div className={styles.jobs}>
        <div className={styles.job}>
          <div className={styles.imageWrapper}>
            <Image src={'/logo_vix_2.png'} width={180} height={90} alt="Vix Logo"/>
          </div>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.job}>
          <div className={styles.imageWrapper}>
            <Image src={'/logo_granito.png'} width={290} height={210} alt="Granito Logo"/>
          </div>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.job}>
          <div className={styles.imageWrapper}>
            <Image src={'/logo_ateme.png'} width={180} height={60} alt="ATEME Logo"/>
          </div>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
      </div>
    </section>
  );
}

export default Experience;