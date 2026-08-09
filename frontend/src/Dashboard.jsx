import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]); // Requests ටික තියාගන්න

    useEffect(() => {
        const fetchMyRequests = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/');
                return;
            }

            try {
                // Backend එකෙන් දත්ත අරගෙන එනවා
                const response = await axios.get(`http://localhost:5000/my-requests/${userId}`);
                setRequests(response.data);
            } catch (error) {
                console.log("දත්ත ගේන්න බැහැ", error);
            }
        };

        fetchMyRequests();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userId'); 
        navigate('/');
    };

    // දිනය ලස්සනට පෙන්නන්න හදපු පොඩි function එකක්
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
            <div className="glass-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
                    <h2 style={{ margin: 0, fontWeight: '400' }}>User Dashboard</h2>
                    <div>
                        <button 
                            onClick={() => navigate('/create-request')}
                            className="btn-primary" 
                            style={{ padding: '8px 15px', fontSize: '14px', marginRight: '15px' }}
                        >
                            + New Request
                        </button>
                        <button onClick={handleLogout} className="btn-outline" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>
                            Logout
                        </button>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '300', marginBottom: '20px' }}>My Pickup Requests</h3>
                    
                    {requests.length === 0 ? (
                        <p style={{ color: '#ccc', textAlign: 'center', padding: '20px' }}>You haven't made any requests yet.</p>
                    ) : (
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Waste Type</th>
                                    <th>Weight (kg)</th>
                                    <th>Address</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req.request_id}>
                                        <td>#{req.request_id}</td>
                                        <td>{req.waste_name}</td>
                                        <td>{req.estimated_weight} kg</td>
                                        <td>{req.pickup_address}</td>
                                        <td>{formatDate(req.preferred_date)}</td>
                                        <td>
                                            <span className="status-badge">{req.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;