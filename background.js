window.DOMAIN = "https://cyberoam.daiict.ac.in:8090/";
window.lgnpg = "login.xml";
window.lgopg = "logout.xml";
window.hack = {
  0: "\u0ae6",
  1: "\u0ae7",
  2: "\u0ae8",
  3: "\u0ae9",
  4: "\u0aea",
  5: "\u0aeb",
  6: "\u0aec",
  7: "\u0aed",
  8: "\u0aee",
  9: "\u0aef"
};
window.unhack = {
  "\u0ae6": 0,
  "\u0ae7": 1,
  "\u0ae8": 2,
  "\u0ae9": 3,
  "\u0aea": 4,
  "\u0aeb": 5,
  "\u0aec": 6,
  "\u0aed": 7,
  "\u0aee": 8,
  "\u0aef": 9
};
window.live = "live";
window.current = "";
var intervalLive = false;

var status = "login";
var uname = "1";
var pass = "";
var producttype = 0;
var hackNum = "";
var showUname = "";

// var status = "login";
// var uname = "2\u0ae6" + "1812119";
// var pass = "MTIzNDQzMjE=";

// (function() {
//   //alert("hi");
//   chrome.storage.sync.get(["username", "password"], function(data) {
//     if (data.username && data.password) {
//       uname = data.username;
//       pass = data.password;
//       loginCall();
//     }
//     //liveCall();
//   });
// })();

function encrpt(unm) {
  hackNum =
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10);
  //alert(hackNum);
  hackNum = hackNum.split("");
  hackNum.forEach((a, i) => {
    if (parseInt(a) < unm.length && !isNaN(unm.charAt(a))) {
      var ch = window.hack[unm.charAt(a)];
      unm = unm.substr(0, a) + ch + unm.substr(parseInt(a) + 1);
    }
  });
  //alert(unm);
  return unm;
}

function dcrpt(unm) {
  var ar = unm.split("");
  ar.forEach((a, i) => {
    if (isNaN(a) && window.unhack[a]) {
      unm = unm.slice(0, i) + window.unhack[a] + unm.slice(i + 1);
    }
  });
  return unm;
}

chrome.runtime.onMessage.addListener(async function(req, sndr, sendResp) {
  //var d = new Date();
  status = req.status;
  //uname = req.uname;
  showUname = req.uname;
  producttype = req.producttype;
  //alert(status + " " + uname + " " + pass);

  (function() {
    var resp = "";
    if (status == "login") {
      //uname = encrpt(uname);
      pass = req.pass;
      resp = loginCall();
      sendResp({ msg: resp });
    } else if (status == "logout") {
      resp = logoutCall();
      sendResp({ msg: resp });
    }
  })();
  return true;
});

function loginCall() {
  uname = encrpt(showUname);
  hackNum =
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10) +
    "" +
    Math.floor(Math.random() * 10);
  var msg = "";
  var xmlhttp = new XMLHttpRequest();
  var page = window.DOMAIN + window.lgopg;
  var mode = 193;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = this.responseXML;
      msg = successCall(myObj, status);
      if (status == "login") {
        page = window.DOMAIN + window.lgnpg;
        mode = 191;
        xmlhttp.open("POST", page, true);
        xmlhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        var dt = new Date();
        xmlhttp.send(
          "mode=" +
            mode +
            "&username=" +
            uname +
            "&password=" +
            window.atob(pass) +
            "&a=" +
            dt.getTime() +
            "&producttype=" +
            producttype
        );
      } else {
        return msg;
      }
    }
  };
  var dt = new Date();
  xmlhttp.open("POST", page, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(
    "mode=" +
      mode +
      "&username=" +
      uname +
      "&a=" +
      dt.getTime() +
      "&producttime=" +
      producttype
  );
}

function logoutCall() {
  var msg = "";
  // if (window.current != "") {
  //   uname = window.current;
  // } else {
  //   uname = "0";
  // }
  var xmlhttp = new XMLHttpRequest();
  var page = window.DOMAIN + window.lgopg;
  var mode = 193;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = this.responseXML;
      msg = successOff(myObj, status);
      return msg;
    }
  };
  var dt = new Date();
  xmlhttp.open("POST", page, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //alert("logout " + uname);
  xmlhttp.send(
    "mode=" +
      mode +
      "&username=" +
      uname +
      "&a=" +
      dt.getTime() +
      "&producttype=" +
      producttype
  );
}

function liveCall(e) {
  //alert("live called");
  //alert(e);
  var xmlhttp = new XMLHttpRequest();
  var page = window.DOMAIN + window.live;
  var mode = 192;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = this.responseXML;
      var msg = myObj.getElementsByTagName("livemessage")[0].textContent;
      //alert(msg);
      if (msg != "") {
        var arr = msg.split(" ");
        window.current = dcrpt(arr[1].replace(/&#39;/gi, ""));
        //alert(window.current);
        if (window.current == "access" || window.current == "session") {
          loginCall();
        }
        //alert(window.current);
      }
    }
  };
  var dt = new Date();
  var req = "";
  if (e != true) {
    req =
      "?" +
      "mode=" +
      mode +
      "&username=" +
      uname +
      "&a=" +
      dt.getTime() +
      "&producttype=" +
      producttype;
  } else {
    req =
      "?" +
      "mode=" +
      mode +
      "&username=1" +
      "&a=" +
      dt.getTime() +
      "&producttype=" +
      producttype;
  }
  //alert(page + req);
  xmlhttp.open("GET", page + req, true);
  xmlhttp.send();
}

function successCall(obj, st) {
  var message = obj.getElementsByTagName("message")[0].textContent;
  var msg = "";
  if (message == "You are signed in as {username}") {
    msg = message.replace("{username}", showUname);
    alert(msg);
    if (window.current != showUname) {
      liveCall(true);
    }
    status = "live";
    chrome.storage.sync.set({
      username: showUname,
      password: pass
    });
    if (intervalLive != false) {
      clearInterval(intervalLive);
      //intervalLive = false;
    }
    intervalLive = setInterval(liveCall, 180000);
  } else if (
    message == "Login failed. You have reached the maximum login limit."
  ) {
    msg = message;
    alert(message);
    status = "wait";
  } else if (
    message ==
    "Login failed. Invalid user name/password. Please contact the administrator. "
  ) {
    msg = message;
    alert(message);
    status = "wait";
  }
  return msg;
}

function successOff(obj, st) {
  var message = obj.getElementsByTagName("message")[0].textContent;
  var msg = "";
  if (message == "You&#39;ve signed out") {
    msg = message.replace("&#39;", "'");
    alert(msg);
  }
  window.current = "";
  status = "login";
  if (intervalLive != false) {
    clearInterval(intervalLive);
    intervalLive = false;
  }
  return msg;
}

chrome.runtime.onStartup.addListener(function() {
  //alert("call worked");
  chrome.storage.sync.get(["username", "password"], function(data) {
    if (data.username && data.password) {
      //uname = data.username;
      showUname = data.username;
      //uname = encrpt(uname);
      pass = data.password;

      loginCall();
    }
    //liveCall();
  });
});

chrome.runtime.onInstalled.addListener(function() {
  //alert("call worked");
  chrome.storage.sync.get(["username", "password"], function(data) {
    if (data.username && data.password) {
      //uname = data.username;
      showUname = data.username;
      //uname = encrpt(uname);
      pass = data.password;
      loginCall();
    }
    //liveCall();
  });
});

// chrome.tabs.onActivated.addListener(function(info) {
//   chrome.tabs.get(info.tabId, function(change) {
//     const lnk = change.url;
//     if (lnk.slice(0, 34) == DOMAIN.slice(0, 34))
//       chrome.browserAction.setIcon({ path: "../da.png" });
//     else chrome.browserAction.setIcon({ path: "../da1.png" });
//   });
// });
