import React from 'react';
import ButtonH from "../../common/ButtonH";
import Request from "../../../Request";
import Yandex from "../../../pages/linkreg/yandex";

const GitHub = () => {
    let link= "";


    async function OpenLink(){
        try {
            let response = await Request.get("user/link_registration?type=github");
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

export default GitHub;

GitHub.getInitialProps = async ({ query }) => {
    const {code} = query
    return {code}
}

//здесь запрос на получение ссылки