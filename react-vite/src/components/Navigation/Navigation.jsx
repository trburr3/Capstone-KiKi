import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/Logo.png";
import { Tooltip } from 'react-tooltip';

function Navigation() {
	const user = useSelector((state) => state.session.user);

	return (
		<nav id='nav'>
			<ul className='nav-contents'>
				<li className='icon-home'>
					<NavLink to='/' id='home-link'className='kiki-icon-container'>
            <img className='kiki-icon pause' alt='kiki-icon' src={logo}/>
              <h1 className='site-title'>KIKI</h1>
            </NavLink>
				</li>
				<div id='profile-button'>
					{user && <><NavLink id='create-post-button' to='/posts/new' data-tooltip-id="create-tooltip" data-tooltip-content="Create New Post">🗒️</NavLink> <Tooltip id="create-tooltip" /> </>}
					<li>
						<ProfileButton />
					</li>
				</div>
			</ul>
		</nav>
	);
}

export default Navigation;
