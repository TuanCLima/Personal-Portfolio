import { useEffect } from 'react';
import styles from './DrifterStars.module.css';
import loadCanvas from './loadCanvas';

function DrifterStarsBackground() {

  useEffect(() => {
    loadCanvas(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <canvas id={styles.stars}></canvas>
    </div>
  )
}

export default DrifterStarsBackground;