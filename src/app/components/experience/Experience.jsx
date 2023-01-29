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
          <Image src={'/logo_vix.png'} width={180} height={130} alt="Vix Logo"/>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.job}>
          <Image src={'/logo_vix.png'} width={180} height={130} alt="Vix Logo"/>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.job}>
          <Image src={'/logo_vix.png'} width={180} height={130} alt="Vix Logo"/>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
      </div>
    </section>
  );
}

export default Experience;