
import React, { useEffect } from 'react';
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import PostPage from './Pages/Post Page/PostPage';
import Login from './Pages/Forms/Login';
import Register from './Pages/Forms/Register';
import CreatePost from  './Pages/Create-Post/CreatePost';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import PostDetails from './Pages/PostDetails/PostDetails';
import Category from './Pages/Category/Category';
import Profile from './Pages/Profile/Profile';
import UsersTable from './Pages/Admin/UsersTable';
import PostTable from './Pages/Admin/PostTable';
import CategoriesTable from './Pages/Admin/CtegoriesTbale';
import CommentsTable from './Pages/Admin/CommentsTable';
import ForgotPassword from './Pages/Forms/ForgotPassword';
import ResetPassword from './Pages/Forms/ResetPassword';
import NotFound from './Pages/Not Found/NotFound';
import { useSelector } from 'react-redux';
import VerifyEmail from './Pages/verify-email/VerifyEmail';

const App = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  const {user}=useSelector(state=> state.auth)

  return (
    <BrowserRouter>
      <ToastContainer theme='colored' position='top-center'/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={!user ?  <Login/>:<Navigate to="/"/>}/>
        <Route path='/register' element={!user ? <Register/>:<Navigate to="/"/>}/>
        <Route path='/users/:userId/verify/:token' element={!user ? <VerifyEmail/>:<Navigate to="/"/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:userId/:token' element={<ResetPassword/>}/>



        <Route path='/profile/:id' element={<Profile/>}/>

        
        <Route path='posts'>
          <Route index element={<PostPage/>}/>
          <Route path='create' element={user ?<CreatePost/>:<Navigate to="/"/>}/>
          <Route path='details/:id' element={<PostDetails/>}/>
          <Route path='categories/:category' element={<Category/>}/>
        </Route>

        <Route path='/admin-dashboard'>
          <Route index element={user?.isAdmin ?<AdminDashboard/>:<Navigate to="/"/>}/>
          <Route path='users-table' element={user?.isAdmin ?<UsersTable/>:<Navigate to="/"/>}/>
          <Route path='posts-table' element={user?.isAdmin ?<PostTable/>:<Navigate to="/"/>}/>
          <Route path='categories-table' element={user?.isAdmin ?<CategoriesTable/>:<Navigate to="/"/>}/>
          <Route path='comments-table' element={user?.isAdmin ?<CommentsTable/>:<Navigate to="/"/>}/>
        </Route>

        
        <Route path='*' element={<NotFound/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};
export default App;
