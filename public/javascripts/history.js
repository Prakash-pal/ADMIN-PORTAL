allTruckList();
var historyLoads = []
function allTruckList(){
	var settings = {
		"url": BASE_URL+"adminWeb/loadBids/0/1/2/3",
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		//console.log("response............"+response.data.lenght)
		var data = response.data;
		for (let i = 0; i < data.length; i++) {
			var obj = data[i]
			var status = obj.bid_status
			 if(status=="end"){
				historyLoads.push(obj)
			}
		  }
		  
		  //console.log("response............"+loadexpired)
		  var data = {}
		  data["data"] = historyLoads
		setDataToTable(data);
	  });
}

	
	function setDataToTable(jsonData){
		
		var columns =  [  
				{     "data"     :     "tracking_no",   "mRender": function (data, type, row) {
					return '<a href="/loadsBidsDetails?loadId='+row.idpost_load+'">'+data+'</a>'}}, 
				{     "data"     :     "bid_status",  "mRender": function (data, type, row) {
						return camelcaseToSentence(data);
				}},
				{     "data"     :     "bid_posted_at",  "mRender": function (data, type, row) {
					return convertDate(data);
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
					return '<div href="#" class="app-tooltip" data-title="'+data+'"> '+trimmedString+'</div>';
				}},
				{     "data"     :     "payment_type"},
				{     "data"     :     "platform_fees",  "mRender": function (data, type, row) {						
					return data+"%";
				}},
				{     "data"     :     "pick_add", "mRender": function (data, type, row) {
					var trimmedString = data.substring(0, 20);

					
					return '<div href="#" class="app-tooltip" data-title="'+data+'"> '+trimmedString+'</div>';
				}},
				{     "data"     :     "drop_add",  "mRender": function (data, type, row) {
					var trimmedString = data.substring(0, 20);
					return '<div href="#" class="app-tooltip" data-title="'+data+'"> '+trimmedString+'</div>';
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
		"columns":columns,
		"initComplete": function(settings, json) {
			removeShowEntriesInDatatable()
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
		if(loadDetails == "activeLoads"){
			data["data"] =activeLoads
		}else if(loadDetails == "acceptedLoads"){
			data["data"] =acceptedLoads
		}else if(loadDetails == "allLoads"){
			data["data"] = allLoads
		}else if(loadDetails == "historyLoads"){
			data["data"] =historyLoads
		}
		setDataToTable(data);
		
	}


	