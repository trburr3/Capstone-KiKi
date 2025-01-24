import { useState, useEffect, useRef } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import logo from '../../images/logo.png';
import Lottie from "lottie-web";
import waves from '../../lotties/waves-smaller.json';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const container = useRef(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: waves,
    })

    return () => anim.destroy();
  }, [container])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email:'demo@aa.io',
        password:'password',
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }

  return (
    <>
      <div className="modal login-modal">
      <div className="modal-logo">
      <img src={logo} alt="logo" />
      </div>
      {/* <div className="login-header">
      <img src={logo} alt="logo" /> */}
      <h1 className="page-title">Log In</h1>
      {/* </div> */}
      <form onSubmit={handleSubmit}>
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button onClick={handleClick}>Demo</button>
      </form>
      {/* <div className="modal-logo">
      <img src={logo} alt="logo" />
      </div> */}
      <div className="modal-animation" ref={container}></div>
      </div>
    </>
  );
}

export default LoginFormModal;
