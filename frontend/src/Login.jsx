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
            
            // අලුත් වෙනස: Backend එකෙන් එවන userId එක browser එකේ save කරගන්නවා
            localStorage.setItem('userId', response.data.userId);
            
            alert(response.data.message); 
            navigate('/dashboard'); 
            
        } catch (error) {
            alert("Login වෙන්න බැහැ: " + (error.response?.data || "Error"));
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', marginTop: '50px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name: </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', width: '100%', cursor: 'pointer' }}>Login</button>
            </form>
            
            <div style={{ marginTop: '20px' }}>
                <p>Don't have an account?</p>
                <button 
                    onClick={() => navigate('/register')} 
                    style={{ padding: '8px 15px', background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer' }}>
                    Create new account
                </button>
            </div>
        </div>
    );
}

export default Login;