import Image from 'next/image';
import styles from './CarouselItem.module.css'

function CarouselItem({ onClick, data }) {
  const { id, img, description, labels, date } = data;
  const { src, height, width, alt, style } = img;

  return (
    <div className={styles.carouselItem} onClick={onClick} id={id}>
      <div className={styles.imageWrapper}>
        <Image src={src} width={width} height={height} alt={alt} style={style}/>
      </div>
      <p className={styles.carouselDescription} dangerouslySetInnerHTML={{ __html: description }}></p>
      <div className={styles.labels}>
        {labels.map((label) => <div key={label} className={styles.label}  id={id}>{label}</div>)}
      </div>
      <div className={styles.duration}  id={id}>{date}</div>
    </div>
  )
}

export default CarouselItem;