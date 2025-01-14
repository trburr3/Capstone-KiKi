// import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/Logo.png";

function Navigation() {
	// const user = useSelector((state) => state.session.user);

	return (
		<nav className='nav'>
			<ul className='nav-contents'>
				<li className='icon-home'>
					<NavLink to='/' className='kiki-icon-container'>
            <img className='kiki-icon' alt='kiki-icon' src={logo}/>
              KIKI
            </NavLink>
				</li>
				<div className='profile-button'>
					<li>
						<ProfileButton />
					</li>
				</div>
			</ul>
		</nav>
	);
}

export default Navigation;
