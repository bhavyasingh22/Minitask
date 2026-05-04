const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let idCounter = 1;

app.get("/", (req, res) => {
    res.json({
        message: "Server Running",
        time: new Date()
    });
});

app.use((req, res, next) => {
    const time = new Date();
    console.log(`Request received at: ${time}`);
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/users", (req, res) => {
    res.json({
        message: "All users fetched",
        data: users,
        time: new Date()
    });
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;

  
    if (!name || !email) {
        return res.json({
            message: "Name or email is missing",
            time: new Date()
        });
    }

    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.json({
            message: "Duplicate email not allowed",
            time: new Date()
        });
    }

    const newUser = {
        id: idCounter++,
        name,
        email
    };

    users.push(newUser);

    res.json({
        message: "User added successfully",
        data: newUser,
        time: new Date()
    });
});


app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.json({
            message: "User not found",
            time: new Date()
        });
    }

    users.splice(index, 1);

    res.json({
        message: "User deleted successfully",
        time: new Date()
    });
});


app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.json({
            message: "User not found",
            time: new Date()
        });
    }


    res.json({
        message: "User found",
        data: user,
        time: new Date()
    });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: "All fields required",
            time: new Date()
        });
    }


    if (email === "admin@gmail.com" && password === "1234") {
        return res.json({
            message: "Login Success",
            time: new Date()
        });
    }
    res.json({
        message: "Invalid Credentials",
        time: new Date()
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});