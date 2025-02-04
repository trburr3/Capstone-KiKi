import { useDispatch, useSelector } from "react-redux";
import * as friendActions from '../../redux/friends';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { thunkGetAllRequests } from "../../redux/friends";
import Lottie from "lottie-web";
import turtle from '../../lotties/turtle.json';

const AllRequests = () => {
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(true);
    let {sent, received} = useSelector(state => state.friends.requests);
    const container = useRef(null);
    sent = Object.values(sent)
    received = Object.values(received)

    useEffect(() => {
        if(update){
            dispatch(thunkGetAllRequests())
            setUpdate(false)
        }
    }, [dispatch, update])

    useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: turtle,
        })

        return () => anim.destroy();
      }, [container])

    const handleClick = (action, request) => {
        switch(action){
            case 'delete':{
                dispatch(friendActions.thunkDeleteRequest(request))
                setUpdate(true)
                return
            }
            case 'accept':{
                const payload = {
                    id: request?.id,
                    sender_id: request?.friend_id,
                    response: true
                }
                dispatch(friendActions.thunkRequestResponse(payload))
                setUpdate(true)
                return
            }
            case 'decline':{
                const payload = {
                    id: request?.id
                }
                dispatch(friendActions.thunkRequestResponse(payload))
                setUpdate(true)
                return
            }
        }
    }

    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];

    return(
        <>
        <div className="requests-list list">
            <div className="sent-requests-list list">
                <h2>Sent:</h2>
                <ul>
                    {sent.length > 0 ? sent.map((request, index) =>(
                        <>
                        <li key={index} className="request-tile">
                            <img src={avatarArr[( request.prof_pic - 1 )]} alt="avatar" />
                            <p><span id='request-sender'>{request.username}</span> has received your friend request!</p>
                            <button onClick={() => handleClick('delete', request?.id)}>X</button>
                        </li>
                        </>
                    )) : <p>Send a request to see it appear here!</p>}
                </ul>
            </div>
            <div className="received-requests-list list">
                <h2>Received:</h2>
                <ul>
                {received.length > 0 ? received.map((request, index) =>(
                        <>
                        <li key={index} className="request-tile">
                            <img src={avatarArr[( request.prof_pic - 1 )]} alt="avatar" />
                            <p><span id='request-sender'>{request.username}</span> has sent you a friend request!</p>
                            {request.pending == true ?
                                <>
                                <div className="request-buttons">
                                <button onClick={() => handleClick('accept', request)}><IoCheckmarkSharp className='button-yes accept' /></button>
                                <button onClick={() => handleClick('decline', request)}><FaXmark className='button-no decline'/></button>
                                </div>
                                </>
                            :
                                ''
                            }
                        </li>
                        </>
                    )) : <p>You have not received any new request.</p>}
                </ul>
            </div>
            <div className="turtle-animation" ref={container}></div>
        </div>
        </>
    )
}

export default AllRequests;