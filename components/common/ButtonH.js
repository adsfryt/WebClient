import React, {useEffect} from 'react';
import styles from "../../styles/components/common/ButtonH.module.css";

const ButtonH = ({title,action,style}) => {

    return (
        <div className={style === 'red' ? styles.rButton : style === 'big' ? styles.bButton : styles.Button }
             onClick={()=>{action()}} >
            <p className={style === 'red' ? styles.rText : style === 'big' ? styles.bText : styles.Text}>{title}</p>
        </div>
    );

};

export default ButtonH;