import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/components/subjectinfo/Components/AddUsers.module.css"
import {useRouter} from "next/router";
import Input from "../common/Input";
import ButtonC from "../common/ButtonC";
import ButtonH from "../common/ButtonH";
import Request from "../../Request";
import {Context} from "../../Context";
import Cross from "../common/Cross";
const AddUsers = ({id,usersId,setData, setError, data,userId,setOk}) => {
    const router = useRouter();
    let [userid, setUserid] = useState("");
    let [CommonData , setCommonData] = useContext(Context);

    async function setUser(){
        try {
            let item = userid;
            if(userid.length < 5 || userid.length > 50){
                setError("Ошибка!!! Длина userId должна быть >5 и <50.")
                return;
            }
            let response = await Request.post("subject/add_user",{userId:userid, subjectId:id});
            if(!response){
                setError("Ошибка!!!Пользователь не найден или это действие невозможно")
                return;
            }
            setOk("Пользователь добавлен")
            setData(prevUser => ({ ...prevUser, usersId:[...usersId, item] }) );
        }catch (e) {

        }
    }

    async function deleteUser(item){
        try {
            let response = await Request.post("subject/delete_user",{userId:item, subjectId:id});
            if(!response){
                setError("Ошибка!!!Пользователь не найден или это действие невозможно")
                return;
            }
            setOk("Пользователь удален из предмета")
            let TData = {...data};
            for (let i = 0; i < TData.usersId.length; i++) {
                if(TData.usersId[i] === item){
                    TData.usersId.splice(i,1);
                }
            }
            setData(TData);
        }catch (e) {

        }
    }
    return (
        <>
        <div className={styles.Main}>
            {
                usersId?.map((key) => (
                    <div className={styles.Block_out}>
                        <div key={id} className={styles.Block} onClick={()=>{router.push("/user/" + key)}}>{key}</div>
                        <div></div>
                        <Cross fn={() =>{deleteUser(key)}}/>
                    </div>
                ))
            }
            {
                userId?.map((key) => (
                    <div className={styles.Block_out_main}>
                    <div key={id} className={styles.Block} onClick={()=>{router.push("/user/" + key)}}>{key}</div>
                    </div>
                ))
            }

        </div>
            <Input initValue={""} id={1} props={"Добавить участника(userId)"} setText={setUserid}/>

            <ButtonH title={"Добавить"} action={setUser} />
        </>
    );
};

export default AddUsers;