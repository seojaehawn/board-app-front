import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BoardListTable from '../components/BoardListTable';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BoardList = () => {
    const navi=useNavigate();
    const isLogin=useSelector((state) => state.memberSlice.isLogin);
    useEffect(() => {
        if (!isLogin) {
            alert('로그인이 필요합니다.')
            navi('/login')
        }
    })
    return (
        <>
            <SearchBar></SearchBar>
            <BoardListTable></BoardListTable>
        </>
    );
};

export default BoardList;