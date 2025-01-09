import styles from "../../../../styles/components/test/tasks/Test/test_det/Variants.module.css"
import {useEffect, useState} from "react";


const Variants = ({fn,state, amount,ida,text, idaa,Answer}) => {

    useEffect(()=>{

            document.getElementById("CheckBoxVariant" + ida + "_" + idaa).checked = (Answer[idaa] === ida);
    },[Answer]);


    return (
        <label className={styles.label}>
        <div  className={ amount !== ida ? styles.Variants : styles.Variants_end}>

            <input id={"CheckBoxVariant" + ida + "_" + idaa} className={styles.check_box} defaultChecked={state } onClick={(e) => fn(ida)} type={"checkbox"}  />
            <span className={styles.checkmark}>
                <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={styles.yes_line} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
            </span>
            <div className={styles.right_div}>
                <div className={styles.title}>
                    <p className={styles.title_text}>{text}</p>
                </div>

            </div>
        </div>
        </label>
    );
};

export default Variants;