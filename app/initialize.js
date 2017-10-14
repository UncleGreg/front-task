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
  $('#js-rss-url').append("URL: " + rssurl);

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
    
      for(var i = 0 ; i < rssFeed.length ; i++){
        $( "#js-rss-feeds" ).append("<li class='feed-list__item'><a href='" + rssFeed[i].link + "' target='_blank'>" + "<div class='feed-list__title'>" + rssFeed[i].title + "</div>"  + "<div class='feed-list__date'>" +"<span>added</span>"  + rssFeed[i].pubDate + "</div></a></li>");
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
  
	var hosts = new Array();
	var files = new Array();

	for(var i = 0 ; i < lines.length ; i++){

    var host = lines[i][3];
    var file = lines[i][1];

    var hostParts = host.split('/');
    var fileParts = file.split(' ');

    var hostname = hostParts[2];
    var file = fileParts[1];

    hosts.push(hostname);
    files.push(file);

	}

  var obj = { };

  for (var i = 0, j = hosts.length; i < j; i++) {
    if (obj[hosts[i]]) {
      obj[hosts[i]]++;
    }
    else {
      obj[hosts[i]] = 1;
    } 
  }

  let arr = Object.entries(obj);

  arr.sort(function(a,b){
    return a[1] < b[1] ? 1 : -1;
  });



  var obj2 = { };

  for (var i = 0, j = files.length; i < j; i++) {
    if (obj2[files[i]]) {
      obj2[files[i]]++;
    }
    else {
      obj2[files[i]] = 1;
    } 
  }

  let arr2 = Object.entries(obj2);

  arr2.sort(function(a,b){
    return a[1] < b[1] ? 1 : -1;
  });


  for(var i = 0 ; i < 5 ; i++){
    $('#js-log-hostnames').append("<li>" + "  " + arr[i][0] +"  "+ arr[i][1]  + "</li>")
    $('#js-log-files').append("<li>" + "  " + arr2[i][0] +"  "+ arr2[i][1]  + "</li>")
  }

		$('#sort2').click(function() {
			var list = $('#js-log-hostnames');
			var listItems = list.children('li');
			list.append(listItems.get().reverse());
		});

		$('#sort3').click(function() {
			var list = $('#js-log-files');
			var listItems = list.children('li');
			list.append(listItems.get().reverse());
		});

}, 'text');


