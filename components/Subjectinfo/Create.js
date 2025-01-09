import React, {useEffect, useState} from 'react';
import styles from "../../styles/components/subjectinfo/Components/Create.module.css";
import Input from "../common/Input";
import STest from "./showTest/Test/Tests";
import Request from "../../Request";
import ButtonH from "../common/ButtonH";
import Cross from "../common/Cross";
import stylesAddUsers from "../../styles/components/subjectinfo/Components/AddUsers.module.css"
import Tests from "./showTest/Test/Tests";
import Data from "../../Data";
let id_tests = 0;
let id_option = {value:0};
const Create = ({id, setError}) => {
    var [Title, SetTitle] = useState("");
    var [Descr, SetDescr] = useState("");

    var [Tests, setTests] = useState([]);
    let [questionId, setQuestionId] = useState();
    let [questionList, setQuestionList] = useState([]);
    let [questionListId, setQuestionListId] = useState([]);
    async function getQuestion() {
        let response = await Request.post("test/get_questions",{questionId:parseInt(questionId), subjectId:id});
        if(!response){
            return;
        }
        setQuestionListId(prev =>[...prev,response.data.id])
        setQuestionList(prev =>[...prev,response.data])
    }

    function Delete(id) {
        let nQuestionList = [...questionList];
        nQuestionList.splice(id,1)
        setQuestionList(nQuestionList)

        let nQuestionListId = [...questionListId];
        nQuestionListId.splice(id,1)
        setQuestionListId(nQuestionListId)
    }
    async function Send(){


        if(Title.length < 3 || Title.length > 50){
            setError("Ошибка!!! Длина названия должна быть >3 и <50 символов.")
            return;
        }
        if(Descr.length < 10 || Descr.length > 1000){
            setError("Ошибка!!! Длина описания должна быть >10 и <1000 символов.")
            return;
        }
        let body = {
            name:Title,
            description:Descr,
            activate:false,
            subjectId:id,
            attempts:[],
            questionsId:questionListId
        }
        let response = await Request.post("test/add_test",{data:body});
        if(!response){
            setError("Создание невозможно");
            return;
        }
        location.reload(true);
    }

    useEffect(()=>{
        console.log(Tests)
    },[Tests])

    return (
        <div>
            <>
                <Input setText={SetTitle} initValue={""} id={"create-1"} props={"Название"}/>
                <div className={styles.row_desc}>
                    <p className={styles.desc_text}>Описание</p>
                    <textarea onChange={(e) => SetDescr(e.target.value)} className={styles.textarea}/>
                </div>
            </>

            <Input initValue={""} id={"create-add_question-1"} props={"Id вопроса"} setText={setQuestionId}/>

            <ButtonH title={"Добавить"} action={getQuestion}/>

            {
                questionList?.map((key,id) => (
                    <STest Delete={Delete} data={key.var[key.var.length-1]} Answer={key.var[key.var.length-1].answer} ida={id}/>
                ))
            }

            <div id={"button_add"} className={styles.add} onClick={Send}>
                <div>
                    <p className={styles.add_text}>Cоздать тест</p>
                </div>
            </div>


            {/*{*/}
            {/*    Tests.map((key, id) =>*/}
            {/*        (<CTest id_option={id_option} CD={CD} Delete={Delete} ido={id} key={id} data={key} Tests={Tests} setTests={setTests}/>)*/}
            {/*    )*/}
            {/*}*/}

            {/*<div className={styles.add_test} onClick={Send}>*/}
            {/*    <div>*/}
            {/*        <p className={styles.add_text}>Создать</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
};

export default Create;