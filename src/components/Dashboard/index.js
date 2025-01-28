import { useState, useEffect } from 'react';
import UserForm from "../UserForm";
import './index.css';
import { getAllUsers } from '../../Services/UserService'

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, []);


    const prevbutton = () => {
        setLoading(true)
        if (pageNumber <= 1) {
            alert("First page")
        } else {
            setPageNumber(prevState => {
                fetchUsers(prevState - 1)
                return prevState - 1
            })
        }
    }

    const nextbutton = () => {
        setLoading(true)
        if (pageNumber >= 4) {
            alert("Last page")
        } else {
            setPageNumber(prevState => {
                fetchUsers(prevState + 1)
                return prevState + 1
            })
        }
    }
    const fetchUsers = async (pageNumber = 1, pageSize = 5) => {

        try {
            const response = await getAllUsers(pageSize, pageNumber)
            if (!response.ok) {
                throw new Error("Failed to fetch users.");
            }
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await deleteUser(id);

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                alert("User deleted successfully.");
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    const openForm = (user) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h2 className="user-heading">Users</h2>
                <div className="adduser-button">
                    <button
                        className="addUser-button"
                        onClick={() => openForm(null)}
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="table-container1">
                    <thead className="table-head">
                        <tr>
                            <th className="table-head-description">ID</th>
                            <th className="table-head-description">Name</th>
                            <th className="table-head-description">Username</th>
                            <th className="table-head-description">Email</th>
                            <th className="table-head-description">Department</th>
                            <th className="table-head-description">Phone</th>
                            <th className="table-head-description">Website</th>
                            <th className="table-head-description">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (<tr><td>Loading...</td></tr>) : (
                            users.map((user) => (
                                <tr key={user.id} className="tbody-row">
                                    <td className="tbody-description">{user.id}</td>
                                    <td className="tbody-description">{user.name}</td>
                                    <td className="tbody-description">{user.username}</td>
                                    <td className="tbody-description">{user.email}</td>
                                    <td className="tbody-description">{user.company?.name || "N/A"}</td>
                                    <td className="tbody-description">{user.phone}</td>
                                    <td className="tbody-description">{user.website}</td>
                                    <td className="tbody-description-buttons">
                                        <button
                                            className="tbody-edit-button"
                                            onClick={() => openForm(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="tbody-delete-button"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="formopen-container">
                    <div className="formopen-container1">
                        <UserForm
                            user={editingUser}
                            setUsers={setUsers}
                            onClose={() => setIsFormOpen(false)}
                            refreshUsers={fetchUsers}
                        />
                    </div>
                </div>
            )}
            <div>
                <button type='button' onClick={prevbutton} disabled={pageNumber <= 1} className='prev-button'>Prev</button>
                <button type='button' onClick={nextbutton} disabled={pageNumber >= 4} className='next-button'>Next</button>
            </div>
        </div>
    );
};

export default Dashboard;