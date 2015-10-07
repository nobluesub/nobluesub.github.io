$(document).ready(function(){
        var BackArray = ["images/background.jpg", "images/background9.jpg", "images/background2.jpg", "images/background7.jpg", "images/background8.jpg"];
var fundo = BackArray[Math.floor(Math.random() * BackArray.length)];
       $("body").css("background", '#ddd url('+ fundo +')');  
        });