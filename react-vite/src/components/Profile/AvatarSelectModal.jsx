import { useModal } from "../../context/Modal";
import './Profile.css';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';


const AvatarSelectModal = ({prof_pic, setProfPic}) => {
    const { closeModal } = useModal();

    return (
        <>
          <div className="modal avatar-modal">
            <button onClick={closeModal}>X</button>
          <div className="modal-content avatar-modal">
          <div className="modal-header avatar-modal">
			      <h1>Change Avatar</h1>
            <p>Please select from one of the following:</p>
            <div>
            <ul className="avatar-options">
              <li className={prof_pic == 1? 'selected' : ''} onClick={() => setProfPic(1)}><img src={avatar1} alt="avatar1" /></li>
              <li className={prof_pic == 2? 'selected' : ''} onClick={() => setProfPic(2)}><img src={avatar2} alt="avatar2" /></li>
              <li className={prof_pic == 3? 'selected' : ''} onClick={() => setProfPic(3)}><img src={avatar3} alt="avatar3" /></li>
              <li className={prof_pic == 4? 'selected' : ''} onClick={() => setProfPic(4)}><img src={avatar4} alt="avatar4" /></li>
              <li className={prof_pic == 5? 'selected' : ''} onClick={() => setProfPic(5)}><img src={avatar5} alt="avatar5" /></li>
            </ul>
            </div>
          </div>
          </div>
          </div>
        </>
      );

};

export default AvatarSelectModal;