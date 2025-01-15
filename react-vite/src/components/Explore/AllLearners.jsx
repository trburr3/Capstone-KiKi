import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useEffect } from "react";
import { thunkGetAllUsers } from "../../redux/session";
import './Explore.css';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';

const AllLearners = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const learnersData = useSelector(state => state.session.learners)
    let learnersArr;

    if(learnersData) learnersArr = Object.values(learnersData)

    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

    return (
        <>
        {/* {console.log(learnersData)} */}
        <h1>Explore Page</h1>
        <div className="learners-list list">
            <ul>
                {learnersArr ? learnersArr.map((learner, index) => (
                    <>
                    <li key={index} className="learner-tile">
                        <div>
                            <img src={avatarArr[(learner.prof_pic - 1)]} alt="avatar" />
                            <h2>{learner.first_name} {learner.last_name}</h2>
                        </div>
                    </li>
                    </>
                )) : <p>No Learners Found 🫥</p>}
            </ul>
        </div>
        </>
    )
}

export default AllLearners;