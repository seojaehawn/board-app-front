import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Join from './pages/Join';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Login from './pages/login';
import Post from './pages/Post';
import BoardList from './pages/BoardList';
import Board from './pages/Board';


function App() {
    const persiststore=persistStore(store);
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persiststore}>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home></Home>}></Route>
                    <Route path='/join' element={<Join></Join>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/post' element={<Post></Post>}></Route>
                    <Route path='/boardList' element={<BoardList></BoardList>}></Route>
                    <Route path='/board/:id' element={<Board></Board>}></Route>
                </Route>
            </Routes>
          </PersistGate>
      </Provider>
  );
}

export default App;
