function changeImg(imgNumber)	{
var myImages = ["images/background.jpg", "images/background2.jpg", "images/background3.jpg"];
var imgShown = document.body.style.backgroundImage;
var newImgNumber =Math.floor(Math.random()*myImages.length);
document.body.style.backgroundImage = 'url('+myImages[newImgNumber]+')';
}
window.onload=changeImg;