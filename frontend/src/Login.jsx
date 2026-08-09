import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // සංජනාගේ backend එකට නම සහ මුරපදය යවනවා
            const response = await axios.post('http://localhost:5000/login', {
                name: name,
                password: password
            });
            
            alert(response.data); // සාර්ථක නම් "සාර්ථකව Login වුණා!" කියලා එයි
        } catch (error) {
            alert("Login වෙන්න බැහැ: " + error.response.data);
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Waste Management - Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name: </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" style={{ padding: '5px 15px' }}>Login</button>
            </form>
        </div>
    );
}

export default Login;