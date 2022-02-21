const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

const upload = multer({ dest: 'public/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('view'));

const ctl = require('./controller/main');

//API Routes
app.get('/api/excavators', ctl.getAllExcavators);
// app.post('/api/excavators', ctl.addExcavator);
app.get('/api/delete/excavators/:id', ctl.deleteExcavator);
app.post('/api/excavators', upload.single('myFile'), (req, res) => {
    console.log("CTL > addExcavator");
    console.log(req.file)
    let excavator = {
        name: req.body.name,
        description: req.body.description,
    }
    
    const excavators = require('./model/excavators');
    let success = excavators.addNew(excavator);
    if (success) {
        console.log("Success");
    } else {
        console.log("Failed");
    }
    res.redirect('/excavator.html');
});

app.get('/api/schedule', ctl.getSchedule);
app.post('/api/schedule', ctl.addSchedule);

app.get('/api/assignments', ctl.getAssignments);

//404 Error
app.get("*", (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => { console.log(`Server Port: ${PORT}`) });