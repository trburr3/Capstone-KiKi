import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OpenModalButton from "../Translator/OpenModalButton";
import EditProfileModal from './EditProfileModal';
import DeleteProfileModal from './DeleteProfileModal';
import AvatarSelectModal from "./AvatarSelectModal";
import avatar1 from '../../images/Avatar 1.png'
import avatar2 from '../../images/Avatar 2.png'
import avatar3 from '../../images/Avatar 3.png'
import avatar4 from '../../images/Avatar 4.png'
import avatar5 from '../../images/Avatar 5.png'

const ProfilePage = ({ profileState }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const [first_name, setFirstName] = useState(user?.first_name);
	const [last_name, setLastName] = useState(user?.last_name);
	const [email, setEmail] = useState(user?.email);
	const [city, setCity] = useState(user?.city);
	const [state, setState] = useState(user?.state);
	const [learning, setLearning] = useState(user?.learning);
    const [level, setLevel] = useState(user?.level);
    const [prof_pic, setProfPic] = useState(user?.prof_pic);
    const [bio, setBio] = useState(user?.bio);
    let [activeSection, setActiveSection] = useState('achievements');

    useEffect(() => {
        if(profileState) setActiveSection(profileState)
    }, [profileState]);

    // useEffect(() => {}, [dispatch]);

    const payload = {
        first_name,
        last_name,
        email,
        city,
        state,
        learning,
        level,
        prof_pic,
        bio
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5]

    const renderSection = () => {
        switch (activeSection) {
            case 'achievements':{
                return(
                    <h3>Achievements</h3>
                )
            }
            case 'edit-profile':{
                return (
					<section id='edit-profile'>
					<h3>Edit Profile</h3>
					<form onSubmit={handleSubmit}>
						<div className='form-info'>
						<div>
							<label>First Name</label>
							<input
								type='text'
								defaultValue={user.first_name ? user.first_name : ''}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<label>Last Name</label>
							<input
								type='text'
								defaultValue={user.last_name ? user.last_name : ''}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div>
							<label>Email</label>
							<input
								type='email'
								defaultValue={user.email ? user.email : ''}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label>City</label>
							<input
								type='text'
								defaultValue={user.city ? user.city : ''}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div>
							<label>State</label>
							<input
								type='text'
								defaultValue={user.state ? user.state : ''}
								onChange={(e) => setState(e.target.value)}
							/>
						</div>
						<div>
							<label>Learning</label>
                            <select>
                                <option
                                    value="English"
                                    onChange={(e) => setLearning(e.target.value)}
                                    required>
                                    Enlgish
                                </option>
                                <option
                                    value="French"
                                    onChange={(e) => setLearning(e.target.value)}
                                    required>
                                    French
                                </option>
                                <option
                                    value="Italian"
                                    onChange={(e) => setLearning(e.target.value)}
                                    required>
                                    Italian
                                </option>
                                <option
                                    value="Japanese"
                                    onChange={(e) => setLearning(e.target.value)}
                                    required>
                                    Japanese
                                </option>
                                <option
                                    value="Portuguese"
                                    onChange={(e) => setLearning(e.target.value)}
                                    required>
                                    Portuguese
                                </option>
                                <option
                                    value="Spanish"
                                    onChange={(e) => setLearning(e.target.value)}
                                    required>
                                    Spanish
                                </option>
                            </select>
						</div>
                        <div>
							<label>Level</label>
							<select>
                                <option
                                    value="1"
                                    onChange={(e) => setLevel(e.target.value)}
                                    required>
                                    Beginner
                                </option>
                                <option
                                value="2"
                                onChange={(e) => setLevel(e.target.value)}
                                required>
                                    Intermediate
                                </option>
                                <option
                                value="3"
                                onChange={(e) => setLevel(e.target.value)}
                                required>
                                    Master
                                </option>
                            </select>
						</div>
                        <div>
							<label>Bio</label>
							<input
								type='textarea'
								defaultValue={user.bio ? user.bio : ''}
								onChange={(e) => setBio(e.target.value)}
							/>
						</div>
                        <div className="edit-profile-pic">
                            <img src="" alt="" />
                            <h4>Edit Avatar</h4>
                            <p>Choose a new avatar to fit your mood!</p>
                            <OpenModalButton
                            buttonText='Select'
                            modalComponent={<AvatarSelectModal prof_pic={prof_pic} setProfPic={setProfPic}/>}
                            onButtonClick
                            onModalClose
                            />
                        </div>
					<OpenModalButton
					buttonText="Save Changes"
					modalComponent={<EditProfileModal payload={payload} />}
					onButtonClick
					onModalClose
					/>
					<OpenModalButton
					buttonText="Delete Profile"
					modalComponent={<DeleteProfileModal />}
					onButtonClick
					onModalClose
					/>
					</div>
					</form>
					</section>
				);
            }
            case 'friends':{
                return(
                    <h3>Friends</h3>
                )
            }
            case 'posts':{
                return(
                    <h3>Posts</h3>
                )
            }
            default:{
                return null
            }
        }
    };
    return (
		<div className='profile-page'>
			<section className='user-info'>
				<div className='profile-picture'>
					<img
						src={avatarArr[(user.prof_pic - 1 )]}
						alt='Profile'
					/>
					<button onClick={() => setActiveSection('edit-profile')}>
						Edit Profile
					</button>
				</div>
				<div className='dashboard-title'>
					<h2>
						{user?.first_name} {user?.last_name} Dashboard
					</h2>
					<p>
						{user?.city}, {user?.state}
					</p>
					<nav>
						<button
							className={activeSection === 'achievements' ? 'active' : ''}
							onClick={() => setActiveSection('achievements')}>
							Achievemnts
						</button>
						{/* <button
							className={activeSection === 'edit-profile' ? 'active' : ''}
							onClick={() => setActiveSection('edit-profile')}>
							Edit Profile
						</button> */}
						<button
							className={activeSection === 'friends' ? 'active' : ''}
							onClick={() => setActiveSection('friends')}>
							Friends
						</button>
						<button
							className={activeSection === 'posts' ? 'active' : ''}
							onClick={() => setActiveSection('posts')}>
							Posts
						</button>
					</nav>
				</div>
			</section>
			{renderSection()}
		</div>
	);
}
export default ProfilePage;