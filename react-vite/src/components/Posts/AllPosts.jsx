import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as postActions from '../../redux/posts';
import { BiSolidBookHeart } from "react-icons/bi";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export default function AllPosts(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const postData = useSelector(state => state.posts.allPosts)
    let postsArr

    useEffect(() => {
        dispatch(postActions.thunkGetAllPosts())
    })

    if(postData) postsArr = Object.values(postData)

    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];

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
                            <BiSolidBookHeart className={post.likes.includes(user.username) ? 'filled' : ''}/>
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