document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');
});


var $ = require('jquery');




$(document).ready(function(){

// display when js is off
$('.js-error').css('display', 'none')
  
// light tabs
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })

// RSS feed
	
	var rssurl = "https://www.vg.no/rss/feed/forsiden/?frontId=1";

	var rssFeed = new Array();

	$.get(rssurl, function(data) {
		var $xml = $(data);
		$xml.find("item").each(function() {
			var $this = $(this),
				item = {
					title: $this.find("title").text(),
					link: $this.find("link").text(),
					pubDate: $this.find("pubDate").text(),
				}


			rssFeed.push(item);
		});


    rssFeed.sort(function(a,b){
      return new Date(b.pubDate) - new Date(a.pubDate);
    });
    
      $( ".feed-list__item" ).remove();
      for(var i = 0 ; i < rssFeed.length ; i++){
        $( "#js-rss-feeds" ).append("<li class='feed-list__item'><a href='" + rssFeed[i].link + "' target='_blank'>" + "<div class='feed-list__date'>" + rssFeed[i].pubDate + "</div>" + "<div class='feed-list__title'>" + rssFeed[i].title + "</div>" + "</a></li>");
      };


		$('#sort').click(function() {
			var list = $('#js-rss-feeds');
			var listItems = list.children('li');
			list.append(listItems.get().reverse());
		});

    
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


