import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import userInfo from '../../atom/userInfo';
import { useRecoilState } from 'recoil';
import moment from 'moment';

const Login = () => {
  //login component
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useRecoilState(userInfo);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1') {
      setUser({
        username,
        password,
        checkin: moment(new Date()).format(),
      });
      navigate('/calendar');
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form className="login_form" onSubmit={(e) => loginHandler(e)}>
        <label title="username">Username:</label>
        <input
          type="text"
          htmlFor="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label title="password">Password: </label>
        <input
          htmlFor="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Login;
