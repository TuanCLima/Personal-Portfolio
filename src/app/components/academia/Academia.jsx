import styles from './Academia.module.css';
import { useState, useCallback} from "react";
import AcademiaItem from "../academiaItem/AcademiaItem";
import academiaData from "@/app/data/academiaData";
import academiaItemStyles from "../academiaItem/AcademiaItem.module.css";

const academicData = {
  saclay: {
    title: "Saclay",
    desc: "At Paris-Saclay, I got my Master’s degree on multimedia networking, meaning a Master's focused on the transport of larges amount of multimedia data over the network with very demanding constraints of reliability and latency. Study subjects important here were data compression, network performance, information theory and programming.",
    labels: ["CDNs (arch. and caching)", 'DRM', "Audio/Video Transport", "Information Theory", "Cryptography", "Data Compression (MPEG-X, H.26X)", "Adaptive Streaming (DASH, HLS, ABR)"],
  },
  telecom: {
    title: "Telecom",
    desc: "At Telecom, I graduated as a telecom engineer, specializing in computer networks. Here, I had the opportunity to deepen my knowledge of computer networks, as well as study new interesting things like information theory, computer programming and optimization theory.",
    labels: ["IP Networks", "Cellular Networks (2-4 G)", "Signaling and Multimedia", "Internet Application", "Telephony", "Digital Communications", "Source Coding", "Optimization"],
  },
  usp: {
    title: "USP",
    desc: "At the University of São Paulo (USP), I graduated as a telecommunications engineer. Here, besides having a strong mathematical background, I studied things like computer networks, computer processors, electronics etc.",
    labels: ["Digital Systems", "Fiber Optics", "Computer Organization", "Microprocessors", "Digital Processing", "Control Principles", "Wireless Communications"],
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
      <h3 className={styles.description} >{"Here is a brief description of my academic background."}</h3>
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
        <div className={styles.scrollArea}>
        <div className={styles.labelsWrapper}>
          {academicData[expandedId] && academicData[expandedId].labels.map((label, index) => {
            if (index < academicData[expandedId].labels.length / 2) {
              return ;
            }
            return (
              <div className={styles.label} key={index}>
                <h2>{label}</h2>
              </div>
            );
          })}
        </div>
        <div className={styles.labelsWrapper}>
          {academicData[expandedId] && academicData[expandedId].labels.map((label, index) => {
            if (index >= academicData[expandedId].labels.length / 2) {
              return;
            }
            return (
              <div className={styles.label} key={index}>
                <h2>{label}</h2>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}

export default Academia;