document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');
});

var $ = require('jquery');


// light tabs

$(document).ready(function(){
  
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })

});

$(document).ready(function() {
	var feed = "https://www.vg.no/rss/feed/forsiden/?frontId=1";

	$.ajax(feed, {
		accepts:{
			xml:"application/rss+xml"
		},
		dataType:"xml",
		success:function(data) {

			$(data).find("item").each(function () {
				var el = $(this);
				var title = el.find("title").text()
				var link = el.find("link").text()
				var date = el.find("pubDate").text()

				$( "#js-rss-feeds" ).append("<a class='feed-list__item' href='" + link + "' target='_blank'>" + "<div class='feed-list__date'>" + date + "</div>" + "<div class='feed-list__title'>" + title + "</div>" + "</a>");
			});


		}   
	});

});
$.get('varnish.log', function(data) {
  var lines = data.trim().split("\n")
  .map(function(line){
    return line.split(/["]/gi)
    .map(function(element){
        return element.trim().replace(/["\[\]]/gi,'');
        });
  });
	for(var i = 0 ; i < lines.length ; i++){
		$('#js-log').append("<li>" + lines[i][3]  + "</li>")
	}
}, 'text');
