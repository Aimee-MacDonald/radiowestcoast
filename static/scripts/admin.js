getUsers();
getMailingList();

function getUsers(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", createUsersTable);
  oReq.open("GET", "/admin/getUsers");
  oReq.send();
}

function getMailingList(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", createMailingList);
  oReq.open("GET", "/admin/getMailinglist");
  oReq.send();
}

function createUsersTable () {
  var users = JSON.parse(this.responseText).users;
  var el_usersTable = document.getElementById("usersTable");

  for(var i = 0; i < users.length; i++){
    var el_username = document.createElement("td");
    var el_useraccess = document.createElement("td");

    el_username.innerText = users[i].user;
    el_useraccess.innerText = users[i].access;

    var el_user = document.createElement("tr");
    el_user.append(el_username);
    el_user.append(el_useraccess);

    el_usersTable.append(el_user);
  }
}

function createMailingList(){
  var subscribers = JSON.parse(this.responseText);

  for(var i = 0; i < subscribers.length; i++){
    var el_mailingList = document.getElementById("mailingList");
    var el_email = document.createElement("li");
    el_email.innerText = subscribers[i].email;
    el_mailingList.append(el_email);
  }
}
