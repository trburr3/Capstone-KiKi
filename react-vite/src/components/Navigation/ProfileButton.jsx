import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { CgNotifications } from "react-icons/cg";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import OpenModalButton from "../Translator/OpenModalButton";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      <button className="profile-button-one" onClick={toggleMenu}>
        <FaUserCircle />
        <IoIosArrowDropdownCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hey, {user.username}!</li>
              <li>{user.email}</li>
              <li><Link to={'/profile'}>Dashboard</Link></li>
              <li><Link to={'/profile/friends'}>Friends</Link></li>
              <li><Link to={'/explore'}>Explore</Link></li>
              <li><Link to={'/profile/posts'}>Manage Posts</Link></li>
              <li className="menu-item inbox">
              <Link to={'/inbox'}>
                Inbox
                <div id='inbox-icon'>
                <CgNotifications />
                </div>
              </Link>
                </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
                // onModalClose={() => navigate('/explore')}
              />
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
