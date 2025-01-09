import Variants from './test_det/Variants';
import styles from "../../../styles/components/test/tasks/Test/Tests.module.css"
import Title from "../../common/Title"
import {useEffect, useState} from "react";
import TestTitle from "./test_det/TestTitle";

const Tests = ({data,setAnswer, Answer,ida}) => {

    let [Change, setChange] = useState(true);
    function ChangeAnswer(item){
        let nAnswer = [...Answer];
        nAnswer[ida] = item;
        setAnswer(nAnswer);
    }

    return (
        <div className={styles.Tests}>
            <TestTitle name={data.question}/>
            {
                data?.options?.map((key,id) => {
                        return(<Variants idaa={ida} Answer={Answer} amount={data.options.length} ida={id} fn={ChangeAnswer} key={id} idoo={data.id} state={false} text={key.text}/>)
                    }
                )
            }
        </div>
    );
};

export default Tests;