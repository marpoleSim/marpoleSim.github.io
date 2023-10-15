window.onload = choosePic;

var myPix = new Array("img/styles/a2.jpg","img/styles/a3.jpg","img/styles/a4.jpg","img/styles/a5.jpg);

function choosePic() {
     var randomNum = Math.floor(Math.random() * myPix.length);
     document.getElementById("myPicture").src = myPix[randomNum];
