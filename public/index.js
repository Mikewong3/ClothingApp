function getPictureDetails() {
  //alert("The form was submitted");
  //console.log(document.getElementById('Type').value);
  var file = document.getElementById("clothingIMG").files[0];
  console.log(file);
}
function loadFile(event) {
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
}
function showData() {
  alert("It works");
  console.log("WOrks?");
}

function deleteItem(id) {
  console.log(id);
  const HTTP = new XMLHttpRequest();
  const url = "./myclothing/delete/" + id;
  HTTP.open("GET", url);
  HTTP.send();
  HTTP.onreadystatechange = function(res) {};
}
// function displayImg() {
//   var preview = document.getElementById("imgPreview");
//   var file = document.getElementById(clothingIMG).files[0];
//   var reader = new FileReader();

//   reader.onloadend = function() {
//     preview.src = reader.result;
//   };
//   if (file) {
//     reader.readAsDataURL(file);
//   } else {
//     preview.src = "";
//   }
// }
