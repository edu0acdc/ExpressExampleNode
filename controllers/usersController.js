const UserModel = require('../schemas/userModel')
const bcrypt = require('bcrypt')


exports.user_get = function (req, res) {
    id = req.params.id
    UserModel.findOne({ _id: id }, "name age email", function (err, docs) {
        if (err || !docs) {
            console.log(err)
            res.status(400).json({ error: "User not found" });
        }
        else {
            res.status(200).json({ user: docs })
        }
    })
}

exports.list_users = function (req, res) {
    UserModel.find({}, "name age email", function (err, docs) {
        if (err) {
            console.log(err)
            res.status(400).json({ error: "Error while reaching users" });
        }
        else {
            res.status(200).json({ users: docs })
        }
    })
}

exports.register = async function (req, res) {
    body = req.body;

    if (!(body.name && body.password && body.age && body.email && body.username)) {
        res.status(400).json({ error: "Required field is missing" });
        return;
    }

    var name = body.name;
    var password = body.password;
    if (password.length < 8) {
        res.status(400).json({ error: "Password needs to have at least 8 characters" });
        return;
    }
    var username = body.username
    var email = body.email;
    var age = body.age;
    const salt = await bcrypt.genSalt(5);
    hash_password = await bcrypt.hash(password, salt);

    const user = new UserModel({ name: name, username: username, password: hash_password, age: age, email: email });
    user.save().then(() => {
        res.status(200).json({ info: "User created with successs", userID: user._id })
    }).catch(() => {
        res.status(400).json({ error: "Username or email already in use" });
    });
}


exports.login = function (req, res) {
    const body = req.body;

    if (!body.password) {
        res.status(400).json({ error: "Required field is missing" });
        return;
    }

    if (body.username) {
        UserModel.findOne({ username: body.username }, async function (err, user) {
            if (err || !user) {
                console.log(err)
                res.status(400).json({ error: "User not found" });
            }
            else {
                const validPassword = await bcrypt.compare(body.password, user.password);
                if (validPassword) {
                    res.status(200).json({ info: "Successfull Login " })
                }
                else {
                    res.status(400).json({ error: "Wrong password" });
                }
            }
        })
    }
    else if (body.email) {
        UserModel.findOne({ email: body.email }, async function (err, user) {
            if (err || !user) {
                console.log(err)
                res.status(400).json({ error: "User not found" });
            }
            else {
                const validPassword = await bcrypt.compare(body.password, user.password);
                if (validPassword) {
                    res.status(200).json({ info: "Successfull Login " })
                }
                else {
                    res.status(400).json({ error: "Wrong password" });
                }
            }
        })
    }
    else {
        res.status(400).json({ error: "Required field is missing" });
        return;
    }




}