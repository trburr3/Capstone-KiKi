import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./Footer.css";

function Footer() {
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [disabled, setDisabled] = useState(true)

    if (user) setDisabled(false)

  return (
    <>
    <div className="footer-container">
        <button className="footer-button" id="forum-button" disabled={disabled} onClick={navigate('/')}>
            FORUM
        </button>
        <button className="footer-button" id="explore-button" disabled={disabled} onClick={navigate('/')}>
            EXLPORE
        </button>
        <button className="footer-button" id="inbox-button" disabled={disabled} onClick={navigate('/')}>
            INBOX
        </button>
    </div>
    </>
  );
}

export default Footer;
