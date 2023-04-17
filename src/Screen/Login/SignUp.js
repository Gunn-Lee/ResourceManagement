import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import userInfo from "../../atom/userInfo";
import { useRecoilState } from "recoil";
import "./Login.css";

const SignUp = () => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useRecoilState(userInfo);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const signUnHandler = async (e) => {
        e.preventDefault();
        setUser({
            username,
            email,
            password,
        });
        navigate("/calendar");
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={(e) => signUnHandler(e)}>
                <div className='Auth-form-content'>
                    <h3 className='Auth-form-title'>Sign In</h3>
                    <div className='text-center'>
                        Already registered?{" "}
                        <Link className='link-primary' to='/login'>
                            Sign In
                        </Link>
                    </div>
                    <div className='form-group mt-3'>
                        <label>Full Name</label>
                        <input
                            type='text'
                            className='form-control mt-1'
                            placeholder='e.g Jane Doe'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            ref={inputRef}
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <label>Email address</label>
                        <input
                            type='email'
                            className='form-control mt-1'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='form-control mt-1'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='d-grid gap-2 mt-3'>
                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </div>
                    <p className='text-center mt-2'>
                        Forgot <a href='#'>password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
