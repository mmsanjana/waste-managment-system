import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                name: name,
                password: password
            });
            
            localStorage.setItem('userId', response.data.userId);
            navigate('/dashboard'); 
            
        } catch (error) {
            alert("Login වෙන්න බැහැ: " + (error.response?.data || "Error"));
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
            {/* Glass effect එක පාවිච්චි කිරීම */}
            <div className="glass-container" style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '30px', fontWeight: '400' }}>Welcome Back</h2>
                
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Name</label>
                        <input 
                            type="text" 
                            className="input-field"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            placeholder="Enter your name"
                        />
                    </div>
                    <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Password</label>
                        <input 
                            type="password" 
                            className="input-field"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn-primary">Login to System</button>
                </form>
                
                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '15px' }}>Don't have an account?</p>
                    <button onClick={() => navigate('/register')} className="btn-outline">
                        Create new account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;