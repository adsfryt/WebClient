import React, {useContext, useEffect, useState} from 'react';
import Data from "../../Data";
import {Context} from "../../Context";
import styles from "../../styles/components/test/Test.module.css";
import Title from "../../components/common/Title";
import Request from "../../Request";
import {useRouter} from "next/navigation";
import UpdateTest from "../../components/Subjectinfo/UpdateTest";
import ErrorStyles from "../../styles/Error.module.css";
import ButtonH from "../../components/common/ButtonH";

const TestInfo = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [Test, setTest] = useState({});
    let [Questions, setQuestions] = useState([]);
    let [Attempts, setAttempts] = useState([]);
    let [error, setError] = useState("");
    let [ok, setOk] = useState("");
    const {push} = useRouter();
    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role !== 1) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

    async function getData(){
        try {
            let response_test = await Request.post('test/get_full_data',{testId:id});
            if(response_test){
                setTest(response_test.data.data);
                let obj = {};
                for (let i = 0; i < response_test.data.attempts.length; i++) {
                    if(!obj[response_test.data.attempts[i].userId]){
                        obj[response_test.data.attempts[i].userId] = [];
                        obj[response_test.data.attempts[i].userId].push(response_test.data.attempts[i]);
                    }else{
                        obj[response_test.data.attempts[i].userId].push(response_test.data.attempts[i]);
                    }
                }
                console.log(obj)
                setAttempts(obj);
                setQuestions(response_test.data.questions);
            }else{
                setError("Ошибка!!! Получение данных невозможно. Перезагрузите сайт.")
                return;
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

    async function DeleteTest(){
        try {
            let response_question = await Request.post('test/delete_data',{ testId:id });
            if(!response_question){
                setError("Удаление невозможно. Попробуйте через некоторе время.")
                return;
            }

        }catch (e) {
        }
    }

    return (<>
            <div id={"error"} className={ErrorStyles.error}><p className={ErrorStyles.errorText}>{error}</p></div>
            <div id={"ok"} className={ErrorStyles.ok}><p className={ErrorStyles.errorText}>{ok}</p></div>

            <Title name={Test.name}/>
            <div className={styles.Main}>
                <div className={styles.Main_in}>
                    <p className={styles.title}>Автор:</p>
                    <p className={styles.text}>{Test.userId}</p>
                    <ButtonH title={"Удалить Тест"} style={"red"} action={() => {
                        DeleteTest()
                    }}/>
                    <p className={styles.title}>Все попытки:</p>
                    <div className={styles.MAttempts}>
                        {
                            Object.keys(Attempts).map((key) => (
                                <div className={styles.Card}>
                                    <p className={styles.TitleTable}>{key}</p>
                                    <div className={styles.Table}>
                                        <div className={styles.TopTable}><p className={styles.TextTableT}>id попытки</p>
                                            <p
                                                className={styles.TextTableT}>результат</p>
                                        </div>
                                        {
                                            Attempts[key].map((key1) => (
                                                <>
                                                    <div onClick={() => {
                                                        push("/test/result/" + key1.id)
                                                    }} className={styles.TopTable}><p
                                                        className={styles.TextTable}> {key1.id} </p> <p
                                                        className={styles.TextTable}> {key1.result} </p></div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <p className={styles.title}>Изменить тест:</p>
                    {Test.name ? <>
                            <UpdateTest setOk={setOk} attempts={Attempts} setError={setError} data={Test} questions={Questions}
                                        testId={id}/>
                        </>
                        : ""
                    }

                </div>
            </div>
        </>
    );
};

export default TestInfo;

export async function getServerSideProps({params}) {

    return ({
        props: {id: parseInt(params.id)},
    })
}