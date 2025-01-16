import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import avatar1 from '../../images/Avatar 1.png';
import avatar2 from '../../images/Avatar 2.png';
import avatar3 from '../../images/Avatar 3.png';
import avatar4 from '../../images/Avatar 4.png';
import avatar5 from '../../images/Avatar 5.png';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [learning, setLearning] = useState('');
  const [level, setLevel] = useState('');
  const [prof_pic, setProfPic] = useState(1);
  const [bio, setBio] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
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
        <label>Pick an avatar!
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
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
