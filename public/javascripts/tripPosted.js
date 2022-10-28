allTrips();
function allTrips() {
	var settings = {
		"url": BASE_URL + "trip/getAllTrips",
		"method": "GET",
	};

	$.ajax(settings).done(function (response) {
		setDataToTable(response);
	});
}


function setDataToTable(jsonData) {
	var columns = [
		{ "data": "user_id" },
		{ "data": "trip_date" },
		{ "data": "trip_start_time" },
		{ "data": "trip_budget" },
		{ "data": "revised_trip_budget_one" },
		{ "data": "revised_trip_budget_two" },

		{ "data": "trip_status" },
		{ "data": "body_type" },
		{ "data": "capacity" },
		{ "data": "pick_add" },
		{ "data": "pick_pin_code" },
		{ "data": "pick_city" },

		{ "data": "pick_state" },
		{ "data": "pick_country" },
		{ "data": "drop_add" },
		{ "data": "drop_pin_code" },
		{ "data": "drop_city" },
		{ "data": "drop_state" },

		{ "data": "drop_country" },
		{ "data": "notes_meterial_des" },
		{ "data": "customer_count" },
		{ "data": "payment_type" },
		{ "data": "trip_id" },
		{ "data": "trip_posted_at" },

		{ "data": "sp_name" },
		{ "data": "phone_number" },
		{ "data": "alternate_ph_no" }
	]
	$.fn.dataTable.ext.errMode = 'none';
	$('#TripPostedData').DataTable({
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