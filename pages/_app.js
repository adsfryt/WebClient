import  '../styles/Global.css';
import { useRouter } from 'next/router';
//import Loader from '../components/Loader';
import React, {useContext, useEffect, useState} from 'react';
//import auth from "../components/auth";
import {observer} from "mobx-react-lite";
import {Context} from "../Context";
import axios from "axios";
import {cookies} from "next/headers";
import Request from "../Request";
function MyApp({ Component, pageProps }) {

    const router = useRouter();
    const [loading, setLoading] =  React.useState(false);


    let [CommonData , setCommonData] = useState({
        auth:-1,
        firstName:"",
        userId:"",
        lastName:"",
        patronymic:"",
        email:"",
        login:"",
        method:"",
        code:"",
        role:-1,
        listSubjects:[]
    });
    async function getData(){
        var token = localStorage.getItem('token');
        if (token) {
        try {
                let response = await Request.get("user/get_data");

                if(response?.data?.activate === false){
                    setCommonData(prevUser => ({
                        ...prevUser, activate:false
                    }));
                    return;
                }
                if (!response) {
                    setCommonData(prevUser => ({...prevUser, auth: 0}));

                    return;
                }
                setCommonData(prevUser => ({
                    ...prevUser, auth: 1, firstName: response.data.firstName,
                    userId: response.data.userId,
                    lastName: response.data.lastName,
                    patronymic: response.data.patronymic,
                    email: response.data.email,
                    login: response.data.login,
                    method: response.data.method,
                    role: response.data.role,
                }));

            let response_subjects = await Request.post('subject/get_data');
            if(response_subjects){
                setCommonData(prevUser => ({...prevUser, listSubjects: response_subjects.data}));
            }


        }catch (e){
            setCommonData(prevUser => ({...prevUser, auth: 0}));
        }
        } else {
            setCommonData(prevUser => ({...prevUser, auth: 0}));
        }
    }

    useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
        const handleRouteChange = (url) => {
            setLoading(true);
        };

        const handleRouteChangeComplete = () => {
            setLoading(false);
        };
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
    });

    //return <> {loading ? <Loader /> :<Component {...pageProps} />}</>
    return <Context.Provider value={[CommonData,  setCommonData]}> <Component {...pageProps} /></Context.Provider>
}
export default  observer(MyApp);