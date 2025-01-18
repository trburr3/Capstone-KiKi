import OpenModalButton from './OpenModalButton';
import './Translator.css';
import TranslatorModal from './TranslatorModal';
import { Tooltip } from 'react-tooltip';

const Translator = () => {

    return(
        <div id='translator-modal-button' data-tooltip-id="translator-tooltip" data-tooltip-content="Need help?">
        <Tooltip id="translator-tooltip" />
        <OpenModalButton
        modalComponent={<TranslatorModal />}
        buttonText='+'
        onButtonClick
        onModalClose />
        </div>
    )
}

export default Translator;