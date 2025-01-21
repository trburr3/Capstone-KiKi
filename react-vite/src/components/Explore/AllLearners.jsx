import { useDispatch, useSelector } from "react-redux";
import PreviewModal from "./PreviewModal";
import { useEffect, useState } from "react";
import { thunkGetAllUsers } from "../../redux/learners";
import { thunkAllFriends } from "../../redux/friends";
import './Explore.css';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import Filter from "../Filters/Filter";
import { Tooltip } from 'react-tooltip';
import anchor from '../../images/anchor.png';
import Pagination from "./Pagination";

const AllLearners = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const learnersData = useSelector(state => state.learners.learners);
    const friendsData = useSelector(state => state.friends.allFriends)
    const[levelFilter, setLevelFilter] = useState(false);
    const[languageFilter, setLanguageFilter] = useState(false);
    const[localFilter, setLocalFilter] = useState(false);
    const[friendFilter, setFriendFilter] = useState(false);
    const[filteredLearners, setFilterLearners] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    let friendsArr = [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLearners?.slice(indexOfFirstItem, indexOfLastItem);

    if(friendsData){
        const copy = Object.values(friendsData)
        for(let i = 0; i < copy.length; i++){
            friendsArr.push(copy[i].id)
        }
    }

    useEffect(() => {
        dispatch(thunkGetAllUsers())
        dispatch(thunkAllFriends())
    }, [dispatch])

    useEffect(() => {
        if(learnersData) setFilterLearners(Object.values(learnersData))
        setLevelFilter(() => !levelFilter)
        setLanguageFilter(() => !languageFilter)
        setLocalFilter(() => !localFilter)
        setFriendFilter(() => !friendFilter)
    }, [learnersData])

    const handleClick = (type) => {

        // console.log('BEFORE', levelFilter)
        if (type == 'level') {
            if(levelFilter) setFilterLearners(filteredLearners.filter((learner) => learner.level == user.level))
            if(!levelFilter)setFilterLearners(Object.values(learnersData))
            setLevelFilter(!levelFilter)
        }
        if (type == 'language') {
            if(languageFilter) setFilterLearners(filteredLearners.filter((learner) => learner.learning == user.learning))
            if(!languageFilter)setFilterLearners(Object.values(learnersData))
            setLanguageFilter(!languageFilter)
        }
        if (type == 'local') {
            if(localFilter) setFilterLearners(filteredLearners.filter((learner) => learner.city == user.city))
            if(!localFilter)setFilterLearners(Object.values(learnersData))
            setLocalFilter(!localFilter)
        }
        if (type == 'friends') {
            if(friendFilter) setFilterLearners(filteredLearners.filter((learner) => friendsArr.includes(learner.id)))
            if(!friendFilter)setFilterLearners(Object.values(learnersData))
            setFriendFilter(!friendFilter)
        }

    }


    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

    return (
        <>
        <div className="page-container">
        <div className="header-container">
        <img src={anchor} alt="anchor" id='title-anchor'/><h1 className="page-title">Explore Page</h1><img src={anchor} alt="anchor" id='title-anchor'/>
        </div>
        {<Filter levelFilter={levelFilter} languageFilter={languageFilter} localFilter={localFilter} friendFilter={friendFilter} handleClick={handleClick}/>}

        <div className="learners-list list">
            <ul>
                {currentItems ? currentItems.map((learner, index) => (
                    <OpenModalMenuItem
                    key={index}
                    modalComponent={<PreviewModal learner={learner}/>}
                    itemText={
                    <>
                        <div className="learner-tile" data-tooltip-id="learner-tooltip" data-tooltip-content={learner.city}>
                        <Tooltip id="learner-tooltip" />
                            <img className='learner-tile-img' src={avatarArr[(learner.prof_pic - 1)]} alt="avatar" />
                            <h2>{learningFlags[learner.learning]} {learner.first_name} {learner.last_name} {levelArr[(learner.level -1)]}</h2>
                        </div>
                    </>
                    }
                    />
                )) : <p>No Learners Found 🫥</p>}
            </ul>
            <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredLearners?.length}
            onPageChange={handlePageChange}
            />
        </div>
        </div>
        </>
    )
}

export default AllLearners;