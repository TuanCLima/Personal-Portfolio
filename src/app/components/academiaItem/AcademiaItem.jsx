import Image from 'next/image';
import styles from './AcademiaItem.module.css'

function AcademiaItem({ onClick, data }) {
  const { id, img, description, date } = data;
  const { src, height, width, alt, style } = img;

  return (
    <div className={styles.academiaItem} onClick={onClick} id={id}>
      <div className={styles.imageWrapper}>
        <Image src={src} width={width} height={height} alt={alt} style={style}/>
      </div>
      <p className={styles.academiaDescription}>{description}</p>
      <div className={styles.duration}  id={id}>{date}</div>
    </div>
  )
}

export default AcademiaItem;