import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { path } from '../config/path';
import { login } from '../store/authSlice';
import useFetchData from '../hook/useFetchData';
import useValidator from '../hook/useValidator';

export default function Login() {
    const fetchData = useFetchData();
    const validator = useValidator();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [msg1, setMsg1] = useState('');

    const handleValidateUsername = () => {
        let res = validator({ require: username });
        if (!res.result) setMsg(res.msg);
        return res.result;
    };
    const handleValidatePassword = () => {
        //
        let res = validator({ require: password });
        if (!res.result) setMsg1(res.msg);
        return res.result;
    };
    const handleSubmit = async () => {
        let valid = handleValidateUsername();
        let valid2 = handleValidatePassword();
        if (valid && valid2) {
            const res = await fetchData('/auth/login', { username, password }, 'POST');
            if (res.result) {
                dispatch(login(res.data));
                navigate(path.home);
            } else {
                alert(res.data);
            }
        }
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
