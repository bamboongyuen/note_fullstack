import { api } from '../config/path';

export default function useFetchData() {
    return async (subdomain, payload, method = 'GET', token) => {
        //
        const data = {
            method,
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        };
        if (method !== 'GET') data.body = JSON.stringify(payload);
        if (token) data.headers.token = token;

        return await (await fetch(api + subdomain, data)).json();
    };
}
