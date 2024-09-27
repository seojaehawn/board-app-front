import {createSlice} from '@reduxjs/toolkit'
import { getBoards, post } from '../apis/boardApis';

const boardSlice=createSlice(
    {
        name: 'boards',
        initialState: {
            boards:[],
            searchCondition:"all",
            searchKeyword:'',
            page:0
        }
        ,
        reducers: {
            change_searchCondition: (state, action)=>{
                return{
                    ...state,
                    searchCondition:action.payload
                }
            }
            ,
            change_searchKeyword:(state, action)=>{
                return{
                    ...state,
                    searchKeyword:action.payload
                }
            }
        }
        ,
        extraReducers:(builder)=> {
            builder.addCase(post.fulfilled,(state,action)=>{
                alert('정상적으로 등록되었습니다.')
                return {
                    ...state,
                    boards:action.payload.pageItems,
                    searchKeyword:'',
                    searchCondition:'all',
                    page:0
                }
            })
            builder.addCase(post.rejected,(state,action)=>{
                alert('에러 발생')
                console.log(action.payload);
                return state;
            })
            builder.addCase(getBoards.fulfilled,(state,action)=>{
                return{
                    ...state,
                    boards:action.payload.pageItems,
                    searchKeyword:action.payload.item.searchKeyword,
                    searchCondition:action.payload.item.searchCondition,
                    page:action.payload.pageItems.pageable.pageNumber
                }
            })
            builder.addCase(getBoards.rejected,(state,action)=>{
                alert('게시판 자료 로드 실패')
                return state;
            })
        }
    }
)
export const {change_searchCondition,change_searchKeyword} = boardSlice.actions;
export default boardSlice.reducer;