import {configureStore,combineReducers} from '@reduxjs/toolkit';
import memberSlice from '../slices/memberSlice';
import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import boardSlice from '../slices/boardSlice';


const rootReducer = combineReducers({
    memberSlice,
    boardSlice
})


const persistConfig = {
    key: 'root',
    storage: sessionStorage
};

const persistreducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persistreducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
})
