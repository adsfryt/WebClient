import React, {useEffect, useState} from 'react';
import styles from "../../styles/components/subjectinfo/Components/Create.module.css";
import Input from "../common/Input";
import STest from "./showTest/Test/Tests";
import Request from "../../Request";
import ButtonH from "../common/ButtonH";
import Cross from "../common/Cross";
import stylesAddUsers from "../../styles/components/subjectinfo/Components/AddUsers.module.css"
import Tests from "./showTest/Test/Tests";
import CheckBox from "../common/CheckBox";
let id_tests = 0;
let id_option = {value:0};

const UpdateTest = ({testId, setError,data,questions, attempts,setOk}) => {
    var [Title, SetTitle] = useState("");
    var [Descr, SetDescr] = useState("");
    var [Activate, SetActivate] = useState(false);
    let [UData, setUData] = useState(false);
    let [questionId, setQuestionId] = useState();
    let [questionList, setQuestionList] = useState([]);
    let [questionListId, setQuestionListId] = useState([]);
    async function getQuestion() {
        let response = await Request.post("test/get_questions",{questionId:parseInt(questionId), subjectId:data.subjectId});
        if(!response){
            setError("Получение вопроса невозможно");
            return;
        }
        setOk("Вопрос успешно добавлен")
        setQuestionListId(prev =>[...prev,response.data.id])
        setQuestionList(prev =>[...prev,response.data.var[response.data.var.length-1]])
    }


    useEffect(()=>{
        SetTitle(data.name);
        SetDescr(data.description);
        SetActivate(data.activate);
        setQuestionListId(data.questionsId);
        document.getElementById("InputUpdateTitle-0-1").value = data.name;
        document.getElementById("TestAreaUpdateDescription-0-1").value = data.description;
    }, [data])


    useEffect(()=>{
        setQuestionList(questions)
    }, [questions])


    function Delete(id) {
        let nQuestionList = [...questionList];
        nQuestionList.splice(id,1)
        setQuestionList(nQuestionList)

        let nQuestionListId = [...questionListId];
        nQuestionListId.splice(id,1)
        setQuestionListId(nQuestionListId)
    }

    function Up(id) {
        let next = id - 1;
        if(next < 0){
            next = 0;
        }
        let item1 = questionList[id];
        let nQuestionList = [...questionList];
        nQuestionList.splice(id,1);
        nQuestionList.splice(next,0, item1);
        setQuestionList(nQuestionList)

        let item2 = questionListId[id];
        let nQuestionListId = [...questionListId];
        nQuestionListId.splice(id,1);
        nQuestionListId.splice(next,0, item2);
        setQuestionListId(nQuestionListId)
    }


    function Down(id) {
        let next = id + 1;
        if(next > questionListId.length -1){
            next = questionListId.length - 1;
        }
        let item1 = questionList[id];
        let nQuestionList = [...questionList];
        nQuestionList.splice(id,1);
        nQuestionList.splice(next,0, item1);
        setQuestionList(nQuestionList)

        let item2 = questionListId[id];
        let nQuestionListId = [...questionListId];
        nQuestionListId.splice(id,1);
        nQuestionListId.splice(next,0, item2);
        setQuestionListId(nQuestionListId)
    }


    async function Send(){
        let body = {
            name:Title,
            description:Descr,
            activate:Activate,
            attempts:[],
            questionsId:questionListId,
        }
        console.log(body);
        let response = await Request.post("test/update_data",{testId:testId, data:body});
        if(!response){
            setError("Изменение невозможно")
            return;
        }
        setOk("Тест успешно изменен")
    }

    function ChangeActive() {
        SetActivate(!Activate);
    }


    useEffect(()=>{
        console.log(Activate)
    },[Activate])

    return (
        <div>
            <>
                <div  className={styles.row_checkBox}>
                    <p className={styles.text_checkBox}>{"Активировать:"}</p>
                    <CheckBox fn={ChangeActive} state={data.activate} ido={0}/>
                </div>

                <Input setText={SetTitle} initValue={""} id={"UpdateTitle-0-1"} props={"Название"}/>
                <div className={styles.row_desc}>
                    <p className={styles.desc_text}>Описание</p>
                    <textarea id={"TestAreaUpdateDescription-0-1"} onChange={(e) => SetDescr(e.target.value)} className={styles.textarea}/>
                </div>
            </>
            {Object.keys(attempts).length === 0 ?
                <>
                    <Input initValue={""} id={"create-add_question-1"} props={"Id вопроса"} setText={setQuestionId}/>
                    <ButtonH title={"Добавить"} action={getQuestion}/>
                </>
                :""
            }
            {
                questionList?.map((key,id) => (
                    <STest type={Object.keys(attempts).length === 0 ? "edit" : "result"} Up={Up} Down={Down} Delete={Delete} data={key} Answer={key.answer} ida={id}/>
                ))
            }

            <div id={"button_add"} className={styles.add} onClick={Send}>
                <div>
                    <p className={styles.add_text}>Изменить тест</p>
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

export default UpdateTest;