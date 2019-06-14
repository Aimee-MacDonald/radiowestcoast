var slides = document.getElementById("slider").childNodes;
var slideIndex = Math.floor(Math.random() * 20);
slides[slideIndex].style.width = "100%";

setInterval(function(){
  slides[slideIndex].style.width = "0";
  slideIndex++;
  if(slideIndex >= slides.length) slideIndex = 0;
  slides[slideIndex].style.width = "100%";
}, 10000);

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

var el_listenButton = document.getElementById("listenButton");
var el_teamButton = document.getElementById("teamButton");
var el_showsButton = document.getElementById("showsButton");

var el_listenPage = document.getElementById("listenPage");
var el_teamPage = document.getElementById("teamPage");
var el_showsPage = document.getElementById("showsPage");

function parseHash(){
  var page = window.location.href.substring(window.location.href.indexOf("#")+1);

  switch(page){
    case "listen":
      el_listenButton.style.display = "none";
      el_teamButton.style.display = "block";
      el_showsButton.style.display = "block";

      el_listenPage.style.width = "100%";
      el_teamPage.style.width = "0";
      el_showsPage.style.width = "0";
      break;

    case "team":
      el_listenButton.style.display = "block";
      el_teamButton.style.display = "none";
      el_showsButton.style.display = "block";

      el_listenPage.style.width = "0";
      el_teamPage.style.width = "100%";
      el_showsPage.style.width = "0";
      break;

    case "shows":
      el_listenButton.style.display = "block";
      el_teamButton.style.display = "block";
      el_showsButton.style.display = "none";

      el_listenPage.style.width = "0";
      el_teamPage.style.width = "0";
      el_showsPage.style.width = "100%";
      break;
  }

  closeMenu();
}

window.onhashchange = function(){
  parseHash();
}

window.onload = parseHash()

getTeamProfiles();

function getTeamProfiles(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", createTeamProfiles);
  oReq.open("GET", "/getTeamProfiles");
  oReq.send();
};

function createTeamProfiles(){
  var profiles = JSON.parse(this.responseText);
  var el_teamPage = document.getElementById("teamPage");
  for(var i = 0; i < profiles.length; i++){
    var el_teamMember = document.createElement("div");
    el_teamMember.classList = "teamMember";
    var el_tmName = document.createElement("h2");
    el_tmName.innerText = profiles[i].name;
    var el_tmBio = document.createElement("p");
    el_tmBio.innerText = profiles[i].bio;

    el_teamMember.append(el_tmName);
    el_teamMember.append(el_tmBio);

    el_teamPage.append(el_teamMember);
  }
  console.log(profiles);
}
