import React, {useEffect, useState} from 'react';
import Input from "../../common/Input";
import ButtonH from "../../common/ButtonH";
import Request from "../../../Request";

const Yandex = () => {
    let link= "";


    async function OpenLink(){
        try {
            var token = localStorage.getItem('token');
            let response = await Request.get("user/link_registration?type=yandex");
            if (response?.status) {
                link = response.data.link;
            }
            window.open(link, "_self");
        }catch (e){

        }
    }


    return (
        <div>
            <ButtonH title={"Перейти по ссылке"} action={OpenLink} />
        </div>
    );
};

export default Yandex;