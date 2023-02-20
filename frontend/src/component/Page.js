import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetchData from '../hook/useFetchData';

import { edit, load, create, setActive } from '../store/noteSlice';
export default function Page() {
    const fetchData = useFetchData();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.auth.profile);
    const { active, listNote } = useSelector((state) => state.note);

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const handleNewNote = async () => {
        if (profile?._id) {
            const data = { title: 'New note', userId: profile._id };
            const res = await fetchData('note/create', 'POST', data, profile.token);
            if (res.status) {
                dispatch(create(res.data));
            } else alert(res.data);
        }
    };
    const handleSaveNote = async () => {
        if (profile?._id) {
            const qr = `note/save/${active}`;
            const data = { title, content };
            const res = await fetchData(qr, 'POST', data, profile.token);
            if (res.status) {
                const editNote = {
                    ...listNote.filter((item) => item._id === active)[0],
                    title,
                    content,
                };
                dispatch(edit(editNote));
            } else alert(res.data);
        }
    };
    const handleClear = () => {
        setContent('');
    };
    const handleSet = () => {};

    useEffect(() => {
        if (profile?.token) {
            (async () => {
                const qr = `note/search?q=${profile._id}`;
                let res = await fetchData(qr, 'GET', {}, profile.token);

                if (res.status) {
                    dispatch(load(res.data));
                } else alert(res.data);
            })();
        }
    }, []);

    useEffect(() => {
        const activeNote = listNote.filter((item) => item._id === active)[0];
        setContent(activeNote?.content);
        setTitle(activeNote?.title);
    }, [active]);

    return (
        <div className="d-flex mt-3">
            <div className="col-4 ">
                <div className="border border-light-subtle">
                    <div className="input-group">
                        <div className="form-control">{profile?.username || 'Guest'}</div>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleNewNote}
                        >
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
                            const time = item.createdAt.toString().split('.')[0];
                            const dot = item.content?.length > 40 ? '...' : '';
                            const st = item.content ? item.content?.substring(0, 40) : '';
                            return (
                                <div
                                    key={item._id}
                                    className={clName}
                                    onClick={() => dispatch(setActive(item._id))}
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        {item._id === active ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title || ''}
                                                onChange={(e) => setTitle(e.target.value)}
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
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleSet}
                        >
                            Set
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                        <button type="button" className="btn btn-outline-secondary" disabled>
                            |
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleSaveNote}
                        >
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
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
