
import Link from 'next/link'
import styles from './NavBar.module.css'
import { useRef } from 'react'
import experienceStyles from '../experience/Experience.module.css';
import academiaStyles from '../academia/Academia.module.css';
import pageStyles from '../../page.module.css';

const stylesMap = {
  experience: experienceStyles.experience,
  academia: academiaStyles.academia,
  home: pageStyles.main,
};

function NavBar() {
  const navBarRef = useRef(null);

  const handleClick = (event) => {
    event.target.parentElement.childNodes.forEach((childNode) => {
      childNode.classList.remove(styles.selected);
    })
    event.target.classList.add(styles.selected);
  }

  const scrollHandler = (e) => {
    const { bottom } = navBarRef.current.getBoundingClientRect();
    const { top } = document.getElementById(stylesMap[e.target.innerText.toLowerCase()]).getBoundingClientRect();

    const customOffset = 20;

    window.scrollTo({ top: top + window.pageYOffset - bottom - customOffset, behavior: 'smooth' })
  };

  return (
    <div className={styles.wrapper} ref={navBarRef}>
      <ul className={styles.list} onClick={handleClick}>
        <li className={styles.listItem}><a onClick={scrollHandler} className={styles.link}>Home</a></li>
        <li className={styles.listItem}><a onClick={scrollHandler} className={styles.link}>Experience</a></li>
        <li className={styles.listItem}><a onClick={scrollHandler} className={styles.link}>Academia</a></li>
        <li className={`${styles.listItem} ${styles.selected}`}><a onClick={scrollHandler} className={styles.link}>Experience</a></li>
      </ul>
    </div>
  )
}

export default NavBar;