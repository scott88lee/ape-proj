const excavators = require('../model/excavators');
const dates = require('../helpers/dates');
const schedule = require('../model/schedule');

module.exports = {
    getAllExcavators: (req, res) => {
        console.log("CTL > getAllExcavators");
        let data = excavators.getAll();
        res.send(data);
    },

    addExcavator: (req, res) => {
        console.log("CTL > addExcavator");
        let excavator = {
            name: req.body.name,
            description: req.body.description,
        }

        let success = excavators.addNew(excavator);
        if (success) {
            console.log("Success");
        } else {
            console.log("Failed");
        }
        res.redirect('/excavator.html');
    },

    deleteExcavator: (req, res) => {
        console.log("CTL > delExcavators");
        let id = req.params.id;
        excavators.deleteOne(id);
        res.redirect("/excavator.html");
    },

    getSchedule: (req, res) => {
        console.log("CTL > getSchedule");
        console.log(req.query);
        let data = schedule.getRange(req.query.start, req.query.end);
        console.table(data);
        res.send(data)
    }
}