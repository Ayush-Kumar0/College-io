const User = require('../models/user');
const College = require('../models/college');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { passwordStrength } = require('check-password-strength');

module.exports.create = async function (req, res) {
    // console.log(req.cookies);
    if (req.body.password != req.body.confirm_password) {
        console.log(`Passwords don't match`);
        return res.status(400).json({});
    }
    
    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (!user) {
                let validemail = await verifyEmail(req.body.email);
                if (!validemail) {
                    return res.status(400).json({});
                }
                let validpass = await verifyPassword(req.body.password);
                if (!validpass) {
                    return res.status(400).json({});
                }

                // Creating the user
                let newUser = new User();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                await newUser.setPassword(req.body.password.toString());
                newUser.setUsername(req.body.email.toString());
                newUser.college_id = req.body.college_id;
                newUser.feeds = [];
                newUser.comments = [];
                
                newUser.save()
                    .then((user) => {
                        console.log(`Created new user`);
                        College.findById(user.college_id)
                            .then((college) => {
                                college.students.push(user.id);
                                // Saving the student id inside college document
                                college.save()
                                    .then(() => {
                                        // req.flash('success', 'Logged Up Successfully');
                                        const data = {
                                            user: {
                                                id: user.id,
                                                college_id: user.college_id
                                            }
                                        };
                                        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
                                        res.cookie('auth-token', authtoken, {
                                            maxAge: 604800000, // 7 days
                                            secure: true,
                                            sameSite: 'None',
                                            httpOnly: true,
                                            domain: process.env.COOKIE_DOMAIN,
                                            path: '/'
                                        });
                                        return res.status(200).json({});
                                    })
                                    .catch((err) => {
                                        // req.flash('error', 'Error while creating account');
                                        console.log(`Error while saving user in college`, err);
                                        return res.status(500).json({});
                                    });
                            })
                            .catch((err) => {
                                // req.flash('error', 'Error while creating account');
                                console.log(`Error while searching user's college`, err);
                                return res.status(500).json({});
                            });
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
                        id: user.id,
                        college_id: user.college_id
                    }
                };
                const authtoken = jwt.sign(data, process.env.JWT_SECRET);
                res.cookie('auth-token', authtoken, {
                    maxAge: 604800000, // 7 days
                    secure: true,
                    sameSite: 'None',
                    httpOnly: true,
                    domain: process.env.COOKIE_DOMAIN,
                    path: '/'
                });
                return res.status(200).json({});
            }
        })
        .catch((err) => {
            console.log(`Error while finding user`);
            return res.status(500).json({});
        });
}





// Email validation using an api from RapidAPI
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

// Password validation
async function verifyPassword(password) {
    return true;
    // 0=Too weak  ,  1=Weak  ,  2=Medium  ,  3=Strong
    console.log(passwordStrength(password));
    if (passwordStrength(password).id >= 1)
        return true;
    else
        return false;
}



// Check if user still exists or not
module.exports.exists = async (req, res) => {
    const token = req.cookies['auth-token'];
    if (!token) {
        return res.status(401).json({});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data && data.user) {
            const user = await User.findById(data.user.id);
            if (user) {
                const data = {
                    user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                    }
                };
                return res.status(200).json(data);
            }
            else {
                res.cookie('auth-token', '', {
                    expires: Date.now(),
                    secure: true,
                    sameSite: 'None',
                    httpOnly: true,
                    domain: process.env.COOKIE_DOMAIN
                });
                return res.status(403).json({});
            }
        }
        else {
            res.cookie('auth-token', '', {
                expires: Date.now(),
                secure: true,
                sameSite: 'None',
                httpOnly: true,
                domain: process.env.COOKIE_DOMAIN
            });
            return res.status(403).json({});
        }
    } catch (err) {
        res.cookie('auth-token', '', {
            expires: new Date(),
            secure: true,
            sameSite: 'None',
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN
        });
        res.status(500).json({});
    }
}






module.exports.logout = async (req, res) => {
    try {
        res.cookie('auth-token', '', {
            expires: new Date(),
            secure: true,
            sameSite: 'None',
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN
        });
        return res.status(200).json({});
    } catch (err) {
        res.status(500).json({});
    }
}
