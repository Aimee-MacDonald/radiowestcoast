var slides = document.getElementById("community").childNodes;
var slideIndex = 0;
slides[slideIndex].style.width = "100%";

setInterval(function(){
  slides[slideIndex].style.width = "0";
  slideIndex++;
  if(slideIndex >= slides.length) slideIndex = 0;
  slides[slideIndex].style.width = "100%";
}, 2500);

var lastScroll = 0;
var header = document.getElementById("header");

document.onscroll = function(e){
  var scrollDelta = window.scrollY - lastScroll;
  lastScroll = window.scrollY;

  if(scrollDelta > 0){
    header.style.height = "0";
  } else {
    header.style.height = "5rem";
  }
}
