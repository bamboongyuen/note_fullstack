import { api } from '../config/path';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../store/authSlice';

export default function useFetchData() {
    const dispatch = useDispatch();

    return async (subdomain, method, payload, token) => {
        if (token) {
            const decode = jwtDecode(token);
            const delta = decode.exp - new Date().getTime() / 1000;
            console.log(delta);
            if (delta < 3 && delta > -60) {
                const req = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', token },
                };
                try {
                    const res = await (await fetch(api + 'auth/refresh', req)).json();
                    if (res.status) {
                        token = res.data;
                        dispatch(refreshToken(res.data));
                    }
                } catch (error) {}
            }
        }
        const data = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };

        if (method !== 'GET') data.body = JSON.stringify(payload);
        if (token) data.headers.token = token;

        return await (await fetch(api + subdomain, data)).json();
    };
}
