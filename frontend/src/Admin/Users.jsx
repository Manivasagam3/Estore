import React, { useEffect, useState } from 'react';
import '../CSS/Users.css';

const apiUrl="http://localhost:8000";
const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/signup")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log('Fetch error: ', err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(apiUrl + '/signup/' + id, {
                method: "DELETE"
            })
            .then((response) => {
                if (response.ok) {
                    const updatedUsers = users.filter((item) => item._id !== id);
                    setUsers(updatedUsers);
                } else {
                    console.log('Delete failed');
                }
            })
            .catch((err) => console.log('Delete error: ', err));
        }
    };
    return (
        <>
        <h1 className='user'>Users List</h1>
        <div className='users'>
            <ul className='list-group'>
                {users.map((user, index) => (
                    <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                        {user.username}
                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Users;
