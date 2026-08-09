import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId'); 
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto' }}>
            <div className="glass-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
                    <h2 style={{ margin: 0, fontWeight: '400' }}>User Dashboard</h2>
                    <button onClick={handleLogout} className="btn-outline" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>
                        Logout
                    </button>
                </div>

                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '10px' }}>Welcome to Your Portal</h3>
                    <p style={{ color: '#ccc', marginBottom: '40px' }}>Manage your waste pickup requests easily from here.</p>
                    
                    <div style={{ maxWidth: '350px', margin: '0 auto' }}>
                        {/* මේ බොත්තම එබුවාම Create Request පිටුවට යනවා */}
                        <button 
                            onClick={() => navigate('/create-request')}
                            className="btn-primary" 
                            style={{ padding: '15px', fontSize: '18px', boxShadow: '0 10px 20px rgba(39, 174, 96, 0.3)' }}
                        >
                            + Create New Pickup Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;