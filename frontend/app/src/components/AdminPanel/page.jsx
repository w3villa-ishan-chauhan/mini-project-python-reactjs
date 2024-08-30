import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.scss"
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authcontext';

const UserList = () => {
    const { logout } = useAuth();

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [newSubscriptionType, setnewSubscriptionType] = useState("")
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [page, size, search, role, loading]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/users", {
                params: {
                    page,
                    size,
                    search,
                    role,
                },
            });
            setUsers(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const updateSubscriptionType = async () => {
        try {
            console.log({
                subs_type: newSubscriptionType,
                email: userEmail
            })

            const response = await axios.post("http://127.0.0.1:8000/api/update_subscription", {
                subs_type: newSubscriptionType,
                email: userEmail
            });
            console.log("response:", response)

            if (response.status == "200") {
                toast.success("subscription updated")
                setLoading(false)
            }
        }
        catch (error) {
            toast.error("subscription not updated")
        }
    }

    const handleLogout = () => {
        logout();
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on new search
    };

    const handleRoleFilter = (e) => {
        setRole(e.target.value);
        setPage(1); // Reset to first page on role filter change
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (e) => {
        setSize(parseInt(e.target.value, 10));
        setPage(1); // Reset to first page on page size change
    };

    const handleChange = (userMail, e) => {
        setnewSubscriptionType(e.target.value);
        console.log("userMail", userMail)
        setUserEmail(userMail)
    }

    const handleSubmit = () => {
        console.log("submitted")
        updateSubscriptionType();
        setLoading(true)

    }

    return (
        <div className="admin-container container-fluid">
            <div className="row">
                <div className="col">
                    <img className="admin-heading-image" src="https://www.shutterstock.com/image-vector/modern-admin-panel-icon-vector-260nw-1580556469.jpg" />
                </div>

            </div>
            <div className="row filter-section">
                <div className="col">
                    <label className="search-lable">Search by Email: </label>
                    <input
                        type="text"
                        placeholder="Search by email"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col">
                    <select value={role} onChange={handleRoleFilter}>
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="col">
                    <select value={size} onChange={handleSizeChange}>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>
            <div className="table-container " style={{overflowX:"auto"}}>
                <table>
                    <thead>
                        <tr>
                            <th >S.no</th>
                            <th >Name</th>
                            <th>Email</th>
                            <th >Address</th>
                            <th>Role</th>
                            <th>Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.residing_address}</td>
                                <td>{user.role}</td>
                                <td >{user.subscription_type}
                                    {user.role ==='user' &&

                                        <div className="plan-upgrade">
                                            <p>Upgrade user plan:{user.subscription_type }</p>

                                            {user.subscription_type == 'Base' && (
                                                <>
                                                    <select onChange={(e) => { handleChange(user.email, e) }}>
                                                        <option value="Silver">Silver</option>
                                                        <option value="Gold">Gold</option>
                                                    </select>
                                                    <button className="subscription-button btn btn-warning" onClick={handleSubmit}>commit</button>

                                                </>)

                                            }
                                            {user.subscription_type == 'Silver' && (
                                                <>
                                                    <select onChange={(e) => { handleChange(user.email, e) }}>
                                                        <option value="Base">Base</option>
                                                        <option value="Gold">Gold</option>
                                                    </select>
                                                    <button className=" subscription-button btn btn-warning" onClick={handleSubmit}>commit</button>
                                                </>)
                                            }
                                            {user.subscription_type == 'Gold' && (
                                                <>
                                                    <select onChange={(e) => { handleChange(user.email, e) }}>
                                                        <option value="Base">Base</option>
                                                        <option value="Silver">Silver</option>
                                                    </select>
                                                    <button className="subscription-button btn btn-warning" onClick={handleSubmit}>commit</button>

                                                </>)
                                            }

                                        </div>
                                    }
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {Array.from({ length: Math.ceil(total / size) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={page === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <div className="row">
                <div className="logout-button mt-lg-5">
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserList;
