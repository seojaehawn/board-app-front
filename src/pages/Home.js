import React, { useEffect } from 'react';

const Home = () => {
    useEffect(()=>{
        alert("hi");
    },[])
    return (
        <>
            <div>
                게시판 홈
            </div>
        </>
    );
};

export default Home;