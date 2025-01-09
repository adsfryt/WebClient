import React, {useEffect} from 'react';
import Input from "../../../common/Input";
import ButtonH from "../../../common/ButtonH";
import styles from "../../../../styles/components/subjectinfo/Components/tests/Test/Variant.module.css"
import CheckBox from "../../../common/CheckBox";
const Variant = ({ido,data,DeleteVariants,idoo,Tests,setTests, answer}) => {
    function SetNameTask(e) {
        var new_t = {...Tests};
        new_t.var[new_t.var.length-1].options[ido].text = e;
        setTests(new_t);
    }

    function SetAnswer() {
        var new_t = {...Tests};
        new_t.var[new_t.var.length-1].answer = ido;
        setTests(new_t);
    }

    useEffect(()=>{
        document.getElementById("Inputctest_0var_" + ido + "option_" + idoo).value = data.text;

        if(answer){
            document.getElementById("CheckBoxInputCTest_0var_" + ido + "answer_" + idoo).checked = true;
        }else{
            document.getElementById("CheckBoxInputCTest_0var_" + ido + "answer_" + idoo).checked = false;
        }

    },[Tests]);
    return (
        <div className={styles.Main_out}>
            <div className={styles.CheckBox_out}>
                <p className={styles.text}>Правильный ответ: </p>
                <CheckBox ido={"CTest_0var_" + ido + "answer_" + idoo} state={false} fn={SetAnswer}/>
            </div>
            <div className={styles.Main}>
                <Input id={"ctest_0var_" + ido + "option_" + idoo} setText={SetNameTask} props={"Вариант ответа"} style={"width"} initValue={""}/>

                <ButtonH style={"red"} title={"Удалить вариант"} action={() => {DeleteVariants(ido)}} />

            </div>
        </div>
    );
};

export default Variant;