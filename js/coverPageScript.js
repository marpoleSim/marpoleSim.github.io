// this will call the function which is not expected
// window.onload = choosePic;

var myPix = new Array("c1.jpg", "a2b.jpg","a3b.jpg","a4b.jpg","a5b.jpg");

function choosePic() {
     // Get a random index
     //var randomNum = Math.floor(Math.random() * myPix.length);
     var randomNum = 0

     // Get an image at the random_index
     selected_image = myPix[randomNum];

     // Display the image
     document.getElementById("coverpagePicture").src = `img/styles/${selected_image}`;
}

function jumpToTop() {
     window.scrollTo(0,0);
     choosePic();
}
