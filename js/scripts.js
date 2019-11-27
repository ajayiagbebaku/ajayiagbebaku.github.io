$("#submit").on("click", function() {
  console.log("clicked");
  return false;

});

$("#submit").on("click", function() {
  var comment = $("#textarea").val();
  console.log(comment);
  $("#visible-comment").html(comment);
});

$("#textarea").on("keyup", function() {
  console.log("keyup just happened!!");
  var change_color_length = 50;
  var charCount = $("#textarea").val().length; //length of the content of the textarea to a variable
  console.log(charCount);
  $("#char-count").html(charCount);
  if (charCount > change_color_length) {
    $("#char-count").css("color", "red");
  } else {
    $("#char-count").css("color", "yellow");
  };
});

var rows = $(".my-row");
for (var i = 0; i < rows.length; ++i) {
  if (i % 2 === 0) {
    $(rows[i]).css("background-color", "#39393A");
  }
};

var myWork = [{
  title: "More Work",
  pic: "../img/NEFL6small.jpg"
}, {
  title: "More Work",
  pic: "../img/schizosmall.jpg"
}, {
  title: "More Work",
  pic: "../img/assemblesmall.jpg"
}, {
  title: "More Work",
  pic: "../img/iglamoursmall.jpg"
}];

for (var i = 0; i < myWork.length; ++i) {
  $("#" + i).css("background-image", "url(" + myWork[i].pic + ")");

};

$(".image").mouseenter(function() {
  console.log(myWork[this.id].title);
  $(this).html("<p class='info'><span class='proj-title'>Title:</span> " + myWork[this.id].title + " </p>");
}).mouseleave(function() {
  $("p.info").html("");
});



/* Team Treehouse */
$.ajax('https://' + $('.team-treehouse > a').attr('href') + '.json')
  .done(function(data) {
    // pull was a success
    var items = [];
    $.each(data, function(key, val) {
      if (key.toLowerCase() === 'points') {
        $.each(val, function(key2, val2) {
          if (val2 !== 0) {
            if (key2.toLowerCase() !== 'total') {
              items.push([key2, val2]);
            } else {
              $('strong.total').text(val2);
            }
          }
        });
      }
    });

    // sort
    var sorted = [];
    if (items.length === 0) {
      sorted = items;
    } else {
      sorted = [items.shift()];
    }

    while (items.length > 0) {
      for (i = 0; i < sorted.length; i++) {
        if (items[0][1] > sorted[i][1]) {
          sorted.splice(i, 0, items.shift());
          break;
        }
        if (i === sorted.length - 1) {
          sorted.push(items.shift());
          break;
        }
      }
    }
    // make into html
    html = [];
    html.push("<ul>");
    for (s in sorted) {
      html.push("<li>");
      html.push("<em>" + sorted[s][0] + "</em>");
      html.push("<span>" + sorted[s][1] + "</span>");
      html.push("</li>");
    }
    html.push("</ul>");

    // make legend
    $('.legend').append(html.join(""));

    // make pie
    createPie(".legend", ".pie");
  })
  .fail(function() {
    $('.team-treehouse > a > h2').text("Could not connect. Username my be incorrect.");
  })


function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

function addSlice(sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;
  $("." + sliceID).css({
    "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
  });
  $("." + sliceID + " span").css({
    "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var sliceID = "s" + dataCount + "-" + sliceCount;
  var maxSize = 179;
  if (sliceSize <= maxSize) {
    addSlice(sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(maxSize, pieElement, offset, sliceID, color);
    iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
  }
}

function createPie(dataElement, pieElement) {
  var listNames = [];
  var listData = [];
  $(dataElement + " li").each(function() {
    listNames.push($(this).children('em').html());
    listData.push(Number($(this).children('span').html()));
  });

  var listTotal = 0;
  for (var i = 0; i < listData.length; i++) {
    listTotal += listData[i];
  }

  var offset = 0;
  var colors = {};
  colors['Android'] = '#5cb860';
  colors['Business'] = '#f9845b';
  colors['CSS'] = '#3079ab';
  colors['Design'] = '#e59a13';
  colors['Development Tools'] = '#637a91';
  colors['HTML'] = '#39add1';
  colors['iOS'] = '#53bbb4';
  colors['Java'] = '#2c9676';
  colors['Javascript'] = '#c25975';
  colors['PHP'] = '#7d669e';
  colors['Python'] = '#f092b0';
  colors['Ruby'] = '#e15258';
  colors['WordPress'] = '#838cc7';
  colors['Digital Literacy'] = '#c38cd4';

  for (var i = 0; i < listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    var color = '#000000';
    for (var c in colors) {
      if (listNames[i].toLowerCase() === c.toLowerCase()) {
        color = colors[c];
      }
    }

    // make slices
    iterateSlices(size, pieElement, offset, i, 0, color);

    // set legend colors
    $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color);
    offset += size;
  }
}

//Code School Badges
(function($) {
  $(document).ready(function() {
    var insigniaList;
    $.fn.insignia = function(usernameCodeschool, usernameTreehouse) {
      this.empty();
      if (usernameCodeschool) {
        getBadges2(usernameCodeschool, this);
      }

      if (usernameTreehouse) {
        getBadges(usernameTreehouse, this);
      }
      return this;
    };

    insigniaList = $('.insignia');

    $.each(insigniaList, function(i, val) {
      var insigniaEntry = insigniaList[i];
      $(val).insignia(insigniaEntry.dataset.codeschool, insigniaEntry.dataset.treehouse);
    });

    function getBadges2(usernameCodeschool, element) {
      $.ajax({
        url: 'https://codeschool.com/users/' + usernameCodeschool + '.json',
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        async: true,
        success: function(dataBack) {
          $(element).append('<h3>I have taken ' + dataBack.badges.length + ' lessons and scored ' +
            Number(dataBack.user.total_score).toLocaleString('en') + ' points at Code School!</h3><div class="badges"></div>');
          var badge = dataBack.courses.completed.reverse();
          console.log("badge", badge);
          badge.forEach(function(badge, i) {
            if (i < 7) {
              element.find('.badges').append('<li class="badgeImages"><a href="' + badge.url + '"><img src="' +
                badge.badge + '" class="masterTooltip" title="' +
                badge.title + '"/></img></li>');
            }
          });

          $('.masterTooltip').hover(function() {
            var title = $(this).attr('title');
            $(this).data('tipText', title).removeAttr('title');
            $('<span class="tooltip"></span>')
              .text(title)
              .appendTo(element)
              .fadeIn('slow');
          }, function() {
            $(this).attr('title', $(this).data('tipText')); // Hover out
            $('.tooltip').remove();
          }).mousemove(function(e) {
            var mousex = e.pageX + 20,
              mousey = e.pageY + 10;
            $('.tooltip')
              .css({
                top: mousey,
                left: mousex
              });
          });
        },
        error: function(dataBack) {
          console.log('Code School is not responding with data.');
        }
      });
    }

    function getBadges(usernameTreehouse, element) {
      $.ajax({
        url: 'https://teamtreehouse.com/' + usernameTreehouse + '.json',
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        async: true,
        success: function(dataBack) {
          var badges = dataBack.badges.reverse(); // Retrieve most recent badges, so reverse the array
          console.log("badges", badges);
          $(element).append('<h3>I have taken ' + badges.length + ' lessons and scored ' +
            Number(dataBack.points.total).toLocaleString('en') + ' points at Treehouse!</h3><div class="badges2"></div>');
          badges.forEach(function(badge, i) {
            if (i < 7) {
              element.find('.badges2').append('<li class="badgeImages"> <a href="' + badge.url + '"><img src="' +
                badge.icon_url + '" class="masterTooltip1" title="' +
                badge.courses[0].title + '"/></img></li>');
            }
          });

          $('.masterTooltip1').hover(function() {
            var title = $(this).attr('title');
            $(this).data('tipText', title).removeAttr('title');
            $('<p class="tooltip1"></p>')
              .text(title)
              .appendTo('body')
              .fadeIn('slow');
          }, function() {
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip1').remove();
          }).mousemove(function(e) {
            var mousex = e.pageX + 20,
              mousey = e.pageY + 10;
            $('.tooltip1')
              .css({
                top: mousey,
                left: mousex
              });
          });
        },
        error: function(dataBack) {
          console.log('Treehouse is not responding with data.');
        }
      });
    }
  });
}(jQuery));
