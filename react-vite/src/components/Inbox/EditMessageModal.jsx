import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunkEditMessage } from "../../redux/messages";
import { useModal } from "../../context/Modal";
import Lottie from "lottie-web";
import waves from '../../lotties/waves-smaller.json';
import logo from '../../images/logo.png';
import './Conversation/Conversation.css';

const EditMessageModal = ({ conversationId, message, setUpdate }) => {
    const [text, setText] = useState(message.message);
    const dispatch = useDispatch();
    const{closeModal} = useModal();
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

    const handleSubmit  = (e) => {
        e.preventDefault();
        const payload = {
            message: text
        }

        console.log(payload)

        dispatch(thunkEditMessage(conversationId, message.id, payload))
        // setUpdate(true).then(closeModal)
        window.location.reload()
    }

    return(
        <>
        <div className="modal edit-message-modal">
        <div className="modal-logo">
        <img src={logo} alt="logo" />
        </div>
        <div id='edit-title'>
        <h1 className="page-title">Edit Your Message:</h1>
        </div>
        <div className="edit-modal-content">
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
             />
             <button onClick={handleSubmit}>Save</button>
        </form>
        </div>
        <div className="modal-animation" ref={container}></div>
        </div>
        </>
    )

};

export default EditMessageModal;