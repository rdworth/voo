/*!
 * voo.js
 * Copyright (c) 2011 Bocoup, LLC
 * Licensed under the MIT license
 */

$(function() {
  var video = $("#video")[0];
  var content = $("#content");
  var currentElem = $("#current");
  var output = $("#output");
  var builder = {};
  var paragraphs = [];
  var times = [];
  var current;

  builder.read = function(selector) {
    paragraphs = $("#content p").map(function() {
      var text = $.trim($(this).text());
      var re = /(.*?[.?!]+["]?)\s*/g;
      var matches;
      var arr = [];
      while (matches = re.exec(text)) {
        arr.push(matches[1]);
      }
      return [arr];
    }).get();
    console.log(paragraphs);
  };

  builder.render = function() {
    var count = 0;
    var html = "";
    $.each(paragraphs, function(i, arr) {
      var parts = [];
      $.each(arr, function(j, part) {
        if (++count === current) {
          parts.push("<span class='highlight'>" + part + "</span>");
        } else {
          parts.push("<span class='part'>" + part + "</span>");
        }
      });
      html += "<p>" + parts.join(" ") + "</p>";
    });
    content.html(html);
    currentElem.val(current);
    builder.output();
  };
  
  builder.output = function() {
    var count = 0;
    var html = "";
    $.each(paragraphs, function(i, arr) {
      var parts = [];
      $.each(arr, function(j, part) {
        var time = times[count];
        if (time !== undefined) {
          time = Math.round(time * 1000) / 1000;
          parts.push("<span data-time=\"" + time + "\">" + part + "</span>");
        } else {
          parts.push(part);
        }
        count++;
      });
      html += "<p>" + parts.join(" ") + "</p>\n";
    });
    output.val(html);
  };

  builder.stop = function() {
    console.log("stop");
    video.currentTime = 0;
    video.pause();
  };
  
  builder.start = function() {
    console.log("start");
    current = 0;
    builder.render();
    video.currentTime = 0;
    video.play();
  };

  builder.mark = function() {
    var time = video.currentTime;
    console.log("mark", time);
    times[current] = time;
    current++;
    builder.render();
  };

  builder.read("#content p");

  $("form").on("click", "input", function(e) {
    e.preventDefault();
    if (builder[this.id]) {
      builder[this.id]();
    }
  });
});
