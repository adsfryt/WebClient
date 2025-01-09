import React, {useContext, useEffect, useState} from 'react';
import ErrorStyles from "../../../styles/Error.module.css";
import styles from "../../../styles/components/Index/Components/Subject.module.css";
import Block from "./SubjectComponent/Block";
import Input from "../../common/Input";
import Request from "../../../Request";
import {Context} from "../../../Context";
import Data from "../../../Data";

const AllSubjects = () => {
    let [error, setError] = useState("");
    var [Subjects, SetSubjects] = useState([]);
    let [CommonData , setCommonData] = useContext(Context);
    async function getData(){
        try {
            let response = await Request.post("subject/get_all",);
            if (!response) {
                setError("База данных тупит! Перезагрузите сайт");
                return;
            }
            SetSubjects(response.data);

        }catch (e) {

        }
    }

    useEffect(()=>{
        getData();
    },[])

    async function setUser(subject){
        try {
            let response = await Request.post("subject/add_user_self",{ subjectId:subject});
            if(!response){
                setError("Ошибка!!! Это действие невозможно")
                return;
            }
            window.open(Data.ADDRESS_SITE, "_self");
        }catch (e) {

        }
    }
    async function deleteUser(subject){
        try {
            let response = await Request.post("subject/delete_user_self",{ subjectId:subject});
            if(!response){
                setError("Ошибка!!! Это действие невозможно")
                return;
            }
            window.open(Data.ADDRESS_SITE, "_self");
        }catch (e) {

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
            <div className={styles.Main}>
                <div className={styles.Main_in}>
                    <div className={styles.List}>
                        {
                            Subjects?.map((key)=>
                                <>
                                    <Block AddUser={setUser} DeleteUser={deleteUser} type={"all"} data={key}/>
                                </>
                            )
                        }
                    </div>


                </div>
            </div>
        </>
    );
};

export default AllSubjects;