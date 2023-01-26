
import Link from 'next/link'
import styles from './NavBar.module.css'
import { useRef } from 'react'

function NavBar() {
  const listRef = useRef(null);

  const handleClick = (event) => {
    console.log('###')
    event.target.parentElement.childNodes.forEach((childNode) => {
      childNode.classList.remove(styles.selected);
    })
    event.target.classList.add(styles.selected);
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} ref={listRef} onClick={handleClick}>
        <li className={styles.listItem}><Link className={styles.link} href="#">Home</Link></li>
        <li className={styles.listItem}><Link className={styles.link} href="#">Experience</Link></li>
        <li className={styles.listItem}><Link className={styles.link} href="#">Academia</Link></li>
        <li className={`${styles.listItem} ${styles.selected}`}><Link className={styles.link} href="#">About</Link></li>
      </ul>
    </div>
  )
}

export default NavBar;