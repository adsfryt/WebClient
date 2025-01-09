import React, {useEffect} from 'react';
import Data from "../Data";

const page = () => {
    useEffect(()=>{
        window.location.replace(Data.ADDRESS_SITE);
    },[])

    return (
        <div>

        </div>
    );
};

export default page;

export async function getStaticProps() {
    return {
        redirect: {
            permanent: false,
            destination: "/"
        }
    }
}