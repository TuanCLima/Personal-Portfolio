import Image from "next/image";
import styles from "./ImageWithModal.module.css";
import stylesExp from "./Experience.module.css";
import { Modal } from "@mui/material";
import { useState } from "react";


function ImageWithModal ({ image, isNotOpaque }) {
    const [open, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <Image onClick={handleOpen} className={`${image.imageClass} ${!isNotOpaque ? styles.opaque : ""}`} src={image.imagePath} width={1000} height={1000} alt="Brackground Image"></Image>
            <Modal
                className={styles.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={`${styles.modalContainer} ${(image.imageClass === stylesExp.portrait ? styles.portraitWidth : '')}`}>
                    <div onClick={() => setIsOpen(false)} className={styles.closeBtn}>X</div>
                    <Image className={`${image.imageClass} ${styles.modalChild} ${(image.imageClass === stylesExp.portrait ? styles.portraitWidth : '')}  ${!isNotOpaque ? styles.opaque : ""}`} src={image.imagePath} width={1000} height={1000} alt="Brackground Image"></Image>
                </div>
            </Modal>
        </>
    );
}

export default ImageWithModal;
