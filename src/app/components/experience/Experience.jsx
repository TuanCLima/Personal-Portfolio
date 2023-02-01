import Image from "next/image";
import styles from './Experience.module.css';
import { throttle } from "lodash";
import { useState, useCallback } from "react";

function Experience() {
  const [expandedId, setExpandedId] = useState("");

  const jobData = {
    vix: {
      title: "Vix",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "/carrousel/cellphoneOne.png",
        "/carrousel/desktopOne.png",
        "/carrousel/cellphoneTwo.png",
        "/carrousel/desktopTwo.png"
      ]
    },
    granito: {
      title: "Granito",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "/carrousel/cellphoneOne.png",
        "/carrousel/desktopOne.png",
        "/carrousel/cellphoneTwo.png",
        "/carrousel/desktopTwo.png"
      ]
    },
    ateme: {
      title: "Ateme",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "/carrousel/cellphoneOne.png",
        "/carrousel/desktopOne.png",
        "/carrousel/cellphoneTwo.png",
        "/carrousel/desktopTwo.png"
      ]
    }
  };

  let carouselIndex = 0;

  /* not finished */
  const handleDetails = (e) => {
    const detailsEl = document.getElementsByClassName(styles.jobDetails)[0];  

    if(expandedId !== e.target.id) {
      setExpandedId(e.target.id);
      return;
    }

    if(expandedId === e.target.id) {
      setExpandedId("");
      return;
    }
  }

  function moveCarousel(direction) { 
    const carousel = document.getElementsByClassName(styles.carousel)[0];
    const elements = document.getElementsByClassName(styles.element);

    const convertedElements = [...elements];

    const elementsWidth = convertedElements.map(element => {
      const elementStyle = getComputedStyle(element);
      const numericWidth = parseInt(elementStyle.width.slice(0, -2));
      return numericWidth;
    });

    const distanceFoward = (elementsWidth[carouselIndex] + (elementsWidth[carouselIndex + 1])) / 2;
    const distanceBackward = (elementsWidth[carouselIndex] + (elementsWidth[carouselIndex - 1])) / 2;

    const style = getComputedStyle(carousel);

    /* 12px -> 12 */
    const leftDistance = style.left.slice(0, -2);

    const numericDistance = parseInt(leftDistance);

    const limit = carousel.childNodes.length;
    
    const canGoForward = ((numericDistance - distanceFoward) / distanceFoward) > -limit;
    const canGoBackwards = ((numericDistance + distanceBackward) / distanceBackward <= 0);
  
  
    if(direction === "forward" && canGoForward) {
      carouselIndex += 1;
      carousel.style.left = (numericDistance - distanceFoward) + "px";

      convertedElements.forEach((element, index) => {
        element.classList.add(styles.unfocused);
        if(carouselIndex === index) {
          element.classList.remove(styles.unfocused);
        }
      });
      return;
    }

    if(direction === "backward" && canGoBackwards){
      carouselIndex -= 1;
      carousel.style.left = (numericDistance + distanceBackward) + "px";

      convertedElements.forEach((element, index) => {
        element.classList.add(styles.unfocused);
        if(carouselIndex === index) {
          element.classList.remove(styles.unfocused);
        }
      });
      return;
    }
  }

  const debouncedMoveCarousel = useCallback(throttle(moveCarousel, 200), []);
  
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
          <button className={styles.carouselBtn} onClick={() => debouncedMoveCarousel('backward')}>&#8592;</button>
            <div className={styles.carouselFocus}>
              <div className={styles.carousel}>
                  <Image className={`${styles.element} ${styles.landscape}`} src={'/carousel/desktopOne.jpg'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.element} ${styles.portrait} ${styles.unfocused}`} src={'/carousel/cellphoneOne.png'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.element} ${styles.landscape} ${styles.unfocused}`} src={'/carousel/desktopTwo.jpg'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.element} ${styles.portrait} ${styles.unfocused}`} src={'/carousel/cellphoneTwo.jpg'} width={1000} height={1000} alt="test"></Image>
              </div>
            </div> 
          <button className={styles.carouselBtn} onClick={() => debouncedMoveCarousel('forward')}>&#8594;</button>
        </div>
      </div>
    </section>
  );
}

export default Experience;