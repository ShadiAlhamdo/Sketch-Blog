import AdminSidebar from "./AdminSidebar";
import './Admin-Table.css'
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts ,deletePost} from "../../Redux/apiCalls/postApiCall";
const PostTable = () => {
    const dispatch=useDispatch();
    const {posts}=useSelector(state=> state.post);

    useEffect(()=>{
        dispatch(getAllPosts())
    })

    const deletePostHandler=(postId)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Post !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            dispatch(deletePost(postId))
            } 
          });
    }
    return (  
        <section className="table-container">
            <AdminSidebar/>
            <div className="table-wrapper">
                <h1 className="table-title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Post Tiltle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item,ind)=>(
                            <tr key={item._id}>
                                <td>{ind +1}</td>
                                <td>
                                    <div className="table-image">
                                        <img src={item.user.profilePhoto.url}
                                         alt="" 
                                         className="table-user-image"
                                         />
                                         <span className="table-user-name">
                                            {item.user.username}
                                         </span>
                                    </div>
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/posts/details/${item._id}`}>
                                                View Post
                                            </Link>
                                        </button>
                                        <button onClick={()=>deletePostHandler(item._id)}>Delete Post</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
 
export default PostTable;
