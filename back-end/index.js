require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const adminAuth = require("./routes/adminAuth");

const payment = require("./routes/payment");

const adminManageUsers = require('./routes/adminManageUsers');

const adminManageRE = require('./routes/adminManageRE')

const app = express();

const ports = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Accept, X-Custom-Header, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use(bodyParser.json());

app.use("/adminAuth", adminAuth);

app.use("/payment", payment);

app.use('/adminManageUsers', adminManageUsers);

app.use('/adminManageRE', adminManageRE);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));
