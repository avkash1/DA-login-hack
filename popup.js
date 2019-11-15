//Math.floor(Math.random() * 10)%3+""+Math.floor(Math.random() * 10)%3; //You can randomise any 2 number to gujarati from '201' (starting of 201812119..)
//create object of number and value them as gujarati unicode. ૨->\u0ae8 ૧->\u0ae7, ૦->\u0ae6,

var status = "logout";
var flag = 0;
var bg = chrome.extension.getBackgroundPage();
var unm = document.getElementById("username1");
var pwd = document.getElementById("password1");
var msg = document.getElementById("status");
var loading = document.getElementById("loading");
var username = "";
var password = "";

window.addEventListener("load", function() {
  if (bg.current != "") {
    flag = 0;
    username = bg.current;
    unm.value = bg.current;
    //unm.value = bg.current.replace("\u0ae6", "0");
    msg.className = "success";
    msg.textContent = "Loged in";
  } else {
    msg.textContent = "Login to connect.";
  }
});

unm.addEventListener(
  "change",
  function() {
    username = unm.value;
    //username = "2\u0ae6" + username.slice(2);
    //unm.value = username;
  },
  false
);

var lgn = document.getElementById("login_btn");
lgn.addEventListener(
  "click",
  function() {
    if (unm.value == "") {
      unm.focus();
      msg.className = "warning";
      msg.textContent = "*Username required";
      return 0;
    }
    if (pwd.value == "") {
      pwd.focus();
      msg.className = "warning";
      msg.textContent = "*Password required";
      return 0;
    }
    loading.style.display = "flex";
    status = "login";
    password = window.btoa(pwd.value);
    chrome.runtime.sendMessage(
      {
        status: status,
        uname: username,
        pass: password,
        producttype: 0
      },
      function(res) {
        msg.textContent = res.msg;
        loading.style.display = "none";
      }
    );
  },
  false
);

var lgout = document.getElementById("logout_btn");
lgout.addEventListener(
  "click",
  function() {
    if (unm.value == "") {
      unm.focus();
      msg.classList.add("warning");
      msg.textContent = "*Username required";
      return 0;
    }
    loading.style.display = "flex";
    status = "logout";
    password = window.btoa(pwd.value);
    chrome.runtime.sendMessage(
      {
        status: status,
        uname: username,
        producttype: 0
      },
      function(res) {
        msg.textContent = res.msg;
        loading.style.display = "none";
      }
    );
  },
  false
);

unm.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    lgn.click();
  }
});

pwd.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    lgn.click();
  }
});
