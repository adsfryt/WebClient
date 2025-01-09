import React, {useContext, useEffect, useState} from 'react';
import Data from "../../../Data";
import Request from "../../../Request";
import {Context} from "../../../Context";
import Title from "../../../components/common/Title";
import Tests from "../../../components/tasks/Test/Tests";
import ButtonC from "../../../components/common/ButtonC";
import styles from "../../../styles/components/test/Test.module.css";
import ButtonH from "../../../components/common/ButtonH";
import {useRouter} from "next/navigation";
import ErrorStyles from "../../../styles/Error.module.css";

const Task = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [task, setTask] = useState([]);
    let [data, setData] = useState({});
    let [Attempt, setAttempt] = useState({})
    let [Answer, setAnswer] = useState([]);
    let [error, setError] = useState("");
    let [ok, setOk] = useState("");
    const {push} = useRouter();

    useEffect(() => {
        console.log(CommonData)
        if(CommonData.auth !== -1) {
            if (CommonData.auth === 0 || CommonData.activate === false || CommonData.role !== 0) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }

    }, [CommonData]);


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

    async function getData(){
        try {
            let response_test = await Request.post('test/get_question_attempt',{attemptId:id });
            if(!response_test){
                setError("Получить данные не удалось. Попробуйте через некоторое время.")
                return;
            }
            setData(response_test.data.data);
            setAttempt(response_test.data.attempt);
            setAnswer(response_test.data.attempt.data)
            setTask(response_test.data.questions);



        }catch (e) {
            console.log(e)
        }
    }

    async function SaveAnswer(){
        try {
            let response_test = await Request.post('test/save_answers',{attemptId:id, answers:Answer });
            if(!response_test){
                setError("Сохранить ответы не удалось. Попробуйте через некоторое время.")
            }
            setOk("Ответы сохранены")
        }catch (e) {
            console.log(e)
        }
    }

    async function Finish(){
        try {
            let response_test = await Request.post('test/save_answers',{attemptId:id, answers:Answer });
            if(!response_test){
                return;
            }

            let finish_test = await Request.post('test/stop_attempt',{attemptId:id });
            if(!finish_test){
                setError("Ошибка! Закончить тест не удалось.")
                return;
            }
            push("/test/result/" + id)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(()=> {
        console.log(Answer)
    },[Answer])
    return (
        <>
            <div id={"error"} className={ErrorStyles.error}><p className={ErrorStyles.errorText}>{error}</p></div>
            <div id={"ok"} className={ErrorStyles.ok}><p className={ErrorStyles.errorText}>{ok}</p></div>
            <Title name={data.name}/>
            <div className={styles.Main}>
                <div className={styles.Main_in}>
                    {
                        task?.map((key, id) => (
                            <Tests Answer={Answer} key={id} ida={id} setAnswer={setAnswer} data={key}/>
                        ))
                    }

                    {task[0] ?
                        <>
                            <div className={styles.center}>
                                <ButtonH action={SaveAnswer} title={"Сохранить все ответы"}/>
                            </div>
                            <ButtonC action={Finish} title={"Закончить прохождение"}/>
                        </>
                        : ""
                    }
                </div>
            </div>
        </>
    );
};

export default Task;

export async function getServerSideProps({params}) {

    return ({
        props: {id: parseInt(params.id)},
    })
}