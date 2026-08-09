import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                full_name: fullName,
                email: email,
                password: password
            });
            alert(response.data);
            navigate('/'); 
        } catch (error) {
            alert("System Error එකක් ආවා!");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
            <div className="glass-container" style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '30px', fontWeight: '400' }}>Join with Us</h2>
                
                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Full Name</label>
                        <input 
                            type="text" 
                            className="input-field"
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            required 
                            placeholder="e.g. Nimal Perera"
                        />
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>Email Address</label>
                        <input 
                            type="email" 
                            className="input-field"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="e.g. nimal@example.com"
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
                            placeholder="Create a strong password"
                        />
                    </div>
                    <button type="submit" className="btn-primary">Register Now</button>
                </form>
                
                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '15px' }}>Already have an account?</p>
                    <button onClick={() => navigate('/')} className="btn-outline">
                        Login here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;