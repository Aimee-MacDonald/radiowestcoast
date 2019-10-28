var el_news_items = document.getElementById("news_items");
var newsItems;

getAPI("/admin/newsItems", populateNews);

function getAPI(path, eventHandler){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", eventHandler);
  oReq.open("GET", path);
  oReq.send();
}

function populateNews(){
  newsItems = JSON.parse(this.responseText);

  for(var i = 0; i < newsItems.length; i++){
    var el_news_item = document.createElement("div");
    var el_news_img = document.createElement("div");
    var el_news_header = document.createElement("h2");
    var el_news_synopsis = document.createElement("p");
    var el_news_date = document.createElement("p");
    var el_news_id = document.createElement("p");
    var el_news_delete = document.createElement("button");
    var el_news_edit = document.createElement("button");

    el_news_item.classList = "news_item";
    el_news_img.classList = "news_img";
    el_news_img.style.backgroundImage = "url('" + newsItems[i].image + "')";
    el_news_header.innerText = newsItems[i].header;
    el_news_synopsis.innerText = newsItems[i].synopsis;
    el_news_date.innerText = newsItems[i].date;
    el_news_id.innerText = newsItems[i]._id;
    el_news_id.style.display = "none";
    el_news_delete.setAttribute("onclick", "deleteNews(" + i + ")");
    el_news_delete.innerText = "Delete";
    el_news_edit.setAttribute("onclick", "editNews(" + i + ")");
    el_news_edit.innerText = "Edit";

    el_news_item.append(el_news_img);
    el_news_item.append(el_news_header);
    el_news_item.append(el_news_synopsis);
    el_news_item.append(el_news_date);
    el_news_item.append(el_news_id);
    el_news_item.append(el_news_delete);
    el_news_item.append(el_news_edit);

    el_news_items.prepend(el_news_item);
  }

  el_news_items.childNodes[0].id = "main_news";
}

function deleteNews(index){
  var newsItemID = el_news_items.childNodes[index].childNodes[4].innerText;
  getAPI("/admin/delete?id=" + newsItemID, itemDeleted);
}

function editNews(index){
  var newsItemID = el_news_items.childNodes[index].childNodes[4].innerText;
  window.location.href = "/admin/create?id=" + newsItemID;
}

function itemDeleted(){
  console.log("Item Deleted");
}

var el_dialog = document.getElementById("creation_dialog");
function closeDialog(){
  el_dialog.style.width = "0%";
  el_dialog.style.height = "0%";
}

function openDialog(){
  el_dialog.style.width = "100%";
  el_dialog.style.height = "100%";
}
