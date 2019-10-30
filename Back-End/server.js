var express = require("express");
var app = express();
var session = require("express-session");
var multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var upload = multer({ storage: storage });
var fs = require("fs");
var mysql = require("mysql");
const bodyParser = require("body-parser");
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("Front-End"));
let mustacheExpress = require("mustache-express");
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.use(session({ secret: "Shh, its a secret!" }));
/**This is for loading files when I am on pc */
// app.set('views', __dirname + '..\\..\\Front-End');
// app.use(express.static(__dirname + '..\\..\\public'));
// app.use(express.static(__dirname + '..\\..\\public\\images'));

/*This is for loading files when I am using my mac */

app.set("views", "/Users/mike/documents/ClothingApp/Front-End");
app.use(express.static("/Users/mike/documents/ClothingApp/public"));
app.use(express.static("/Users/mike/documents/ClothingApp/public/images"));
app.use(express.static("/Users/mike/documents/ClothingApp/public/uploads"));
app.use(express.static("/Users/mike/documents/ClothingApp/Back-End/images"));
// app.use(express.static("/Users/mike/documents/ClothingApp/public/clothItem"));

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mikewong1234",
  database: "firstdb"
});
connection.connect();

app.route("/").get(function(req, res) {
  connection.query("Select * from clothing", function(err, results) {
    if (err) throw err;
    else {
      res.render("index", { items: results });
    }
  });
});
app
  .route("/myclothing")
  .get(function(req, res) {
    connection.query("Select * from clothing", function(err, results) {
      if (err) throw err;
      else {
        res.redirect("/");
      }
    });
  })
  .post(upload.single("clothingIMG"), function(req, res) {
    console.log("CUrrently Inserting");
    let param = [];
    // let picPath = ["C:\\Users\\jiayao.wong\\Pictures\\CLothingAppPictures\\"];
    // var output = picPath.map(function(i) {
    //   return i.replace(/\\/g, "/").replace(/^dist\//, "");
    // });
    // Define a JSONobject for the image attributes for saving to database
    let output = "./myclothing/public/uploads/";
    param[0] = req.body.Type;
    param[1] = req.body.Brand;
    param[2] = req.body.ClothingURL;
    // param[3] = output + req.body.clothingIMG;
    param[3] = req.file.filename;
    console.log(param);
    connection.query(
      "insert into clothing(type,brand,url,img) values(?,?,?,?)",
      param,
      function(err, results) {
        if (err) throw err;
        else {
          console.log(results);
        }
      }
    );
    res.redirect("/");
  });
app.route("/myclothing/delete/:id").get(function(req, res) {
  console.log(req.params.id);
  console.log("--Deleted");
  console.log(req);
  connection.query("DELETE FROM clothing where id=?", req.params.id, function(
    err,
    results
  ) {
    if (err) throw err;
    else {
      console.log(results);
    }
  });
  res.redirect("/");
});
app.route("/myclothing/:clothingType").get(function(req, res) {
  console.log("----Fetching :" + req.params.clothingType);
  connection.query(
    "Select * from clothing where type = ?",
    req.params.clothingType,
    function(err, result) {
      console.log(result);
      res.render("index", { items: result });
    }
  );
});
app.listen(3000);
