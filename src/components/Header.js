import React, { useCallback } from 'react';
import {AppBar,Box,Button,Toolbar,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/memberApis';

const Header = () => {
    const isLogin=useSelector(state => state.memberSlice.isLogin);
    const navi=useNavigate();
    const nickname=useSelector(state => state.memberSlice.nickname);
    const dispatch = useDispatch();
    const handleLogout=useCallback(()=>{
        dispatch(logout());
        navi('/login')
    },[dispatch,navi])
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography style={{cursor:'pointer'}} variant='h6' component='div' sx={{ flexGrow:1}} onClick={()=>navi('/')} >
                        Home
                    </Typography>
                    <Button color='inherit' onClick={()=>navi('/boardList')}>
                        게시판
                    </Button>

                    {
                        isLogin?
                            <>
                                <Button color="inherit" >
                                    {nickname}
                            </Button>
                                <Button color='inherit' onClick={()=>handleLogout()}>
                                    로그아웃
                                </Button>

                            </>
                            :
                            <>
                                <Button color="inherit" onClick={() => navi('/login')}>
                                    로그인
                                </Button>
                                <Button color='inherit' onClick={()=>navi('/join')}>
                                    회원 가입
                                </Button>
                            </>
                }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;