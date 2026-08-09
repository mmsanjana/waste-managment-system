const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // අලුතින් එකතු කරපු පේළිය

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database එකට සම්බන්ධ වීම (කිසිම සංකීර්ණ security settings නැතුව සරලව)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP වල මුලින්ම password එකක් නැහැ, ඒ නිසා හිස්ව තියන්න
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
    res.send('Waste Management System Backend work  successfully !');
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});