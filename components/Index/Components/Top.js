import React, {useContext} from 'react';
import styles from "../../../styles/components/Index/Components/Top.module.css"
import {Context} from "../../../Context";
const Top = ({setPage}) => {
    let [CommonData , setCommonData] = useContext(Context);
    return (
        <div className={styles.Main}>

            <div className={styles.Button} onClick={() => {
                setPage('settings')
            }}>
                <p className={styles.Text}>Настройки</p>
            </div>
            <div className={styles.Button}>
                <p className={styles.Text} onClick={() => {
                    setPage('subjects')
                }}>Дисциплины</p>
            </div>
            {CommonData.role === 0 ?
                <div className={styles.Button}>
                    <p className={styles.Text} onClick={() => {
                        setPage('allsubjects')
                    }}>Все предметы</p>
                </div> : ""
            }
        </div>
    );
};

export default Top;