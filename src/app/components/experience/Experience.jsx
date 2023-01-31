import Image from "next/image";
import styles from './Experience.module.css';
import { useState } from "react";

function Experience() {
  const [expandedId, setExpandedId] = useState("");

  const jobData = {
    vix: {
      title: "Vix",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "/carrousel/orange.png",
        "/carrousel/green.png",
        "/carrousel/purple.png",
        "/carrousel/darkblue.png"
      ]
    },
    granito: {
      title: "Granito",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "/carrousel/orange.png",
        "/carrousel/green.png",
        "/carrousel/purple.png",
        "/carrousel/darkblue.png"
      ]
    },
    ateme: {
      title: "Ateme",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "/carrousel/orange.png",
        "/carrousel/green.png",
        "/carrousel/purple.png",
        "/carrousel/darkblue.png"
      ]
    }
  };

  const handleDetails = (e) => {
    const detailsEl = document.getElementsByClassName(styles.jobDetails)[0];  

    if(expandedId !== e.target.id) {
      // detailsEl.getElementsByTagName("h1")[0].innerText = jobData[e.target.id].title; 
      detailsEl.style.setProperty("display", "flex");
      setExpandedId(e.target.id);
      return;
    }

    if(expandedId === e.target.id) {
      detailsEl.style.setProperty("display", "none");
      setExpandedId("");
      return;
    }
  }

  function moveCarousel(direction) { 
    const carousel = document.getElementsByClassName(styles.carousel)[0];
    const element = document.getElementsByClassName(styles.el)[0];
    const carouselStyle = getComputedStyle(carousel);
    const elementStyle = getComputedStyle(element);
    
    /* 12px -> 12 */
    const position = carouselStyle.left.slice(0, -2);
    const elementSize = elementStyle.width.slice(0, -2);

    const limit = carousel.childNodes.length;

    const numericSize = parseInt(elementSize);
    const numericPosition = parseInt(position);
    
    const canGoForward = ((numericPosition - numericSize) / numericSize) > -limit;
    const canGoBackwards = ((numericPosition + numericSize) / numericSize <= 0);
  
  
    if(direction === "forward" && canGoForward) {
      carousel.style.left = (numericPosition - numericSize) + "px";
      return;
    }
    if(direction === "backward" && canGoBackwards){
      console.log(numericSize);
      carousel.style.left = (numericPosition + numericSize) + "px";
      return;
    }
  }
  

  return (
    <section id={styles.experience}>
      <h1 className={styles.title}>Experience</h1>
      <div className={styles.divider}></div>
      <h3 className={styles.description} >Magic, but I have the knowledge and patience required to make just about anything</h3>
      <div className={styles.jobs}>
        <div className={styles.job} onClick={handleDetails} id="vix">
          <div className={styles.imageWrapper}>
            <Image src={'/logo_vix_2.png'} width={180} height={90} alt="Vix Logo"/>
          </div>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.job} onClick={handleDetails} id="granito">
          <div className={styles.imageWrapper}>
            <Image src={'/logo_granito.png'} width={290} height={210} alt="Granito Logo"/>
          </div>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
        <div className={styles.job} onClick={handleDetails} id="ateme">
          <div className={styles.imageWrapper}>
            <Image src={'/logo_ateme.png'} width={180} height={60} alt="ATEME Logo"/>
          </div>
          <p className={styles.jobDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac varius nisi, ac consequat magna</p>
        </div>
      </div>
      <div className={styles.jobDetails} id="jobDetails">
        <button className={styles.carouselBtn} onClick={() => moveCarousel('backward')}>&#8592;</button>
          <div className={styles.carouselWrapper}>
            <div className={styles.carousel}>
              <div className={`${styles.el} ${styles.one}`}></div>
              <div className={`${styles.el} ${styles.two}`}></div>
              <div className={`${styles.el} ${styles.three}`}></div>
            </div>
          </div> 
        <button className={styles.carouselBtn} onClick={() => moveCarousel('forward')}>&#8594;</button>
      </div>
    </section>
  );
}

export default Experience;