import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context";
import Request from "../../Request";
import Data from "../../Data";
import Title from "../../components/common/Title";
import ErrorStyles from "../../styles/Error.module.css";
import styles from "../../styles/components/subjectinfo/SubjectInfo.module.css";
import ListTests from "../../components/Subjectinfo/ListTests";

const Subject = ({id}) => {
    let [CommonData , setCommonData] = useContext(Context);
    let [data, setData] = useState({});
    let [error, setError] = useState("");
    let [Tests,SetTests] = useState([]);
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
        }catch (e) {

        }
    }

    useEffect(() => {
        if(CommonData.auth !== -1) {
            if (CommonData.activate === false || CommonData.role !== 0) {
                window.open(Data.ADDRESS_SITE, "_self");
            }
        }
    }, [CommonData]);

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

    return (
        <>
            <Title name={data.title}/>
            <div id={"error"} className={ErrorStyles.error}><p className={ErrorStyles.errorText}>{error}</p></div>
            <div className={styles.Main}>
                <div className={styles.Main_in}>

                    <div className={styles.description}>
                        <p className={styles.title}>Описание:</p>
                        {data.description}
                    </div>
                    <div className={styles.description}>
                        <p className={styles.title}>Автор:</p>
                        {data.userId ? data.userId[0] : ""}
                    </div>
                    <div className={styles.module}>
                        <p className={styles.title}>Тесты:</p>
                        <ListTests url={"/test/"} Tests={Tests} ido={id}/>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Subject;

export async function getServerSideProps({params}) {

    return ({
        props: {id: parseInt(params.id)},
    })
}