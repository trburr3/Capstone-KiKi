import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import './Inbox.css';
import Lottie from 'lottie-web';
import lion from '../../lotties/lion-fish.json';
import { Tooltip } from "react-tooltip";

const AllMessages = ({ conversationsArr }) => {
    const navigate = useNavigate();
    const container = useRef(null);
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

    useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: lion,
        })

        return () => anim.destroy();
      }, [container])

    const conversationTile = (conversation) => (
        <>
        <div className='convo-tile'>
        <div className='convo-image'>
        <img src={avatarArr[ (conversation?.friend_pic - 1 )]} alt='avatar' />
        </div>
        <div className='convo-desc'>
        <h4>{conversation?.between[0]} and {conversation?.between[1]}</h4>
        <p className='convo-preview'>{conversation?.messages[(conversation?.messages.length-1)]?.message}</p>
        </div>
        <button data-tooltip-id="message-tooltip" data-tooltip-content="Sea More"><LiaLongArrowAltRightSolid className='button-yes' onClick={() => navigate(`/inbox/${conversation?.id}`)}/></button>
        <Tooltip id='message-tooltip' place='left'/>
        </div>
        </>
    )
    return(
        <>
        <div className='convo-container'>
        {conversationsArr.length > 0  ? conversationsArr.map((conversation) => (
            conversationTile(conversation)
        )): <p className='no-message'>No messages yet!</p>}
        </div>
        <div className="lion-animation" ref={container}></div>
        </>
    )
}

export default AllMessages;