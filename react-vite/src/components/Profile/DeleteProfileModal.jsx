import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { thunkDeleteProfile } from "../../redux/session";
import './Profile.css';
import { Link } from "react-router-dom";

const DeleteProfileModal = () => {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(thunkDeleteProfile(user))
               .then(closeModal)
               .then(navigate('/'))
    }
    return (
        <>
          <div className="modal delete-modal">
          <div className="modal-content delete-modal">
          <div className="modal-header delete-modal">
			<h1>Delete Profile</h1>
          <p>Are you sure you want to make this change?</p>
          <p>This action cannot be undone.</p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Delete</button>
          <Link to={'/profile'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          </div>
        </>
      );

};

export default DeleteProfileModal;