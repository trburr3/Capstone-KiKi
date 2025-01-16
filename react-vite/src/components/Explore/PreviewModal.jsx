import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { FiUserCheck } from "react-icons/fi";
import { thunkAllFriends } from '../../redux/friends';
import { FaUserPlus } from "react-icons/fa";
import { thunkCreateConversation } from '../../redux/messages';
import { useModal } from '../../context/Modal';

const PreviewModal = ({ learner }) => {
    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const friendsData = useSelector(state => state.friends.allFriends)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];
    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];
    let friendsArr = [];

    useEffect(() => {
        if(message) setDisabled(false)
    }, [message]);

    useEffect(() => {
        dispatch(thunkAllFriends())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            recipient_id: learner.id,
            message
        }

        dispatch(thunkCreateConversation(payload))
        setMessage('')
        setVisible(false)
        closeModal
    }

    if (friendsData){
        let copy = Object.values(friendsData)
        for(let i = 0; i < copy.length; i++){
            friendsArr.push(copy[i].username)
        }
    }

    return(
        <>
        {/* {console.log(friendsArr.includes(learner.username))} */}
        <div className='modal preview-modal'>
            <div className='modal-header'>
                <h1>HI MY NAME IS: {learner.first_name}!</h1>
            </div>
            <div className='preview-image'>
                <img src={avatarArr[(learner.prof_pic - 1)]} alt='avatar' />
            </div>
            <div className='preview-info'>
                <p><span>Learning:</span> {learningFlags[learner.learning]}</p>
                <p><span>Level:</span> {levelArr[(learner.level - 1)]}</p>
                <p><span>Native:</span> {learningFlags[learner.native]}</p>
                <p><span>Bio:</span> {learner.bio}</p>
            </div>
            <div className='preview-buttons'>
                <button onClick={() => setVisible(!visible)}>💌</button>
                {visible ?
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                        placeholder="Say hello!"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <button disabled={disabled} onSubmit={handleSubmit}><LiaLongArrowAltRightSolid /></button>
                    </form>
                </> : ''}
                {!friendsArr.includes(learner.username) ?
                    <><button className='request-sent'><FaUserPlus /></button></>
                :
                    <><button><FiUserCheck /></button></>
                }
            </div>
        </div>
        </>
    )
};

export default PreviewModal;