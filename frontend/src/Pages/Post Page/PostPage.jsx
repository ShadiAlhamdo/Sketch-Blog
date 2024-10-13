import './PostPage.css'
import PostList  from '../../Components/Posts/PostList';
import SideBar from '../../Components/sidebar/SideBar';
import Pagenation from '../../Components/Pagenation/Pagenation';
import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { fetchPosts,getPostsCount } from '../../Redux/apiCalls/postApiCall';

const POST_PER_PAGE=3;

const PostPage = () => {
    const dispatch=useDispatch();
    const { posts,postCount}=useSelector(state=> state.post)
 
    const pages=Math.ceil(postCount/3);
    console.log(pages)
    const [currentPage,setCurrentPage]=useState(1);
    useEffect(()=>{
        dispatch(fetchPosts(currentPage))
        window.scrollTo(0,0);
       
    },[currentPage]);

    useEffect(()=>{
        dispatch(getPostsCount());
    },[postCount])

    return ( 
        <>
        <section className="post-page">
            <PostList posts={posts}/>
            <SideBar/>
        </section>
        <Pagenation 
        pages={pages} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
        </>
     );
}
 
export default PostPage;