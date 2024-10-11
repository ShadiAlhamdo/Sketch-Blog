import { Link } from "react-router-dom";
import './Post.css'
const PostItem = ({post,username,userId}) => {
    const profileLink=userId?`/profile${userId}`: `/profile/${post?.user?.id}`;
    const profileName=username?username:post?.user.username;
    return ( 
        <div className="post-item">
            <div className="post-item-image-wrapper">
                <img className="post-item-image" src={post?.image?.url} alt=""/>
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author:</strong>
                        <Link to={profileLink}>{profileName}</Link>
                    </div>
                    <div className="post-item-date">
                         <i class="bi bi-calendar-week"></i>
                        {new Date(post?.createdAt).toDateString()}
                    </div>
                </div>
                <div className="post-item-details">
                    <h4 className="post-item-title">{post?.title}</h4>
                    <Link className="post-item-category" to={`/posts/categories/${post?.category}`}>
                    {post?.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {post?.description}
                   
                </p>
                
                <Link className="post-item-link" to={`/posts/details/${post?._id}`}>Read More...</Link>
            </div>
        </div>
     );
}
 
export default PostItem;