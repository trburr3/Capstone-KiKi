import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';

const TranslatorModal = () => {
    const {closeModal} = useModal()
    const dispatch = useDispatch();
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('English');

    const handleSubmit = async (e) => {
        e.stopPropagation()

        console.log(originalText)
        console.log(language)

        // res = await dispatch(thunkTranslate(originalText))

        // setTranslatedText(res)
        closeModal

        return
    }

    return (
        <>
        <div className='tranlator-container modal'>
            <h1>Ask AzureAI!</h1>
            <div className='translator-input'>
            <form className='translator-form' onSubmit={handleSubmit}>
                <div className='translator-input-buttons'>
                    <label>
                    Language:
                    <select>
                        {/* <label> */}
                            <option
                            // type="radio"
                            value="English"
                            // checked={language == ""}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                                Enlgish
                            </option>
                        {/* </label> */}
                        {/* <label> */}
                            <option
                            // type="radio"
                            value="French"
                            // checked={language == "French"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                                French
                            </option>
                        {/* </label> */}
                        {/* <label> */}
                            <option
                            // type="radio"
                            value="Italian"
                            // checked={language == "Italian"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                                Italian
                            </option>
                        {/* </label> */}
                        {/* <label> */}
                            <option
                            // type="radio"
                            value="Japanese"
                            // checked={language == "Japanese"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                                Japanese
                            </option>
                        {/* </label> */}
                        {/* <label> */}
                            <option
                            // type="radio"
                            value="Portuguese"
                            // checked={language == "Portuguese"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                                Portuguese
                            </option>
                        {/* </label> */}
                        {/* <label> */}
                            <option
                            // type="radio"
                            value="Spanish"
                            // checked={language == "Spanish"}
                            onChange={(e) => setLanguage(e.target.value)}
                            required>
                                Spanish
                            </option>
                        {/* </label> */}
                        </select>
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
                    <button>Submit</button>
                </div>
                <br />
                <div className='translator-output'>
                    {translatedText ? <p>{translatedText}</p> : <p>Translating...</p>}
                </div>
            </form>
            </div>
        </div>
        </>
    )
};

export default TranslatorModal;