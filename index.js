const express = require('express');
const app = express();

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello');
})

app.listen(8080, ()=>{console.log("Server running: Port 8080")})