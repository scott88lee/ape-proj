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
    },

    addSchedule: (req, res) => {
        let payload = {};
        console.log("CTL > addSchedule");
        let params = req.body;
        console.log(params);

        if (schedule.checkRedeploy(params)) {
            console.log("Redeploy");
            // Excavator redeployed to different site
            // Need to add one day for maintanance
            let d = new Date(params.start);
            d.setDate(d.getDate() + 1);
            params.start = dates.yyyymmdd(d);
            console.log(params);

            if (!params.bypass) {
                // Optimise recommendation
                // 1) Recommend free excavator
                let freeExcavator = excavators.getUnassigned();
                if (freeExcavator) {
                    payload = {
                        success: false,
                        message: `${freeExcavator} is a better choice because its unassigned. `
                    }
                } else {
                    // 2) Recommend excavator from last site.
                    let excavator = schedule.lastDeployed(params.site);
                    payload = {
                        success: false,
                        message: `${excavator} is a better choice it was last deployed to ${params.site}.`
                    }
                }
            } else {
                // Check availablity
                if (schedule.checkAvailable(params)) {
                    // Add to schedule
                    schedule.addNew(params);
                    payload = { success: false, message: "Success" };
                } else {
                    paylaod = {
                        success: false,
                        message: `${params.excavator} is not available for selected dates.`
                    }
                }
            }
        } else {
            // Check availablity
            if (schedule.checkAvailable(params)) {
                // Add to schedule
                schedule.addNew(params);
                payload = { success: false, message: "Success" };
            } else {
                paylaod = {
                    success: false,
                    message: `${params.excavator} is not available for selected dates.`
                }
            }
        }
        res.send(payload);
    },

    getAssignments: (req, res) => {
        console.log("CTL > getAssignments");
        let arr = excavators.getAll()
        let payload = {
            excavators: [],
            sites: []
        }
        
        let uniqueSites = [];
        for(let i = 0; i < arr.length; i++) {
            payload.excavators.push({
                excavator: arr[i].name,
            })

            if (arr[i].schedule){
                //Find unique sites
                if (!uniqueSites.includes(arr[i].schedule.site)) {
                    uniqueSites.push(arr[i].schedule.site);
                }
            }
        }

        payload.sites = uniqueSites;
        res.send(payload)
    }
}