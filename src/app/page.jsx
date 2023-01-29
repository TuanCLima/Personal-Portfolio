"use client"

import { Inter } from '@next/font/google';
import styles from './page.module.css';
import NavBar from './components/navbar/NavBar';
import DrifterStarsBackGround from './components/background/DrifterStarsBackground';
import Header from './components/header/Header';
import ProfilePicture from './components/profilePicture/ProfilePicture';
import HomeDescription from './components/homeDescription/HomeDescription';
import Experience from './components/experience/Experience';
import Academia from './components/academia/Academia';
import Footer from './components/footer/Footer';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main id={styles.main}>
      <NavBar />
      <DrifterStarsBackGround />
      <Header />
      <ProfilePicture />
      <HomeDescription />
      {/* <div className={styles.box} style={{ backgroundColor: 'red' }}/>
      <div className={styles.box} style={{ backgroundColor: 'white' }}/> */}
      <Experience />
      <Academia />
      <Footer />
    </main>
  )
}
