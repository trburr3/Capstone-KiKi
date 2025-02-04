import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as friendActions from '../../redux/friends';
import * as messageActions from '../../redux/messages';
import AllMessages from "./AllMessages";
import AllRequests from "./AllRequests";
import anchor from '../../images/anchor.png'
import './Inbox.css';

const Inbox = ({ inboxState }) => {
    const dispatch = useDispatch();
    let [activeSection, setActiveSection] = useState('messages');
    const conversationsData = useSelector(state => state.messages.conversations);
    // const {sent, received} = useSelector(state => state.friends.requests);
    let conversationsArr = [];

    useEffect(() => {
        if (inboxState) setActiveSection(inboxState)
    },[inboxState]);
    useEffect(() => {
        dispatch(friendActions.thunkGetAllRequests())
        dispatch(messageActions.thunkGetAllConversations())
    },[dispatch]);

    if (conversationsData) {
        let copy = Object.values(conversationsData)
        for (let i = copy.length - 1; i >= 0; i--){
            if(copy[i].messages.length > 0) conversationsArr.push(copy[i])
        }
    };

    const renderSection = () => {
        switch(activeSection) {
            case 'messages': {
                return <AllMessages conversationsArr={conversationsArr}/>
            }
            case 'requests':{
                return <AllRequests />
            }
        }
    }

    return (
        <>
        <div className="header-container">
        <img src={anchor} alt="anchor" id='title-anchor'/><h1 className="page-title">Inbox Page</h1><img src={anchor} alt="anchor" id='title-anchor'/>
        </div>
        <div className="inbox-header">
            <nav>
			    <button
				    className={activeSection === 'messages' ? 'active' : ''}
				    onClick={() => setActiveSection('messages')}>
				    Messages
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