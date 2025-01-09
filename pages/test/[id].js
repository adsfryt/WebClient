import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context";
import Data from "../../Data";
import Request from "../../Request";
import styles from "../../styles/components/test/Test.module.css";
import Title from "../../components/common/Title";
import ListTests from "../../components/Subjectinfo/ListTests";
import ButtonH from "../../components/common/ButtonH";
import {useRouter} from "next/navigation";
import Block from "../../components/Index/Components/SubjectComponent/Block";
import BlockAttempts from "../../components/common/BlockAttempts";
import ErrorStyles from "../../styles/Error.module.css";

const Test = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [Test, setTest] = useState({});
    let [ActiveAttemptId, setActiveAttemptId] = useState(-2);
    let [Attempts, setAttempts] = useState([]);
    let [error, setError] = useState("");
    let [ok, setOk] = useState("");


    const {push} = useRouter();
    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role !== 0) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

    async function getData(){
        try {
            let response_test = await Request.post('test/get_data',{subjectId:parseInt( id.split("_")[0] ), testId:parseInt(id.split("_")[1]) });
            if(response_test){
                setTest(response_test.data)
            }else{
                setError("Ошибка!!! Данные загрузить не удалось")
            }

            let response_active_attempt = await Request.post('test/get_active_attempt',{ testId:parseInt(id.split("_")[1]) });
            if(response_active_attempt){
                setActiveAttemptId(response_active_attempt.data.attemptId);
            }else{
                setError("Ошибка!!! Данные загрузить не удалось")
                setActiveAttemptId(-3);
            }

            let response_attempts = await Request.post('test/get_attempts',{testId:parseInt(id.split("_")[1])});
            if(response_attempts){
                setAttempts(response_attempts.data)
            }else{
                setError("Ошибка!!! Данные загрузить не удалось")
            }


        }catch (e) {
        }
    }

    async function startTest(){
        try {
            if(ActiveAttemptId === -1) {
                let response_test = await Request.post('test/start_test', {
                    subjectId: parseInt(id.split("_")[0]),
                    testId: parseInt(id.split("_")[1])
                });
                if (response_test) {
                    push("/test/task/" + response_test.data.attemptId)
                } else {
                    setError("Ошибка!!! Начать тест не удалось")
                }
            }else if(ActiveAttemptId  !== -2  && ActiveAttemptId  !== -3) {
                push("/test/task/" + ActiveAttemptId)
            }
        }catch (e) {

        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (ok !== "") {
            document.getElementById("ok").animate(
                [
                    {"display": "block"},
                    {"display": "none"}
                ],
                {
                    duration: 3000,
                }
            ).play();
            setTimeout(()=>{
                setOk("");
            },3000)
        }

    }, [ok]);

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
            <div id={"ok"} className={ErrorStyles.ok}><p className={ErrorStyles.errorText}>{ok}</p></div>
            <Title name={Test.name}/>
            <div className={styles.Main}>
                <div className={styles.Main_in}>
                    <div className={styles.description}>
                        <p className={styles.title}>Описание:</p>
                        {Test.description}
                        <p className={styles.title}>Автор:</p>
                        {Test.userId}
                        <p className={styles.title}>{Test.activate ? "Тест Активен" : "Тест не Активен"}</p>
                    </div>
                    <div className={styles.module}>
                        <p className={styles.title}>Попытки:</p>
                        <ButtonH
                            title={ActiveAttemptId === -1 ? "Начать попытку" : ActiveAttemptId >= 0 ? "Продолжить попытку" : ActiveAttemptId === -2 ? "Загрузка..." : "Ошибка загрузки"}
                            action={startTest}/>
                    </div>
                    {
                        Attempts?.map((key) => (
                            <BlockAttempts key={id} data={key}/>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export default Test;

export async function getServerSideProps({params}) {

    return ({
        props: {id: params.id},
    })
}