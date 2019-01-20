$(document).ready(function(){
        var BackArray = ["images/background1.jpg", "images/background2.jpg", "images/background3.jpg", "images/background4.jpg", "images/background5.jpg", "images/background6.jpg", "images/background7.jpg", "images/background8.jpg"];
var fundo = BackArray[Math.floor(Math.random() * BackArray.length)];
       $("body").css("background", '#ddd url('+ fundo +')');  
        });