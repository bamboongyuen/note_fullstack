import { path } from './config/path';

import Page from './component/Page';
import Login from './component/Login';
import Profile from './component/Profile';
import Register from './component/Register';
import UserManager from './component/UserManager';
import MainLayout from './layout/MainLayout';

export default function Todo() {
    const routes = [
        { id: 1, page: Page, path: path.home, layout: MainLayout },
        { id: 2, page: Login, path: path.login, layout: MainLayout },
        { id: 3, page: Profile, path: path.profile, layout: MainLayout },
        { id: 4, page: Register, path: path.register, layout: MainLayout },
        { id: 5, page: UserManager, path: path.usermanager, layout: MainLayout },
    ];
    return <></>;
}
