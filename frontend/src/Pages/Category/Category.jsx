import PostList from '../../Components/Posts/PostList';
import './Category.css'
import { useParams,Link } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { fetchPostsBaseOnCategory } from '../../Redux/apiCalls/postApiCall';

const Category = () => {
    const dispatch=useDispatch();
    const{category}=useParams()
    const {postCate }=useSelector(state=> state.post)

    useEffect(()=>{
        dispatch(fetchPostsBaseOnCategory(category))
        window.scrollTo(0,0)
    },[category]);


    return ( 
        <section className="category">
            {postCate.length===0 ?
            <>
                <h1 className="category-not-found">
                    Post With
                     <span>{" "+category+" "}</span>
                      Category Not Found
                    <Link to="/posts" className='category-not-found-link'> Go To Post Page</Link>
                </h1>

            </>
            :
            <>
                <h1 className="category-title">Posts Based On <span>{category}</span></h1>
                <PostList posts={postCate}/>
            </>
            }
          
        </section>
     );
}
 
export default Category;