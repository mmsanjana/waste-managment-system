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
            navigate('/'); // Register වුණාම ආපහු Login පිටුවට යවනවා
        } catch (error) {
            alert("System Error එකක් ආවා!");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', marginTop: '50px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Full Name: </label>
                    <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email: </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                <button type="submit" style={{ padding: '10px 20px', width: '100%', cursor: 'pointer' }}>Register</button>
            </form>
            
            <div style={{ marginTop: '20px' }}>
                <p>Already have an account?</p>
                <button 
                    onClick={() => navigate('/')} 
                    style={{ padding: '8px 15px', background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer' }}>
                    Login here
                </button>
            </div>
        </div>
    );
}

export default Register;