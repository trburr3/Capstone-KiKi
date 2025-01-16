import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
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
    let friendsArr = [];
    let learnersArr;

    if(learnersData) learnersArr = Object.values(learnersData);

    if(friendsData){
        const copy = Object.values(friendsData)
        for(let i = 0; i < copy.length; i++){
            friendsArr.push(copy[i].id)
        }
    };

    useEffect(() => {
        dispatch(thunkGetAllUsers())
        dispatch(thunkAllFriends())
    }, [dispatch])

    useEffect(() => {
        if(learnersData) setFilterLearners(Object.values(learnersData))
        setLevelFilter(!levelFilter)
        setLanguageFilter(!languageFilter)
        setLocalFilter(!localFilter)
        setFriendFilter(!friendFilter)
    }, [learnersData, levelFilter, languageFilter, localFilter, friendFilter])

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


    // let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    // let levelArr = ['🥉', '🥈', '🥇'];
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

    return (
        <>
        {/* {console.log(learnersData)} */}
        {<Filter levelFilter={levelFilter} languageFilter={languageFilter} localFilter={localFilter} friendFilter={friendFilter} handleClick={handleClick}/>}
        <h1>Explore Page</h1>
        <div className="learners-list list">
            <ul>
                {filteredLearners ? filteredLearners.map((learner, index) => (
                    <OpenModalMenuItem
                    key={index}
                    className="learner-tile"
                    modalComponent={<PreviewModal learner={learner}/>}
                    itemText={
                    <>

                        <div>
                            <img src={avatarArr[(learner.prof_pic - 1)]} alt="avatar" />
                            <h2>{learner.first_name} {learner.last_name}</h2>
                        </div>
                    </>
                    }
                    />
                )) : <p>No Learners Found 🫥</p>}
            </ul>
        </div>
        </>
    )
}

export default AllLearners;