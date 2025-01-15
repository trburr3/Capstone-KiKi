// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const AllMessages = ({ conversationsArr }) => {
    const navigate = useNavigate();
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];
    const conversationTile = (conversation) => (
        <>
        {console.log(conversation.messages[(conversation.messages.length-1)])}
        <div className='convo-tile'>
        <div className='convo-image'>
        <img src={avatarArr[ (conversation.friend_pic - 1 )]} alt='avatar' />
        </div>
        <div>
        <h4>{conversation.between[0]} and {conversation.between[1]}</h4>
        <p className='convo-preview'>{conversation.messages[(conversation.messages.length-1)].message}</p>
        </div>
        <button><LiaLongArrowAltRightSolid onClick={() => navigate(`/inbox/${conversation.id}`)}/></button>
        </div>
        </>
    )
    return(
        <>
        <h2>Your messages:</h2>
        {conversationsArr? conversationsArr.map((conversation) => (
            conversationTile(conversation)
        )): <p>No messages yet!</p>}
        </>
    )
}

export default AllMessages;