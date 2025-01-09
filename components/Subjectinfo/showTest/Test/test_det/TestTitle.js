import React from 'react';
import styles from "../../../../../styles/components/test/tasks/Test/test_det/TestTitle.module.css"

const TestTitle = ({name}) => {
    return (
        <div className={styles.title}>
            <p className={styles.title_text}>{name}</p>
        </div>
    );
};

export default TestTitle;