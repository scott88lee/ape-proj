const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('view'));

const ctl = require('./controller/main');

//API Routes
app.get('/api/excavators', ctl.getAllExcavators);
app.post('/api/excavators', ctl.addExcavator);

app.get('/api/delete/excavators/:id', ctl.deleteExcavator);

app.get('/api/schedule', ctl.getSchedule);
app.post('/api/schedule', ctl.addSchedule);

app.get('/api/assignments', ctl.getAssignments);

//404 Error
app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => { console.log(`Server Port: ${PORT}`) });