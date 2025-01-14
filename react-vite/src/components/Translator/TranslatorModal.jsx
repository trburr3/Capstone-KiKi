import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { thunkTranslate } from '../../redux/translate';

const TranslatorModal = () => {
    // const {closeModal} = useModal()
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

        // console.log(originalText)
        // console.log(language)
        const payload = {
            text: originalText,
            language
        }

        const response = await dispatch(thunkTranslate(payload))

    }

    // console.log(res.translation[0])

    return (
        <>
        <div className='tranlator-container modal'>
            <h1>Ask AzureAI!</h1>
            <div className='translator-input'>
            <form className='translator-form' onSubmit={handleSubmit}>
                <div className='translator-input-buttons'>
                    <label>
                    Language:
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
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