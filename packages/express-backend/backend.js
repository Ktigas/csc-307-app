// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


const users = {
    users_list : [
        {
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
}
const findUserByName = (name) => {
    return users['users_list']
        .filter( (user) => user['name'] === name);
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    /* Added my own stuff here */
    const job = req.query.job;
    if (job != undefined && name != undefined){
        let result = findUserByName(name);
        result = result.filter((user) => user['job'] === job);
        result = {users_list: result};
        res.send(result);
    }
    else if (job != undefined){
        let result = users['users_list']
            .filter((user) => user['job'] === job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    let idNumber = generateRandomIDNumber().toString();
    // add id to user
    user.id = idNumber;
    users['users_list'].push(user);
    return users;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    let result = findUserByName(userToAdd.name);
    if (result === undefined){
        res.status(420).send("Something went wrong")
    }
    res.status(201).send(result);
});

/* Delete User Code */
const deleteUser = (id) => {
    const newUsers = users['users_list']
        .filter((user) => user['id'] !== id);
    users['users_list'] = newUsers;
}
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    deleteUser(id);
    res.send();
});

app.delete('/users', (req, res) => {
    // get the name and job to delete
    const name = req.query.name;
    const job = req.query.job;
    // get the user to delete
    let result = findUserByName(name);
    result = result.filter((user) => user['job'] === job);
    result = result[0];
    // delete the user
    deleteUser(result['id']);
    res.send();
});



app.get('/', (req, res) => {
    res.send('Hello World! Have a good day!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});