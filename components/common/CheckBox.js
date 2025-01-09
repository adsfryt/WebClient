import React, {useEffect} from 'react';
import styles from "../../styles/components/common/CheckBox.module.css";

const CheckBox = ({fn,state, ido}) => {


    return (
        <>
            <label className={styles.label} id={"CheckBox" + ido}>
                <input  id={"CheckBoxInput" + ido} className={styles.check_box} defaultChecked={state} onClick={fn} type={"checkbox"}  />
                <span className={styles.checkmark}>
                    <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={styles.yes_line} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
                </span>
            </label>
        </>
    );
};

export default CheckBox;