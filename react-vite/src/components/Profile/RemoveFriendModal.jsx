import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveFriend } from "../../redux/friends";
import './Profile.css';
import { Link } from "react-router-dom";

const RemoveFriendModal = ({ friend, update, setUpdate }) => {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // return dispatch(thunkRemoveFriend(friend.id))
        //        .then(setUpdate(false))
        //        .then(closeModal)
        dispatch(thunkRemoveFriend(friend.id))
        closeModal()

    }
    return (
        <>
          <div className="modal">
          <div className="modal-content">
          <div className="modal-header">
		    <h1>Remove Friend</h1>

          <p>Are you sure you want to remove {friend.username} as a friend?</p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Yes, Remove.</button>
          <Link to={'/profile/friends'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          </div>
        </>
      );

};

export default RemoveFriendModal;