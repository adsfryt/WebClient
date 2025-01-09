import React, {useEffect,useState} from 'react';
import styles from "../../styles/components/common/List.module.css"
var showp = false;

const List = ({list,setOption,option,id}) => {

    function handleClickOutsideBox(event) {
        var box = document.getElementById('curr'+id);
        var el_panel = document.getElementById("select"+id);
        var cur_svg = document.getElementById("cur_svg"+id);
        if (box) {
            if (!box.contains(event.target)) {
                showp = false;
                cur_svg.style.transform = "rotate(90deg)";
                el_panel.style.gridTemplateRows = "0fr";
            }
        }
    }
    useEffect(()=>{
        document.addEventListener('click', handleClickOutsideBox);
        return () => {
            document.removeEventListener('click',handleClickOutsideBox);
        }
    },[]);

    function show() {
        var el_panel = document.getElementById("select"+id);
        var cur_svg = document.getElementById("cur_svg"+id);
        showp = !showp;
        if(showp){
            cur_svg.style.transform = "rotate(180deg)";
            el_panel.style.gridTemplateRows = "1fr";
        }else {
            cur_svg.style.transform = "rotate(90deg)";
            el_panel.style.gridTemplateRows = "0fr";
        }
    }

    return (
        <div className={styles.select_out}>
            <div id={"select"+id} className={styles.select}>
                <div className={styles.select_content}>
                    <div className={styles.line}></div>
                    {
                        list.map((key) => (
                            <div onClick={(e) => setOption(key)} key={key} className={styles.line}><p
                                className={styles.key_text}>{key}</p></div>
                        ))
                    }
                </div>
            </div>
            <div id={"curr"+id} className={styles.curr_out} onClick={show}>
                <div className={styles.curr}>
                    <p className={styles.text}>{option}</p>
                </div>
                <svg id={"cur_svg"+id} className={styles.svg} viewBox="-100 -100 3048.34 2856.08">
                    <path className={styles.cls}
                          d="M4866.54,6552.39,3790.12,4588.47c-23.5-42.88-112-42.88-135.49,0L2578.2,6552.39"
                          transform="translate(-2348.2 -4326.31)"/>
                </svg>
            </div>


        </div>
    );
};

export default List;