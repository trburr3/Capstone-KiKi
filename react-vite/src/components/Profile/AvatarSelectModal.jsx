import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useState } from "react";
import './Profile.css';
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';


const AvatarSelectModal = ({prof_pic, setProfPic}) => {
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user);
    return (
        <>
          <div className="modal">
            <button onClick={closeModal}>X</button>
          <div className="modal-content">
          <div className="modal-header">
			      <h1>Change Avatar</h1>
            <p>Please select from one of the following:</p>
            <ul className="avatar-options">
              <li className={prof_pic == 1? 'selected' : ''} onClick={() => setProfPic(1) && closeModal}><img src={avatar1} alt="avatar1" /></li>
              <li className={prof_pic == 2? 'selected' : ''} onClick={() => setProfPic(2) && closeModal}><img src={avatar2} alt="avatar2" /></li>
              <li className={prof_pic == 3? 'selected' : ''} onClick={() => setProfPic(3) && closeModal}><img src={avatar3} alt="avatar3" /></li>
              <li className={prof_pic == 4? 'selected' : ''} onClick={() => setProfPic(4) && closeModal}><img src={avatar4} alt="avatar4" /></li>
              <li className={prof_pic == 5? 'selected' : ''} onClick={() => setProfPic(5) && closeModal}><img src={avatar5} alt="avatar5" /></li>
            </ul>
          </div>
          </div>
          </div>
        </>
      );

};

export default AvatarSelectModal;