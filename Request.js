import Data from "./Data.js";
import axios from "axios";

let request = axios.create({
    withCredentials:true
})
request.interceptors.response.use((config)=>{
    return config;
},async(error)=>{
    try {
        let OrignalConfig = error.config;
        console.log("error request")
        if ( error.response.status === 500 && error.config && ! error.config._isRetry) {
            OrignalConfig._isRetry = true;
            console.log("401")
            let session_token = localStorage.getItem('token');
            let {access_token,refresh_token} = (await axios.get(Data.ADDRESS_SERVER+'/token/get_access_token?session_token=' + session_token)).data;
            if (access_token === "none" || !access_token || !refresh_token || refresh_token === "none") {
                throw new Error("Can't get token");
            }

            let response_refresh = await axios.post(Data.Auth_Address + '/user/refresh', {
                refresh_token: refresh_token
            });

            if (!response_refresh) {
                throw new Error("Can't refresh token");
            }

            let response = await axios.put(Data.ADDRESS_SERVER + "/token/link_token",
                {
                    "access_token": response_refresh.data.access_token,
                    "refresh_token": response_refresh.data.refresh_token,
                    "session_token": session_token
                }
            );
            return await axios.request(OrignalConfig)
        }
    }
    catch (e) {
        console.log(e)
    }
})

export default new class Request {
    Link = Data.ADDRESS_SERVER;

    async post(url, data={}, headers = {},){
        try{
            if(localStorage.getItem('token')){
                headers.session_token = localStorage.getItem('token')
            }
            let response = await request.post(this.Link + '/' + url, data,{headers, withCredentials:true})
            return response;
        }catch (e){

        }
    }

    async put(url, data={}, headers = {},){
        try{
            if(localStorage.getItem('token')){
                headers.session_token = localStorage.getItem('token')
            }
            let response = await request.put(this.Link + '/' + url, data,{headers, withCredentials:true})
            return response;
        }catch (e){
        }
    }
    async get(url, headers = {}){
        try{

            if(localStorage.getItem('token')){
                headers.session_token = localStorage.getItem('token')
            }

            let response = await request.get(this.Link + '/' + url,{headers:headers, withCredentials:true});

            return response;

        }catch (e){
            console.log(e)
        }
    }

}