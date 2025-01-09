import React, {useContext, useEffect, useState} from 'react';
import stylesTest from "../../styles/components/test/Test.module.css";
import Title from "../../components/common/Title";
import Data from "../../Data";
import Request from "../../Request";
import {Context} from "../../Context";
import ErrorStyles from "../../styles/Error.module.css";
import styles_Create from "../../styles/components/subjectinfo/Components/Create.module.css";
import UTest from "../../components/Subjectinfo/test/Test/UTest";
import ButtonH from "../../components/common/ButtonH";

const Question = ({id}) => {
    let [question,SetQuestion] = useState({});
    let [CommonData , setCommonData] = useContext(Context);
    let [error, setError] = useState("");
    let [ok, setOk] = useState("");
    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role !== 1) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

    async function getData(){
        try {
            let response_question = await Request.post('test/get_questions',{questionId:id});
            if(response_question){
                SetQuestion(response_question.data)
            }else{
                setError("Ошибка!!! База данных тупит. Перезагрузите сайт.")
            }

        }catch (e) {
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

    async function UpdateTask(){
        try {
            console.log(question.var[question.var.length - 1])
            let response_question = await Request.post('test/update_question',{questionId:id , data:question.var[question.var.length - 1] });
            if(response_question){

            }else{
                setError("Ошибка!!! Изменение невозможно")
                return;
            }
            setOk("Вопрос успешно изменен")

        }catch (e) {
        }
    }

    async function DeleteQuestion(){
        try {
            let response_question = await Request.post('test/delete_question',{ questionId:id });
            if(!response_question){
                setError("Удаление невозможно. Попробуйте через некоторое время.")
                return;
            }

            if(!response_question.data.ok){
                setError("Удаление невозможно. Вопрос используется в тестах.")
                return;
            }else{
                window.open(Data.ADDRESS_SITE + "/subject/" + question.subjectId, "_self");
            }

        }catch (e) {
        }
    }

    return (
        <>
            <div id={"error"} className={ErrorStyles.error}><p className={ErrorStyles.errorText}>{error}</p></div>
            <div id={"ok"} className={ErrorStyles.ok}><p className={ErrorStyles.errorText}>{ok}</p></div>
            <Title name={"Вопрос: " + (question.var ? question.var[question.var.length - 1].name : "")}/>
            <div className={stylesTest.Main}>
                <div className={stylesTest.Main_in}>
                    {question.var ?
                        <>
                            <UTest ido={0} data={question} Tests={question} setTests={SetQuestion}/>
                            <ButtonH title={"Удалить Вопрос"} style={"red"} action={() => {
                                DeleteQuestion()
                            }}/>
                            <div className={styles_Create.add_test} onClick={UpdateTask}>
                                <div>
                                    <p className={styles_Create.add_text}>Изменить</p>
                                </div>
                            </div>
                        </>
                        : ""
                    }

                </div>
            </div>
        </>
    );
};
export default Question;

export async function getServerSideProps({params}) {

    return ({
        props: {id: parseInt(params.id)},
    })
}