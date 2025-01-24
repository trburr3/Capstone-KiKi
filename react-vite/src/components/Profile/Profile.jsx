import { useEffect, useState, useRef } from "react";
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
import Lottie from 'lottie-web';
// import lion from '../../lotties/lion-fish.json';
import turtle from '../../lotties/turtle.json';


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
    const [update, setUpdate] = useState(true);
    let [activeSection, setActiveSection] = useState('achievements');
    const container = useRef(null);
    // const containerOne = useRef(null);

    // useEffect(() => {
    //     const anim = Lottie.loadAnimation({
    //       container: containerOne.current,
    //       renderer: 'svg',
    //       loop: true,
    //       autoplay: true,
    //       animationData: lion,
    //     })

    //     return () => anim.destroy();
    //   }, [containerOne])

      useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: turtle,
        })

        return () => anim.destroy();
      }, [container])

    useEffect(() => {
        if(profileState) setActiveSection(profileState)
    }, [profileState]);

    useEffect(() => {
        // dispatch(thunkAllFriends())
        dispatch(thunkGetAchievements())
        dispatch(thunkGetAllUserPosts())
    }, [dispatch]);

    useEffect(() => {
        if(update) {
            dispatch(thunkAllFriends())
            setUpdate(false)
        }
    }, [dispatch, update])

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
                        <FaChampagneGlasses data-tooltip-id="achievement-one-tooltip" data-tooltip-content='Make 3 Friends'/>
                        {/* <Tooltip id="achievement-one-tooltip"/> */}
                        <p>Make 3 Friends</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(2) &&
                        <>
                        <li className="li-achievement" data-tooltip-id="achievement-two-tooltip" data-tooltip-content='Send 5 Messages'>
                        {/* <Tooltip id="achievement-two-tooltip"/> */}
                        <FaDiscord />
                        <p>Send 5 Messages</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(3) &&
                        <>
                        <li className="li-achievement" data-tooltip-id="achievement-three-tooltip" data-tooltip-content='Make a Public Post'>
                        {/* <Tooltip id="achievement-three-tooltip"/> */}
                        <FaGlobe />
                        <p>Make a Public Post</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(4) &&
                        <>
                        <li className="li-achievement" data-tooltip-id="achievement-four-tooltip" data-tooltip-content='Write 3 Comments'>
                        {/* <Tooltip id="achievement-four-tooltip"/> */}
                        <FaLightbulb />
                        <p>Write 3 Comments</p>
                        </li>
                        </>
                    }
                    {
                        achievementsArr?.includes(5) &&
                        <>
                        <li className="li-achievement" data-tooltip-id="achievement-five-tooltip" data-tooltip-content='Like 5 Posts'>
                        {/* <Tooltip id="achievement-five-tooltip"/> */}
                        <FaHeartCircleBolt />
                        <p>Like 5 Posts</p>
                        </li>
                        </>
                    }
                    </ul>
                    <>
                    {achievementsArr?.length == 5? <h4>You have done it all</h4> :
                    <>
                    <h4>Available Achievemnts:</h4>
                        <ul className="available-list">
                            <li className={achievementsArr?.includes(1) ? 'done' : ''}>Make 3 Friends</li>
                            <li className={achievementsArr?.includes(2) ? 'done' : ''}>Send 5 Message</li>
                            <li className={achievementsArr?.includes(3) ? 'done' : ''}>Make a Public Post</li>
                            <li className={achievementsArr?.includes(4) ? 'done' : ''}>Write 3 Comments</li>
                            <li className={achievementsArr?.includes(5) ? 'done' : ''}>Like 5 Posts</li>
                        </ul>
                        </>}
                    </>
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
                            modalComponent={<RemoveFriendModal friend={friend} update={update} setUpdate={setUpdate}/>}
                            onButtonClick={() => setUpdate(false)}
                            onModalClose={() => setUpdate(false)}
                            />
                        </li>
                    ))}
                    </ul>
                    {/* <div className="lion-animation" ref={containerOne}></div> */}
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
                    <div className="turtle-animation" ref={container}></div>
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