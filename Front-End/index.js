
function getPictureDetails() {
    //alert("The form was submitted");
    //console.log(document.getElementById('Type').value);
    var file = document.getElementById('clothingIMG').files[0];
    console.log(file);
};
function loadFile(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
};
// let clothingform = document.getElementById('AddClothing');
// clothingform.setAttribute("method", "POST");
// clothingform.setAttribute("action", "http://localhost:3000/myclothing");
