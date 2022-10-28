var qtr = "qtr3";
var year = 2022
var selectedTab = 1

$('#selectYear').on('change', function() {
	year = this.value;
	if(selectedTab ==1){
		getChartApi("profile")
	}else if(selectedTab ==2){
		getChartApi("revenue")
	}else if(selectedTab ==3){
		getChartApi("loadsCity")
	}else if(selectedTab ==4){
		getChartApi("km")
	}
  });
  $('#selectQtr').on('change', function() {
	qtr = this.value;
	if(selectedTab ==1){
		getChartApi("profile")
	}else if(selectedTab ==2){
		getChartApi("revenue")
	}else if(selectedTab ==3){
		getChartApi("loadsCity")
	}else if(selectedTab ==4){
		getChartApi("km")
	}
  });

$("#profileTab").click(function () {
	$(".dashboard-section-tabs .tabs").removeClass("active")
	$(this).addClass("active")
	selectedTab =1
	getChartApi("profile")
	
});
$("#revenueTab").click(function () {
	selectedTab =2
	$(".dashboard-section-tabs .tabs").removeClass("active")
	$(this).addClass("active")
	getChartApi("revenue")
});
$("#loadsCityTab").click(function () {
	selectedTab =3
	$(".dashboard-section-tabs .tabs").removeClass("active")
	$(this).addClass("active")
	getChartApi("loadsCity")
});
$("#kmTab").click(function () {
	selectedTab =4
	$(".dashboard-section-tabs .tabs").removeClass("active")
	$(this).addClass("active")
	getChartApi("km")
});
getHeaderApi()
getChartApi("profile")

function getHeaderApi(){
	var settings = {
		"url": BASE_URL+"adminWeb/profileCount",
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		var data = response.data;
		var profileData = data["profile"]
		var revenueData = data["revenue"]
		var loadkmData = data["loadkm"]
		$('#profileDetails li:nth-child(1) span').text(profileData["OwnerCount"])
		$('#profileDetails li:nth-child(2) span').text(profileData["BrokerCount"])
		$('#profileDetails li:nth-child(3) span').text(profileData["CustomerCount"])
		$('#profileDetails li:nth-child(4) span').text(profileData["DriverCount"])

		$('#platformRevenueDetails li:nth-child(1) span').text("₹"+revenueData["throughThePlatform"].toLocaleString())
		$('#platformRevenueDetails li:nth-child(2) span').text("-")
		$('#platformRevenueDetails li:nth-child(3) span').text("₹"+parseInt(revenueData["commissionFromLoadPosters"]).toLocaleString())
		$('#platformRevenueDetails li:nth-child(4) span').text("₹"+parseInt(revenueData["commissionFromTransporters"]).toLocaleString())

		$('#loadKmDetails li:nth-child(1) span').text(parseInt(loadkmData["LoadsPostedCount"]))
		$('#loadKmDetails li:nth-child(2) span').text(parseInt(loadkmData["LoadsDeliveredCount"]))
		$('#loadKmDetails li:nth-child(3) span').text(parseInt(loadkmData["KMCount"]).toLocaleString()+" KM")
		$('#loadKmDetails li:nth-child(4) span').text(parseInt(loadkmData["CitiesLocationsCount"]))
	  });
}

function getChartApi(target){
	let url = ""
	if(target == "profile"){
		url =BASE_URL+"adminWeb/usersJoined?year="+year+"&qtr="+qtr+""
	}else if(target == "revenue"){
		url =BASE_URL+"adminWeb/monthWiseRev?year="+year+"&qtr="+qtr+""
	}else if(target == "loadsCity"){
		url =BASE_URL+"adminWeb/monthlyLoadnKMs?year="+year+"&qtr="+qtr+"&loadCity=loadCity"
	}else if(target == "km"){
		url =BASE_URL+"adminWeb/monthlyLoadnKMs?year="+year+"&qtr="+qtr+"&loadCity=km"
	}
	console.log("url.........."+url)
	var settings = {
		"url": url,
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		var data = response.data;
		console.log("response............"+data)
		if(data !=null){
			barChats(data)
		}else{
			var empty = [['Month', ''], ['-', 0]];
			barChats(empty)
		}
		
	  });
}




function barChats(chartData) {
	google.charts.load('current', { 'packages': ['bar'] });
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = google.visualization.arrayToDataTable(chartData);


		var options = {
			chartArea: {
				backgroundColor: {
					fill: '#eef7fd',
					fillOpacity: 0.1
				},
			},
			backgroundColor: {
				fill: '#eef7fd',
				fillOpacity: 0.8
			},
			chart: {
				title: '',
				subtitle: '',
			}
		};

		var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

		chart.draw(data, google.charts.Bar.convertOptions(options));
	}
}


