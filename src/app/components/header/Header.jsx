import styles from './Header.module.css'

function Header () {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Tuan Lima</h1>
      <h2 className={styles.subtitle}>Awesome developer and much more</h2>
    </header>
  )
}

export default Header;
