import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import axios from "axios";
import Request from "../../Request";
import Data from "../../Data";
import Activate from "../../components/Login/Parts/Activate";
import {Context} from "../../Context";
const Yandex = ({code}) => {
    const {push} = useRouter();
    let [CommonData , setCommonData] = useContext(Context);
    let [error, setError] = useState("");
    async function sendYandex(){
        try {
            let token = localStorage.getItem('token');
            let response = await Request.post('user/registration',
               {
                    "type":"yandex",
                    "code": code,
                }
            );
            if (!response?.status) {
                setError("Something happen");
                return;
            }
            localStorage.setItem("token", response.data.session_token);
            window.open(Data.ADDRESS_SITE, "_self");
        }catch(e){

        }
    }

    useEffect(() => {
        sendYandex();

    }, []);

    useEffect(() => {
        console.log(CommonData.activate)
        if(CommonData.activate === false){
            window.open(Data.ADDRESS_SITE, "_self");
        }
    }, [CommonData]);

    return (
        <div>

        </div>
    );
};

export default Yandex;

Yandex.getInitialProps = async ({ query }) => {
    const {code} = query
    return {code}
}
