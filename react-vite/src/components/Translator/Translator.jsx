import OpenModalButton from './OpenModalButton';
import './Translator.css';
import TranslatorModal from './TranslatorModal';
const Translator = () => {
    return(
        <OpenModalButton
        id='translator-modal-button'
        modalComponent={TranslatorModal}
        buttonText='+'
        onButtonClick
        onModalClose />
    )
}

export default Translator;