$('#linkA').tooltip();


allTruckList();
var activeLoads = []
var acceptedLoads = []
var allLoads = []
var historyLoads = []
function allTruckList(){
	var settings = {
		"url": BASE_URL+"adminWeb/loadBids/0/1/2/3",
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		//console.log("response............"+response.data.lenght)
		var data = response.data;
		var loadSubmitted = 0
		var loadexpired = 0
		for (let i = 0; i < data.length; i++) {
			var obj = data[i]
			var status = obj.bid_status
			if(status=="loadSubmitted" || status=="loadPosted"){
				loadSubmitted++
				
			}else if(status=="loadExpired"){
				loadexpired++
			}

			if(status=="loadPosted" || status=="loadSubmitted" || status=="submittedNego" || status=="submittedNonNego" || status=="AcceptedBySp"){
				activeLoads.push(obj)
			}else if(status=="start"){
				acceptedLoads.push(obj)
			}else if(status=="loadExpired" || status=="delete"){
				allLoads.push(obj)
			}else if(status=="end"){
				historyLoads.push(obj)
			}

		  }
		  
		  //console.log("response............"+loadexpired)
		  $("#activeLoads").text(loadSubmitted)
		  $("#loadExpaired").text(loadexpired)
		  var data = {}
		  data["data"] = activeLoads
		  var columnDefs = {}
		setDataToTable(data, columnDefs);
	  });
}

	
	function setDataToTable(jsonData, columnDefs){
		
		var columns =  [  
				{     "data"     :     "tracking_no",  "mRender": function (data, type, row) {
					return '<a href="/loadsBidsDetails?loadId='+row.idpost_load+'">'+data+'</a>'}}, 
				{     "data"     :     "bid_status",  "mRender": function (data, type, row) {
						return camelcaseToSentence(data);
				}},
				{     "data"     :     "bid_posted_at",  "mRender": function (data, type, row) {
					return convertDate(data);
				}},  
				{     "data"     :     "pick_up_date",  "mRender": function (data, type, row) {
					return "-";
				}}, 
				{     "data"     :     "name",  "mRender": function (data, type, row) {
					return '<a href="/truckowner?userId='+row.user_id+'&name='+row.name+'&date='+row.created_at+'&userType='+row.user_type+'">'+data+'</a>'}},

				{     "data"     :     "phone_number"},
				{     "data"     :     "pick_city"},
				{     "data"     :     "drop_city"},
				{     "data"     :     "budget"},
				{     "data"     :     "km_approx"},
				{     "data"     :     "pick_up_time"},
				{     "data"     :     "body_type"},
				{     "data"     :     "capacity"},
				{     "data"     :     "notes_meterial_des",  "mRender": function (data, type, row) {
					var trimmedString = data.substring(0, 20);
					return '<div href="#"  data-toggle="tooltip" title="'+data+'"> '+trimmedString+'</div>';
				}},
				{     "data"     :     "payment_type"},
				{     "data"     :     "platform_fees",  "mRender": function (data, type, row) {
					var fmt = 0
					if(data !=null && data !=""){
						fmt = data
					}					
					return fmt+"%";
				}},
				{     "data"     :     "pick_add", "mRender": function (data, type, row) {
					var trimmedString = data.substring(0, 20);

					
					return '<div  data-toggle="tooltip" title="'+data+'"> '+trimmedString+'</div>';
				}},
				{     "data"     :     "drop_add",  "mRender": function (data, type, row) {
					var trimmedString = data.substring(0, 20);
					return '<div data-toggle="tooltip" title="'+data+'"> '+trimmedString+'</div>';
				}}
				
		   ]
		   		
		
		
	$.fn.dataTable.ext.errMode = 'none';
	$('#loadDetailsData').DataTable( {
	 	pagination: "bootstrap",
		filter:true,
		data: jsonData.data,
		destroy: true,
		lengthMenu:[5,10,25],
		pageLength: 10,
		'columnDefs' : [columnDefs],
		"columns":columns,
		"initComplete": function(settings, json) {
			removeShowEntriesInDatatable()
			$('[data-toggle="tooltip"]').tooltip({
				placement: 'left'


            })

		  }
	  } );

	}

	


	function onClickLoadTab(evt, loadDetails) {
		var i, tablinks;
		
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		//document.getElementById(loadDetails).style.display = "block";
		if(evt !=null){
			evt.currentTarget.className += " active";
		}else{
			$("#activeLoadsClick").addClass("active")
		}
		var data = {}
		var columnDefs = {}
		if(loadDetails == "activeLoads"){
			data["data"] =activeLoads
		}else if(loadDetails == "acceptedLoads"){
			data["data"] =acceptedLoads
			columnDefs = { 'visible': false, 'targets': [3] }
		}else if(loadDetails == "allLoads"){
			data["data"] = allLoads
			columnDefs = { 'visible': false, 'targets': [3] }
		}else if(loadDetails == "historyLoads"){
			data["data"] =historyLoads
			columnDefs = { 'visible': false, 'targets': [3] }
		}
		
		setDataToTable(data, columnDefs);
		
	}


	