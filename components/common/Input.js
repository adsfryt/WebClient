import React, {useEffect} from 'react';
import styles from "../../styles/components/common/Input.module.css"
const Input = ({props,setText,initValue,id,style}) => {

    useEffect(() => {
        document.getElementById("Input" + id).value = initValue;
    }, []);
    return (
        <div className={styles.Main}>
            <input id={"Input" + id} type={"text"} className={[styles.Input, style === "width" ? styles.Input_width : ""].join(" ") } onChange={(e)=>{setText(e.target.value)}} required/>
            <label className={[ style === "width" ? styles.Label_width : styles.Label].join(" ")} for={""}>{props}</label>
        </div>

    );
};

export default Input;