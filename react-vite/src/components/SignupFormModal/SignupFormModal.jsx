import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [learning, setLearning] = useState('English');
  const [level, setLevel] = useState(1);
  const [prof_pic, setProfPic] = useState(1);
  const [bio, setBio] = useState('');
  const [native, setNative] = useState('English');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    const payload = {
      email,
        username,
        password,
        first_name,
        last_name,
        learning,
        level,
        native,
        bio,
        prof_pic,
        city,
        state
    }

    // console.log(payload)

    const serverResponse = await dispatch(
      thunkSignup(
        payload
      )
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="modal signup-modal">
      <h1 className="page-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
      <div className="top">
        <label>First Name
					<input
						type='text'
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
					/>
        </label>
        <label>Last Name
						<input
							type='text'
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
						/>
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          City
					<input
						type='text'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
        </label>
        <label>
          State
					<input
						type='text'
						value={state}
						onChange={(e) => setState(e.target.value)}
					/>
        </label>
        <label>Learning
        <select value={learning} onChange={(e) => setLearning(e.target.value)}>
            <option
                value="English"
                required>
                 English
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
        </label>
        <label>Native
        <select value={native} onChange={(e) => setNative(e.target.value)}>
            <option
                value="English"
                required>
                 English
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
        </label>
        <label>Level:
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
        </label>
        <label>Bio
					<input
						type='textarea'
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div className="middle">
        <label>
          <h1 className="pick">Pick an avatar!</h1>
        <div>
        <ul className="avatar-options">
            <li className={prof_pic == 1? 'selected' : ''} onClick={() => setProfPic(1)}><img src={avatar1} alt="avatar1" /></li>
            <li className={prof_pic == 2? 'selected' : ''} onClick={() => setProfPic(2)}><img src={avatar2} alt="avatar2" /></li>
            <li className={prof_pic == 3? 'selected' : ''} onClick={() => setProfPic(3)}><img src={avatar3} alt="avatar3" /></li>
            <li className={prof_pic == 4? 'selected' : ''} onClick={() => setProfPic(4)}><img src={avatar4} alt="avatar4" /></li>
            <li className={prof_pic == 5? 'selected' : ''} onClick={() => setProfPic(5)}><img src={avatar5} alt="avatar5" /></li>
          </ul>
        </div>
        </label>
        </div>
        <div className="bottom">
        <button type="submit">Sign Up</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;
