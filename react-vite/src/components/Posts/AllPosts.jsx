import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as postActions from '../../redux/posts';
import { BiSolidBookHeart } from "react-icons/bi";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { thunkAddLike, thunkRemoveLike } from "../../redux/posts";
import { thunkAllFriends } from "../../redux/friends";
import Filter from "../Filters/Filter";
import './Posts.css';

export default function AllPosts(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[levelFilter, setLevelFilter] = useState(false);
    const[languageFilter, setLanguageFilter] = useState(false);
    const[localFilter, setLocalFilter] = useState(false);
    const[friendFilter, setFriendFilter] = useState(false);
    const[filteredPosts, setFilterPosts] = useState()
    const user = useSelector(state => state.session.user);
    const postData = useSelector(state => state.posts.allPosts);
    const friendsData = useSelector(state => state.friends.allFriends)
    let friendsArr = [];

    if(friendsData){
        const copy = Object.values(friendsData)
        for(let i = 0; i < copy.length; i++){
            friendsArr.push(copy[i].id)
        }
    }

    useEffect(() => {
        dispatch(postActions.thunkGetAllPosts())
        dispatch(thunkAllFriends())
    }, [dispatch])

    // if(postData) setFilterPosts(Object.values(postData))

    useEffect(() => {
        if(postData) setFilterPosts(Object.values(postData))
        setLevelFilter(!levelFilter)
        setLanguageFilter(!languageFilter)
        setLocalFilter(!localFilter)
        setFriendFilter(!friendFilter)
    }, [postData])

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

    const handleClick = (type) => {

        // console.log('BEFORE', levelFilter)
        if (type == 'level') {
            if(levelFilter) setFilterPosts(filteredPosts.filter((post) => post.level == user.level))
            if(!levelFilter)setFilterPosts(Object.values(postData))
            setLevelFilter(!levelFilter)
        }
        if (type == 'language') {
            if(languageFilter) setFilterPosts(filteredPosts.filter((post) => post.language == user.learning))
            if(!languageFilter)setFilterPosts(Object.values(postData))
            setLanguageFilter(!languageFilter)
        }
        if (type == 'local') {
            if(localFilter) setFilterPosts(filteredPosts.filter((post) => post.author_city == user.city))
            if(!localFilter)setFilterPosts(Object.values(postData))
            setLocalFilter(!localFilter)
        }
        if (type == 'friends') {
            if(friendFilter) setFilterPosts(filteredPosts.filter((post) => friendsArr.includes(post.author_id)))
            if(!friendFilter)setFilterPosts(Object.values(postData))
            setFriendFilter(!friendFilter)
        }

    }

    return(
        <>
        {/* {console.log(friendsArr)} */}
        {<Filter levelFilter={levelFilter} languageFilter={languageFilter} localFilter={localFilter} friendFilter={friendFilter} handleClick={handleClick}/>}
        <h1>Forum Page</h1>
        <div className="posts-list">
            <ul>
                {filteredPosts ? filteredPosts.map((post, index) => (
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