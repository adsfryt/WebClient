import React from 'react';
import styles from "../../styles/components/common/ButtonH.module.css";

const ButtonC = ({title,action,style}) => {
    return (
        <div onClick={() => {
            action()
        }} className={styles.btn}>
            <div className={styles.btn_div}></div>
            <div className={styles.text_div}>
                <p className={styles.text}>{title}</p>
            </div>
        </div>
    );
};

export default ButtonC;