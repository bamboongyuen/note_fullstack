import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { path } from './config/path';
import store from './store';

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
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
