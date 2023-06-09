import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import userInfo from "../../atom/userInfo";
import { useRecoilState } from "recoil";
import moment from "moment";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [user, setUser] = useRecoilState(userInfo);

    useEffect(() => {
        if (username !== "" && password !== "") {
            setDisabled(false);
        }
    }, [username, password]);

    const loginHandler = async (e) => {
        e.preventDefault();
        if (username === "admin@admin.com" && password === "1") {
            setUser({
                username,
                password,
                checkin: moment(new Date()).format(),
            });
            navigate("/calendar");
            setUsername("");
            setPassword("");
            setError("");
        } else {
            setError("Invalid username or password");
        }
    };
    return (
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={(e) => loginHandler(e)}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Sign In</h3>
                    <div className='text-center'>
                        Not registered yet?{" "}
                        <Link className='link-primary' to='/signup'>
                            Sign Up
                        </Link>
                    </div>
                    <div className='form-group mt-3'>
                        <label title='username'>Email address</label>
                        <input
                            type='email'
                            className='form-control mt-1'
                            placeholder='Enter email'
                            htmlFor='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <label>Password</label>
                        <input
                            className='form-control mt-1'
                            htmlFor='password'
                            placeholder='Enter password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='d-grid gap-2 mt-3'>
                        <button
                            type='submit'
                            className='btn btn-primary'
                            disabled={disabled}>
                            Submit
                        </button>
                    </div>
                    <p className='errorMessage'>{error}</p>
                    <p className='forgot-password text-right mt-2'>
                        Forgot <a href='#'>password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
