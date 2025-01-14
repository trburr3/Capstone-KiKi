import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
import './Profile.css';
// import { Link } from "react-router-dom";

const AvatarSelectModal = ({prof_pic, setProfPic}) => {
    const { closeModal } = useModal();

    // const dispatch = useDispatch();

    // const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     return dispatch(thunkDeleteProfile(user))
    //            .then(closeModal)
    // }
    return (
        <>
          <div className="modal">
            <button onClick={closeModal}>X</button>
          <div className="modal-content">
          <div className="modal-header">
			<h1>Change Avatar</h1>
          <p>Please select from one of the following:</p>
          <ul className="avatar-options">
            <li className={prof_pic == 1? 'selected' : ''} onClick={() => setProfPic(1) && closeModal}>1</li>
            <li className={prof_pic == 2? 'selected' : ''} onClick={() => setProfPic(2) && closeModal}>2</li>
            <li className={prof_pic == 3? 'selected' : ''} onClick={() => setProfPic(3) && closeModal}>3</li>
            <li className={prof_pic == 4? 'selected' : ''} onClick={() => setProfPic(4) && closeModal}>4</li>
            <li className={prof_pic == 5? 'selected' : ''} onClick={() => setProfPic(5) && closeModal}>5</li>
          </ul>

          {/* <button type="Submit" className='button-yes' onClick={handleSubmit}>Delete</button> */}
          {/* <Link to={'/profile'} onClick={closeModal}>No, Go Back.</Link> */}

          </div>
          </div>
          </div>
        </>
      );

};

export default AvatarSelectModal;