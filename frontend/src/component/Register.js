import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { path } from '../config/path';
import useFetchData from '../hook/useFetchData';
import useValidator from '../hook/useValidator';

export default function Register() {
    const fetchData = useFetchData();
    const validator = useValidator();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [msg, setMsg] = useState('');
    const [msg1, setMsg1] = useState('');
    const [msg2, setMsg2] = useState('');
    const [msg3, setMsg3] = useState('');

    const handleValidateUsername = () => {
        let res = validator({ 'length:5-20': username });
        if (!res.result) setMsg(res.msg);
        return res.result;
    };
    const handleValidateEmail = () => {
        let { result, msg } = validator({ email });
        if (!result) setMsg1(msg);
        return result;
    };
    const handleValidatePassword = () => {
        let res = validator({ 'length:5-20': password });
        if (!res.result) setMsg2(res.msg);
        return res.result;
    };
    const handleValidatePasswordConfirm = () => {
        let res = validator({ require: password, equal: `${password}</>${passwordConfirm}` });
        if (!res.result) setMsg3(res.msg);
        return res.result;
    };
    const handleSubmit = async () => {
        let valid = handleValidateUsername();
        let valid1 = handleValidateEmail();
        let valid2 = handleValidatePassword();
        let valid3 = handleValidatePasswordConfirm();
        if (valid && valid1 && valid2 && valid3) {
            const payload = { username, password, email };
            let res = await fetchData('/auth/signup', payload, 'POST');
            if (res.result) {
                navigate(path.login);
                alert('Register success. Login to using');
            } else {
                alert(res.data);
            }
        }
    };

    return (
        <div className="mt-4 mb-4 maxwidth450 mx-auto">
            <div className="form-floating mb-3 has-validation">
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
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={'form-control border ' + (msg1 ? 'border-danger is-invalid' : '')}
                    placeholder="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setMsg1('');
                    }}
                    onBlur={handleValidateEmail}
                />
                <label htmlFor="">Email</label>
                <div className="invalid-feedback">{msg1 || ''}</div>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className={'form-control border ' + (msg2 ? 'border-danger is-invalid' : '')}
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setMsg2('');
                    }}
                    onBlur={handleValidatePassword}
                />
                <label htmlFor="">Password</label>
                <div className="invalid-feedback">{msg2 || ''}</div>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className={'form-control border ' + (msg3 ? 'border-danger is-invalid' : '')}
                    placeholder="Password Confirm"
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                        setMsg3('');
                    }}
                    onBlur={handleValidatePasswordConfirm}
                />
                <label htmlFor="">Password Confirm</label>
                <div className="invalid-feedback">{msg3 || ''}</div>
            </div>

            <div className="form-floating">
                <div className="col-auto d-flex justify-content-center">
                    <div className="btn btn-primary" onClick={handleSubmit}>
                        Register
                    </div>
                </div>
            </div>
        </div>
    );
}
