export default function UserManager() {
    let list = [];

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
                                    <button type="button" className="btn btn-sm btn-danger">
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
