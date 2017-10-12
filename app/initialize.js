document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');
});

var $ = require('jquery');

$(document).ready(function() {
	//feed to parse
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

				$( "#rss-feeds" ).append("<a class='feed-list__item' href='" + link + "' target='_blank'>" + "<div class='feed-list__date'>" + date + "</div>" + "<div class='feed-list__title'>" + title + "</div>" + "</a>");
			});


		}   
	});

});
