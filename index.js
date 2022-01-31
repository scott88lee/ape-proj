const express = require('express');
const app = express();
const db = require('./model/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('view'));

app.get('/api/excavators', (req, res) => {
    let data = db.read('db.json');
    res.send(data);
})

app.post('/api/excavators', (req, res) => {
    let data = db.read('db.json');
    if (data.excavators.length < 6) {
        data.excavators.push(
            {
                id: data.excavators.length + 1,
                name: req.body.name,
                description: req.body.description
            }
        )
    }
    db.write('db.json', data)
    res.redirect("/excavator.html");
})

app.get('/api/delete/excavators/:id', (req, res) => {
    let id = req.params.id;
    let data = db.read('db.json');
    data.excavators.splice(id - 1, 1);
    db.write('db.json', data);
    res.redirect("/excavator.html");
})

app.get('/api/schedules', (req, res) => {
    let data = db.read('db.json');
    let schedule = [];

    for (let i=0; i<data.excavators.length; i++) {
        let excavator = data.excavators[i];

        if (excavator.schedule){
            for (let j=0; j<excavator.schedule.length; j++) {
                schedule.push(
                    {
                        id: i, 
                        name: excavator.name,
                        site: excavator.schedule[j].location,
                        start: excavator.schedule[j].start,
                        end: excavator.schedule[j].end
                    }
                )
            }
        }
    }
    res.send(schedule);
})

app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.listen(8080, () => {console.log("Server running: Port 8080")})