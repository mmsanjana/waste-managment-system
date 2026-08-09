import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [allRequests, setAllRequests] = useState([]);

    // පිටුව load වෙද්දී Requests ඔක්කොම ගන්නවා
    const fetchAllRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/requests');
            setAllRequests(response.data);
        } catch (error) {
            console.log("දත්ත ගේන්න බැහැ", error);
        }
    };

    useEffect(() => {
        // Admin කෙනෙක් නෙමෙයි නම් Login එකට යවනවා
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            navigate('/');
            return;
        }
        fetchAllRequests();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/');
    };

    // Request එකක් Approve කරන Function එක
    const handleApprove = async (requestId) => {
        try {
            await axios.put(`http://localhost:5000/admin/requests/${requestId}/status`, {
                status: 'APPROVED'
            });
            alert("Pickup Request අනුමත කළා!");
            fetchAllRequests(); // ආපහු අලුත් දත්ත ටික ගන්නවා
        } catch (error) {
            alert("Error එකක් ආවා!");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '40px auto' }}>
            <div className="glass-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
                    <h2 style={{ margin: 0, fontWeight: '400', color: '#f39c12' }}>Admin Dashboard[cite: 1]</h2>
                    <button onClick={handleLogout} className="btn-outline" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>
                        Logout
                    </button>
                </div>

                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '300', marginBottom: '20px' }}>Manage All Pickup Requests[cite: 1]</h3>
                    
                    {allRequests.length === 0 ? (
                        <p style={{ color: '#ccc', textAlign: 'center' }}>No requests available.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User Name</th>
                                        <th>Waste Type</th>
                                        <th>Weight (kg)</th>
                                        <th>Address</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allRequests.map((req) => (
                                        <tr key={req.request_id}>
                                            <td>#{req.request_id}</td>
                                            <td>{req.user_name}</td>
                                            <td>{req.waste_name}</td>
                                            <td>{req.estimated_weight}</td>
                                            <td>{req.pickup_address}</td>
                                            <td>{formatDate(req.preferred_date)}</td>
                                            <td>
                                                <span className="status-badge" style={{ 
                                                    background: req.status === 'APPROVED' ? '#2ecc71' : '#f1c40f',
                                                    color: req.status === 'APPROVED' ? 'white' : 'black'
                                                }}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td>
                                                {/* PENDING ඒවට විතරක් Approve බොත්තම පෙන්නනවා */}
                                                {req.status === 'PENDING' ? (
                                                    <button 
                                                        onClick={() => handleApprove(req.request_id)}
                                                        className="btn-primary" 
                                                        style={{ padding: '5px 10px', fontSize: '12px' }}
                                                    >
                                                        Approve
                                                    </button>
                                                ) : (
                                                    <span style={{ fontSize: '12px', color: '#ccc' }}>Done</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;