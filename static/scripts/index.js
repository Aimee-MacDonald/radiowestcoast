var el_menu = document.getElementById("menu");
var el_open = document.getElementById("open");

function closeMenu(){
  el_menu.style.width = "0";
  el_open.style.display = "block";
}

function openMenu(){
  el_menu.style.width = "20rem";
  el_open.style.display = "none";
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
