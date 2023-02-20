import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../config/path';
import useFetchData from '../hook/useFetchData';
import useValidator from '../hook/useValidator';

export default function Register() {
    const navigate = useNavigate();
    const validator = useValidator();
    const fetchData = useFetchData();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [msg, setMsg] = useState('');
    const [msg1, setMsg1] = useState('');
    const [msg2, setMsg2] = useState('');
    const [msg3, setMsg3] = useState('');

    const handleSubmit = async () => {
        const checkUser = handleValidateUsername();
        const checkPass = handleValidatePassword();
        const checkEmail = handleValidateEmail();
        const checkPassConfirm = handleValidatePasswordConfirm();

        if (!checkUser || !checkPass || !checkEmail || !checkPassConfirm) return;

        const payload = { username, password, email };
        const res = await fetchData('auth/signup', 'POST', payload);

        if (res.status) {
            alert('Register success. Login to continue...');
            navigate(path.login);
        } else alert(res.data);
    };
    const handleValidateUsername = () => {
        const { result, notify } = validator([{ 'length:1-20': username }]);
        if (!result) {
            setMsg(notify[0]);
        }
        return result;
    };
    const handleValidatePassword = () => {
        const { result, notify } = validator([{ 'length:5-40': password }]);
        if (!result) {
            setMsg2(notify[0]);
        }
        return result;
    };
    const handleValidateEmail = () => {
        const { result, notify } = validator([{ email: email }]);
        if (!result) {
            setMsg1(notify[0]);
        }
        return result;
    };
    const handleValidatePasswordConfirm = () => {
        const { result, notify } = validator({
            'length:5-40': passwordConfirm,
            equal: `${password}</>${passwordConfirm}`,
        });
        if (!result) {
            setMsg3(notify[0]);
        }
        return result;
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
