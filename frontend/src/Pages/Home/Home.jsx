import { Link } from 'react-router-dom';
import PostList from '../../Components/Posts/PostList';
import SideBar from '../../Components/sidebar/SideBar';
import './Home.css'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react';
import { fetchPosts } from '../../Redux/apiCalls/postApiCall';
const Home = () => {
    const dispatch=useDispatch();
    const {posts}=useSelector(state=>state.post)
    useEffect(()=>{
        dispatch(fetchPosts(1));
    },[])
   
   
    return ( 
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">Welcome To Sketch-Blog</h1>
                    <p  className="home-desc" >Welcome to Sketch-Blog. This blog was designed to share all the godly ideas and
                         thoughts that come to your mind.
                         I hope you have a unique experience.
                    </p>
                </div>
            </div>
            <div className="section-poly">
            <div className="section-poly-left"></div>
            <div className="section-poly-right"></div>
            </div>
            <div className="home-latest-post">
                <h3>Latest posts</h3>
                </div>
                <div className="home-container">
                    <PostList posts={posts}/>
                    <SideBar />
                </div>
                <div className="home-see-posts-link">
                    <Link className='home-link' to={`/posts`}>
                        See All Post
                    </Link>
                </div>
           
        </section>
     );
}
 
export default Home;