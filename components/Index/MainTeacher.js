import React, {useState} from 'react';
import Info from "./Components/Info";
import styles from "../../styles/components/Index/Main.module.css"
import Top from "./Components/Top";
import Subject from "./Components/Subject";
import AllSubjects from "./Components/AllSubjects";
const MainTeacher = () => {
    let [page,setPage] = useState('settings');
    return (
        <div className={styles.Main}>
            <Top setPage={setPage}/>
            <div>
                {
                page === 'settings' ?
                    <Info/> :
                    page === 'subjects' ?
                    <Subject/>
                        : page === 'allsubjects' ?
                        <AllSubjects/>
                        :""

                }
            </div>
        </div>
    );
};

export default MainTeacher;