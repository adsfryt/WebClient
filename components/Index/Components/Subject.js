import React, {useContext, useEffect, useState} from 'react';
import styles from "../../../styles/components/Index/Components/Subject.module.css";
import {Context} from "../../../Context";
import Block from "./SubjectComponent/Block";
import Input from "../../common/Input";
import Request from "../../../Request";
import ErrorStyles from "../../../styles/Error.module.css";

const Subject = () => {
    let [CommonData , setCommonData] = useContext(Context);
    var [Title, SetTitle] = useState("");
    var [Descr, SetDescr] = useState("");
    let [error, setError] = useState("");

    async function Send(){
        try {
            if(Title.length < 3 || Title.length > 50){
                setError("Ошибка!!! Длина названия должна быть >3 и <50 символов.")
                return;
            }
            if(Descr.length < 10 || Descr.length > 1000){
                setError("Ошибка!!! Длина описания должна быть >10 и <1000 символов.")
                return;
            }
            let body = {
                title: Title,
                description: Descr,
                testsId: [],
                usersId: []
            }
            let response = await Request.post("subject/add_subject", {data: body});
            if (!response) {
                setError("Создание дисциплины невозможно");
                return;
            }
            location.reload(true);
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
                    CommonData?.listSubjects?.map((key)=>
                        <>
                            <Block data={key}/>
                        </>
                    )
                }
                </div>
                { CommonData.role === 1 ?
                    <>
                        <p className={styles.title}>Создать дисциплину:</p>
                        <Input setText={SetTitle} initValue={""} id={"create-1"} props={"Название"}/>
                        <div className={styles.row_desc}>
                            <p className={styles.desc_text}>Описание</p>
                            <textarea onChange={(e) => SetDescr(e.target.value)} className={styles.textarea}/>
                        </div>
                        <div id={"button_add"} className={styles.add} onClick={Send}>
                            <div>
                                <p className={styles.add_text}>Создать дисциплину</p>
                            </div>
                        </div>
                    </>
                    :""
                }

            </div>
        </div>
        </>
    );
};

export default Subject;

