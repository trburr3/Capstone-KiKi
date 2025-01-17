import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../Translator/OpenModalButton";
import EditProfileModal from './EditProfileModal';
import DeleteProfileModal from './DeleteProfileModal';
import DeletePostModal from "../Posts/DeletePostModal";
import AvatarSelectModal from "./AvatarSelectModal";
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';
import { thunkAllFriends } from '../../redux/friends'
import { thunkGetAchievements, thunkGetAllUserPosts } from "../../redux/session";
import { FaChampagneGlasses } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import RemoveFriendModal from "./RemoveFriendModal";

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

    useEffect(() => {
        dispatch(thunkAllFriends())
        dispatch(thunkGetAchievements())
        dispatch(thunkGetAllUserPosts())
    }, [dispatch]);

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

    const {allFriends, friend} = useSelector(state => state.friends);

    const achievements = useSelector(state => state.session.achievements);

    const {published, privated} = useSelector(state => state.session.posts);


    let friendsArr = Object.values(allFriends);

    let achievementsArr = Object.values(achievements)[0];

    let publicPostArr = Object.values(published);

    let privatePostArr = Object.values(privated);

    let avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5];
    let learningFlags = {"English": '🇺🇸', "French": '🇫🇷', "Italian": '🇮🇹', "Japanese": '🇯🇵', "Portuguese": '🇧🇷', "Spanish": '🇲🇽' };
    let levelArr = ['🥉', '🥈', '🥇'];

    const renderSection = () => {
        switch (activeSection) {
            case 'achievements':{
                return(
                    <>
                    <h3 className="subtitle">Achievements</h3>
                    <ul className="achievement-list">
                    {
                        achievementsArr?.includes(1) &&
                        <>
                        <li className="li-achievement">
                        <FaChampagneGlasses />
                        <p>Make 3 Friends</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(2) &&
                        <>
                        <li className="li-achievement">
                        <FaDiscord />
                        <p>Send 5 Messages</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(3) &&
                        <>
                        <li className="li-achievement">
                        <FaGlobe />
                        <p>Make a Public Post</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(4) &&
                        <>
                        <li className="li-achievement">
                        <FaLightbulb />
                        <p>Write 3 Comments</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(5) &&
                        <>
                        <li className="li-achievement">
                        <FaHeartCircleBolt />
                        <p>Like 5 Posts</p>
                        </li>
                        </>
                    }
                    </ul>
                    </>
                )
            }
            case 'edit-profile':{
                return (
					<section id='edit-profile'>
					<h3 className="subtitle">Edit Profile</h3>
					<form onSubmit={handleSubmit}>
						<div className='form-info edit'>
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
                            <select value={learning} onChange={(e) => setLearning(e.target.value)}>
                                <option
                                    value="English"
                                    required>
                                    Enlgish
                                </option>
                                <option
                                    value="French"
                                    required>
                                    French
                                </option>
                                <option
                                    value="Italian"
                                    required>
                                    Italian
                                </option>
                                <option
                                    value="Japanese"
                                    required>
                                    Japanese
                                </option>
                                <option
                                    value="Portuguese"
                                    required>
                                    Portuguese
                                </option>
                                <option
                                    value="Spanish"
                                    required>
                                    Spanish
                                </option>
                            </select>
						</div>
                        <div>
							<label>Level</label>
							<select value={level} onChange={(e) => setLevel(e.target.value)}>
                                <option
                                    value="1"
                                    required>
                                    Beginner
                                </option>
                                <option
                                value="2"
                                required>
                                    Intermediate
                                </option>
                                <option
                                value="3"
                                required>
                                    Master
                                </option>
                            </select>
						</div>
                        <div id='edit-bio'>
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
                    <>
                    <h3 className="subtitle">Friends</h3>
                    <ul className="friends-list">
                    {friendsArr?.map((friend, index) => (
                        <li key={index} className="friend-tile">
                            <img src={avatarArr[(friend.prof_pic - 1 )]} alt="friend-avatar" />
                            <p>{friend.username}</p>
                            <OpenModalButton
                            buttonText='x'
                            modalComponent={<RemoveFriendModal friend={friend}/>}
                            onButtonClick
                            onModalClose
                            />
                        </li>
                    ))}
                    </ul>
                    </>
                )
            }
            case 'posts':{
                return(
                    <>
                    {publicPostArr.length > 0 || privatePostArr.length > 0 ?
                    <>
                    <h3 className="subtitle">Posts</h3>
                    </>
                    : <p className="subtitle">Write your first post to see it here!</p>}
                    {publicPostArr.length > 0 ? <h4 className="subtitle">Public</h4> : ''}
                    <ul className="posts-list">
                    {publicPostArr?.map((post, index) => (
                        <li key={index} className="post-tile">
                            <p>📃 ⋅ {post.title}</p>
                            <div className="post-tile-buttons">
                            <button onClick={() => navigate(`/posts/${post.id}`)}>🔍</button>
                            <OpenModalButton
                            buttonText='x'
                            modalComponent={<DeletePostModal post={post}/>}
                            onButtonClick
                            onModalClose
                            />
                            </div>
                        </li>
                    ))}
                    </ul>
                    {privatePostArr.length > 0? <h4 className="subtitle">Private</h4> : ''}
                    <ul className="posts-list">
                    {privatePostArr?.map((post, index) => (
                        <li key={index} className="post-tile">
                            <p>📃 ⋅ {post.title}</p>
                            <div className="post-tile-buttons">
                            <button onClick={() => navigate(`/posts/${post.id}/edit`)}>🔍</button>
                            <OpenModalButton
                            buttonText='x'
                            modalComponent={<DeletePostModal post={post}/>}
                            onButtonClick
                            onModalClose
                            />
                            </div>
                        </li>
                    ))}
                    </ul>
                    </>
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
						alt='profile-pic'
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
                    <p className="user-bio">{user?.bio}</p>
                </div>
                <div className="user-stats">
                    <p>{learningFlags[user?.learning]} Learning</p>
                    <p>{levelArr[(user?.level - 1)]} Level</p>
                    <p> {achievementsArr?.length} Achievements</p>
                </div>
                <div className="nav-elements">
					<nav>
						<button
							className={activeSection === 'achievements' ? 'active' : ''}
							onClick={() => setActiveSection('achievements')}>
							Achievements
						</button>
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