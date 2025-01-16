import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/Logo.png";

function Navigation() {
	const user = useSelector((state) => state.session.user);

	return (
		<nav id='nav'>
			<ul className='nav-contents'>
				<li className='icon-home'>
					<NavLink to='/' id='home-link'className='kiki-icon-container'>
            <img className='kiki-icon pause' alt='kiki-icon' src={logo}/>
              <h1>KIKI</h1>
            </NavLink>
				</li>
				<div id='profile-button'>
					{user && <NavLink id='create-post-button' to='/posts/new'>🗒️</NavLink>}
					<li>
						<ProfileButton className='prof-button' />
					</li>
				</div>
			</ul>
		</nav>
	);
}

export default Navigation;
