import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as messageActions from '../../../redux/messages';
import avatar1 from '../../../images/Avatar 1.png';
import avatar2 from '../../../images/Avatar 2.png';
import avatar3 from '../../../images/Avatar 3.png';
import avatar4 from '../../../images/Avatar 4.png';
import avatar5 from '../../../images/Avatar 5.png';
import OpenModalButton from "../../Translator/OpenModalButton";
import EditMessageModal from "../EditMessageModal";
import './Conversation.css';

const Conversation = () => {
    const dispatch = useDispatch();
    const {conversationId} = useParams();
    const user = useSelector(state => state.session.user)
    const messageData = useSelector(state => state.messages.conversations);
    const [newMessage, setNewMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [visible, setVisible] = useState(false);
    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];
    let messagesArr = [];

    if(messageData){
        for (let i = messageData[conversationId]?.messages.length - 1; i >= 0; i-- ){
            messagesArr.push(messageData[conversationId].messages[i])
        }
    }

    useEffect(() => {
        dispatch(messageActions.thunkGetAllConversations())
    }, [dispatch])

    useEffect(() => {
        if (newMessage) setDisabled(false)
    }, [newMessage])



    const handleSubmit = (e) => {
        e.preventDefault();
        let recipient_id;

        if (messageData[conversationId].between[0] == user.id) recipient_id = messageData[conversationId].user_two
        recipient_id = messageData[conversationId].user_one

        const payload = {
            recipient_id,
            message: newMessage
        }

        dispatch(messageActions.thunkCreateMessage(conversationId, payload))

        setNewMessage('')
        window.location.reload();
    }

    const handleDelete = (messageId) => {
        dispatch(messageActions.thunkDeleteMessage(conversationId, messageId))
    }

    return(
        <>
        <div className="convo-container">
        <h1 className="page-title">Conversation #{conversationId}</h1>
        <div className="message-list">
        <ul>
        {messagesArr ? messagesArr.map((message, index) => (
            <li key={index} className={user.first_name == message.from ? 'right' : 'left'}>
                <img className='message-sender-avatar' src={avatarArr[(message.sender_pic - 1)]} alt="avatar" />
                <div className="message-bubble" onClick={() => user.first_name == message.from ? setVisible(!visible) : ''}>
                    <p>{message.from}: {message.message}</p>
                    <br />
                    <p className='message-timestamp'>{message.updated_at}</p>
                    {visible && user.first_name == message.from ?
                    <>
                    <button onClick={() => {handleDelete(message.id)}}>X</button>
                    <OpenModalButton
                    buttonText='Edit'
                    modalComponent={<EditMessageModal conversationId={conversationId} message={message}/>}
                    onModalClose
                    onButtonClick
                    />
                    </>
                    : '' }
                </div>
            </li>
        )) : <p>Send a message to start a conversation!</p>}
        </ul>
        </div>
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <input
                type="textarea"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                />
                <button disabled={disabled}>Send</button>
            </form>
        </div>
        </div>
        </>
    )
};

export default Conversation;