import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchData from '../hook/useFetchData';

export default function UserManager() {
    const fetchData = useFetchData();
    const profile = useSelector((state) => state.auth.profile);

    const [list, setList] = useState([]);

    const handleSearch = async () => {
        if (profile?.token) {
            const qr = `user/search`;
            const res = await fetchData(qr, 'GET', {}, profile.token);

            if (res.status) {
                setList(res.data);
            } else alert(res.data);
        }
    };
    const handleDelete = async (id) => {
        if (profile?.token) {
            const qr = `user/delete/${id}`;
            const res = await fetchData(qr, 'DELETE', {}, profile.token);

            if (res.status) {
                setList((priv) => [...priv].filter((user) => user._id !== id));
            } else alert(res.data);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);
    return (
        <div className="mt-4">
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            <th scope="col">CreatedAt</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.role}</td>
                                <td>
                                    {item.createdAt?.toString().split('.')[0].replace('T', ' ')}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!list.length && (
                            <tr>
                                <td colSpan={5}>The list is empty</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
