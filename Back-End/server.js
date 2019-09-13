var express = require('express');
var app = express();
app.use(express.urlencoded())
var mysql = require('mysql');
// let connection = require("./connection");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let mustacheExpress = require("mustache-express");
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '..\\..\\Front-End');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mikewong1234',
    database: 'firstdb'
});
connection.connect();

app.route('/')
    .get(function (req, res) {
        connection.query('Select * from clothing', function (err, results) {
            if (err)
                throw err;
            else {
                res.render("index", { items: results })
            }
        });
    })
app.route('/myclothing')
    .get(function (req, res) {
        connection.query('Select * from clothing', function (err, results) {
            if (err)
                throw err;
            else {
                res.redirect("/");
            }
        })
    })
    .post(function (req, res) {
        console.log("CUrrently Inserting");
        let param = [];
        let picPath = ["C:\\Users\\jiayao.wong\\Pictures\\CLothingAppPictures\\"];
        var output = picPath.map(function (i) { return i.replace(/\\/g, '/').replace(/^dist\//, ''); });
        param[0] = req.body.Type;
        param[1] = req.body.Brand;
        param[2] = req.body.ClothingURL;
        param[3] = output + req.body.clothingIMG
        console.log(param);
        connection.query('insert into clothing(type,brand,url,img) values(?,?,?,?)', param, function (err, results) {
            if (err)
                throw err;
            else {
                console.log(results);
            }
        })
        res.redirect("/");
    });
app.route("/myclothing/delete/:id")
    .get(function (req, res) {
        console.log(req.params.id);
        connection.query('DELETE FROM clothing where id=?', req.params.id, function (err, results) {
            if (err)
                throw err;
            else {
                console.log(results);
            }
        })
        res.redirect("/");
    });
app.listen(3000);
