import { useEffect, useState } from 'react';

export default function Login() {
    let username, password, msg, msg1;

    return (
        <div className="mt-4 mb-4 maxwidth450 mx-auto">
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={'form-control border ' + (msg ? 'border-danger is-invalid' : '')}
                    placeholder="username"
                />
                <label htmlFor="">Username</label>
                <div className="invalid-feedback">{msg || ''}</div>
            </div>
            <div className="form-floating mb-4">
                <input
                    type="password"
                    className={'form-control border ' + (msg1 ? 'border-danger is-invalid' : '')}
                    placeholder="Password"
                />
                <label htmlFor="">Password</label>
                <div className="invalid-feedback">{msg1 || ''}</div>
            </div>

            <div className="form-floating">
                <div className="col-auto d-flex justify-content-center">
                    <div className="btn btn-primary" onClick={() => {}}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
}
