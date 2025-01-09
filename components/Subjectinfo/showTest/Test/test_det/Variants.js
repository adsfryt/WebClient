import styles from "../../../../../styles/components/test/tasks/Test/test_det/Variants.module.css"
import {useEffect, useState} from "react";


const Variants = ({state, amount,ida,text, idaa,Answer}) => {

    useEffect(()=>{

         console.log(Answer)
    },[]);


    return (
        <label className={styles.label}>
        <div  className={ amount !== ida ? styles.Variants : styles.Variants_end}>

            <input  disabled={"disabled"} id={"CheckBoxTest" + ida + "_" + idaa} className={styles.check_box} defaultChecked={state }  type={"checkbox"}  />
            <span className={styles.checkmark}>
                <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={[styles.yes_line, Answer === ida ? styles.yes_line_true : ""].join(" ") } points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
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