import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/components/subjectinfo/Components/AddUsers.module.css";
import {useRouter} from "next/router";
import Cross from "../common/Cross";
import {Context} from "../../Context";

const ListTests = ({ido,Tests,url,type}) => {
    let [CommonData , setCommonData] = useContext(Context);
    const router = useRouter();
    return (
        <div className={styles.Main}>
            {
                Tests?.map((key, id) => (
                    <div onClick={() => {
                        router.push(url === "/test/" ? (url + ido + "_" + key.id) : (url  + key.id) )
                    }} className={styles.Block_out_cross}>
                        <div key={id} className={styles.Block} >{key.name}</div>
                    </div>
                    )
                )
            }
    </div>
    );
};

export default ListTests;