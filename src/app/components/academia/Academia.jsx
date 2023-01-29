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
          <Image src={'/logo_vix.png'} width={180} height={130} alt="Vix Logo"/>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.item}>
          <Image src={'/logo_vix.png'} width={180} height={130} alt="Vix Logo"/>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.item}>
          <Image src={'/logo_vix.png'} width={180} height={130} alt="Vix Logo"/>
          <p className={styles.itemDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
      </div>
    </section>
  );
}

export default Academia;