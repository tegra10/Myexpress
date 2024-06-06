const dotenv = require("dotenv").config("./.env");
const express = require("express");
const mysql = require("mysql");

const port = process.env.PORT;
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sqlbdd"
});
connection.connect(err => {
    if (err) {
        console.error(
            "impossible de se Connecté à la bdd à cause de l'erreur " + err
        );
    }
    console.log("connection à la bdd reussi");
});
app.get("/post", (req, res) => {
    connection.query("SELECT * FROM user", (err, rows, fields) => {
        if (err) {
            console.error(
                "Erreur lors de la récupération des utilisateurs : " + err
            );
            res.status(500).json({
                error: "Erreur lors de la récupération des utilisateurs"
            });
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () =>
    console.log(`Connecté sur le port http://localhost:${port}`)
);
