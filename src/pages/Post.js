import React, { useCallback, useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { post } from '../apis/boardApis';
// import defaultFileImg from '../images/defaultFileImg.png'
const Post = () => {
    const nickname=useSelector((state) => state.memberSlice.nickname);
    const uploadFiles=[];
    const isLogin=useSelector((state) => state.memberSlice.isLogin);
    const navi=useNavigate();
    const openFileInput=useCallback(()=>{
        document.querySelector("#uploadFiles").click();
    },[])
    const imageLoader=(file)=>{
        let reader = new FileReader();
        reader.onload=(e)=>{
            let img=document.createElement("img");
            img.setAttribute("style","z-index:none")
            img.setAttribute("width","150px")
            img.setAttribute("height","80px")
            if (file.name.toLowerCase().match(/(.*?)\.(jpg|png|jpeg|gif|svg|bmp)$/)){
                img.src=e.target.result;
            }
            else {
                //프로젝트 내에 src와 public폴더가 있는데 정적인 파일들을 src,public 어느 폴더에나 위치시킬 수 있음.
                //단 가져오는 방식이 조금 달라짐
                //src폴더에 정적 파일을 위치 시켰을 경우 import구문으로 파일을 가져와야 함
                //public폴더에 정적파일을 위치 시켰을 경우 문자열로 경로를 지정할 수 있음
                img.src='/images/defaultFileImg.png';

                //import방식
                // img.src=defaultFileImg;
            }
            document.querySelector("#preview").appendChild(makeDiv(img,file));
        }
        reader.readAsDataURL(file);
    }
    const makeDiv=(img,file)=>{
        let div=document.createElement("div");
        div.setAttribute("style","display:inline-block; position:relative; width:150px; height:120px; margin:5px; border:1px solid #00f; z-index:1;");

        let btn=document.createElement("input");
        btn.setAttribute("type","button");
        btn.setAttribute("value","x");
        btn.setAttribute("deleteFile",file.name);
        btn.setAttribute("style","width:30px; height:30px; position:absolute; right:0; bottom:0; z-index:999; background-color:rgba(255,255,255,0.1); " +
            " color:#f00; ");
        btn.onclick=(e)=>{
            const ele=e.target;
            const deleteFile=ele.getAttribute("deleteFile");
            for (let i=0;i<uploadFiles.length;i++){
                if (deleteFile===uploadFiles[i].name){
                    uploadFiles.splice(i,1);
                }
            }
            let dataTransfer=new DataTransfer();
            for (let i in uploadFiles){
                const file=uploadFiles[i];
                dataTransfer.items.add(file);
            }
            document.querySelector("#uploadFiles").files=dataTransfer.files;
            const parentDiv=ele.parentNode;
            parentDiv.remove();
        }
        let filenameP=document.createElement('p');
        filenameP.setAttribute("style","display:inline-block; font-size:8px;");
        filenameP.textContent=file.name;

        div.appendChild(img)
        div.appendChild(btn)
        div.appendChild(filenameP)
        return div;
    }
    const changeFiles=useCallback((e)=>{
        const fileList=Array.prototype.slice.call(e.target.files);
        fileList.forEach(file=>{
            imageLoader(file);
            uploadFiles.push(file);
        })
    },[])
    useEffect(() => {
        if (!isLogin){
            alert('로그인이 필요합니다')
            navi('/login')
        }
    }, []);
    const dispatch = useDispatch();
    const handlePost=useCallback((e)=>{
        e.preventDefault();
        //여기서 e.target으로 폼데이터를 만들면 input type=file인 것들은 제외하고 만들어짐
        const formData=new FormData(e.target);
        //만든 폼데이터를 객체형태로 바꿔 멀티파트로 구분 지어 받을 수 있게 함
        const formDataObj={};
        formData.forEach((v,k)=>formDataObj[k]=v);
        const boardDto=new Blob([JSON.stringify(formDataObj)],{
            type:'application/json'
        });

        const sendFormData=new FormData();
        sendFormData.append('boardDto',boardDto);
        Array.from(uploadFiles).forEach(file=>{
            sendFormData.append("uploadFiles",file)
        })

        dispatch(post(sendFormData)).then((action)=>{
            if (action.type === 'boards/post/fulfilled'){
                navi('/boardList')
            }
        })
    },[dispatch,navi,uploadFiles])
    return (
        <Container maxWidth="md" style={{marginTop:'3%',textAlign:'center'}}>
            <Grid container >
                <Grid item xs={12}>
                    <Typography component='h1' variant='h5'>
                        게시글 목록
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handlePost}>
                <Grid container style={{marginTop:'3%',textAlign:'center'}}>
                    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Typography component='p' variant='string'>
                            제목
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField name='title' id='title' fullWidth size='small' required placeholder='게시글 제목'>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'3%',textAlign:'center'}}>
                    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Typography component='p' variant='string'>
                            작성자
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField name='nickname' id='nickname'  aria-readonly={true} value={nickname} fullWidth size='small' required placeholder='게시글 작성자'>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'3%',textAlign:'center'}}>
                    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Typography component='p' variant='string'>
                            내용
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField name="content" id='content' fullWidth size='small' required placeholder='게시글 작성자' multiline rows={10}>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'3%',textAlign:'center'}}>
                    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Typography component='p' variant='string'>
                            파일 첨부
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Button type="button" variant="outlined" onClick={()=>openFileInput()}>파일 선택</Button>
                        <input type='file' multiple onChange={changeFiles} name='uploadFiles' id='uploadFiles' style={{display:'none'}}></input>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'3%',textAlign:'center'}}>
                    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Typography component='p' variant='string'>
                            미리보기
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Container component='div' name='preview' id='preview'>
                            
                        </Container>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'3%',textAlign:'center'}}>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained'>등록</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Post;