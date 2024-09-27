import React, { useCallback, useEffect } from 'react';
import {
    Button,
    Container,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { getBoards } from '../apis/boardApis';

const BoardListTable = () => {
    const boards=useSelector(state => state.boardSlice.boards);
    const navi=useNavigate();
    const dispatch = useDispatch();
    const page=useSelector(state => state.boardSlice.page);
    const searchCondition=useSelector(state => state.boardSlice.searchCondition);
    const searchKeyword=useSelector(state => state.boardSlice.searchKeyword);
    useEffect(() => {
        dispatch(getBoards({
            searchCondition:'all',
            searchKeyword:'',
            page:0
        }))
    }, []);
    //두번째 v는 하단 pagination의 선택한 page값이 온다
    const changePage=useCallback((e,v)=>{
        dispatch(getBoards({
            searchCondition:searchCondition,
            searchKeyword:searchKeyword,
            page:parseInt(v)-1
        }))
    },[searchCondition,searchKeyword,page])
    return (
        <>
            <Container maxWidth='xl'>
                <TableContainer component={Paper} style={{marginTop:"3%"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>작성자</TableCell>
                                <TableCell>작성일</TableCell>
                                <TableCell>조회수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {boards.content && boards.content.map((board, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {board.id}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/board/${board.id}`} style={{cursor:'pointer'}}>
                                            {board.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {board.nickname}
                                    </TableCell>
                                    <TableCell>
                                        {board.regdate.substring(0, board.regdate.indexOf('T'))}
                                    </TableCell>
                                    <TableCell>
                                        {board.cnt}
                                    </TableCell>
                                </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Container maxWidth='xl' style={{marginTop:"1%", display:"flex", justifyContent:'right'}}>
                <Button type='button' color='primary' onClick={()=>navi('/post')}>글 등록</Button>
            </Container>
            <Container maxWidth='xl' style={{marginTop:"1%",marginBottom:'1%', display:"flex", justifyContent:'center'}}>
                {boards && <Pagination count={boards.totalPages} page={page+1} onChange={changePage}></Pagination>}
            </Container>
        </>
    );
};

export default BoardListTable;