allLogs();

$('.dataTables_length label select').remove();

function allLogs(){
	var settings = {
		"url": BASE_URL+"admin/adminLogs",
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		setDataToTable(response);
	  });
}

	
	function setDataToTable(jsonData){
		var columns =  [  
				{     "data"     :     "admin_user_name"},
				{     "data"     :     "role", "mRender": function (data) {
					data =  (data==0)?"Admin":"Super Admin"
					return data;
				}},
				{     "data"     :     "updated_date", "mRender": function (data) {
					var s = new Date(data).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});

					return s;
				}
			},
				{     "data"     :     "edit_section_path"},
				{     "data"     :     "edit_field_descip"}	
		   ]
		   		
		
		
	$.fn.dataTable.ext.errMode = 'none';
	$('#userLogsData').DataTable( {
	 	pagination: "bootstrap",
		filter:true,
		data: jsonData.data,
		destroy: true,
		pageLength: 10,
		order: [2, 'desc'],
		"columns":columns,
		"initComplete": function(settings, json) {
			//removeShowEntriesInDatatable()
		  }
	  } );

	}


	  
	  
