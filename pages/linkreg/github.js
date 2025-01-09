import React, {useContext, useEffect, useState} from 'react';
import Data from "../../Data";
import {Context} from "../../Context";
import Request from "../../Request";
import GitHub from "../../components/Login/Parts/GitHub";

const Github = ({code}) => {

    let [CommonData , setCommonData] = useContext(Context);
    let [error, setError] = useState("");
    async function sendGithub(){
        try {
            let response = await Request.post('user/registration',
                {
                    "type":"github",
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
        sendGithub();

    }, []);

    useEffect(() => {
        console.log(CommonData.activate)
        if(CommonData.activate === false){
            window.open(Data.ADDRESS_SITE, "_self");
        }
    }, [CommonData]);
    return (
        <div>
            {error}
        </div>
    );
};

export default Github;

Github.getInitialProps = async ({ query }) => {
    const {code} = query
    return {code}
}