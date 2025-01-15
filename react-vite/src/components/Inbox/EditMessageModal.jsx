import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkEditMessage } from "../../redux/messages";
import { useModal } from "../../context/Modal";

const EditMessageModal = ({ conversationId, message }) => {
    const [text, setText] = useState(message.message);
    const dispatch = useDispatch();
    const{closeModal} = useModal()

    const handleSubmit  = (e) => {
        e.preventDefault();
        const payload = {
            message: text
        }

        console.log(payload)

        dispatch(thunkEditMessage(conversationId, message.id, payload))
        // window.location.reload()
    }

    return(
        <>
        <div className="modal edit-message-modal">
        <h1>Edit Your Message:</h1>
        <div className="modal-content">
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
             />
             <button onClick={handleSubmit}>Save</button>
        </form>
        </div>
        </div>
        </>
    )

};

export default EditMessageModal;