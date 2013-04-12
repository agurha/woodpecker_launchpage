var open = false;
var locked = false;
var preday = null;
var prehour = null;
var premin = null;
var presec = null;
jQuery(function ($) {
  new Woodpecker.load
});
var Woodpecker = {
  load: function () {
    $("#sec,#min,#hour,#day").bind("animationEnd webkitAnimationEnd", function () {
      $(this).css("animation", "none").css("webkitAnimation", "none")
    });
    countDown(2013, 4, 28);
    setInterval(function () {
      countDown(2013, 4, 28)
    }, 1e3)
  }
};

function countDown(yr, m, d) {
  var montharray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var today = new Date;
  var todayy = today.getYear();
  if (todayy < 1e3) todayy += 1900;
  var todaym = today.getMonth();
  var todayd = today.getDate();
  var todayh = today.getHours();
  var todaymin = today.getMinutes();
  var todaysec = today.getSeconds();
  var todaystring = montharray[todaym] + " " + todayd + ", " + todayy + " " + todayh + ":" + todaymin + ":" + todaysec;
  futurestring = montharray[m - 1] + " " + d + ", " + yr;
  dd = Date.parse(futurestring) - Date.parse(todaystring);
  dday = Math.floor(dd / (60 * 60 * 1e3 * 24) * 1);
  dhour = Math.floor(dd % (60 * 60 * 1e3 * 24) / (60 * 60 * 1e3) * 1);
  dmin = Math.floor(dd % (60 * 60 * 1e3 * 24) % (60 * 60 * 1e3) / (60 * 1e3) * 1);
  dsec = Math.floor(dd % (60 * 60 * 1e3 * 24) % (60 * 60 * 1e3) % (60 * 1e3) / 1e3 * 1);
  if (dsec != presec) $("#sec").css("animation", "highlight .7s").css("webkitAnimation", "highlight .7s");
  if (dmin != premin) $("#min").css("animation", "highlight 1s").css("webkitAnimation", "highlight 1s");
  if (dhour != prehour) $("#hour").css("animation", "highlight 2s").css("webkitAnimation", "highlight 2s");
  if (dday != preday) $("#day").css("animation", "highlight 2.7s").css("webkitAnimation", "highlight 2.7s");
  preday = dday;
  premin = dmin;
  prehour = dhour;
  presec = dsec;
  $("#day").text(dday + "days.");
  $("#hour").text(dhour + "hours.");
  $("#min").text(dmin + "minutes.");
  $("#sec").text(dsec + "seconds.")
}