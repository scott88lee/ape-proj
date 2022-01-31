const express = require('express');
const app = express();
const db = require('./model/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('view'));

app.get('/api/excavators', (req, res) => {
    let exc = db.read('db.json');
    res.send(exc);
})

app.post('/api/excavators', (req, res) => {
    console.log(req.body)
    let data = db.read('db.json');
    data.excavators.push(
        {
            id: data.excavators.length + 1,
            name: req.body.name,
            description: req.body.description
        }
    )
    db.write('db.json', data)
    res.redirect("/excavator.html");
})

app.get('/api/schedule', (req, res) => {
    res.send("ok")
})

app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.listen(8080, () => {console.log("Server running: Port 8080")})