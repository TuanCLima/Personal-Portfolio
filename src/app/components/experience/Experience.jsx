import Image from "next/image";
import styles from './Experience.module.css';
import { throttle } from "lodash";
import { useState, useCallback } from "react";

function Experience() {
  const [expandedId, setExpandedId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  /* not finished */
  const handleDetails = (e) => {
    const detailsEl = document.getElementsByClassName(styles.jobDetails)[0]; 

    if(expandedId !== e.target.id) {
      detailsEl.style.transform = "scaleY(1)";
      detailsEl.style.height = "450px";
      setExpandedId(e.target.id);
      return;
    }

    if(expandedId === e.target.id) {
      detailsEl.style.transform = "scaleY(0)";
      detailsEl.style.height = "0px";
      setExpandedId("");
      return;
    }
  }

  const calculateDistance = (destinyIndex) => {
    const carouselChildren = document.getElementsByClassName(styles.carousel)[0].childNodes;
    const convertedChildren = [...carouselChildren];

    const childrenWidth = convertedChildren.map(element => {
      const elementStyle = getComputedStyle(element);
      const numericWidth = parseInt(elementStyle.width.slice(0, -2));
      return numericWidth;
    });
    
    let distance = 0;
    
    for(let i=currentIndex; i<=destinyIndex; i++) {
      distance = distance + (childrenWidth[i] / 2);
    }

    moveCarousel(destinyIndex, distance);
  }

  const toggleRadio = (e) => {
    const toggleList = document.getElementsByClassName(styles.radio);

    const convertedList = [...toggleList];

    convertedList.forEach(toggle => {
      toggle.classList.remove(styles.selected);
      if(toggle === e.target) {
        toggle.classList.add(styles.selected);
      }
    });
  }

  const moveCarousel = (destinyIndex, distance) => {
    const carousel = document.getElementsByClassName(styles.carousel)[0];
    const style = getComputedStyle(carousel);
    const currentDistance = parseInt(style.left.slice(0, -2));

    const destinies = carousel.childNodes;
    let direction;
    let canMove;
    
    if(currentIndex > destinyIndex) {
      direction = "backward";
    }
    if(currentIndex < destinyIndex) {
      direction = "forward";
    }

    if(destinyIndex < destinies.length || destinyIndex >= 0) {
      canMove = true;
    }

    if(direction === "forward" && canMove) {
      setCurrentIndex(destinyIndex);
      carousel.style.left = (currentDistance - distance) + "px";

      destinies.forEach((element, index) => {
        element.classList.add(styles.unfocused);
        if(destinyIndex === index) {
          element.classList.remove(styles.unfocused);
        }
      });
    }

    if(direction === "backward" && canMove){
      setCurrentIndex(destinyIndex);
      carousel.style.left = (currentDistance + distance) + "px";

      destinies.forEach((element, index) => {
        element.classList.add(styles.unfocused);
        if(destinyIndex === index) {
          element.classList.remove(styles.unfocused);
        }
      });
    }
  }

  const debouncedMoveCarousel = useCallback(throttle(calculateDistance, 200), []);
  
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
        <div className={styles.carouselWrapper}>
          <button className={styles.carouselBtn} onClick={() => debouncedMoveCarousel(currentIndex - 1)}>&#8592;</button>
            <div className={styles.carouselFocus}>
              <div className={styles.carousel}>
                  <Image className={`${styles.landscape}`} src={'/carousel/desktopOne.jpg'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.portrait} ${styles.unfocused}`} src={'/carousel/cellphoneOne.png'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.landscape} ${styles.unfocused}`} src={'/carousel/desktopTwo.jpg'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.portrait} ${styles.unfocused}`} src={'/carousel/cellphoneTwo.jpg'} width={1000} height={1000} alt="test"></Image>
              </div>
            </div> 
          <button className={styles.carouselBtn} onClick={() => debouncedMoveCarousel(currentIndex + 1)}>&#8594;</button>
        </div>
        <div className={styles.radioWrapper}>
          <div className={`${styles.radio} ${styles.selected}`} onClick={toggleRadio}></div>
          <div className={`${styles.radio}`} onClick={toggleRadio}></div>
          <div className={`${styles.radio}`} onClick={toggleRadio}></div>
          <div className={`${styles.radio}`} onClick={toggleRadio}></div>
        </div>
      </div>
    </section>
  );
}

export default Experience;