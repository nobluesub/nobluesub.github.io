$(document).ready(function(){
        var BackArray = ["images/background1.jpg", "images/background2.jpg", "images/background3.jpg", "images/background4.jpg"];
var fundo = BackArray[Math.floor(Math.random() * BackArray.length)];
       $("body").css("background", '#ddd url('+ fundo +')');  
        });