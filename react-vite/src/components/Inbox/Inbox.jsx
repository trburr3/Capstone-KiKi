import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as friendActions from '../../redux/friends';
import * as messageActions from '../../redux/messages';
import AllMessages from "./AllMessages";
import AllRequests from "./AllRequests";

const Inbox = ({ profileState }) => {
    const dispatch = useDispatch();
    let [activeSection, setActiveSection] = useState('messages');
    const messageData = useSelector(state => state.messages.messages);
    const {sent, received} = useSelector(state => state.friends.requests);
    let messagesArr;

    useEffect(() => {
        if (profileState) setActiveSection(profileState)
    },[profileState]);
    useEffect(() => {
        dispatch(friendActions.thunkGetAllRequests())
        dispatch(messageActions.thunkGetAllMessages())
    },[dispatch]);

    const renderSection = () => {
        switch(activeSection) {
            case 'messages': {
                return <AllMessages messagesArr={messagesArr}/>
            }
            case 'requests':{
                return <AllRequests />
            }
        }
    }

    if (messageData) messagesArr = Object.values(messageData);
    return (
        <>
        {console.log('HOW WE LOOKIN?', '----->', messagesArr, '=====>', sent, '||||||||||', received)}
        <h1>Inbox Page</h1>
        <div className="inbox-header">
            <nav>
			    <button
				    className={activeSection === 'messages' ? 'active' : ''}
				    onClick={() => setActiveSection('messages')}>
				    Message
			    </button>
			    <button
				    className={activeSection === 'requests' ? 'active' : ''}
				    onClick={() => setActiveSection('requests')}>
				    Requests
			    </button>
		    </nav>
        </div>
        {renderSection()}
        </>
    )
};

export default Inbox;