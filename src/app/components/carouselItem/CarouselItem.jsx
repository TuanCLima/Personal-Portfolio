import Image from 'next/image';
import styles from './CarouselItem.module.css'

function CarouselItem({ onClick, data }) {
  const { id, img, description } = data;
  const { src, height, width, alt, style } = img;

  return (
    <div className={styles.carouselItem} onClick={onClick} id={id}>
      <div className={styles.imageWrapper}>
        <Image src={src} width={width} height={height} alt={alt} style={style}/>
      </div>
      <p className={styles.carouselDescription}>{description}</p>
      <div className={styles.labels}>
        <div className={styles.label}>React</div>
        <div className={styles.label}>Typescript</div>
        <div className={styles.label}>Next.JS</div>
      </div>
      <div className={styles.duration}>{"Jun 2021 - Jan 2023"}</div>
    </div>
  )
}

export default CarouselItem;