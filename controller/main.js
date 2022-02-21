const excavators = require('../model/excavators');
const dates = require('../helpers/dates');
const schedule = require('../model/schedule');

// For file upload
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "view/"); // here we specify the destination . in this case i specified the current directory
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);// here we specify the file saving name . in this case i specified the original file name
    }
});

const maxSize = 2 * 1024 * 1024; //In Bytes - num * mega * kilo
const uploadImage = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) { // Check MIME types on top of FileExt
            return cb(null, true);
        } else {
            cb({ success: false, errMsg: "Invalid File format." }, false)
        }
    }
}).single('image')
// For file upload

module.exports = {
    getAllExcavators: (req, res) => {
        console.log("CTL > getAllExcavators");
        let data = excavators.getAll();
        res.send(data);
    },

    addExcavator: (req, res) => {
        console.log("CTL > addExcavator");
        uploadImage (req, res, (err) => {
            if (err) {
                if (err.code == "LIMIT_FILE_SIZE") {
                    return res.send(
                        { success: false, errMsg: "File size over 2MB." }
                    )
                }
                return res.send(err)
            }
            
            console.log("Request body: " + JSON.stringify(req.body));

            let excavator = {
                name: req.body.name,
                description: req.body.description,
            }

            if (req.file){
                excavator.imglink = req.file.originalname;
            }
        
            let success = excavators.addNew(excavator);
            if (success) {
                console.log("Success");
            } else {
                console.log("Failed");
            }
            res.redirect('/excavator.html');
        });
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
            d.setDate(d.getDate() - 1);
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
                    if (
                        params.start == '' || params.start == null
                        || params.end == '' || params.end == null
                        || params.site == '' || params.site == null
                    ) {
                        payload = {
                            success: false,
                            message: 'Please fill in all the fields.'
                        }
                    } else {
                        schedule.addNew(params);
                        payload = { success: true, message: "Successfully added" };
                    }
                } else {
                    payload = {
                        success: false,
                        message: `${params.excavator} is not available for selected dates.`
                    }
                }
            }
        } else {
            // Check availablity
            if (schedule.checkAvailable(params)) {
                // Add to schedule
                if (
                    params.start == '' || params.start == null
                    || params.end == '' || params.end == null
                    || params.site == '' || params.site == null
                ) {
                    payload = {
                        success: false,
                        message: 'Please fill in all the fields.'
                    }
                } else {
                    schedule.addNew(params);
                    payload = { success: true, message: "Successully added" };
                }
            } else {
                payload = {
                    success: false,
                    message: `${params.excavator} is not available for selected dates.`
                }
            }
        }
        console.log(payload);
        res.send(payload);
    },

    getAssignments: (req, res) => {
        console.log("CTL > getAssignments");
        let arr = excavators.getAll()
        let payload = {
            excavators: [],
            sites: []
        }
        
        for(let i = 0; i < arr.length; i++) {
            payload.excavators.push(arr[i].name)

            if (arr[i].schedule){
                console.log("Found schedule");
                //Find unique sites
                for (let j=0; j < arr[i].schedule.length; j++) {
                    if (!payload.sites.includes(arr[i].schedule[j].location)) {
                        payload.sites.push(arr[i].schedule[j].location);
                    }
                }
            }
        }
        console.log(payload);
        res.send(payload)
    }
}