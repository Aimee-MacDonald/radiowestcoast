var toggleFlag = false;

function toggleSwitch(){
  toggleFlag = !toggleFlag;
  var el_toggleSwitch = document.getElementById("toggleSwitch");

  if(toggleFlag){
    el_toggleSwitch.style.justifyContent = "flex-end";
    el_toggleSwitch.childNodes[0].style.backgroundColor = "green";
  } else {
    el_toggleSwitch.style.justifyContent = "flex-start";
    el_toggleSwitch.childNodes[0].style.backgroundColor = "red";
  }
}
