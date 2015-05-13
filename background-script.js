function changeImg(imgNumber)	{
var myImages = ["images/background.jpg", "images/background9.jpg", "images/background2.jpg", "images/background7.jpg", "images/background8.jpg"];
var imgShown = document.body.style.backgroundImage;
var newImgNumber =Math.floor(Math.random()*myImages.length);
document.body.style.backgroundImage = 'url('+myImages[newImgNumber]+')';
}
window.onload=changeImg;