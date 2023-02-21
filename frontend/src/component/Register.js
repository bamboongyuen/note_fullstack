export default function Register() {
    let msg, msg1, msg2, msg3;

    return (
        <div className="mt-4 mb-4 maxwidth450 mx-auto">
            <div className="form-floating mb-3 has-validation">
                <input
                    type="text"
                    className={'form-control border ' + (msg ? 'border-danger is-invalid' : '')}
                    placeholder="username"
                />
                <label htmlFor="">Username</label>
                <div className="invalid-feedback">{msg || ''}</div>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={'form-control border ' + (msg1 ? 'border-danger is-invalid' : '')}
                    placeholder="email"
                />
                <label htmlFor="">Email</label>
                <div className="invalid-feedback">{msg1 || ''}</div>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className={'form-control border ' + (msg2 ? 'border-danger is-invalid' : '')}
                    placeholder="Password"
                />
                <label htmlFor="">Password</label>
                <div className="invalid-feedback">{msg2 || ''}</div>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className={'form-control border ' + (msg3 ? 'border-danger is-invalid' : '')}
                    placeholder="Password Confirm"
                />
                <label htmlFor="">Password Confirm</label>
                <div className="invalid-feedback">{msg3 || ''}</div>
            </div>

            <div className="form-floating">
                <div className="col-auto d-flex justify-content-center">
                    <div className="btn btn-primary" onClick={() => {}}>
                        Register
                    </div>
                </div>
            </div>
        </div>
    );
}
