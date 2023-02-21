export default function Page() {
    let profile,
        content,
        title,
        listNote = [];

    return (
        <div className="d-flex mt-3">
            <div className="col-4 ">
                <div className="border border-light-subtle">
                    <div className="input-group">
                        <div className="form-control">{profile?.username || 'Guest'}</div>
                        <button type="button" className="btn btn-outline-secondary">
                            New note
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <div className="dropdown-item" href="#">
                                    Action
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="list-group mt-4">
                        {listNote.map((item) => {
                            const clName =
                                'list-group-item list-group-item-action ' +
                                (item._id === active ? 'active' : '');
                            const time = item.createdAt?.toString().split('.')[0];
                            const dot = item.content?.length > 40 ? '...' : '';
                            const st = item.content ? item.content?.substring(0, 40) : '';
                            return (
                                <div key={item._id} className={clName}>
                                    <div className="d-flex w-100 justify-content-between">
                                        {item._id === active ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title || ''}
                                            />
                                        ) : (
                                            <h5 className="mb-1">{item.title || ''}</h5>
                                        )}
                                        <small>{time}</small>
                                    </div>
                                    <p className="mb-1"></p>
                                    <small>{st + dot}</small>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex-grow-1">
                <div className="d-flex justify-content-end">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-outline-secondary">
                            Set
                        </button>
                        <button type="button" className="btn btn-outline-secondary">
                            Clear
                        </button>
                        <button type="button" className="btn btn-outline-secondary" disabled>
                            |
                        </button>
                        <button type="button" className="btn btn-outline-secondary">
                            Save
                        </button>
                    </div>
                </div>
                <div className="input-group">
                    <span className="input-group-text"></span>
                    <textarea
                        className="form-control"
                        style={{ height: '90vh' }}
                        value={content || ' '}
                    />
                </div>
            </div>
        </div>
    );
}
