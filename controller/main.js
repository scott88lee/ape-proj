const excavators = require('../model/excavators');

module.exports = {
    getAllExcavators: (req, res) => {
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
    }
}