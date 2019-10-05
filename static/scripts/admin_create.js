var el_uploadForm = document.getElementById("uploadForm");

el_uploadForm.addEventListener("submit", function(e){
  e.preventDefault();

  var req = new XMLHttpRequest();
  req.addEventListener("load", imageUploaded);

  req.open("POST", "/admin/uploadImage");
  req.withCredentials = true;

  req.send(new FormData(el_uploadForm));
});

function imageUploaded(){
  res = JSON.parse(this.responseText);
  var el_imageBox = document.getElementById("imageBox");
  el_imageBox.value = res.result;
}
