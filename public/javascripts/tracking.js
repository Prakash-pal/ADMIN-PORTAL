allTrackingList();
function allTrackingList() {
	var settings = {
		"url": BASE_URL + "track/allTrackingIds",
		"method": "GET",
	};

	$.ajax(settings).done(function (response) {
		setDataToTable(response);
	});
}


function setDataToTable(jsonData) {
	var columns = [
		{ "data": "tracking_no" },
		{ "data": "lp_user_id" },
		{ "data": "sp_user_id" },
		{ "data": "lp_name" ,  "mRender": function (data, type, row) {
			return '<a href="/truckowner?userId='+row.lp_user_id+'&name='+row.lp_name+'&date='+row.pick_up_date+'&userType='+row.user_type+'">'+data+'</a>'}},
		{ "data": "lp_phoneNo" },

		{ "data": "sp_name",  "mRender": function (data, type, row) {
			return '<a href="/truckowner?userId='+row.sp_user_id+'&name='+row.sp_name+'&date='+row.pick_up_date+'&userType='+row.user_type+'">'+data+'</a>'}},
		{ "data": "sp_mobile_no" },
		{ "data": "pick_up_date" },
		{ "data": "pick_up_time" },
		{ "data": "budget" },
		{ "data": "km_approx" },
		{ "data": "body" },

		{ "data": "capiacty" },
		{ "data": "pick_city" },
		{ "data": "pick_state" },
		{ "data": "pick_pin" },
		{ "data": "pick_add" },
		{ "data": "drop_city" },

		{ "data": "drop_state" },
		{ "data": "drop_pin" },
		{ "data": "drop_add" },
		{ "data": "notes_meterial_des" },
		{ "data": "sp_note" },
		{ "data": "payment_type" },

		{ "data": "advance_percentage" },
		{ "data": "sp_quote" },
		{ "data": "truck" },
		{ "data": "vehicle_type" },
		{ "data": "body_type" },
		{ "data": "driver" },


		{ "data": "driver_phone_no" },
		{ "data": "bid_status" },
		{ "data": "is_trip_withdrawn" },
		{ "data": "is_truck_reached" },
		{ "data": "is_shipment_picked_up" },
		{ "data": "is_shipment_in_transit" },

		{ "data": "is_shipment_delevered" },
		{ "data": "is_truck_unloaded" },
		{ "data": "platform_charges" },
		{ "data": "sp_current_lat" },
		{ "data": "sp_current_long" },
		{ "data": "is_lp_rating_done" },
		{ "data": "is_sp_rating_done" },
	]
	$.fn.dataTable.ext.errMode = 'none';
	$('#trackingListData').DataTable({
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