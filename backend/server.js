const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); 
const bcrypt = require('bcrypt'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'waste_management'
});

db.connect((err) => {
    if (err) {
        console.log('Database cant connect:', err);
    } else {
        console.log('Database is connected!');
    }
});

app.get('/', (req, res) => {
    res.send('Waste Management System Backend work successfully!');
});

// Register API
app.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const sql = "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)";
    
    db.query(sql, [full_name, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("System Error!");
        } else {
            res.send("Registered Successfully!");
        }
    });
});

// Login API
app.post('/login', (req, res) => {
    // Get name and password from the frontend
    const { name, password } = req.body;

    // Search for the user by full_name
    const sql = "SELECT * FROM users WHERE full_name = ?";
    
    db.query(sql, [name], async (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("System Error!");
        } else if (results.length > 0) {
            // User found, compare passwords
            const match = await bcrypt.compare(password, results[0].password_hash);
            if (match) {
                res.send("Logged in Successfully!");
            } else {
                res.status(401).send("Incorrect Password!");
            }
        } else {
            res.status(404).send("User not found with this name!");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});