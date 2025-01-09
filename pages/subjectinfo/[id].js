import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context";
import Request from "../../Request";
import Title from "../../components/common/Title";
import styles from "../../styles/components/subjectinfo/SubjectInfo.module.css";
import Data from "../../Data";
import ListTests from "../../components/Subjectinfo/ListTests";
import AddUsers from "../../components/Subjectinfo/AddUsers";
import Create from "../../components/Subjectinfo/Create";
import ErrorStyles from "../../styles/Error.module.css"
import CreateQ from "../../components/Subjectinfo/CreateQ";
import Input from "../../components/common/Input";
import ButtonH from "../../components/common/ButtonH";
const SubjectInfo = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [data, setData] = useState({});
    let [error, setError] = useState("");
    let [ok, setOk] = useState("");
    let [Tests,SetTests] = useState([]);
    let [Questions,SetQuestions] = useState([]);
    let [title,SetTitle] = useState("");
    let [Descr,SetDescr] = useState("");
    async function getData(){
        try {
            let response_subject = await Request.post('subject/get_data',{subjectId:parseInt(id)});
            if(response_subject){
                setData(response_subject.data)
            }
            let response_test = await Request.post('test/get_data',{subjectId:parseInt(id)});
            if(response_test){
                SetTests(response_test.data)
            }
            let response_question = await Request.post('test/get_questions',{subjectId:parseInt(id)});
            if(response_question){
                SetQuestions(response_question.data)
            }

        }catch (e) {

        }
    }

    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role !== 1) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(Questions)
    }, [Questions]);


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


    useEffect(()=>{
        SetTitle(data.title);
        SetDescr(data.description)
        if(data.title && data.description) {
            document.getElementById("InputUpdateTitle-Subject" + id).value = data.title;
            document.getElementById("TestAreaUpdateDescription-Subject" + id).value = data.description;
        }
    }, [data])

    async function UpdateSubject(){
        try {
            if(title.length < 3 || title.length > 50){
                setError("Ошибка!!! Длина названия должна быть >3 и <50 символов.")
                return;
            }
            if(Descr.length < 10 || Descr.length > 1000){
                setError("Ошибка!!! Длина описания должна быть >10 и <1000 символов.")
                return;
            }
            let response_question = await Request.post('subject/update_data',{title, description:Descr, subjectId:id });
            if(!response_question){
                setError("Обновление невозможно. Попробуйте через некоторе время.")
                return;
            }
            location.reload(true);

        }catch (e) {
        }
    }

    async function DeleteSubject(){
        try {
            let response_question = await Request.post('subject/delete_data',{ subjectId:id });
            if(!response_question){
                setError("Удаление невозможно. Попробуйте через некоторе время.")
                return;
            }
            window.open(Data.ADDRESS_SITE, "_self");
        }catch (e) {
        }
    }

    useEffect(()=>{
        console.log(title)
    },[title])
    return (
        <>
            <Title name={data.title}/>
            <div id={"error"} className={ErrorStyles.error}><p className={ErrorStyles.errorText}>{error}</p></div>
            <div id={"ok"} className={ErrorStyles.ok}><p className={ErrorStyles.errorText}>{ok}</p></div>
            <div className={styles.Main}>
                <div className={styles.Main_in}>

                    <div className={styles.description}>
                        <p className={styles.title}>Изменение предмета:</p>
                        <Input setText={SetTitle} initValue={""} id={"UpdateTitle-Subject" + id}
                               props={"Название предмета"}/>
                        <div className={styles.row_desc}>
                            <p className={styles.desc_text}>Описание</p>
                            <textarea id={"TestAreaUpdateDescription-Subject" + id}
                                      onChange={(e) => SetDescr(e.target.value)}
                                      className={styles.textarea}/>
                        </div>
                        <ButtonH title={"Изменить"} action={UpdateSubject}/>
                        <ButtonH title={"Удалить"} style={"red"} action={() => {
                            DeleteSubject(id)
                        }}/>
                    </div>

                    <div className={styles.description}>
                        <p className={styles.title}>Автор:</p>
                        {data.userId ? data.userId[0] : ""}
                    </div>

                    <div className={styles.module}>
                        <p className={styles.title}>Тесты:</p>
                        <ListTests url={"/testinfo/"} Tests={Tests} ido={id}/>
                    </div>
                    <div className={styles.module}>
                        <p className={styles.title}>Пользователи:</p>
                        <AddUsers  setOk={setOk} data={data} setData={setData} setError={setError} userId={data.userId}
                                  usersId={data.usersId} id={id}/>
                    </div>
                    <div className={styles.module}>
                        <p className={styles.title}>Создать вопрос:</p>
                        <CreateQ setOk={setOk} Questions={Questions} SetQuestions={SetQuestions} setError={setError} id={id}/>
                    </div>
                    <div className={styles.module}>
                        <p className={styles.title}>Создать тест:</p>
                        <Create setOk={setOk} setError={setError} id={id}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectInfo;

export async function getServerSideProps({params}) {

    return ({
        props: {id: parseInt(params.id)},
    })
}