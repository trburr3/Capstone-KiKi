import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditProfile} from "../../redux/session";
import { useEffect, useRef } from "react";
import './Profile.css';
import { Link } from "react-router-dom";
import logo from '../../images/Logo.png';
import Lottie from "lottie-web";
import waves from '../../lotties/waves-smaller.json';

const EditProfileModal = ({ payload }) => {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(thunkEditProfile(payload))
               .then(closeModal)

    }
    return (
        <>
          <div className="modal edit-modal generic-modal">
          <div className="modal-content edit-modal generic-modal-content">
          <div className="modal-header edit-modal">
          <div className="modal-logo">
          <img src={logo} alt="logo" />
          </div>
		      <h1>Edit Profile</h1>

          <p>Are you sure you want to make this change?</p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Save Edit</button>
          <Link to={'/profile'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          <div className="modal-animation" ref={container}></div>
          </div>
        </>
      );

};

export default EditProfileModal;