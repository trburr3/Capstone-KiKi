import OpenModalButton from './OpenModalButton';
import './Translator.css';
import TranslatorModal from './TranslatorModal';

const Translator = () => {

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }
    return(
        <div id='translator-modal-button'>
        <OpenModalButton
        modalComponent={<TranslatorModal />}
        buttonText='+'
        onButtonClick
        onModalClose />
        </div>
    )
}

export default Translator;