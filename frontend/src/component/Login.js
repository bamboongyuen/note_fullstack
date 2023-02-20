import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../store/authSlice';
import { path } from '../config/path';
import useFetchData from '../hook/useFetchData';
import useValidator from '../hook/useValidator';

export default function Login() {
    const fetchData = useFetchData();
    const validator = useValidator();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [msg1, setMsg1] = useState('');

    const handleSubmit = async () => {
        const validateUsername = handleValidateUsername();
        const validatePassword = handleValidatePassword();
        if (!validateUsername || !validatePassword) return;

        let res = await fetchData('auth/login', 'POST', { username, password });
        if (res.status) {
            dispatch(login(res.data));
            navigate(path.home);
        } else alert(res.data);
    };
    const handleValidateUsername = () => {
        const { result, notify } = validator([{ require: username }]);
        if (!result) {
            setMsg(notify[0]);
        }
        return result;
    };
    const handleValidatePassword = () => {
        const { result, notify } = validator([{ 'length:1-100': password }]);
        if (!result) {
            setMsg1(notify[0]);
        }
        return result;
    };

    return (
        <div className="mt-4 mb-4 maxwidth450 mx-auto">
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={'form-control border ' + (msg ? 'border-danger is-invalid' : '')}
                    placeholder="username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setMsg('');
                    }}
                    onBlur={handleValidateUsername}
                />
                <label htmlFor="">Username</label>
                <div className="invalid-feedback">{msg || ''}</div>
            </div>
            <div className="form-floating mb-4">
                <input
                    type="password"
                    className={'form-control border ' + (msg1 ? 'border-danger is-invalid' : '')}
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setMsg1('');
                    }}
                    onBlur={handleValidatePassword}
                />
                <label htmlFor="">Password</label>
                <div className="invalid-feedback">{msg1 || ''}</div>
            </div>

            <div className="form-floating">
                <div className="col-auto d-flex justify-content-center">
                    <div className="btn btn-primary" onClick={handleSubmit}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
}
