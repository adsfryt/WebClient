import Variants from './test_det/Variants';
import styles from "../../../../styles/components/test/tasks/Test/Tests.module.css"

import {useEffect, useState} from "react";
import TestTitle from "./test_det/TestTitle";
import ButtonH from "../../../common/ButtonH";

const STest = ({data, Answer,ida,Delete, type, Up, Down}) => {



    return (
        <div className={styles.Tests}>
            <TestTitle name={data.question}/>
            {
                data?.options?.map((key,id) => {
                        return(<>
                            <Variants idaa={ida} Answer={Answer} amount={data.options.length} ida={id} key={id} state={false} text={key.text}/>
                            </>
                        )
                    }
                )
            }
            {type === "result"?
                ""
                :
                type === "edit" ?<div className={styles.Buttons}>
                <ButtonH title={"Вверх"}  action={() =>{Up(ida)}}/>
                <ButtonH title={"Вниз"}  action={() =>{Down(ida)}}/>
                <ButtonH title={"Удалить"} style={"red"} action={() =>{Delete(ida)}}/>
                </div>
                : <ButtonH title={"Удалить"} style={"red"} action={() =>{Delete(ida)}}/>
            }

        </div>
    );
};

export default STest;