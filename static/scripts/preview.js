var slides = document.getElementById("community").childNodes;
var slideIndex = 0;
slides[slideIndex].style.width = "100%";

setInterval(function(){
  slides[slideIndex].style.width = "0";
  slideIndex++;
  if(slideIndex >= slides.length) slideIndex = 0;
  slides[slideIndex].style.width = "100%";
}, 2500);
