const User = require('../models/user');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { passwordStrength } = require('check-password-strength');

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log(`Passwords don't match`);
        // req.flash('error', 'Unmatched Passwords');
        return res.status(400).json({});
    }

    let validemail = await verifyEmail(req.body.email);
    if (!validemail) {
        return res.status(400).json({});
    }
    let validpass = await verifyPassword(req.body.password);
    if (!validpass) {
        return res.status(400).json({});
    }


    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (!user) {
                let newUser = new User();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                await newUser.setPassword(req.body.password.toString());
                newUser.setUsername(req.body.email.toString());
                newUser.college_id = req.body.college_id;

                newUser.save()
                    .then((user) => {
                        console.log(`Created new user`);
                        // req.flash('success', 'Logged Up Successfully');
                        const data = {
                            user: {
                                id: user.id
                            }
                        };
                        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
                        return res.status(200).json({ 'auth-token': authtoken });
                    })
                    .catch((err) => {
                        // req.flash('error', 'Error while creating account');
                        console.log(`Error while creating user`, err);
                        return res.status(500).json({});
                    });
            }
            else {
                console.log(`Already a user`);
                // req.flash('warning', 'Account already exists');
                return res.status(409).json({});
            }
        })
        .catch((err) => {
            console.log(`Error while finding user`);
            return res.status(500).json({});
        });
}


module.exports.createSession = function (req, res) {
    // req.flash('success', 'Logged In Successfully');
    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({});
            }
            else {
                let validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass)
                    return res.status(401).json({});
                // req.flash('warning', 'Account already exists');
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const authtoken = jwt.sign(data, process.env.JWT_SECRET);
                return res.status(200).json({ 'auth-token': authtoken });
            }
        })
        .catch((err) => {
            console.log(`Error while finding user`);
            return res.status(500).json({});
        });
}





async function verifyEmail(email) {
    return true;
    const encodedParams = new URLSearchParams();
    encodedParams.append("email", email);

    const url = 'https://email-validator8.p.rapidapi.com/api/v2.0/email';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'b072b320e4msh6cb29d215cd9d00p1f2b93jsn2f615689b465',
            'X-RapidAPI-Host': 'email-validator8.p.rapidapi.com'
        },
        body: encodedParams
    };

    try {
        const res = await fetch(url, options);
        console.log(res);
        if (!res)
            return false;
        const json = await res.json();
        console.log('JSON', json);
        if (json && json.mx_records)
            return true;
        else
            return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function verifyPassword(password) {
    return true;
    // 0=Too weak  ,  1=Weak  ,  2=Medium  ,  3=Strong
    console.log(passwordStrength(password));
    if (passwordStrength(password).id >= 1)
        return true;
    else
        return false;
}