import React, {useContext, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation'
import styles from "../styles/components/Index/NotLogin.module.css";
import Input from "../components/common/Input";
import Code from "../components/Login/Parts/Code";
import Yandex from "../components/Login/Parts/Yandex";
import GitHub from "../components/Login/Parts/GitHub";
import Request from "../Request";
import axios from "axios";
import Data from "../Data";
import {Context} from "../Context";
const Login = ({type}) => {
    const {push} = useRouter();
    let [CommonData , setCommonData] = useContext(Context);
    const router = useRouter()
    async function getSessionToken(){
        try {

            var token = localStorage.getItem('token');
            if(!token) {

                let response = await Request.post("token/create_token");
                localStorage.setItem("token", response.data.session_token);

            }else{

                let is_token_valid = await Request.get("user/get_data");
                let is_token_exist = await Request.get("token/get_access_token");

                if(is_token_valid){
                    push('/');
                }else {

                    if( is_token_exist.data.access_token === null) {

                        let response = await Request.post("token/create_token");
                        localStorage.setItem("token", response.data.session_token);
                    }else if(is_token_exist.data.access_token === "none") {

                    }else {
                        let response = await Request.put("token/link_token",
                            {
                                "access_token": "none",
                                "refresh_token":"none",
                                "session_token": token
                            }
                        );
                    }

                }
            }

        }catch (e){

        }
    }


    useEffect(() => {
        if(!(type === 'code' || type === 'github' || type === 'yandex')) {
            push('/');
        }else{
            getSessionToken();
        }
    }, []);

    useEffect(() => {
        if(CommonData.activate === false){
            window.open(Data.ADDRESS_SITE, "_self");
        }
    }, [CommonData]);

    return (
        <div className={styles.Main}>
            <div className={styles.List}>

                {
                    type === 'code' ?
                        <Code/>
                        :
                    type === 'yandex' ?
                        <Yandex/>
                        :
                    type === 'github' ?
                        <GitHub/>
                        :
                        <>
                        </>
                }

            </div>
        </div>

    );
};

export default Login;


Login.getInitialProps = async ({ query }) => {
    const {type} = query

    return {type}
}
