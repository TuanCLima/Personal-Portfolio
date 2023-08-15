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
    desc: "At Aeon Research, an AI French startup, I worked as a cross-platform (web and macOS) frontend developer. As a senior dev and temporarily tech lead of the fronend project, I helped develop a very modular, secure and clean architecture based app. Features implemented were a service that allowed the generation of ChatGPT-like texts for journalists based on user fed text prompts and a page that allowed the generation and smart edition of video based on text prompts.",
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
    desc: "I worked at VIX as a React frontend developer, helping build from scratch the streaming platform available at <a href='https://vix.com'>vix.com</a>. I worked on a subteam specialized on the video subrepo, where I concerned myself with features like player wrapping, dependency injection, and various player functionalities like play/pause, seek, full screen, close captioning, casting, analytics, advertising. <br/> <br/> Broadly, I've also helped to implement their subscription flow, as well as VIX's authentication and authorization processes.",
    labels: ["React", "Typescript", "Next.js", "Styled Comp.", "Jest", "GraphQL"],
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
    desc: "At Granito, a Brazilian startup of the financial sector, I worked as a mobile frontend developer, building along with two other devs the app available <a target='_blank' href='https://rb.gy/colsux'>here</a>. Within an agile based mindset and with the help of a design team, we built from scratch features like a transactions summary screen, login screen, transactions operations like division, transference and request of receipt, and other features like tap-on-phone (a very modern feature allowing the usage of a cellphone as a credit card).",
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
    desc: "At IBM, I worked on the backend side of a company department concerned with the payment of commissions to third party entities called Points-of-Sale. The data would come in as raw text and would be extracted, transformed and loaded (ETL) into the insights and information required to make the payments of associated businesses. <br/><br/> My tasks would involve the handling, validation and backup of remote in-server files, writing of SQL queries that matched the needs of the required data operation, designing of DataStage projects that put in practice all the business rules involved, and final validation of the results.",
    labels: ["PL/SQL", "DataStage", "Bash", "SQL"],
  }
};

const importedCarouselItemElement = carouselItemStyles.carouselItem;

const changeFocusStyle = (elementsList, indexToFocus) => {
  elementsList.forEach((carouselItemWrapper, index) => {

    const [carouselItem] = carouselItemWrapper.childNodes;

    carouselItem.classList?.add(styles.opaque);
    if (indexToFocus === index) {
      carouselItem.classList?.remove(styles.opaque);
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
        {carouselLength && <div className={styles.radioWrapper}>
          {new Array(carouselLength).fill(0).map((_, index) => {
            return <div className={`${styles.radio} ${index === 0 ? styles.selected : ""}`} onClick={() => moveToPositionFromIndex(index)} key={index}></div>}
          )}
        </div>}
        <div className={styles.detailsText}>
          <h1>{jobData[expandedId] && jobData[expandedId].title}</h1>
          <p dangerouslySetInnerHTML={{ __html: jobData[expandedId] && jobData[expandedId].desc}}></p>
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