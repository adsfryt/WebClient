import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/components/subjectinfo/Components/tests/Test/Test.module.css"
import Variant from "./Variant";
import Input from "../../../common/Input";
import ButtonH from "../../../common/ButtonH";


const CTest = ({data,setTests,ido,Tests}) => {

    function SetNameTask(e) {
        var new_t = {...Tests};
        new_t.var[new_t.var.length - 1].name = e;
        setTests(new_t);
    }
    function SetQuestionTask(e) {
        var new_t = {...Tests};
        new_t.var[new_t.var.length - 1].question = e;
        setTests(new_t);
    }
    function CreateOptionTask(e) {

        var new_t = {...Tests};
        new_t.var[new_t.var.length - 1].options.push({ text:""});
        setTests(new_t);
    }
    useEffect(() => {
        setTests(Tests);
    }, [Tests]);



    function DeleteVariants(value) {
        var new_t = {...Tests};
        new_t.var[new_t.var.length - 1].options.splice(value, 1);
        if(new_t.var[new_t.var.length - 1].answer === value){
            new_t.var[new_t.var.length - 1].answer = -1;
        }else if(new_t.var[new_t.var.length - 1].answer > value){
            new_t.var[new_t.var.length - 1].answer--;
        }
        setTests(new_t);
    }

    useEffect(()=>{
        document.getElementById("InputCreateTest_0var_0name_" + ido).value = data.var[data.var.length - 1].name;
        document.getElementById("InputCreateTest_0var_0question_" + ido).value = data.var[data.var.length - 1].question;
    },[Tests]);

    return (
        <div id={"ctest" + ido}  className={styles.Main_out}>
            <div className={styles.top}></div>
            <div className={styles.Main}>
                <Input id={"CreateTest_0var_0name_" + ido} setText={SetNameTask} props={"Название"} initValue={""}/>
                <Input id={"CreateTest_0var_0question_" + ido} setText={SetQuestionTask} props={"Вопрос"} style={"width"}
                       initValue={""}/>
                <ButtonH title={"Добавить вариант ответа"} action={CreateOptionTask}/>
                <div className={styles.razd}></div>
                {
                    Tests?.var[Tests.var.length - 1].options.map((key, id) => (
                        <>
                            <Variant answer={Tests.var[Tests.var.length - 1].answer === id} idoo={ido} setTests={setTests} DeleteVariants={DeleteVariants} data={key} ido={id}
                                     Tests={Tests} key={id}/>
                            <div className={styles.razd}></div>
                        </>
                    ))
                }

            </div>
        </div>
    );
};

export default CTest;