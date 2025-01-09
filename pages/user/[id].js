import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context";
import Request from "../../Request";
import Data from "../../Data";

const User = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [data, setData] = useState({});

    async function getData(){
        try {
            let response_subject = await Request.get('user/get_public_data?userId='+id);
            if(response_subject){
                setData(response_subject.data)
            }
        }catch (e) {

        }
    }

    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role !== 1) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {
                JSON.stringify(data)
            }

        </>
    );
};

export default User;

export async function getServerSideProps({params}) {

    return({
        props: {id:params.id},
    })
}