import Image from "next/image";
import styles from './Experience.module.css';
import { useState, useCallback, useEffect} from "react";
import CarouselItem from "../carouselItem/CarouselItem";
import experienceData from "@/app/data/experienceData";
import carouselItemStyles from "../carouselItem/CarouselItem.module.css";

const jobData = {
  vix: {
    title: "Vix",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["React", "Typescript", "Next.js", "Dart", "Flutter", "MobX"],
    images: [
      {
        imagePath: "/carousel/cellphoneOne.png", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/desktopOne.jpg", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/cellphoneTwo.jpg", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/desktopTwo.jpg",
        imageClass: styles.landscape
      }
    ]
  },
  granito: {
    title: "Granito",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["Dart", "Flutter", "MobX", "PL/SQL", "DataStage", "Bash"],
    images: [
      {
        imagePath: "/carousel/desktopOne.jpg", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/desktopTwo.jpg",
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/cellphoneOne.png", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/cellphoneTwo.jpg", 
        imageClass: styles.portrait
      }
    ]
  },
  ibm: {
    title: "IBM",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["PL/SQL", "DataStage", "Bash", "React", "Typescript", "Next.js"],
    images: [
      {
        imagePath: "/carousel/cellphoneOne.png", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/cellphoneTwo.jpg", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/desktopOne.jpg", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/desktopTwo.jpg",
        imageClass: styles.landscape
      }
    ]
  }
};

const importedCarouselItemElement = carouselItemStyles.carouselItem;

const changeFocusStyle = (elementsList, indexToFocus) => {
  elementsList.forEach((carouselItemWrapper, index) => {

    const [carouselItem] = carouselItemWrapper.childNodes;

    carouselItem.classList.add(styles.opaque);
    if(indexToFocus === index) {
      carouselItem.classList.remove(styles.opaque);
    }
  });
}

function Experience() {
  const [expandedId, setExpandedId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleDetails = useCallback((selectedElement) => {
    const [jobDetailsElement] = document.getElementsByClassName(styles.jobDetails); 
    const jobItems = document.getElementsByClassName(importedCarouselItemElement);

    for(let i=0; i<jobItems.length; i++) {
      if(selectedElement.target.id === jobItems[i].id && selectedElement.target.id !== expandedId) {
        jobItems[i].style.backgroundColor = "var(--periglacial-blue)";
        jobItems[i].style.color = "var(--mid-gray)";
        jobItems[i].style.border = "2px solid var(--pale-teal)";
        continue;
      }
      jobItems[i].style.backgroundColor = "";
      jobItems[i].style.color = "";
      jobItems[i].style.border = "2px solid var(--mid-gray)";
    }

    if (expandedId !== selectedElement.target.id) {
      jobDetailsElement.style.transform = "scaleY(1)";
      jobDetailsElement.style.height = "auto";
      setExpandedId(selectedElement.target.id);
    }

    if (expandedId === selectedElement.target.id) {
      jobDetailsElement.style.transform = "scaleY(0)";
      jobDetailsElement.style.height = "0px";
      setExpandedId("");
    }
  }, [expandedId]);

  const resetCarousel = (newFocusSize) => {
    const [carousel] = document.getElementsByClassName(styles.carousel);
    const [carouselFocus] = document.getElementsByClassName(styles.carouselFocus);

    carousel.style.left = "0px";
    carouselFocus.style.width = newFocusSize + "px";

    changeFocusStyle(carousel.childNodes, 0);
    toggleRadio(0);
    setCurrentIndex(0);
  }

  const moveToPositionFromIndex = (indexToLoad) => {
    const [carousel] = document.getElementsByClassName(styles.carousel);
    const carouselItemsQuantity = carousel.childNodes.length;

    let verifyedIndexToLoad = indexToLoad;

    if(indexToLoad >= carouselItemsQuantity) {
      verifyedIndexToLoad = 0;
    }
    if(indexToLoad < 0) {
      verifyedIndexToLoad = carouselItemsQuantity - 1;
    }

    const distance = getDistanceToTranslate(verifyedIndexToLoad);
    toggleRadio(verifyedIndexToLoad);
    moveCarousel(verifyedIndexToLoad, distance);
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
    
    const startIndex = currentIndex < indexToLoad ? currentIndex : indexToLoad;
    const endIndex = currentIndex > indexToLoad ? currentIndex : indexToLoad; 

    for (let i = startIndex; i <= endIndex; i++) {
      if(i === startIndex || i === endIndex) {
        distance += carouselItemsWidths[i] / 2;
        continue;
      }
      distance += carouselItemsWidths[i];
    }

    return distance;
  }, [currentIndex])

  const toggleRadio = (indexToLoad) => {
    const toggleList = document.getElementsByClassName(styles.radio);
    
    const convertedList = [...toggleList];

    convertedList.forEach((toggle, index) => {
      toggle.classList.remove(styles.selected);
      if(index === indexToLoad) {
        toggle.classList.add(styles.selected);
      }
    });
  }

  const moveCarousel = useCallback((indexToLoad, distanceToTranslate) => {
    const [carousel] = document.getElementsByClassName(styles.carousel);
    const style = getComputedStyle(carousel);
    const currentLeftPosition = parseInt(style.left.slice(0, -2));

    const carouselItems = carousel.childNodes;

    if (currentIndex === indexToLoad) {
      return;
    }
    const x = currentIndex < indexToLoad ? (-distanceToTranslate) : distanceToTranslate;

    setCurrentIndex(indexToLoad);
    carousel.style.left = (currentLeftPosition + x) + "px";

    changeFocusStyle(carouselItems, indexToLoad);
  }, [currentIndex]);

  useEffect(() => {
    if (jobData[expandedId] && jobData[expandedId]?.images[0].imageClass === styles.portrait) {
      resetCarousel(250);
      return;
    }
    resetCarousel(700);
  }, [expandedId]);

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
                  {jobData[expandedId] && jobData[expandedId].images.map((image, index) => {
                    return (
                      <div className={styles.imageBackground} key={index}>
                        <Image className={`${image.imageClass} ${index !== 0 ? styles.opaque : ""}`} src={image.imagePath} width={1000} height={1000} alt="test"></Image>
                      </div>
                    );
                  }
                  )}
              </div>
            </div> 
          <button className={styles.carouselBtn} onClick={() => moveToPositionFromIndex(currentIndex + 1)}>&#8594;</button>
        </div>
        <div className={styles.radioWrapper}>
          {new Array(document.getElementsByClassName(styles.carousel)[0]?.childNodes.length || 4).fill(0).map((_, index) => {
            return <div className={`${styles.radio} ${index === 0 ? styles.selected : ""}`} onClick={() => moveToPositionFromIndex(index)} key={index}></div>}
          )}
        </div>
        <div className={styles.detailsText}>
          <h1>{jobData[expandedId] && jobData[expandedId].title}</h1>
          <p>{jobData[expandedId] && jobData[expandedId].desc}</p>
        </div>
        <div className={styles.labelsWrapper}>
          {jobData[expandedId] && jobData[expandedId].labels.map((label, index) => {
            return (
              <div className={styles.label} key={index}>
                <h2>{label}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;