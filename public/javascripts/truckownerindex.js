allTruckList();

$('.dataTables_length label select').remove();

function allTruckList(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var userType = urlParams.get('userType')

	// if(userType=="Owner"){
	// 	$('#userRole').html("List of Truck Owners")
	// }else if(userType=="Customer"){
	// 	$('#userRole').html("List of Load Poster")
	// }else if(userType=="Broker"){
	// 	$('#userRole').html("List of Broker")
	// }

	if(userType=="Owner"){
		$('#userRole span').html("Truck Owners")
		$('#totalTruckOwners .card:nth-child(1) p').html("Total Truck Owners")
		$('#totalTruckOwners .card:nth-child(2) p').html("Truck Owners without Drivers")
	}else if(userType=="Customer"){
		$('#userRole span').html("Load Posters")
		$('#totalTruckOwners .card:nth-child(1) p').html("Total Load Poster")
		$('#totalTruckOwners .card:nth-child(2) p').html("Load Poster without Drivers")
		$('#totalTruckOwners .card:nth-child(1)').hide();
	}else if(userType=="Broker"){
		$('#userRole span').html("Brokers")
		$('#totalTruckOwners .card:nth-child(1) p').html("Total Broker")
		$('#totalTruckOwners .card:nth-child(2) p').html("Broker without Drivers")
	}else if(userType=="driver"){
		$('#userRole span').html("Drivers")
		$('#totalTruckOwners .card:nth-child(1) p').html("Total Drivers")
		$('#totalTruckOwners .card:nth-child(2) p').html("Broker without Drivers")
	}else{
		userType = "Owner";
		$('#userRole span').html("Truck Owners")
		$('#totalTruckOwners .card:nth-child(1) p').html("Total Truck Owners")
		$('#totalTruckOwners .card:nth-child(2) p').html("Truck Owners without Drivers")
	}
	
	var settings = {
		"url": BASE_URL+"adminWeb/usersFullDetails/"+userType,
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		var data = response.data
		$('#totalTruckOwners').find("div:eq(0) h5").text(data.length)
		var truckOwnersWitoutDrivers = 0
		var incompleteProfiles = 0


		for (let i = 0; i < data.length; i++) {
			//prakash
			if(data[i].is_self_added_asDriver!=0){
				truckOwnersWitoutDrivers++;
			}
			if(data[i].isPersonal_dt_added!=0){
				incompleteProfiles++;
			}
		  }
		  $('#totalTruckOwners').find("div:eq(1) h5").text(truckOwnersWitoutDrivers)
		  $('#totalTruckOwners').find("div:eq(2) h5").text(incompleteProfiles)
		setDataToTable(response, userType);
	  });
}

	
	function setDataToTable(jsonData, userType){
		var columns =  [  
				{     "data"     :     "uRating", "mRender": function(data) {
						var rating = 0
						if(data==null){
							rating = 0
						}else{
							rating = data
						}
					return '<div class="ratin_view"><img alt="profile" src="img/rating.png" width="10"> '+rating+'</div>'
				  }},  
				{     "data"     :     "name",   "mRender": function (data, type, row) {
					return '<a href="/truckowner?userId='+row.user_id+'&name='+row.name+'&date='+row.created_at+'&userType='+userType+'">'+data+'</a>'}},  
				{     "data"     :     "phone_number"},
				{     "data"     :     "trucksCount"},
				{     "data"     :     "name"},
				{     "data"     :     "preferred_location"},
				{     "data"     :     "state_code"},
				{     "data"     :     "is_user_verfied",  wrap: true, "render": function (data, type, row) {
					var isUserVerfied; 
					if(data==1){
						isUserVerfied = "YES"
					}else{
						isUserVerfied = "NO"
					}
					return isUserVerfied}},
				{     "data"     :     "tripsCount"},
				{     "data"     :     "created_at",  "mRender": function (data, type, row) {
					return convertDate(data);
				}},
				{     "data"     :     "is_account_active", wrap: true, "render": function (data, type, row) {
					var isAccountActive; 
					if(data==0){
						isAccountActive = "Deactive"
					}else{
						isAccountActive = "Active"
					}
					return '<div class="active-button"> <button user_id="'+row.user_id+'" type="button" value="0">'+isAccountActive+'</button></div>'}},	
				{     "data"     :     null, title: 'Delete', wrap: true, "render": function (data, type, row) { return '<div class="delete-button"> <button user_id="'+row.user_id+'" truckListpage="true" type="button" value="0">Delete</button></div>'}}	
		   ]
		   		
		
		
	$.fn.dataTable.ext.errMode = 'none';

	//$.fn.dataTable.moment(date);
	

	$('#TruckDetailsData').DataTable( {
	 	pagination: "bootstrap",
		filter:true,
		data: jsonData.data,
		destroy: true,
		lengthMenu:[5,10,25],
		pageLength: 10,
		order: [9, 'desc'],
		"columns":columns,
		"initComplete": function(settings, json) {
			removeShowEntriesInDatatable()
		  }
	  } );

	}


	$(document).on("click","#add_btn",function(){
  
		$("#addProfile").modal("toggle");
		
	  })

	  function onSubmit( form ){
		var data = new FormData(form)
		var form = Array.from(data.entries())
		var object = {};
		for (const [name, value] of form) {
			console.log({ name, value })
			if(name =="phone_number" || name =="alternate_ph_no"){
				object[name] = "91"+value
			}else{
				object[name] = value
			}
		}

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		var userType = urlParams.get('userType')

		object["user_type"] = userType;
		object["isRegistration_done"] = 1
		console.log( object );
		
		addUser(object)
		return false; //don't submit
	  }

	  function addUser(object){
		var settings = {
			"url": BASE_URL+"user/create",
			"method": "POST",
			"headers": {
			  "Content-Type": "application/json"
			},
			"data": JSON.stringify(object),
		  };
		  
		  $.ajax(settings).done(function (response) {
			console.log(response);
			
			if(response.Success==0){
				alert(response.Message)
			}else{
				$("#addProfile").modal("toggle");
				location.reload();
			}
			
		  }).fail(function (jqXHR, textStatus) {
			console.log(textStatus, jqXHR);
		  });
	  }

	  
	  
