import { Link } from 'react-router-dom';
import  './SideBar.css';
import {useDispatch,useSelector} from "react-redux";
import { useEffect } from 'react';
import { fetchCategories } from '../../Redux/apiCalls/categoryApiCall';
const SideBar = () => {
    const dispatch=useDispatch();
    const {categories}=useSelector(state=> state.category);
    useEffect(()=>{
        dispatch(fetchCategories());
    },[])
    return ( 
        <div className="sidebar">
            <h5 className='sidebar-title'>Categories</h5>
            <ul className="sidebar-links">
                {categories.map(category=>
                    <Link className='sidebar-link' key={categories._id}
                     to={`/posts/categories/${category.title}`}>
                    {category.title}
                    </Link>
                )}
            </ul>
        </div>
     );
}
 
export default SideBar;