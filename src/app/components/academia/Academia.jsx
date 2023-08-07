import styles from './Academia.module.css';
import { useState, useCallback} from "react";
import AcademiaItem from "../academiaItem/AcademiaItem";
import academiaData from "@/app/data/academiaData";
import academiaItemStyles from "../academiaItem/AcademiaItem.module.css";

const academicData = {
  saclay: {
    title: "Saclay",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: [],
  },
  telecom: {
    title: "Telecom",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: [],
  },
  usp: {
    title: "USP",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    labels: [],
  }
};

const importedAcademialItemElement = academiaItemStyles.academiaItem;

function Academia() {
  const [expandedId, setExpandedId] = useState("");

  const toggleDetails = useCallback((selectedElement) => {
    const [instituitionDetailsElement] = document.getElementsByClassName(styles.institutionDetails); 
    const institutionItems = document.getElementsByClassName(importedAcademialItemElement);
    for(let i=0; i<institutionItems.length; i++) {
      if(selectedElement.target.id === institutionItems[i].id && selectedElement.target.id !== expandedId) {
        institutionItems[i].style.backgroundColor = "var(--periglacial-blue)";
        institutionItems[i].style.color = "var(--mid-gray)";
        institutionItems[i].style.border = "2px solid var(--pale-teal)";
        continue;
      }
      institutionItems[i].style.backgroundColor = "";
      institutionItems[i].style.color = "";
      institutionItems[i].style.border = "2px solid var(--mid-gray)";
    }

    if (expandedId !== selectedElement.target.id) {
      instituitionDetailsElement.style.transform = "scaleY(1)";
      instituitionDetailsElement.style.height = "auto";
      setExpandedId(selectedElement.target.id);
    }

    if (expandedId === selectedElement.target.id) {
      instituitionDetailsElement.style.transform = "scaleY(0)";
      instituitionDetailsElement.style.height = "0px";
      setExpandedId("");
    }
  }, [expandedId]);

  return (
    <section id={styles.academia}>
      <h1 className={styles.title}>Academia</h1>
      <div className={styles.divider}></div>
      <h3 className={styles.description} >{"Here is a brief description of the work I've been involved with throughout the last few years."}</h3>
      <div className={styles.institutions}>
        {academiaData.map((academiaItem) => (
          <AcademiaItem key={academiaItem.id} onClick={toggleDetails} data={academiaItem} />
        ))}
      </div>
      <div className={styles.institutionDetails}>
        <div className={styles.detailsText}>
          <h1>{academicData[expandedId] && academicData[expandedId].title}</h1>
          <p>{academicData[expandedId] && academicData[expandedId].desc}</p>
        </div>
        <div className={styles.labelsWrapper}>
          {academicData[expandedId] && academicData[expandedId].labels.map((label, index) => {
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

export default Academia;