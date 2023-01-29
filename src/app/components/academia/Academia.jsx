import Image from "next/image";
import styles from './Academia.module.css';

function Academia() {
  return (
    <section id={styles.academia}>
      <h1 className={styles.title}>Academia</h1>
      <div className={styles.divider}></div>
      <h3 className={styles.description} >Magic, but I have the knowledge and patience required to make just about anything</h3>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.imageWrapper}>
            <Image className={styles.parisImg} src={'/logo_paris_saclay.jpeg'} width={180} height={90} alt="Vix Logo"/>
          </div>
          <p className={styles.itemDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.item}>
          <div className={styles.imageWrapper}>
            <Image src={'/logo_telecom.png'} width={120} height={120} alt="Vix Logo"/>
          </div>
          <p className={styles.itemDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.item}>
          <div className={styles.imageWrapper}>
            <Image className={styles.uspImg} src={'/logo_usp.png'} width={180} height={80} alt="Vix Logo"/>
          </div>
          <p className={styles.itemDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
      </div>
    </section>
  );
}

export default Academia;