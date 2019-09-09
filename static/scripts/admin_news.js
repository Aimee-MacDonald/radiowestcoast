var el_news_items = document.getElementById("news_items");

getNews();

function getNews(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", populateNews);
  oReq.open("GET", "/admin/newsItems");
  oReq.send();
}

function populateNews(){
  var newsItems = JSON.parse(this.responseText);

  for(var i = 0; i < newsItems.length; i++){
    var el_news_item = document.createElement("div");
    var el_news_img = document.createElement("div");
    var el_news_header = document.createElement("h2");
    var el_news_synopsis = document.createElement("p");
    var el_news_date = document.createElement("p");

    el_news_item.classList = "news_item";
    el_news_img.classList = "news_img";
    el_news_header.innerText = newsItems[i].header;
    el_news_synopsis.innerText = newsItems[i].synopsis;
    el_news_date.innerText = newsItems[i].date;

    el_news_item.append(el_news_img);
    el_news_item.append(el_news_header);
    el_news_item.append(el_news_synopsis);
    el_news_item.append(el_news_date);

    el_news_items.append(el_news_item);
  }

  el_news_items.childNodes[0].id = "main_news";
}
