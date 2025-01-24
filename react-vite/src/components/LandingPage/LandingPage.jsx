// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './LandingPage.css';
import { useState, useEffect, useRef } from "react";
// import Lottie from 'react-lottie';
import Lottie from "lottie-web";
// import SignupFormPage from "../SignupFormPage/SignupFormPage";
import fish from '../../lotties/fish-lottie.json';
// import scene from '../../images/Landing-Scene.png';

const FADE_INTERVAL_MS = 2750
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 4
const WORDS_TO_ANIMATE = ['Welcome', 'Bienvenue', 'Bienvenido', 'Benvenuto', 'Bem-vindo', 'いらっしゃいませ']

const LandingPage = () => {
    // const navigate = useNavigate();
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' });
    const [wordOrder, setWordOrder] = useState(0);
    const container = useRef(null);

    useEffect(() => {
      const anim = Lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: fish,
      })

      return () => anim.destroy();
    }, [container])

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
        <div className="landing-page">
        <div className="landing-page-title">
            <h1 id='greeting' className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</h1>
            <br />
            <h2>to KIKI!</h2>
        </div>
        <br />
        <div className="bottom-animation" ref={container}></div>
        <div className="landing-page-text">
            <p>Log in to connect with other learners in your area!</p>
            <Link to='/signup'>Need an account?</Link>
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
                <li className="li-landing-page-flag">🇮🇹</li>
                <li className="li-landing-page-flag">🇲🇽</li>
                <li className="li-landing-page-flag">🇨🇴</li>
            </ul>
        </div>
        </div>
        </>
    )
};

export default LandingPage;