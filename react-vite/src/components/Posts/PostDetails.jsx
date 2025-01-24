import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from '../../redux/posts';
import { useEffect, useState } from "react";
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import { BiSolidBookHeart } from "react-icons/bi";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import DeletePostModal from "./DeletePostModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './Posts.css';

const PostDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const user = useSelector(state => state.session.user);
    const [comment, setComment] = useState('');
    const [likedPost, setLikedPost] = useState(false);
    const [recentLike, setRecentLike] = useState('');
    const[update, setUpdate] = useState(true)

    useEffect(() => {
        dispatch(postActions.thunkGetAllPosts());
        // dispatch(postActions.thunkGetAllComments(postId));
        // dispatch(postActions.thunkSinglePost(postId))
    }, [dispatch])

    useEffect(() => {
        if(update){
            dispatch(postActions.thunkGetAllComments(postId));
            dispatch(postActions.thunkSinglePost(postId))
            setUpdate(false)
        }
    }, [dispatch, update, postId])

    const postData = useSelector(state => state.posts.post)
    const comments = useSelector(state => state.posts.comments);
    let post;
    let commentsArr = [];

    if(postData) post = postData[postId]

    if (comments){
        const copy = Object.values(comments)
        for( let i = (copy.length - 1); i >= 0; i-- ){
            commentsArr.push(copy[i])
        }
        // commentsArr.push(copy[0])
    }

    const levelsArr = ['Beginner', 'Intermediate', 'Expert'];

    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

    let likesArr = post?.likes;

    useEffect(() => {
        if (likesArr?.includes(user.username)) setLikedPost(true)
    }, [likesArr, user])

    const handleClick = () => {
        navigate(`/posts/${postId}/edit`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            comment
        };

        dispatch(postActions.thunkCreateComment(payload, postId));
        setComment('')
        setUpdate(true)
    }

    const deleteComment = (commentId) => {
        dispatch(postActions.thunkDeleteComment(commentId))
        setUpdate(true)
    }

    const handleLike = (type, postId, commentId) => {
        const payload = {
            post_id: postId,
            comment_id: commentId
        }
        if (likedPost || type == 'remove'){
            dispatch(postActions.thunkRemoveLike(payload))
            // setRecentLike('You')
            setLikedPost(false)
            setUpdate(true)
            return
        }

        dispatch(postActions.thunkAddLike(payload))
        setUpdate(true)
        return
    }

    useEffect(() => {
        if(likesArr?.length > 0){
            if(likedPost){
                setRecentLike('You')
                return
            }
            setRecentLike(likesArr[(likesArr?.length -1)])
        }
    }, [likesArr])

    return (
        <>
        <div className="post">
            <div className="post-details">
                <h1>{post?.title}</h1>
                <div className="post-author-info">
                <img src={avatarArr[(post?.author_pic - 1 )]} alt="avatar"/>
                <div>
                <h2>Written by: {post?.author_name}</h2>
                <h3>Language: {post?.language}</h3>
                <h3>Level: {levelsArr[(post?.level - 1)]}</h3>
                <h3>Last Updated: {post?.updated_at.split(',')[0]}</h3>
                </div>
                </div>
            </div>
                <section className="post-body">
                    <span>{post?.body}</span>
                    <div className="post-details-like">
                        <div className="post-likes-info">
                        <button><BiSolidBookHeart className={likesArr?.includes(user.username) ? 'filled' : ''} onClick={() => handleLike('', post?.id)}/></button>
                        {likesArr?.length > 0 ? <p>{recentLike} & {(likesArr.length - 1)} others have liked this!</p> : <p>Be the first to like this!</p>}
                        </div>
                        <div className="post-edit">
                        {
                        post && user.id == post.author_id ?
                            <>
                            <div className="user-buttons">
                            <button onClick={handleClick}>Edit</button>
                            <OpenModalButton
                            modalComponent={<DeletePostModal post={post}/>}
                            onButtonClick
                            onModalClose={() => navigate('/posts')}
                            buttonText='Delete'/>
                            </div>
                            </>
                        :
                            ''
                        }
                        </div>
                    </div>
                </section>
                <section className="post-comment-box">
                    <form onSubmit={e => handleSubmit(e)}>
                    <div>
                    <input
                    type="textarea"
                    placeholder="Write a comment..."
                    value={comment}
                    id="comment-input"
                    onChange={(e) => setComment(e.target.value)}
                    ></input>
                    </div>
                    <button disabled={comment ? false : true}>Post</button>
                    </form>
                </section>
                <section className="post-comments">
                    <div className="post-comment-header">
                    <h3>Comments {commentsArr ? ' ⋅ ' + commentsArr.length : ''}</h3>
                    </div>
                    <ul>
                        {commentsArr?.length > 0 ?
                        commentsArr.map((comment, index) => (
                            <>
                            <li key={index}>
                                <div className="post-comment-tile">
                                <div className="comment-img">
                                <img src={avatarArr[(comment?.author_pic - 1 )]} alt="avatar" />
                                </div>
                                <div className="comment">
                                <h4>{comment?.author_name}</h4>
                                <p>{comment?.comment}</p>
                                </div>
                                <div className="comment-likes">
                                <button><BiSolidBookmarkHeart className={comment?.likes.includes(user.username) ? 'filled' : ''} onClick={() => { if (comment?.likes.includes(user.username)) {handleLike('remove', postId, comment.id)} else {handleLike('', postId, comment.id)}}}/></button><p>{comment?.likes.length}</p>
                                {comment?.author_id == user.id ? <button onClick={() => deleteComment(comment?.id)}>X</button> : ''}
                                </div>
                                </div>
                            </li>
                            </>
                        ))
                        :
                            <p className="like-text">Be the first to leave a comment!</p>
                        }
                    </ul>
                </section>
        </div>
        </>
    )
};

export default PostDetails;