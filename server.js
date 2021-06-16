const express = require('express')
const usersRouter = require('./routes/users')
const app = express()
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://admin:admin@heroes.p9t7b.mongodb.net/Database?retryWrites=true&w=majority";


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("MongoDB connected");
}).catch(function (err) {
    console.log(err);
});
app.use(function (req, res, next) {
    url = req.url;
    method = req.method;
    user_agent = req.headers['user-agent']
    console.log("\x1b[42m", "URL: ", "\x1b[0m", url, " |", "\x1b[42m", " METHOD: ", "\x1b[0m", method, " |", "\x1b[42m", " USER AGENT: ", "\x1b[0m", user_agent)
    next()
})
app.use('/users', usersRouter);
app.get('/', (req, res) => {
    res.json({ info: "Example API" })
})

app.listen(3000, () => console.log("Server running on port 3000"));
