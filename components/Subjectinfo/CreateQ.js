import React, {useEffect, useState} from 'react';
import styles from "../../styles/components/subjectinfo/Components/CreateQ.module.css";
import styles_Create from "../../styles/components/subjectinfo/Components/Create.module.css";
import CTest from "./test/Test/CTest";
import Request from "../../Request";
import Cross from "../common/Cross";
import {useRouter} from "next/navigation";

const CreateQ = ({id,setError,Questions,SetQuestions,setOk}) => {
    var [Tests, setTests] = useState({
        var:[
            {
                name:"",
                question:"",
                options:[
                ],
                answer:-1
            }
        ]
    });
    let router = useRouter();
    async function CreateTask(){

        if(Tests.var[0].name.length < 3 || Tests.var[0].name.length > 50){
            setError("Ошибка!!! Длина Названия должна быть >3 и <50 символов.")
            return;
        }
        if(Tests.var[0].question.length < 5 || Tests.var[0].question.length > 1000){
            setError("Ошибка!!! Длина вопроса должна быть >5 и <1000 символов.")
            return;
        }
        if(Tests.var[0].options.length < 1){
            setError("Ошибка!!! Должен быть хотя бы один вопрос")
            return;
        }
        if(Tests.var[0].answer === -1){
            setError("Ошибка!!!Должен быть Ответ")
            return;
        }
        let response_subjects = await Request.post('test/add_question',{data:Tests,subjectId:id});
        if(!response_subjects){
            setError("Создание вопроса невозможно")
            return;
        }
        setOk("Вопрос создан!")
        let nTest = {...Tests,id:response_subjects.data.questionsId};
        SetQuestions(prev =>[...prev,nTest])

        setTests( {
            var:[
                {
                    name:"",
                    question:"",
                    options:[
                    ],
                    answer:-1
                }
            ]
        } );
    }

    useEffect(() => {
        console.log(Questions)
    }, [Questions]);

    return (
        <div>
            <CTest ido={0} data={Tests} Tests={Tests} setTests={setTests}/>

            <div className={styles_Create.add_test} onClick={CreateTask}>
                <div>
                    <p className={styles_Create.add_text}>Создать</p>
                </div>
            </div>

            <div className={styles.Main}>
            {
                Questions?.map((key) => (
                    <div className={styles.Block_out_cross} onClick={()=>{router.push("/question/" + key.id)}}>
                        <div key={id} className={styles.Block}>{key.var[key.var.length - 1].name + " - id:" + key.id}</div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default CreateQ;