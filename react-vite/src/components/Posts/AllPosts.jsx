import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as postActions from '../../redux/posts';
import { BiSolidBookHeart } from "react-icons/bi";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { thunkAddLike, thunkRemoveLike } from "../../redux/posts";
import './Posts.css';

export default function AllPosts(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const postData = useSelector(state => state.posts.allPosts);
    let postsArr

    useEffect(() => {
        dispatch(postActions.thunkGetAllPosts())
    }, [dispatch])

    if(postData) postsArr = Object.values(postData)

    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];

    const handleLike = (type, postId) => {
        const payload = {
            post_id: postId
        }
        if (type == 'remove'){
            dispatch(postActions.thunkRemoveLike(payload))
            return
        }

        dispatch(postActions.thunkAddLike(payload))
        return
    }

    return(
        <>
        <h1>Forum Page</h1>
        <div className="posts-list">
            <ul>
                {postsArr ? postsArr.map((post, index) => (
                    <>
                    <li key={index}>
                        <h2>{post.title} {learningFlags[post.language]} {levelArr[(post.level - 1)]}</h2>
                        <p>{post.body}</p>
                        <button>
                            <BiSolidBookHeart className={post.likes.includes(user.username) ? 'filled' : ''} onClick={() => { if (post?.likes.includes(user.username)) {handleLike('remove', post.id)} else {handleLike('', post.id)}}}/>
                        </button>{post.likes.length}
                        <button><LiaLongArrowAltRightSolid className="post-list-arrow" onClick={() => navigate(`/posts/${post.id}`)} /></button>
                    </li>
                    </>
                ))
                :
                <li>Be the first to write a post!</li>
                }
            </ul>
        </div>
        </>
    )
}