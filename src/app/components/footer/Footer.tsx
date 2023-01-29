import styles from './Footer.module.css';
import Image from 'next/image';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons} >
        <Image className={styles.icon} src={'/icon_github.png'} alt={'Github Icon'} height={50} width={50} color='FFF' />
        <Image className={styles.icon} src={'/icon_linkedin.png'} alt={'Github Icon'} height={50} width={50} color='FFF' />
        <Image className={styles.icon} src={'/icon_cv.png'} alt={'Github Icon'} height={50} width={50} color='FFF' />
      </div>
      <div className={styles.trademark}>® 2023 Tuan C Lima</div>
      <p  className={styles.email}>tuan7lima@gmail.com</p>
      <a href="#" className={styles.arrowWrapper}>
        <p>GO TO TOP</p>
        <div className={styles.mover}>
        <p className={styles.arrow}>&#xbb;</p>
        </div>
      </a>
    </footer>
  );
}

export default Footer;