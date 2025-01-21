import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
import { thunkDeletePost } from "../../redux/posts";
import { Link } from "react-router-dom";

const DeletePostModal = ({ post }) => {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    // const navigate = useNavigate();

    // const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(thunkDeletePost(post.id))
               .then(closeModal)
            //    .then(navigate('/'))
    }
    return (
        <>
          <div className="modal">
          <div className="modal-content">
          <div className="modal-header">
			<h1>Delete Post</h1>
          <p>Are you sure you want to make this change?</p>
          <p>This action cannot be undone.</p>

          <button type="Submit" className='button-yes' onClick={handleSubmit}>Delete</button>
          <Link to={'/profile/posts'} onClick={closeModal}>No, Go Back.</Link>

          </div>
          </div>
          </div>
        </>
      );

};

export default DeletePostModal;