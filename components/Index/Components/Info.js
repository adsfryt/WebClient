import React, {useContext, useEffect, useState} from 'react';
import { Context } from "../../../Context";
import Input from "../../common/Input";
import styles from "../../../styles/components/Index/Components/Info.module.css"
import ShowText from "../../common/ShowText";
import ButtonH from "../../common/ButtonH";
import Request from "../../../Request";
import Data from "../../../Data";
import ErrorStyles from "../../../styles/Error.module.css";


const Info = () => {
    let [CommonData , setCommonData] = useContext(Context);
    let [login, setLogin] = useState(CommonData.login);
    let [name, setName] = useState(CommonData.firstName);
    let [surName, setSurName] = useState(CommonData.lastName);
    let [patronymic, setPatronymic] = useState(CommonData.patronymic);
    let [error, setError] = useState("");
    let [ok, setOk] = useState("");

    async function changeName(){
        try {
            if(name.length < 2 || name.length > 50){
                setError("Ошибка!!! Длина имени, фамилии, отчества должны быть >2 и <50.")
                return;
            }
            if(surName.length < 2 || surName.length > 50){
                setError("Ошибка!!! Длина имени, фамилии, отчества должны быть >2 и <50.")
                return;
            }
            if(patronymic.length < 2 || patronymic.length > 50){
                setError("Ошибка!!! Длина имени, фамилии, отчества должны быть >2 и <50.")
                return;
            }

            let response = await Request.post('user/update_data',
                {firstName:name,
                    lastName:surName,
                    patronymic:patronymic
                });
            if(!response){
                setError("Ошибка!!! Изменение невозможно.")
            }
            setOk("Данные обновлены")
            setCommonData(prevUser => ({...prevUser, firstName: name, lastName:surName,patronymic:patronymic}));

        }catch (e) {

        }
    }
    async function changeLogin(){
        try {
            if(login.length < 2 || login.length > 50){
                setError("Ошибка!!! Длина логина должно быть >2 и <50.")
                return;
            }
            let response = await Request.post('user/update_data',
                {login:login,
                });
            if(!response){
                setError("Ошибка!!! Изменение невозможно.")
            }
            setOk("Данные обновлены")
            setCommonData(prevUser => ({...prevUser, login:login}));

        }catch (e) {

        }
    }


    async function getCode(){
        try {
            let response = await Request.get('user/get_code');
            if(!response){
                setError("Ошибка!!! Получение кода невозможно")
            }
            setOk("Код обновлен")
            setCommonData(prevUser => ({...prevUser, code:response.data.code}));

        }catch (e) {

        }
    }
    async function Logout(){
        try {
            let response = await Request.post('user/logout');
            if(!response){
                setError("Ошибка!!! Выход невозможен")
                return;
            }
            localStorage.removeItem("token");
            window.open(Data.ADDRESS_SITE, "_self");

        }catch (e) {

        }
    }
    async function FullLogout(){
        try {
            let response = await Request.post('user/full_logout');
            if(!response){
                setError("Ошибка!!! Выход невозможен")
                return;
            }
            localStorage.removeItem("token");
            window.open(Data.ADDRESS_SITE, "_self");

        }catch (e) {

        }
    }
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

    useEffect(() => {
        if (ok !== "") {
            document.getElementById("ok").animate(
                [
                    {"display": "block"},
                    {"display": "none"}
                ],
                {
                    duration: 3000,
                }
            ).play();
            setTimeout(()=>{
                setOk("");
            },3000)
        }

    }, [ok]);
    return (
        <div className={styles.Main}>
            <div className={styles.Main_in}>
                <div id={"error"} className={styles.error}><p className={styles.errorText}>{error}</p></div>
                <div id={"ok"} className={ErrorStyles.ok}><p className={ErrorStyles.errorText}>{ok}</p></div>
                <p className={styles.TextH}>Пользовательские настройки</p>
                <p className={styles.TextH1}>Персональные данные</p>
                <Input props={"Имя"} setText={setName} initValue={CommonData.firstName} id={1}/>
                <Input props={"Фамилия"} setText={setSurName} initValue={CommonData.lastName} id={2}/>
                <Input props={"Отчество"} setText={setPatronymic} initValue={CommonData.patronymic} id={3}/>
                <ShowText props={"роль"}
                          initValue={CommonData.role === 1 ? "преподаватель" : CommonData.role === 0 ? "студент" : ""}/>
                <ButtonH title={"Изменить"} action={changeName}/>
                <p className={styles.TextH1}>Почта</p>
                <ShowText props={"Email"} initValue={CommonData.email}/>
                <p className={styles.TextH1}>Логин</p>
                <Input props={"Логин"} setText={setLogin} initValue={CommonData.login} id={5}/>
                <ShowText props={"UserId"} initValue={CommonData.userId}/>
                <ButtonH title={"Изменить"} action={changeLogin}/>
                <p className={styles.TextH1}>Привязанный сервис</p>
                <ShowText props={"Сервис"} initValue={CommonData.method}/>
                <p className={styles.TextH1}>Вход</p>
                <ButtonH title={"Получить код"} action={getCode}/>
                <ShowText props={"Код"} initValue={CommonData.code}/>
                <p className={styles.TextH1R}>Опасная Зона</p>
                <ButtonH style={"red"} title={"Выйти"} action={Logout}/>
                <ButtonH style={"red"} title={"Выйти из всех устройств"} action={FullLogout}/>
            </div>
        </div>
    );
};

export default Info;