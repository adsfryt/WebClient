import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../Context";
import Data from "../../../Data";
import Request from "../../../Request";
import STest from "../../../components/Subjectinfo/showTest/Test/Tests";
import Title from "../../../components/common/Title";
import styles from "../../../styles/components/test/Test.module.css";
import Create from "../../../components/Subjectinfo/Create";
import ErrorStyles from "../../../styles/Error.module.css";

const Result = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [task, setTask] = useState([]);
    let [data, setData] = useState({});
    let [Attempt, setAttempt] = useState({})
    let [Check, setChecked] = useState([]);
    let [error, setError] = useState("");
    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role === -1) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

    async function getData(){
        try {
            let response_test = await Request.post('test/get_question_attempt_result',{attemptId:parseInt(id) });
            if(!response_test){
                setError("Ошибка! Видимо не в этот раз")
                return;
            }
            setData(response_test.data.data);
            setAttempt(response_test.data.attempt);
            setChecked(response_test.data.attempt.data);
            setTask(response_test.data.questions);


        }catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        getData();
    }, []);

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
            <Title name={data.name}/>
            <div className={styles.Main}>
                <div className={styles.Main_in}>
                    <p className={styles.TextH}>Результат</p>
                    <p className={styles.TextH2}>Количество набранных баллов: {Attempt.result}</p>
                    {
                        task?.map((key, id) => (
                            <STest type={"result"} ida={id} Answer={Check[id]} data={key}/>
                        ))
                    }

                </div>
            </div>
        </>
    );
};


export default Result;

export async function getServerSideProps({params}) {

    return ({
        props: {id: params.id},
    })
}