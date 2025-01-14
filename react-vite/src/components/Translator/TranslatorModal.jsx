import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const TranslatorModal = () => {
    const dispatch = useDispatch();
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('English');

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(originalText)
        console.log(language)

        // res = await dispatch(thunkTranslate(originalText))

        // setTranslatedText(res)

        return
    }

    return (
        <>
        <div className='tranlator-container modal'>
            <h1>Ask AzureAI!</h1>
            <div className='translator-input'>
            <form className='translator-form' onSubmit={handleSubmit}>
                <div className='translator-input-buttons'>
                    Language:
                        <label>
                            <input
                            type="radio"
                            value="English"
                            checked={language == "Enlgish"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="English"
                            checked={language == "Enlgish"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="French"
                            checked={language == "French"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Italian"
                            checked={language == "Italian"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Japanese"
                            checked={language == "Japanese"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Portuguese"
                            checked={language == "Portuguese"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Spanish"
                            checked={language == "Spanish"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                            </input>
                        </label>
                    </div>
                <div className='translator-input-box'>
                    <label>
                        <input
                        type="textarea"
                        placeholder='Type here...'
                        value={originalText}
                        onChange={(e) => setOriginalText(e.target.value)}
                        required
                        ></input>
                    </label>
                </div>
            </form>
            </div>
            <div className='translator-output'>
                <inpt
                type="textarea"
                placeholder='Tranlating...'
                value={translatedText}
                ></inpt>
            </div>
        </div>
        </>
    )
};

export default TranslatorModal;