import React, {useState} from 'react';
import stylesLogin from "../../../styles/components/Index/NotLogin.module.css";
import List from "../../common/List";
import ButtonH from "../../common/ButtonH";
import styles from "../../../styles/components/login/parts/Activate.module.css"
import Request from "../../../Request";
import Data from "../../../Data";
const Activate = () => {
    let [role,setRole] = useState("студент");
    let list = ["студент","преподаватель" ];
    let [error, setError] = useState("");

    async function SendRole(){
        try {
            let rolee;
            switch (role){
                case "студент":{
                    rolee = "student";
                    break;
                }
                case "преподаватель":{
                    rolee = "teacher";
                    break;
                }
                default:{
                    setError("invalid role")
                    break;
                }
            }
            let response = await Request.post('user/submit_role',{role:rolee});
            if(response.status){
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }catch (e){

        }
    }
    return (
        <div className={stylesLogin.Main}>
            <div className={stylesLogin.List}>
                <div className={styles.Main}>
                <ButtonH style={"big"} title={"Подтвердить"} action={SendRole}/>
                    <div className={styles.List}>
                <List id={1} setOption={setRole} option={role} list={list}/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Activate;