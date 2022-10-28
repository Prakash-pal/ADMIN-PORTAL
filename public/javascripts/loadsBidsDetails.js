allTruckList();
function allTruckList() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const loadId = urlParams.get('loadId')
	var settings = {
		"url": BASE_URL + "adminWeb/loadBids/0/1/2/3/" + loadId,
		"method": "GET",
	};

	$.ajax(settings).done(function (response) {
		$("#loadDetailsId label").text(response.data[0].tracking_no)		
		setDataToTable(response, loadId);
	});


}


function setDataToTable(jsonData, loadId) {
	var columns = [
		{
			"data": "tracking_no", "mRender": function (data, type, row) {
				return '<a href="/truckowner">' + data + '</a>'
			}
		},
		{ "data": "bid_posted_at",  "mRender": function (data, type, row) {
			return convertDate(data);
		} },
		{ "data": "pick_up_date" },
		{ "data": "name",  "mRender": function (data, type, row) {
			return '<a href="/truckowner?userId='+row.user_id+'&name='+row.name+'&date='+row.created_at+'&userType='+row.user_type+'">'+data+'</a>'}},
		{ "data": "-" },
		{ "data": "phone_number" },
		{ "data": "pick_city" },
		{ "data": "drop_city" },
		{ "data": "budget" },
		{ "data": "km_approx" },
		{ "data": "pick_up_time" },
		{ "data": "body_type" },
		{ "data": "capacity" },
		{
			"data": "notes_meterial_des", "mRender": function (data, type, row) {
				var trimmedString = data.substring(0, 20);
				return trimmedString + '...';
			}
		},
		{ "data": "payment_type" },
		{ "data": "platform_fees" },
		{
			"data": "pick_add", "mRender": function (data, type, row) {
				var trimmedString = data.substring(0, 20);
				return trimmedString + '...';
			}
		},
		{
			"data": "drop_add", "mRender": function (data, type, row) {
				var trimmedString = data.substring(0, 20);
				return trimmedString + '...';
			}
		},
		{ "data": "bid_status", "mRender": function (data, type, row) {
			return camelcaseToSentence(data);
		}}
	]



	$.fn.dataTable.ext.errMode = 'none';
	$('#loadDetailsData').DataTable({
		pagination: "bootstrap",
		filter: true,
		data: jsonData.data,
		destroy: true,
		lengthMenu: [5, 10, 25],
		pageLength: 10,
		"columns": columns,
		"initComplete": function(settings, json) {
			removeShowEntriesInDatatable()
		  }
	});


	var settings = {
		"url": BASE_URL + "adminWeb/loadBids/0/1/2/3/4/5/" + loadId,
		"method": "GET",
	};

	$.ajax(settings).done(function (response) {
		$("#loadDetailsId label").text(response.data.idpost_load)
		bidsData(response);
	});



}
function bidsData(jsonData) {
	console.log(JSON.stringify(jsonData))
	var columns = [
		{
			"data": "name",  "mRender": function (data, type, row) {
				return '<a href="/truckowner?userId='+row.user_id+'&name='+row.name+'&date='+row.created_at+'&userType='+row.user_type+'">'+data+'</a>'}},
		{ "data": "-" },
		{ "data": "user_type" },
		{ "data": "phone_number" },
		{ "data": "sp_quote" },
		{ "data": "revised_bid_quote_one" },
		{ "data": "assigned_truck_id" },
		{ "data": "vehicle_model" },
		{ "data": "body_type" },
		{ "data": "notes" },
		{ "data": "-" },
		{ "data": "Driver_number" },
		{ "data": "bid_status" ,  "mRender": function (data, type, row) {
			return camelcaseToSentence(data);
		}}
	]



	$.fn.dataTable.ext.errMode = 'none';
	$('#postDetailsData').DataTable({
		pagination: "bootstrap",
		filter: true,
		data: jsonData.data,
		destroy: true,
		lengthMenu: [5, 10, 25],
		pageLength: 10,
		"columns": columns,
		"initComplete": function(settings, json) {
			removeShowEntriesInDatatable()
		  }
	});

}