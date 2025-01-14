import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import { useState, useEffect } from "react";

const FADE_INTERVAL_MS = 2750
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 4
const WORDS_TO_ANIMATE = ['Welcome', 'Bienvenue', 'Bienvenido', 'Benvenuto', 'Bem-vindo', 'いらっしゃいませ']

// const logo = require('../../../dist/assets/Logo.png')

const LandingPage = () => {
    const navigate = useNavigate();
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' })
    const [wordOrder, setWordOrder] = useState(0)
    // const user = useSelector(state => state.seesion.user)

    // if (user) navigate('/explore')

    useEffect(() => {
        const fadeTimeout = setInterval(() => {
          fadeProp.fade === 'fade-in' ? setFadeProp({ fade: 'fade-out' }) : setFadeProp({ fade: 'fade-in' })
        }, FADE_INTERVAL_MS)

        return () => clearInterval(fadeTimeout)
      }, [fadeProp, setFadeProp])

    useEffect(() => {
        const wordTimeout = setInterval(() => {
          setWordOrder((prevWordOrder) => (prevWordOrder + 1) % WORDS_TO_ANIMATE.length)
        }, WORD_CHANGE_INTERVAL_MS)

        return () => clearInterval(wordTimeout)
      }, [])

    const hoverHandler = () => setIsAutoScroll(false)
    const blurHandler = () => setIsAutoScroll(true)

    return (
        <>
        {/* {console.log(logo)} */}
        <div className="landing-page">
        <div className="landing-page-title">
            <h1 id='greeting' className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</h1>
            <br />
            <h2>to KIKI!</h2>
        </div>
        <br />
        <div className="landing-page-text">
            <p>Log in to connect with other learners in your area!</p>
        </div>
        <br/>
        <div className={`landing-page-flags-container ${isAutoScroll ? 'play' : 'pause'}`} onMouseEnter={hoverHandler} onMouseLeave={blurHandler}>
            <ul className="inner_scoller">
                <li className="li-landing-page-flag">🇯🇵</li>
                <li className="li-landing-page-flag">🇺🇸</li>
                <li className="li-landing-page-flag">🇨🇺</li>
                <li className="li-landing-page-flag">🇩🇴</li>
                <li className="li-landing-page-flag">🇧🇷</li>
                <li className="li-landing-page-flag">🇫🇷</li>
                <li className="li-landing-page-flag">🇲🇽</li>
                <li className="li-landing-page-flag">🇨🇴</li>
            </ul>
        </div>
        </div>
        </>
    )
};

export default LandingPage;