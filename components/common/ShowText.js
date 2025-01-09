import React, {useEffect} from 'react';
import styles from "../../styles/components/common/Input.module.css";

const ShowText = ({props,initValue,style}) => {

    return (
        <div className={styles.Main}>
            <div className={styles.ShowText_Input} ><p className={styles.ShowText_Text}>{initValue}</p></div>
            <label className={styles.ShowText_Label } htmlFor={""}>{props}</label>
        </div>
    );
};

export default ShowText;