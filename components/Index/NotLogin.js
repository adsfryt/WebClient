import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import styles from '../../styles/components/Index/NotLogin.module.css'
import Image from 'next/image'
import gihub_icon from "../../media/images/icons/github.png"
import yandex_icon from "../../media/images/icons/yandex.png"
import axios from "axios";
import Data from "../../Data";
const NotLogin = () => {
    const { push} = useRouter();
    function GoLink(type){
        push('/login?type='+type);
    }

    return (
        <div className={styles.Main}>

            <div className={styles.List}>
                <div className={styles.List_in}>
                    <p className={styles.TextO}>Вы не авторизованы. Пожалуйста, войдите в систему используя один из ниже
                        перчисленных способов:</p>
                    <div className={styles.List_inner}>
                        <div className={styles.Button} onClick={() => {
                            GoLink("github")
                        }}>
                            <Image className={styles.Image}
                                   src={gihub_icon}
                                   alt=""
                            />
                            <p className={styles.Text}>GitHub</p>
                        </div>
                        <div className={styles.Button} onClick={() => {
                            GoLink("yandex")
                        }}>

                            <Image className={styles.Image}
                                   src={yandex_icon}
                                   alt=""
                            />
                            <p className={styles.Text}>Яндекс ID</p>
                        </div>
                        <div className={styles.ButtonF} onClick={() => {
                            GoLink("code")
                        }}>
                            <p className={styles.TextH}>CODE</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotLogin;