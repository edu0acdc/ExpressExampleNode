const express = require('express')
const usersRouter = require('./routes/users')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@heroes.p9t7b.mongodb.net/Database?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    if (err) {
        console.log("ERROR:" + err);
        exit(1);
    }
    else {
        console.log("MongoDB connected")
    }
});

app.use('/users', usersRouter);
app.get('/', (req, res) => {
    res.send("Example API")
})

app.listen(3000, () => console.log("Server running on port 3000"));
