var currentTime;
$(document).ready(function () {
	
	$('#wrapper').fadeIn('slow');
	$('#time').show('puff', 1000);
	center_the_div('#notificationDrpDwn');
	$('#notifications').click(function(){
		$('#notificationDrpDwn').show('slideDown');
		});
	
	$('#close_btn').click(function(){
		$(this).parent('div').hide('slideUp');
	});
	var i = 0;
	getTemp(i);

	var getTempInterval = setInterval(function () {
			getTemp()
		}, 300000);
		
	$("#temp").click(function(){
		//$("#wrapper").fadeOut(1000,function(){$("#hourly_forecast").show('scale')});//
		$("#wrapper").hide({
			"effect" :"drop",
			'duration': 1000,
			'direction' : 'up',
			'complete' : function(){
				$("#hourly_forecast").show({
					'effect' : 'drop',
					'duration' : 1000,
					'direction' : 'up'
					})
				}
		});
		
	});
	$("#hourly_forecast").click(function(){
		$("#hourly_forecast").fadeOut(1000,function(){$("#wrapper").fadeIn('fast')});
		//$("#wrapper").show('puff', 2000)
	});

	//setFlickerBg();
});

//Get weather underground ajax
function getTemp(i) {
	$.ajax({
		url : "http://api.wunderground.com/api/fd103410b180a13b/geolookup/conditions/q/SC/Greenville.json",
		dataType : "jsonp",
		success : function (parsed_json) {
			var location = parsed_json['location']['city'];
			var temp_f = Math.ceil(parsed_json['current_observation']['temp_f']);
			console.log("last updated at " + currentTime );
			var icon_url = parsed_json['current_observation']['icon_url'];
			
			icon_url = icon_url.split('/'); //url = ["serverName","app",...,"bb65efd50ade4b3591dcf7f4c693042b"]
			icon_url = icon_url.pop();      //url = "bb65efd50ade4b3591dcf7f4c693042b"
			//icon_url = "http://icons.wxug.com/i/c/g/" + icon_url;
			icon_url = "http://icons.wxug.com/i/c/i/" + icon_url;
			
			$('#temp').text(temp_f);
			$('#cIcon img').attr('src', icon_url);
			var temp_bg; 
			var temp_brdr;
			if (temp_f > 100 ) {
				temp_bg = "#FF3D00";
				temp_brder = "#FF3D11 ";
			}if (temp_f > 89 && temp_f < 100 ) {
				temp_bg = "#FF5B00";
				temp_brder = "3FF5B11";
			}if (temp_f > 79 && temp_f < 90 ) {
				temp_bg = "#FF7500";
				temp_brder = "#FF7511 ";
			}if (temp_f > 69 && temp_f < 80 ) {
				temp_bg = "#FF8900 "; 
				temp_brder = "#632200";
			}if (temp_f > 59 && temp_f < 70 ) {
				temp_bg = "#EDC393";
				temp_brder = "#dc8b2e";
			}
			temp_brder = temp_brder + " 25px solid";
			$("#temp").css({
					'background' : temp_bg,
					'border' : temp_brder
				});/*
			if (temp_f > 80) {
				$("#temp").css({
					'background' : '#FF4D4D',
					'border' : '25px solid #610000'
				});
			}
			if (temp_f < 80 && temp_f > 32) {
				$("#temp").css({
					'background' : '#FFB870',
					'border' : '25px solid #FF9240'
				});
			}
			if (temp_f < 32) {
				$("#temp").css({
					'background' : 'C2E0FF',
					'border' : '25px solid #0056ae'
				});
			}*/
			$('#cIcon' ).fadeIn('3000');
			$('#cIcon2' ).fadeIn('3000');
		}
		
	});
	var i = i;
	
	if( i == 0 ){$('#temp').show('bounce', 3000);};
}
//get hourly
//function hourly_weather(){

$.ajax({
	url : "http://api.wunderground.com/api/fd103410b180a13b/hourly/q/SC/Greenville.json",
	dataType : "jsonp",
	success : function (parsed_json) {
		var test = parsed_json;
		
		  var names = parsed_json;
          $('#hrly').html(test);
		//var forecast = parsed_json['hourly_forecast'][1]['temp']['english'];
		var forecast2 = new Array();
		//console.log(forecast);
		var table = "<table>";
		var table2 = "<table>";
		for( i=0; i < 11; i++){
					
			table2 = table2 + "<tr><td class='hrly_col'>" + parsed_json['hourly_forecast'][i]['FCTTIME']['civil'] + "&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + parsed_json['hourly_forecast'][i]['temp']['english'] + "&deg<img src='" +parsed_json['hourly_forecast'][i]['icon_url'] + "' style='width:32px; height:32px; /*position:relative; top:12px;*/' class='temp_col'/></td><tr>" +  "";
			
			//console.log(parsed_json['hourly_forecast'][i]['temp']['english']);
		}
		$('#hourly_forecast').append(table2);
		for( i=0; i < 5; i++){
			table = table + "<td style='font-size: 11px;'>" + parsed_json['hourly_forecast'][i]['FCTTIME']['civil'] + "</td>";
			}
		table = table + "</tr>";
		for( i=0; i < 5; i++){
			table = table + "<td>" + parsed_json['hourly_forecast'][i]['temp']['english']  + "&deg;</td>";
			
			}
		table = table + "</tr>";
		for( i=0; i < 5; i++){
			table = table + "<td><img src=' " + parsed_json['hourly_forecast'][i]['icon_url'] + " ' width='24px'/></td>";
			
			}
		table = table + "</tr>";
		table = table + "</table>";
		$("#fiveHrs").append(table);
		
		}

});
//10day
//http://api.wunderground.com/api/Your_Key/forecast10day/q/CA/San_Francisco.json
$.ajax({
	url : "http://api.wunderground.com/api/Your_Key/forecast10day/q/CA/San_Francisco.json",
	dataType : "jsonp",
	success : function (parsed_json2) {
		//console.log(parsed_json[);
		//var keys = Object.keys(parsed_json2['forecast']);
		//console.log(keys);
		//console.log(parsed_json['forecast']['txt_forecast']['forecastday']['period'][1]['period'] );
		
	}
});


//get a flicker image for wrapper background.
(function () {
	var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	$.getJSON(flickerAPI, {
		tags : "Greenville, SC, landscape",
		tagmode : "all",
		format : "json"
	})
	.done(function (data) {
		// alert("done");
		$.each(data.items, function (i, item) {
			test = item.media.m;

			if (i === 0) {
				return false;
			}
		});
	});
})();
//******************************************************************************************************************
//Get Location Info
//http://api.wunderground.com/api/fd103410b180a13b/radar/image.gif?maxlat=47.709&maxlon=-69.263&minlat=31.596&minlon=-97.388&width=640&height=480&rainsnow=1&timelabel=1&timelabel.x=525&timelabel.y=41&reproj.automerc=1

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}
//******************************************************************************************************************
var myVar = setInterval(function () {
		clockTime();
	}, 100);

function loadScreen() {}

function twoSpot(theNumber) {

	if (theNumber < 10) {
		theNumber = '0' + theNumber;

	}
	return theNumber;

}

function clockTime() {
	var time = new Date();
	var hr = time.getHours();
	var min = time.getMinutes();
	var sec = time.getSeconds();
	var milsec = time.getMilliseconds();
	militaryTime = "N";
	//check military time setting
	if (militaryTime == "N") {
		if (hr > 12) {
			hr = hr - 12;
		}
	}
	//var test =
	var min = twoSpot(min);
	var sec = twoSpot(sec);
	//ensure each section of time is 2 characters

	currentTime = hr + ":" + min + ":" + sec;
	$('#time').html(currentTime);
}


//js to center a div
function center_the_div(div_name){
	var div_w = $(div_name).width();
	var div_lft = div_w / 2;
	var win_w = $(window).width() / 2;
	var div_lft = win_w - div_lft ;
	$(div_name).css({
		'left' : div_lft
	});
}

function close_div(div_name) {
	close_btn
}