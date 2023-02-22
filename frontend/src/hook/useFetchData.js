import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';

import { refresh } from '../store/authSlice';
import { api } from '../config/path';

export default function useFetchData() {
    const dispatch = useDispatch();
    let token = useSelector((state) => state.auth.profile?.token);

    return async (subdomain, payload, method = 'GET', isToken) => {
        //
        const data = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        };
        if (isToken) {
            data.headers.token = token;
            const isExp = jwtDecode(token).exp - Date.now() / 1000 < 3;
            if (isExp) {
                try {
                    const res = await (await fetch(api + '/auth/refresh', data)).json();
                    if (res.result) {
                        data.headers.token = res.data.token;
                        dispatch(refresh(res.data));
                    }
                } catch (error) {}
            }
        }
        if (method !== 'GET' && payload) {
            data.method = method;
            data.body = JSON.stringify(payload);
        }

        return await (await fetch(api + subdomain, data)).json();
    };
}
