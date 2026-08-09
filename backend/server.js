// අවශ්‍ය දේවල් project එකට සම්බන්ධ කරගැනීම
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// මූලික සැකසුම්
app.use(cors());
app.use(express.json());

// ඉතා සරල API එකක් (අපේ server එක වැඩද කියලා බලාගන්න)
app.get('/', (req, res) => {
    res.send('Waste Management System Backend Running Successfull !');
});

// Server එක පණ ගැන්වීම
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});