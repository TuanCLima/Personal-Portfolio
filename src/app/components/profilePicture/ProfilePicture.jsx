import Image from "next/image";
import styles from './ProfilePicture.module.css'

function ProfilePicture () {

  function onClickHandler() {
    console.log('###')
    /* console.log('###', e.target, styles.animate);
    e.target.classList.add(styles.animate); */
  };

  return (
    <div className={styles.wrapper} onClick={onClickHandler}>
      <div onClick={onClickHandler}>
        AAAAAAAAAAAAAAAA
        {/* <Image className={styles.front}  src={'/avatar.png'} alt='Avatar Image' width={100} height={100} /> */}
      </div>
      <Image className={styles.back} src={'/avatar2.png'} alt='Avatar Image' width={100} height={100} />
    </div>
  );
}

export default ProfilePicture;