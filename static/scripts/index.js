var el_menu = document.getElementById("menu");
var el_open = document.getElementById("open");
var el_close = document.getElementById("close");

function closeMenu(){
  el_menu.style.width = "0";
  el_open.style.display = "block";
  el_close.style.display = "none";
}

function openMenu(){
  el_menu.style.width = "20rem";
  el_open.style.display = "none";
  el_close.style.display = "block";
}

var slides = document.getElementById("slider").childNodes;
var slideIndex = Math.floor(Math.random() * 20);
slides[slideIndex].style.width = "100%";

setInterval(function(){
  slides[slideIndex].style.width = "0";
  slideIndex++;
  if(slideIndex >= slides.length) slideIndex = 0;
  slides[slideIndex].style.width = "100%";
}, 10000);
