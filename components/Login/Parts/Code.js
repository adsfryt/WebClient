import React, {useEffect, useState} from 'react';
import styles from "../../../styles/components/Index/NotLogin.module.css";
import Input from "../../common/Input";
import ButtonH from "../../common/ButtonH";
import Request from "../../../Request";
import Data from "../../../Data";
import styleMain from "../../../styles/components/login/parts/Code.module.css"
import ErrorStyles from "../../../styles/Error.module.css";
const Code = () => {
    let [code, setCode] = useState('');
    let [error, setError] = useState('');
    async function SendCode(){
        try {
            let response = await Request.post("user/submit_code",{code});
            if (response) {
                window.open(Data.ADDRESS_SITE, "_self");
            }else{
                setError("invalid code")
            }
        }catch (e){

        }
    }


    useEffect(() => {
        if (error !== "") {
            document.getElementById("error").animate(
                [
                    {"display": "block"},
                    {"display": "none"}
                ],
                {
                    duration: 3000,
                }
            ).play();
            setTimeout(()=>{
                setError("");
            },3000)
        }

    }, [error]);


    return (
        <>
            <div id={"error"} className={ErrorStyles.error}><p className={ErrorStyles.errorText}>{error}</p></div>
            <div className={styles.Code_Main}>
                <div className={styles.Code_Segment}>
                    <p className={styles.TextO}>Авторизироваться</p>
                    <Input props={"Код"} setText={setCode} initValue={""}/>
                    <div className={styleMain.Button_Out}>
                        <ButtonH title={"Войти"} action={SendCode} style={'big'}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Code;