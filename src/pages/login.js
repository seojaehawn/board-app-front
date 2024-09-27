import React, { useCallback, useState } from 'react';
import {Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../apis/memberApis';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const navi=useNavigate();
    const changeTextFiled=useCallback((e) => {
        setLoginForm(
            {
                ...loginForm,
                [e.target.name]: e.target.value
            }
        )
    },[loginForm])
    const dispatch=useDispatch();
    const submitHandler=useCallback((e)=>{
        e.preventDefault();
        //dispatch의 비동기 처리가 제대로 완료되면 action객체 하나가 state로 넘어오고  처리가 제대로 되지 않으면 에러 액션 객체가 넘어온다.
        dispatch(login(loginForm)).then((state)=>{
            if (state.type === 'members/login/fulfilled'){
                navi('/');
            }
        });
    },[loginForm,dispatch,navi])
    return (
        <Container component='div' maxWidth='xs' style={{marginTop: '8%'}}>
            <form onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component='h1' variant='h5'>
                            로그인
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign='right'>
                        <TextField
                            name='username'
                            variant='outlined'
                            required
                            id='username'
                            label='아이디'
                            autoFocus
                            fullWidth
                            value={loginForm.username}
                            onChange={changeTextFiled}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='password'
                            variant='outlined'
                            required
                            id='password'
                            label='비밀번호'
                            fullWidth
                            type='password'
                            value={loginForm.password}
                            onChange={changeTextFiled}
                        ></TextField>
                    </Grid>
                    
                    
                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'>
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;