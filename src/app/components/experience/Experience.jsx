import Image from "next/image";
import styles from './Experience.module.css';
import { useState, useCallback, useEffect, useRef} from "react";
import CarouselItem from "../carouselItem/CarouselItem";
import experienceData from "@/app/data/experienceData";
import carouselItemStyles from "../carouselItem/CarouselItem.module.css";

/* Move this to "experienceData.js" */
const jobData = {
  aeon: {
    title: "Aeon Research",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["Dart", "Flutter", "Firebase", "Riverpod", "FFmpeg"],
    images: [
      {
        imagePath: "/carousel/tellers_dashboard.png", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/tellers_video_generation.png", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/tellers_article_generation.png", 
        imageClass: styles.landscape
      },
    ]
  },
  vix: {
    title: "Vix",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["React", "Typescript", "Next.js", "Styled Comp.", "Jest"],
    images: [
      {
        imagePath: "/carousel/vix_1.png", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/vix_2.png", 
        imageClass: styles.landscape
      },
      {
        imagePath: "/carousel/vix_3.png", 
        imageClass: styles.landscape
      },
    ]
  },
  granito: {
    title: "Granito",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["Dart", "Flutter", "MobX"],
    images: [
      {
        imagePath: "/carousel/granito_1.png", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/granito_2.png",
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/granito_3.png", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/granito_4.png", 
        imageClass: styles.portrait
      },
      {
        imagePath: "/carousel/granito_5.png", 
        imageClass: styles.portrait
      }
    ]
  },
  ibm: {
    title: "IBM",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: ["PL/SQL", "DataStage", "Bash", "SQL"],
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
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  const toggleDetails = useCallback((selectedElement) => {
    const [jobDetailsElement] = document.getElementsByClassName(styles.jobDetails); 
    const jobItems = document.getElementsByClassName(importedCarouselItemElement);

    for (let i=0; i < jobItems.length; i++) {
      if (selectedElement.target.id === jobItems[i].id && selectedElement.target.id !== expandedId) {
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

  const resetCarousel = useCallback((newFocusSize) => {
    const [carousel] = document.getElementsByClassName(styles.carousel);
    const [carouselFocus] = document.getElementsByClassName(styles.carouselFocus);

    if (!carousel || !carouselFocus) {
      return;
    }

    carousel.style.left = "0px";
    carouselFocus.style.width = newFocusSize + "px";

    changeFocusStyle(carousel.childNodes, 0);
    toggleRadio(0);
    setCurrentIndex(0);
  }, [])

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
    const distanceToLoad = currentIndex < indexToLoad ? (-distanceToTranslate) : distanceToTranslate;

    setCurrentIndex(indexToLoad);
    carousel.style.left = (currentLeftPosition + distanceToLoad) + "px";

    changeFocusStyle(carouselItems, indexToLoad);
  }, [currentIndex]);

  const changeJobsButtonStyle = useCallback(() => {
    const [jobs] = document.getElementsByClassName(styles.jobs);
    const jobsButons = document.getElementsByClassName(styles.jobsBtn);

    const jobsItemsLength = jobs.childNodes.length;

    const backwardsBtn = jobsButons[0];
    const forwardBtn = jobsButons[1];

    const hasLeft = currentJobIndex > 0 ? true : false;
    const hasRight = currentJobIndex < jobsItemsLength - 1 ? true : false;

    if(hasLeft && hasRight) {
      backwardsBtn.style.opacity = "1";
      forwardBtn.style.opacity = "1";
    }

    if(!hasLeft && hasRight) {
      backwardsBtn.style.opacity = "0";
      forwardBtn.style.opacity = "1";
    }

    if(hasLeft && !hasRight) {
      backwardsBtn.style.opacity = "1";
      forwardBtn.style.opacity = "0";
    }

  }, [currentJobIndex]);

  const moveJobsToIndex = (indexToLoad) => {
    const [jobs] = document.getElementsByClassName(styles.jobs);
    const jobsItemsQuantity = jobs.childNodes.length;


    if(indexToLoad + 1 > jobsItemsQuantity) {
      return;
    }
    if(indexToLoad < 0) {
      return;
    }

    const distance = getDistanceToTranslateJobs();
    moveJobs(indexToLoad, distance);
  }

  const getDistanceToTranslateJobs = useCallback(() => {
    const [jobs] = document.getElementsByClassName(styles.jobs);
    const jobsItems = [...jobs.childNodes];

    const jobsItemsWidths = jobsItems.map(jobItem => {
      const jobItemStyle = getComputedStyle(jobItem);
      const jobItemWidth = parseInt(jobItemStyle.width.slice(0, -2));
      return jobItemWidth;
    });

    let distance = 0;

    distance = jobsItemsWidths[0] + 16 /* 1rem from gap*/;
    return distance;

  }, []);

  const moveJobs = useCallback((indexToLoad, distanceToTranslate) => {
    const [jobs] = document.getElementsByClassName(styles.jobs);
    const jobsStyle = getComputedStyle(jobs);
    const currentLeftPosition = parseInt(jobsStyle.left.slice(0, -2));
    
    if (currentJobIndex === indexToLoad) {
      return;
    }
    const distanceToLoad = currentJobIndex < indexToLoad ? (-distanceToTranslate) : distanceToTranslate;
    setCurrentJobIndex(indexToLoad);
    jobs.style.left = (currentLeftPosition + distanceToLoad) + "px";
  }, [currentJobIndex]);

  useEffect(() => {
    const [landscape] = document.getElementsByClassName(styles.landscape);
    const landscapeWidth = landscape === undefined ? 700 : parseInt(getComputedStyle(landscape).width.slice(0, -2));

    if (jobData[expandedId]?.images?.[0].imageClass === styles.portrait) {
      resetCarousel(250);
      return;
    }
    resetCarousel(landscapeWidth);
  }, [expandedId, resetCarousel]);

  useEffect(() => {
    changeJobsButtonStyle();
  }, [currentJobIndex, changeJobsButtonStyle]);

  
  const [carouselLength, setCarouselLength] = useState();
  useEffect(() => {
    setCarouselLength(document.getElementsByClassName(styles.carousel)[0]?.childNodes.length);
  }, [carouselLength, expandedId]);

  return (
    <section id={styles.experience}>
      <h1 className={styles.title}>Experience</h1>
      <div className={styles.divider}></div>
      <h3 className={styles.description} >{"Here is a brief description of the work I've been involved with throughout the last few years."}</h3>
      <div className={styles.jobsWrapper}>
        <button className={styles.jobsBtn} onClick={() => moveJobsToIndex(currentJobIndex - 1)}>&#8592;</button>
        <div className={styles.jobsFocus}>
          <div className={styles.jobs}>
              {experienceData.map((experienceItem) => (
                <CarouselItem key={experienceItem.id} onClick={toggleDetails} data={experienceItem} />
              ))}
          </div>
        </div>
        <button className={styles.jobsBtn} onClick={() =>moveJobsToIndex(currentJobIndex + 1)}>&#8594;</button>
      </div>
      <div className={styles.jobDetails} id="jobDetails">
      {jobData[expandedId] && jobData[expandedId].images  && <div className={styles.carouselWrapper}>
          <button className={styles.carouselBtn} onClick={() => moveToPositionFromIndex(currentIndex - 1)}>&#8592;</button>
          <div className={styles.carouselFocus}>
            <div className={styles.carousel}>
                {jobData[expandedId] && jobData[expandedId].images.map((image, index) => {
                  return (
                    <div className={styles.imageBackground} key={index}>
                      <Image className={`${image.imageClass} ${index !== 0 ? styles.opaque : ""}`} src={image.imagePath} width={1000} height={1000} alt="Brackground Image"></Image>
                    </div>
                  );
                })}
            </div>
          </div> 
          <button className={styles.carouselBtn} onClick={() => moveToPositionFromIndex(currentIndex + 1)}>&#8594;</button>
        </div>}
        <div className={styles.radioWrapper}>
          {new Array(carouselLength || 4).fill(0).map((_, index) => {
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