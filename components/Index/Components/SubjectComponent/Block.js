import React, {useContext} from 'react';
import styles from "../../../../styles/components/Index/Components/SubjectComponents/Block.module.css"
import {useRouter} from "next/navigation";
import {Context} from "../../../../Context";
import ButtonH from "../../../common/ButtonH";

const Block = ({data,type,AddUser, DeleteUser}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let {push} = useRouter();
    return (
        <div className={styles.Main} onClick={type !== "all" ? () => {
            push(CommonData.role === 1 ? "subjectinfo/" + data.id : "subject/" + data.id)
        } : () => {}}>
            <div className={styles.top}></div>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.razd}></div>
            <div className={styles.description}>{data.description}</div>
            <div className={styles.description}>Автор: {data.userId[0]}</div>
            {type === "all" ?
                <>
                    {CommonData.listSubjects.find((item) => item.id === data.id ) ?
                        <ButtonH title={"Покинуть"} style={"red"} action={()=>{DeleteUser(data.id)} }/>:
                        <ButtonH title={"Записаться"} action={()=>{AddUser(data.id)}} />
                    }


                </>
                :""
            }
        </div>
    );
};

export default Block;