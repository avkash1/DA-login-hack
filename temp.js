var obj = {
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
var str =
  Math.floor(Math.random() * 10) +
  "" +
  Math.floor(Math.random() * 10) +
  "" +
  Math.floor(Math.random() * 10);
alert(str);
var unm = "201812119";
str = str.split("");
str.forEach((a, i) => {
  //alert(unm.length);
  if (parseInt(a) < unm.length && !isNaN(unm.charAt(a))) {
    var ch = obj[unm.charAt(a)];
    unm = unm.substr(0, a) + ch + unm.substr(parseInt(a) + 1);
  }
});

alert(unm);
