import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import * as postActions from '../../redux/posts';
import { BiSolidBookHeart } from "react-icons/bi";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { thunkAllFriends } from "../../redux/friends";
import Filter from "../Filters/Filter";
import './Posts.css';
import { Tooltip } from 'react-tooltip';
import anchor from '../../images/anchor.png';
import Pagination from "../Explore/Pagination";
import Lottie from "lottie-web";
import whale from '../../lotties/whale.json'

export default function AllPosts(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[levelFilter, setLevelFilter] = useState(false);
    const[languageFilter, setLanguageFilter] = useState(false);
    const[localFilter, setLocalFilter] = useState(false);
    const[friendFilter, setFriendFilter] = useState(false);
    const[filteredPosts, setFilterPosts] = useState()
    const[update, setUpdate] = useState(true)
    const user = useSelector(state => state.session.user);
    const postData = useSelector(state => state.posts.allPosts);
    const friendsData = useSelector(state => state.friends.allFriends);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const container = useRef(null);
    let friendsArr = [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts?.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: whale,
        })

        return () => anim.destroy();
      }, [container])

    if(friendsData){
        const copy = Object.values(friendsData)
        for(let i = 0; i < copy.length; i++){
            friendsArr.push(copy[i].id)
        }
    }

    useEffect(() => {
        // dispatch(postActions.thunkGetAllPosts())
        dispatch(thunkAllFriends())
    }, [dispatch])

    useEffect(() => {
        if(update){
            dispatch(postActions.thunkGetAllPosts())
            setUpdate(false)
        }
    }, [dispatch, update])

    useEffect(() => {
        if(postData) setFilterPosts(Object.values(postData))
        setLevelFilter(() => !levelFilter)
        setLanguageFilter(() => !languageFilter)
        setLocalFilter(() => !localFilter)
        setFriendFilter(() => !friendFilter)
    }, [postData])

    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];

    const handleLike = (type, postId) => {
        const payload = {
            post_id: postId
        }
        if (type == 'remove'){
            dispatch(postActions.thunkRemoveLike(payload))
            setUpdate(true)
            // dispatch(postActions.thunkGetAllPosts())
            return
        }

        dispatch(postActions.thunkAddLike(payload))
        // dispatch(postActions.thunkGetAllPosts())
        setUpdate(true)
        return
    }

    const handleClick = (type) => {

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
        <div className="header-container">
        <img src={anchor} alt="anchor" id='title-anchor'/><h1 className="page-title">Forum Page</h1> <img src={anchor} alt="anchor" id='title-anchor'/>
        </div>
        {<Filter levelFilter={levelFilter} languageFilter={languageFilter} localFilter={localFilter} friendFilter={friendFilter} handleClick={handleClick}/>}
        <div className="posts-list list">
            <ul>
                {currentItems ? currentItems.map((post, index) => (
                    <>
                    <li key={index}>
                        <div className="posts-tile">
                        <h2>{post.title} {learningFlags[post.language]} {levelArr[(post.level - 1)]}</h2>
                        <p>{post.body}</p>
                        <div className="posts-tile-buttons">
                        <button className="post-like">
                            <BiSolidBookHeart className={post.likes.includes(user.username) ? 'filled' : ''} onClick={() => { if (post?.likes.includes(user.username)) {handleLike('remove', post.id)} else {handleLike('', post.id)}}}/>
                        </button><p>{post.likes.length}</p>
                        <button className="post-view" data-tooltip-id="comments-tooltip" data-tooltip-content='View Comments'><LiaLongArrowAltRightSolid className="post-list-arrow" onClick={() => navigate(`/posts/${post.id}`)} /></button>
                        <Tooltip id="comments-tooltip" place="left"/>
                        </div>
                        <div className="line" />
                        </div>
                    </li>
                    </>
                ))
                :
                <li>Be the first to write a post!</li>
                }
            </ul>
            {/* <div className="whale-animation" ref={container}></div> */}
            {/* <div className="post-pagination"> */}
            <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredPosts?.length}
            onPageChange={handlePageChange}
            />
            {/* </div> */}
            {/* <div className="whale-animation" ref={container}></div> */}
        </div>
        </>
    )
}