import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveFriend } from "../../redux/friends";
import { useEffect, useRef } from "react";
import './Profile.css';
import { Link } from "react-router-dom";
import './Profile.css';
import logo from '../../images/Logo.png';
import Lottie from "lottie-web";
import waves from '../../lotties/waves-smaller.json';

const RemoveFriendModal = ({ friend, update, setUpdate }) => {
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

        // return dispatch(thunkRemoveFriend(friend.id))
        //        .then(setUpdate(false))
        //        .then(closeModal)
        dispatch(thunkRemoveFriend(friend.id))
        closeModal()

    }
    return (
        <>
          <div className="generic-modal">
          <div className="generic-modal-content">
          <div className="modal-header">
          <div className="modal-logo">
          <img src={logo} alt="logo" />
          </div>
		      <h1 className="page-title">Remove Friend</h1>

          <p>Are you sure you want to remove <span className="bold">{friend.username}</span> as a friend?</p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Yes, Remove.</button>
          <Link to={'/profile/friends'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          <div className="modal-animation" ref={container}></div>
          </div>
        </>
      );

};

export default RemoveFriendModal;