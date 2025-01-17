import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditProfile} from "../../redux/session";
import './Profile.css';
import { Link } from "react-router-dom";

const EditProfileModal = ({ payload }) => {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(thunkEditProfile(payload))
               .then(closeModal)

    }
    return (
        <>
          <div className="modal edit-modal">
          <div className="modal-content edit-modal">
          <div className="modal-header edit-modal">
		    <h1>Edit Profile</h1>

          <p>Are you sure you want to make this change?</p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Save Edit</button>
          <Link to={'/profile'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          </div>
        </>
      );

};

export default EditProfileModal;