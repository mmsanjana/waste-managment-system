import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logout වෙද්දී ආපහු Login පිටුවට යවනවා
        navigate('/');
    };

    return (
        <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '20px', marginBottom: '30px' }}>
                <h2>User Dashboard</h2>
                <button 
                    onClick={handleLogout}
                    style={{ padding: '8px 15px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>

            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#2c3e50', borderRadius: '10px', color: 'white' }}>
                <h3>Welcome to Waste Management System</h3>
                <p>You have successfully logged in!</p>
                
                <div style={{ marginTop: '30px' }}>
                    {/* අපි ඊළඟට හදන්න යන Pickup Request එකට අදාල බොත්තම */}
                    <button style={{ padding: '15px 30px', fontSize: '16px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        + Create New Pickup Request
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;