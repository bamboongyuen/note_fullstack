import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../store/authSlice';
import { clear } from '../store/noteSlice';
import { path } from '../config/path';
import useFetchData from '../hook/useFetchData';

export default function Header() {
    const dispatch = useDispatch();
    const fetchData = useFetchData();

    const { profile, isLogin } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clear());
        fetchData('auth/logout/' + profile._id, 'POST', {}, profile.token);
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <div className="col-3">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder=".." />
                            <button className="btn btn-outline-secondary" type="button">
                                Search
                            </button>
                        </div>
                    </div>

                    <ul className="col-3 navbar-nav d-flex justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link active" to={path.home}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {isLogin ? profile?.username : 'Guest'}
                            </div>
                            <ul className="dropdown-menu">
                                {!isLogin ? (
                                    <>
                                        <Link className="dropdown-item" to={path.register}>
                                            Register
                                        </Link>
                                        <Link className="dropdown-item" to={path.login}>
                                            Login
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link className="dropdown-item" to={path.profile}>
                                            Profile
                                        </Link>
                                        <Link className="dropdown-item" to={path.usermanager}>
                                            User manager
                                        </Link>
                                        <div className="dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </div>
                                    </>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
