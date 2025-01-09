import React from 'react';
import styles from "../../styles/components/common/BlockAttempts.module.css"
import stylesBlock from "../../styles/components/Index/Components/SubjectComponents/Block.module.css"
import {useRouter} from "next/navigation";
const BlockAttempts = ({data}) => {
    let {push} = useRouter();
    return (
        <div className={styles.Main} onClick={() => {
            if(data.finished === true) {
                push("result/" + data.id )
            }

        }}>
            <div className={stylesBlock.top}></div>
            <div className={stylesBlock.title}>{"Id Попытки: " + data.id + (data.finished === true ? (" -- Закончена\n" + "Результат: " + data.result) : " -- Продолжается\n")}</div>
            <div className={stylesBlock.razd}></div>
            <div className={stylesBlock.description}>{"Нажмите для получения более подробной информации"}</div>
        </div>
    );
};

export default BlockAttempts;