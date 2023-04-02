const College = require('../models/college');

module.exports.getNames = async (req, res) => {
    College.find({})
        .then((college) => {
            if (college) {
                let result = [];
                college.map(val => { result.push({ name: val.name, city: val.city, id: val.id }); });
                return res.json(result);
            }
            else
                return res.json({});
        })
        .catch((err) => {
            console.log('Error while getting college names: ', err);
            return res.json({});
        });
}