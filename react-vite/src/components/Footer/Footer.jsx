import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Footer.css";

function Footer() {
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (user) setDisabled(false)
    }, [user])

  return (
    <>
    <div className="footer-container">
        <button className="footer-button" id="forum-button" disabled={disabled} onClick={() => navigate('/posts')}>
            FORUM
        </button>
        <button className="footer-button" id="explore-button" disabled={disabled} onClick={() => navigate('/explore')}>
            EXLPORE
        </button>
        <button className="footer-button" id="inbox-button" disabled={disabled} onClick={() => navigate('/')}>
            INBOX
        </button>
    </div>
    </>
  );
}

export default Footer;
