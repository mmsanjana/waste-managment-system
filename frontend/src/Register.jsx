import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        
        try {
            const response = await axios.post('http://localhost:5000/register', {
                full_name: fullName,
                email: email,
                password: password
            });
            alert(response.data); // Shows success message
        } catch (error) {
            console.error(error);
            alert("Registration failed! Check the console.");
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                    style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
                /><br />
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
                /><br />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
                /><br />
                <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Register</button>
            </form>
        </div>
    );
}

export default Register;