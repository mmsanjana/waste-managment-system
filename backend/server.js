const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'waste_management'
});

db.connect((err) => {
    if (err) {
        console.log('Database එකට සම්බන්ධ වෙන්න බැහැ:', err);
    } else {
        console.log('Database එකට සාර්ථකව සම්බන්ධ වුණා!');
    }
});

app.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)";
    
    db.query(sql, [full_name, email, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).send("System Error එකක් ආවා!");
        } else {
            res.send("සාර්ථකව Register වුණා!");
        }
    });
});

// වෙනස: Login වුණාම role එකත් යවනවා
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = "SELECT * FROM users WHERE full_name = ?";
    
    db.query(sql, [name], async (err, results) => {
        if (err) {
            res.status(500).send("System Error එකක් ආවා!");
        } else if (results.length > 0) {
            const match = await bcrypt.compare(password, results[0].password_hash);
            if (match) {
                res.json({ 
                    message: "සාර්ථකව Login වුණා!", 
                    userId: results[0].user_id,
                    role: results[0].role // මේකෙන් තමයි Admin ද User ද හොයන්නේ
                });
            } else {
                res.status(401).send("Password එක වැරදියි!");
            }
        } else {
            res.status(404).send("මේ නමින් User කෙනෙක් නැහැ!");
        }
    });
});

app.get('/waste-types', (req, res) => {
    const sql = "SELECT * FROM waste_types";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.json(results);
        }
    });
});

app.post('/pickup-requests', (req, res) => {
    const { user_id, waste_type_id, estimated_weight, pickup_address, preferred_date } = req.body;
    const sql = "INSERT INTO pickup_requests (user_id, waste_type_id, estimated_weight, pickup_address, preferred_date) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [user_id, waste_type_id, estimated_weight, pickup_address, preferred_date], (err, result) => {
        if (err) {
            res.status(500).send("Error creating request");
        } else {
            res.send("Pickup Request එක සාර්ථකව යැව්වා!");
        }
    });
});

app.get('/my-requests/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT pr.*, wt.name AS waste_name 
        FROM pickup_requests pr 
        JOIN waste_types wt ON pr.waste_type_id = wt.waste_type_id 
        WHERE pr.user_id = ? 
        ORDER BY pr.request_id DESC
    `;
    
    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).send("Error fetching requests");
        } else {
            res.json(results);
        }
    });
});

// අලුත් API එක 1: Admin ට ඔක්කොම Requests බලාගන්න (User ගේ නමත් එක්ක)
app.get('/admin/requests', (req, res) => {
    const sql = `
        SELECT pr.*, wt.name AS waste_name, u.full_name AS user_name
        FROM pickup_requests pr 
        JOIN waste_types wt ON pr.waste_type_id = wt.waste_type_id 
        JOIN users u ON pr.user_id = u.user_id
        ORDER BY pr.request_id DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching all requests");
        } else {
            res.json(results);
        }
    });
});

// අලුත් API එක 2: Admin ට Request එකක Status එක වෙනස් කරන්න
app.put('/admin/requests/:id/status', (req, res) => {
    const { status } = req.body;
    const requestId = req.params.id;
    const sql = "UPDATE pickup_requests SET status = ? WHERE request_id = ?";
    
    db.query(sql, [status, requestId], (err, result) => {
        if (err) {
            res.status(500).send("Error updating status");
        } else {
            res.send("Status updated successfully!");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});