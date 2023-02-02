import Image from "next/image";
import styles from './Experience.module.css';
import { throttle } from "lodash";
import { useState, useCallback, useRef } from "react";
import CarouselItem from "../carouselItem/CarouselItem";
import experienceData from "@/app/data/experienceData";

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

const changeFocusStyle = (elementsList, indexToFocus) => {
  elementsList.forEach((carouselItem, index) => {
    carouselItem.classList.add(styles.opaque);
    if(indexToFocus === index) {
      carouselItem.classList.remove(styles.opaque);
    }
  });
}

function Experience() {
  const [expandedId, setExpandedId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleDetails = useCallback((e) => {
    const [detailsEl] = document.getElementsByClassName(styles.jobDetails); 

    if (expandedId !== e.target.id) {
      detailsEl.style.transform = "scaleY(1)";
      detailsEl.style.height = "450px";
      setExpandedId(e.target.id);
      return;
    }

    if (expandedId === e.target.id) {
      detailsEl.style.transform = "scaleY(0)";
      detailsEl.style.height = "0px";
      setExpandedId("");
    }
  }, [expandedId]);

  const moveToPositionFromIndex = (indexToLoad) => {
    const distance = getDistanceToTranslate(indexToLoad)
    moveCarousel(indexToLoad, distance);
  }

  const getDistanceToTranslate = useCallback((indexToLoad) => {
    const [carousel] = document.getElementsByClassName(styles.carousel)
    const carouselItems = [...carousel.childNodes];;

    const carouselItemsWidths = carouselItems.map(carouselItem => {
      const carouselItemStyle = getComputedStyle(carouselItem);
      const carouselItemWidth = parseInt(carouselItemStyle.width.slice(0, -2));
      return carouselItemWidth;
    });
    
    let distance = 0;
    
    for (let i = 0; i <= Math.abs(indexToLoad - currentIndex); i++) {
      distance += carouselItemsWidths[i] / 2;
    }

    return distance;
  }, [currentIndex])

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

  const moveCarousel = useCallback((indexToLoad, distanceToTranslate) => {
    const [carousel] = document.getElementsByClassName(styles.carousel);
    const style = getComputedStyle(carousel);
    const currentLeftPosition = parseInt(style.left.slice(0, -2));

    const carouselItems = carousel.childNodes;
    let canMove = false;

    if (indexToLoad < carouselItems.length && indexToLoad >= 0) {
      canMove = true;
    }

    if (currentIndex < indexToLoad && canMove) {
      setCurrentIndex(indexToLoad);
      carousel.style.left = (currentLeftPosition - distanceToTranslate) + "px";

      changeFocusStyle(carouselItems, indexToLoad);
      return;
    }

    if (currentIndex > indexToLoad && canMove){
      setCurrentIndex(indexToLoad);
      carousel.style.left = (currentLeftPosition + distanceToTranslate) + "px";

      changeFocusStyle(carouselItems, indexToLoad);
    }
  }, [currentIndex]);

  return (
    <section id={styles.experience}>
      <h1 className={styles.title}>Experience</h1>
      <div className={styles.divider}></div>
      <h3 className={styles.description} >{"Here is a brief description of the work I've been involved with throughout the last few years."}</h3>
      <div className={styles.jobs}>
        {experienceData.map((experienceItem) => (
          <CarouselItem key={experienceItem.id} onClick={toggleDetails} data={experienceItem} />
        ))}
      </div>
      <div className={styles.jobDetails} id="jobDetails">
        <div className={styles.carouselWrapper}>
          <button className={styles.carouselBtn} onClick={() => moveToPositionFromIndex(currentIndex - 1)}>&#8592;</button>
            <div className={styles.carouselFocus}>
              <div className={styles.carousel}>
                  <Image className={`${styles.landscape}`} src={'/carousel/desktopOne.jpg'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.portrait} ${styles.opaque}`} src={'/carousel/cellphoneOne.png'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.landscape} ${styles.opaque}`} src={'/carousel/desktopTwo.jpg'} width={1000} height={1000} alt="test"></Image>
                  <Image className={`${styles.portrait} ${styles.opaque}`} src={'/carousel/cellphoneTwo.jpg'} width={1000} height={1000} alt="test"></Image>
              </div>
            </div> 
          <button className={styles.carouselBtn} onClick={() => moveToPositionFromIndex(currentIndex + 1)}>&#8594;</button>
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