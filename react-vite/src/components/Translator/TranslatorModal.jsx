import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { thunkTranslate } from '../../redux/translate';
import Lottie from "lottie-web";
import waves from '../../lotties/waves-smaller.json';

const TranslatorModal = () => {
    const dispatch = useDispatch();
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('English');

    const res = useSelector(state => state.translation);

    const container = useRef(null);

    useEffect(() => {
      const anim = Lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: waves,
      })

      return () => anim.destroy();
    }, [container])

    useEffect(() => {
        setTranslatedText(res.translation[0])
    }, [res])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            text: originalText,
            language
        }

        const response = await dispatch(thunkTranslate(payload))

    }

    return (
        <>
        <div className='tranlator-container'>
            <h1>Ask <span>AzureAI</span>!</h1>
            <div className='translator-input'>
            <form className='translator-form' onSubmit={handleSubmit}>
                <div className='translator-input-buttons'>
                    <label>
                    <select className="language-select"value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option
                            value="English"
                            required>
                                Enlgish
                            </option>
                            <option
                            value="French"
                            required>
                                French
                            </option>
                            <option
                            value="Italian"
                            required>
                                Italian
                            </option>
                            <option
                            value="Japanese"
                            required>
                                Japanese
                            </option>
                            <option
                            value="Portuguese"
                            required>
                                Portuguese
                            </option>
                            <option
                            value="Spanish"
                            required>
                                Spanish
                            </option>
                        </select>
                        </label>
                    </div>
                <div className='translator-input-box'>
                    <label>
                        <input
                        type="textarea"
                        placeholder='Type here...'
                        value={originalText}
                        id='translator-input-field'
                        onChange={(e) => setOriginalText(e.target.value)}
                        required
                        ></input>
                    </label>
                    <button>Submit</button>
                </div>
            </form>
            </div>
            <div className='line'/>
            <div className='translator-output'>
                {translatedText ? <p>{translatedText}</p> : <p>Translating...</p>}
            </div>
            <div className="modal-animation" ref={container}></div>
        </div>
        </>
    )
};

export default TranslatorModal;