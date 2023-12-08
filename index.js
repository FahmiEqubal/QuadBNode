const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.get('/api/user', async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const users = response.data;
        res.json(users);
    } catch (error) {
        console.error('Error fetching data from WazirX API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
