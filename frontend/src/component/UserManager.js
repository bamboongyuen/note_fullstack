import { useEffect, useState } from 'react';
import useFetchData from '../hook/useFetchData';

export default function UserManager() {
    const [list, setList] = useState([]);
    const fetchData = useFetchData();

    const handSearch = async () => {
        const res = await fetchData('/user/search', {}, 'GET', 'token');
        if (res.result) setList(res.data);
        else alert(res.data);
    };
    const handDelete = async (id) => {
        //
        const res = await fetchData('/user/delete/' + id, {}, 'DELETE', 'token');
        if (res.result) {
            handSearch();
        }
        alert(res.data);
    };

    useEffect(() => {
        handSearch();
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
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handDelete(item._id)}
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
