var mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mikewong1234',
    database: 'firstdb'
});

module.export = connection;
