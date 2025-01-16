import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkTranslate } from '../../redux/translate';

const TranslatorModal = () => {
    const dispatch = useDispatch();
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('English');

    const res = useSelector(state => state.translation)

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
        <div className='tranlator-container modal'>
            {/* <div className='translator-header'> */}
            <h1>Ask <span>AzureAI</span>!</h1>
            {/* </div> */}
            <div className='translator-input'>
            <form className='translator-form' onSubmit={handleSubmit}>
                <div className='translator-input-buttons'>
                    <label>
                    {/* Language: */}
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
        </div>
        </>
    )
};

export default TranslatorModal;