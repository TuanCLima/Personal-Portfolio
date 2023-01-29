import Image from "next/image";
import styles from './ProfilePicture.module.css'
import { useEffect, useState, useRef } from "react";

function ProfilePicture () {
  const [isFront, setIsFront] = useState(true);
  const ref = useRef(null);

  function onClickHandler(e) {
    const frontEl = e.target;
    const backEl = e.target.parentElement.childNodes[isFront ? 1 : 0];

    console.log('###', frontEl.src, backEl.src);


    frontEl.classList.remove(styles.animationShow);
    frontEl.classList.add(styles.animationHide);


    frontEl.addEventListener('animationend', () => {
      backEl.classList.remove(styles.animationHide);
      backEl.classList.add(styles.animationShow);

      setIsFront((_isFront) => !_isFront);
    })
  };

  useEffect(() => {
    // ref.current?.style.setProperty('transform', 'rotateY(90deg)');
  }, [])

  return (
    <div className={styles.wrapper}>
      <Image /* onClick={onClickHandler} */ className={styles.front}  src={'/avatar1.png'} alt='Avatar Image' width={100} height={100} />
      {/* <Image ref={ref} onClick={onClickHandler} className={styles.back} src={'/avatar2.png'} alt='Avatar Image' width={100} height={100} /> */}
    </div>
  );
}

export default ProfilePicture;