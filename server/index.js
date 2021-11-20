const express = require('express');
var cors = require('cors');
const { writeFileSync } = require('fs');
const path = require('path');
var app = express();

app.use(cors());
app.use(express.json());

const usersJsonPath = path.join(__dirname, 'data', 'users.json');
const users = require(usersJsonPath);

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    res.json({
        success: Boolean(user),
        user
    });
});

app.post('/schedule-meeting', (req, res) => {
    const { meeting, email } = req.body;
    const user = users.find(user => user.email === email);
    user.meetings.push(meeting);
    writeFileSync(usersJsonPath, JSON.stringify(users));
    res.json({
        success: true
    });
});


app.post('/update-meeting', (req, res) => {
    const { meeting, email } = req.body;
    const user = users.find(user => user.email === email);
    const _meeting = user.meetings.find(_meeting => _meeting.id === meeting.id);
    _meeting.name = meeting.name;
    _meeting.date = meeting.date;
    _meeting.description = meeting.description;
    _meeting.attendees = meeting.attendees;
    writeFileSync(usersJsonPath, JSON.stringify(users));
    res.json({
        success: true
    });
});


app.listen(5002, () => {
    console.log(`Server listening at http://localhost:${5002}`)
});