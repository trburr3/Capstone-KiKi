import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import { thunkDeletePost } from "../../redux/posts";
import { Link } from "react-router-dom";
import '../Profile/Profile.css';
import logo from '../../images/Logo.png';
import Lottie from "lottie-web";
import waves from '../../lotties/waves-smaller.json';

const DeletePostModal = ({ post }) => {
    const { closeModal } = useModal();

    const dispatch = useDispatch();
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

        return dispatch(thunkDeletePost(post.id))
               .then(closeModal)
    }
    return (
        <>
          <div className="generic-modal">
          <div className="generic-modal-content">
          <div className="modal-header">
          <div className="modal-logo">
          <img src={logo} alt="logo" />
          </div>
			    <h1 className="page-title">Delete Post</h1>
          <p>Are you sure you want to make this change?</p>
          <p><span className="italics">This action cannot be undone.</span></p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Delete</button>
          <Link to={'/profile/posts'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          <div className="modal-animation" ref={container}></div>
          </div>
        </>
      );

};

export default DeletePostModal;