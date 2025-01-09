import {useState, useEffect,useContext} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {observer} from "mobx-react-lite";
import { Context } from "../Context";
import NotLogin from "../components/Index/NotLogin";
import MainTeacher from "../components/Index/MainTeacher";
import Request from "../Request";
import axios from "axios";
import Data from "../Data";
import Activate from "../components/Login/Parts/Activate";
import MainStudent from "../components/Index/MainStudent";

const Index =  observer(({users}) => {
    let [CommonData , setCommonData] = useContext(Context);




    useEffect(() => {
        console.log(CommonData)
    }, [CommonData]);


    return (
        <>

            {
                CommonData.activate === false ?
                <>
                    <Activate/>
                </>:
                CommonData.auth === 1 ?
                    CommonData.role === 0 ?
                        <MainStudent/>:
                    CommonData.role === 1 ?
                        <MainTeacher/>
                            :<>1</>
                :CommonData.auth === 0 ?
                    <NotLogin/>
                :<>2</>
            }
        </>
    );

});

export default Index;
