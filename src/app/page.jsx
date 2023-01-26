"use client"

import { Inter } from '@next/font/google';
import styles from './page.module.css';
import NavBar from './components/navbar/NavBar';
import DrifterStarsBackGround from './components/background/DrifterStarsBackground';
import Header from './components/header/Header';
import ProfilePicture from './components/profilePicture/ProfilePicture';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      {/* <DrifterStarsBackGround /> */}
      {/* <Header /> */}
      {/* <ProfilePicture /> */}
      {/* <div className={styles.box} style={{ backgroundColor: 'red' }}/>
      <div className={styles.box} style={{ backgroundColor: 'white' }}/>
      <div className={styles.box} style={{ backgroundColor: 'blue' }}/>
      <div className={styles.box} style={{ backgroundColor: 'yellow' }}/> */}

    </main>
  )
}
