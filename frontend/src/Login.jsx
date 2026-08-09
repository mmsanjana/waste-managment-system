import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/login', {
                name: name,
                password: password
            });
            alert(response.data); // Shows success message
        } catch (error) {
            console.error(error);
            // Shows the specific error message from the backend (e.g., "Password incorrect")
            alert(error.response ? error.response.data : "Login failed!");
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)} 
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
                <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
}

export default Login;