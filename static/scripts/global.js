var el_menu_open = document.querySelector("#menu_open");
var el_menu_close = document.querySelector("#menu_close")
var el_nav = document.querySelector("nav")

function openMenu(){
  el_nav.style.width = "15rem";
  el_menu_open.style.display = "none";
  el_menu_close.style.display = "block";
}

function closeMenu(){
  el_nav.style.width = "0%";
  el_menu_open.style.display = "block";
  el_menu_close.style.display = "none";
}
