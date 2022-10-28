var userType;
getAllDetails();
var editPath = []
var userTypePath;
function getAllDetails() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const userId = urlParams.get('userId')
	const date = urlParams.get('date')
	userType = urlParams.get('userType')
	if (userType == "Owner") {
		$('#userRole label').html("Truck Owners")
		$('#totalTruckOwners .card:nth-child(0) p').html("Total Truck Owners")
		$('#totalTruckOwners .card:nth-child(1) p').html("Truck Owners without Drivers")
		userTypePath = "Truck Owners"
	} else if (userType == "Customer") {
		userTypePath = "Load Posters"
		$('#userRole label').html("Load Posters")
		$('#totalTruckOwners .card:nth-child(0) p').html("Total Load Poster")
		$('#totalTruckOwners .card:nth-child(1) p').html("Load Poster without Drivers")
	} else if (userType == "Broker") {
		userTypePath = "Brokers"
		$('#userRole label').html("Brokers")
		$('#totalTruckOwners .card:nth-child(0) p').html("Broker Poster")
		$('#totalTruckOwners .card:nth-child(1) p').html("Broker without Drivers")
	} else if (userType == "driver") {
		userTypePath = "Drivers"
		$('#userRole label').html("Drivers")
		$('#totalTruckOwners .card:nth-child(0) p').html("Broker Poster")
		$('#totalTruckOwners .card:nth-child(1) p').html("Broker without Drivers")
	}
	if (userType == "Customer") {
		$('.truckDetailsTab').hide()
		$('.driverDetailsTab').hide()
		$('#TruckOwnerDetailsC').find("div:eq(1) p").text("Active Loads")

		$('#TruckOwnerDetailsC').find("div:eq(3)").hide()
		$('#TruckOwnerDetailsC').find("div:eq(4)").hide()
		$('#TruckOwnerDetailsC').find("div:eq(5) p").text("Platform Rev.")

	} else {
		$('.truckDetailsTab').show()
		$('.driverDetailsTab').show()
	}
	var datetime = new Date(date);
	const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	datetime = month[(datetime.getUTCMonth())] + " " + datetime.getUTCFullYear().toString()

	$('#memberSince label').text(datetime)
	$('#profileClick').trigger("onclick");


	
}
function getTruckClick(evt, truckDetails, userId) {
	$('.truckownerTab .addBtn').hide()
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	$('.truckownerTab .addBtn').attr('id', "add" + truckDetails);
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(truckDetails).style.display = "block";
	if (evt != null) {
		evt.currentTarget.className += " active";
	} else {
		$("#profileClick").addClass("active")
	}
	getDataForDatatables(truckDetails, userId);
}



function getDataForDatatables(truckDetails, userId) {
	//console.log(BASE_URL + "adminWeb/truckownersByUserId/" + userId)
	var settings = {
		"url": BASE_URL + "adminWeb/truckownersByUserId/" + userId,
		"method": "GET",
	};

	$.ajax(settings).done(function (response) {
		if (userType == "Customer") {
			$('#TruckOwnerDetailsC').find("div:eq(1) h5").text(response.data.activBids)
			$('#TruckOwnerDetailsC').find("div:eq(2) h5").text(response.data.lpdelivered)

			if(response.data.lpPlatformRev!=null)
			$('#TruckOwnerDetailsC').find("div:eq(5) h5").text(response.data.lpPlatformRev)
			if(response.data.lpFmtRev!=null)	
			$('#TruckOwnerDetailsC').find("div:eq(6) h5").text(response.data.lpFmtRev)
		} else {
			$('#TruckOwnerDetailsC').find("div:eq(1) h5").text(response.data.activBids)
			$('#TruckOwnerDetailsC').find("div:eq(2) h5").text(response.data.delivered)

			$('#TruckOwnerDetailsC').find("div:eq(3) h5").text(response.data.trucks)
			$('#TruckOwnerDetailsC').find("div:eq(4) h5").text(response.data.driverCount)

			if(response.data.spRev!=null)			
			$('#TruckOwnerDetailsC').find("div:eq(5) h5").text(response.data.spRev)
			if(response.data.fmtRev!=null)	
			$('#TruckOwnerDetailsC').find("div:eq(6) h5").text(response.data.fmtRev)
		}
		setDataToTable(response, truckDetails);
	});

}

function setDataToTable(jsonData, truckDetails) {
	// 'data': null, title: 'Action', wrap: true, "render": function (item) { return '<div class="btn-group"> <button type="button" onclick="set_value(' + item.ID + ')" value="0" class="btn btn-warning" data-toggle="modal" data-target="#myModal">View</button></div>'
	var columns = []
	var data = []
	$('.truckownerTab .addBtn').attr('id', "add" + truckDetails);
	$('.truckownerTab .addBtn').show()
	if (truckDetails == "PersonalDetails") {
		$('.truckownerTab .addBtn').hide()
		columns = [
			{
				"data": "userRatings", "mRender": function (data) {
					var rating = 0
					if (data == "NaN") {
						rating = 0
					} else {
						rating = data[0]
					}

					return '<div class="ratin_view"><img alt="profile" src="img/rating.png" width="10"> ' + rating + '</div>'
				}
			},
			{ "data": "name" },
			{ "data": "user_type" },
			{ "data": "phone_number" },
			{
				"data": "alternate_ph_no", wrap: true, "mRender": function (data) {
					return '<div class="alternate_ph_view"><input type="tel" minlength="10" maxlength="10" pattern="[0][0-9]"  value="' + data + '" id="alternate_ph_no" name="alternate_ph_no"></div>'
				}
			},
			{
				"data": "email_id", wrap: true, "mRender": function (data) {
					return '<div class="email_view"><input type="email"  value="' + data + '" id="email" name="email"></div>'
				}
			},
			{
				"data": "address", "mRender": function (data, type, row) {
					var trimmedString = data.substring(0, 20);
					return trimmedString + '...';
				}
			},
			{ "data": "preferred_location" },
			{ "data": "state_code" },
			{ "data": "pin_code" },
			{
				"data": "aadhaar_number", wrap: true, "mRender": function (data, type, row) {
					var isVerfied = "";
					if (row.is_Addhar_verfied == 1) {
						isVerfied = "checked"
					}
					data = (data != null) ? data : ""
					var imagesList =row.userImages;
					var imgUrl = ""
					for(let  i=0; i<imagesList.length; i++){
						if(imagesList[i].image_type=="Aadhar"){
							imgUrl = imagesList[i].image_url;
						}
					}
					console.log(imgUrl)
					return '<div class="adhaar_number_view"><input type="text"  value="' + data + '" id="adhaar_number" name="adhaar_number"><input class="checkbox" type="checkbox" ' + isVerfied + '><img alt="Aadhar" src="img/upload_img.png" width="15" class="uploadImageBtn"> <img onclick="onClickImagePreviw(\'' + imgUrl + '\')"class="previewImg" alt="profile" src="img/view_eye.png" width="15"></div>'
				}
			},
			{
				"data": "pan_number", wrap: true, "mRender": function (data, type, row) {

					var isVerfied = "";
					if (row.is_pan_verfied == 1) {
						isVerfied = "checked"
					}
					data = (data != null) ? data : ""
					var imagesList =row.userImages;
					var imgUrl = ""
					for(let  i=0; i<imagesList.length; i++){
						if(imagesList[i].image_type=="Pan"){
							imgUrl = imagesList[i].image_url;
						}
					}
					return '<div class="pan_number_view"><input type="text"  value="' + data + '" id="pan_number" name="pan_number"><input class="checkbox" type="checkbox" ' + isVerfied + '><img alt="Pan" src="img/upload_img.png" width="15" class="uploadImageBtn">  <img onclick="onClickImagePreviw(\'' + imgUrl + '\')"class="previewImg" alt="profile" src="img/view_eye.png" width="15">	</div>'
				}
			},
			{
				"data": "is_account_active", title: 'Active', wrap: true, "render": function (data, type, row) {
					var isAccountActive;
					if (data == 0) {
						isAccountActive = "Deactive"
					} else {
						isAccountActive = "Active"
					}
					return '<div class="active-button"> <button user_id="' + row.user_id + '" type="button" value="0">' + isAccountActive + '</button></div>'
				}
			},
			{ "data": null, title: 'Delete', wrap: true, "render": function (data, type, row) { return '<div class="delete-button"> <button user_id="' + row.user_id + '"  type="button" value="0">Delete</button></div>' } },
			{ "data": null, title: 'Update', wrap: true, "render": function (data, type, row) { return '<div class="update-button"> <button user_id="' + row.user_id + '" type="button"  value="0">Update</button></div>' } }
		]
		//    onclick="updateProfile(\'' + data + '\')"
		data.push(jsonData.data)
	} else if (truckDetails == "FirmDetails") {
		data = jsonData.data.companyDetails
		columns = [
			{ "data": "company_name" },
			{ "data": "company_type" },
			{
				"data": "company_gst_no", wrap: true, "mRender": function (data) {
					return '<div class="company_gst_no_view"><input type="text"  value="' + data + '" id="company_gst_no" name="company_gst_no"></div>'
				}
			},
			{
				"data": "company_pan", wrap: true, "mRender": function (data) {
					return '<div class="company_pan_view"><input type="text" value="' + data + '" id="company_pan" name="company_pan"></div>'
				}
			},
			{ "data": null, title: 'Update', wrap: true, "render": function (data, type, row) { return '<div class="update-button"> <button company_id="' + row.company_id + '" type="button" value="0">Update</button></div>' } }
		]

	} else if (truckDetails == "BankDetails") {
		data = jsonData.data.bankDetails
		columns = [
			{
				"data": "bank_name", wrap: true, "mRender": function (data) {
					return '<div class="bank_name_view"><input type="text"  value="' + data + '" id="bank_name" name="bank_name"></div>'
				}
			},
			{
				"data": "account_number", wrap: true, "mRender": function (data) {
					return '<div class="account_number_view"><input type="text"  value="' + data + '" id="account_number" name="account_number"></div>'
				}
			},
			{
				"data": "IFSI_CODE", wrap: true, "mRender": function (data) {
					return '<div class="ifsi_code_view"><input type="text"  value="' + data + '" id="ifsi_code" name="ifsi_code"></div>'
				}
			},
			{
				"data": "cancelled_cheque", wrap: true, "mRender": function (data) {
					return '<div class="cancelled_cheque_view" onclick="onClickImagePreviw(\'' + data + '\')" >View Check <img alt="profile" src="img/view_eye.png" width="15"></div>'
				}
			},
			{ "data": null, title: 'Update', wrap: true, "render": function (data, type, row) { return '<div class="update-button"> <button bank_id="' + row.bank_id + '" type="button" value="0">Update</button></div>' } }
		]

	} else if (truckDetails == "TruckDetails") {
		data = jsonData.data.truckdetails
		columns = [
			{
				"data": "vehicle_no", wrap: true, "mRender": function (data) {
					return '<div class="vehicle_no_view"><input type="text"  value="' + data + '" id="vehicle_no" name="vehicle_no"></div>'
				}
			},
			{
				"data": "truck_type", wrap: true, "mRender": function (data) {
					console.log(data)
					return '<div class="truck_type_view"> <select id="' + data + '_dropdown_truck_type" value="' + data + '"> <option value="array_load_type_container" >Trailers Dala Body</option> <option value="array_load_type_trailers_flat_bed" >Trailers Flat Bed</option> <option value="array_load_type_open_body">Open Body</option> <option value="array_load_type_trailers_dala_body">Container</option> <option value="array_load_type_tanker">Tanker</option> <option value="array_load_type_tipper">Tipper</option> <option value="array_load_type_bulker">Bulker</option> <option value="array_load_type_lcv_open_body">LCV Open Body</option> <option value="array_load_type_lcv_container">LCV Container</option> <option value="array_load_type_mini">Mini</option> <option value="array_load_type_pickUp">PickUp</option></select></div>'
				}
			},
			{
				"data": "truck_carrying_capacity", wrap: true, "mRender": function (data) {


					var id = data.replace(/[^a-zA-Z0-9 ]/g, '');
					id = id.replace(/[\. ,:-]+/g, "_")
					return '<div class="truck_load_type_view"> <select id="' + id + '" value="' + data + '" name="truck_carrying_capacity" id="truck_carrying_capacity" required> <option value="array_load_type_container">7.5 tons 14 feet</option> <option value="array_load_type_container">7.5 tons 17 feet</option> <option value="array_load_type_container">7.5 tons 19 feet</option> <option value="array_load_type_container">7.5 tons 20 feet</option> <option value="array_load_type_container">7.5 tons 22 feet</option> <option value="array_load_type_container">7.5 tons 24 feet</option> <option value="array_load_type_container">7.5 tons 32 feet</option> <option value="array_load_type_container">9 tons 14 feet</option> <option value="array_load_type_container">9 tons 17 feet</option> <option value="array_load_type_container">9 tons 19 feet</option> <option value="array_load_type_container">9 tons 20 feet</option> <option value="array_load_type_container">9 tons 22 feet</option> <option value="array_load_type_container">9 tons 24 feet</option> <option value="array_load_type_container">9 tons 30 feet</option> <option value="array_load_type_container">9 tons 34 feet</option> <option value="array_load_type_container">14.5 tons 32 feet</option> <option value="array_load_type_container">15 tons 30 feet</option> <option value="array_load_type_container">15 tons 32 feet</option> <option value="array_load_type_container">18 tons 30 feet</option> <option value="array_load_type_container">18 tons 32 feet</option> <option value="array_load_type_container">19 tons 30 feet</option> <option value="array_load_type_container">19 tons 32 feet</option> <option value="array_load_type_container">20 tons 30 feet</option> <option value="array_load_type_container">20 tons 32 feet</option> <option value="array_load_type_container">20 tons 40 feet</option> <option value="array_load_type_container">24 tons 30 feet</option> <option value="array_load_type_container">24 tons 32 feet</option> <option value="array_load_type_container">25 tons 25 feet</option> <option value="array_load_type_container">25 tons 30 feet</option> <option value="array_load_type_container">25 tons 31 feet</option> <option value="array_load_type_container">25 tons 32 feet</option> <option value="array_load_type_container">25 tons 40 feet</option> <option value="array_load_type_container">30 tons 30 feet</option> <option value="array_load_type_container">30 tons 32 feet</option> <option value="array_load_type_container">30 tons 40 feet</option> <option value="array_load_type_lcv_container">6 tons 14 feet</option> <option value="array_load_type_lcv_container">6 tons 15 feet</option> <option value="array_load_type_lcv_container">6 tons 16 feet</option> <option value="array_load_type_lcv_container">6 tons 17 feet</option> <option value="array_load_type_lcv_container">6 tons 20 feet</option> <option value="array_load_type_lcv_container">6 tons 21 feet</option> <option value="array_load_type_lcv_container">6 tons 22 feet</option> <option value="array_load_type_lcv_container">6 tons 23 feet</option> <option value="array_load_type_lcv_container">6 tons 24 feet</option> <option value="array_load_type_lcv_container">6 tons 25 feet</option> <option value="array_load_type_lcv_container">6 tons 26 feet</option> <option value="array_load_type_lcv_container">6 tons 27 feet</option> <option value="array_load_type_lcv_container">6 tons 28 feet</option> <option value="array_load_type_lcv_container">6 tons 30 feet</option> <option value="array_load_type_lcv_container">6 tons 31 feet</option> <option value="array_load_type_lcv_container">6 tons 32 feet</option> <option value="array_load_type_lcv_container">6 tons 34 feet</option> <option value="array_load_type_lcv_container">7 tons 14 feet</option> <option value="array_load_type_lcv_container">7 tons 15 feet</option> <option value="array_load_type_lcv_container">7 tons 16 feet</option> <option value="array_load_type_lcv_container">7 tons 17 feet</option> <option value="array_load_type_lcv_container">7 tons 20 feet</option> <option value="array_load_type_lcv_container">7 tons 21 feet</option> <option value="array_load_type_lcv_container">7 tons 22 feet</option> <option value="array_load_type_lcv_container">7 tons 23 feet</option> <option value="array_load_type_lcv_container">7 tons 24 feet</option> <option value="array_load_type_lcv_container">7 tons 25 feet</option> <option value="array_load_type_lcv_container">7 tons 26 feet</option> <option value="array_load_type_lcv_container">7 tons 27 feet</option> <option value="array_load_type_lcv_container">7 tons 28 feet</option> <option value="array_load_type_lcv_container">7 tons 30 feet</option> <option value="array_load_type_lcv_container">7 tons 31 feet</option> <option value="array_load_type_lcv_container">7 tons 32 feet</option> <option value="array_load_type_lcv_container">7 tons 34 feet</option> <option value="array_load_type_tanker">8 tons 6 tyres</option> <option value="array_load_type_tanker">10 tons 6 tyres</option> <option value="array_load_type_tanker">16 tons 10 tyres</option> <option value="array_load_type_tanker">18 tons 10 tyres</option> <option value="array_load_type_tanker">19 tons 10 tyres</option> <option value="array_load_type_tanker">21 tons 12 tyres</option> <option value="array_load_type_tanker">24 tons 12 tyres</option> <option value="array_load_type_tanker">25 tons 12 tyres</option> <option value="array_load_type_tanker">26 tons 14 tyres</option> <option value="array_load_type_tanker">29 tons 14 tyres</option> <option value="array_load_type_tanker">30 tons 14 tyres</option> <option value="array_load_type_tanker">35 tons 16 tyres</option> <option value="array_load_type_tanker">36 tons 16 tyres</option> <option value="array_load_type_tipper">9 tons 6 tyres</option> <option value="array_load_type_tipper">15 tons 10 tyres</option> <option value="array_load_type_tipper">16 tons 10 tyres</option> <option value="array_load_type_tipper">18 tons 10 tyres</option> <option value="array_load_type_tipper">19 tons 10 tyres</option> <option value="array_load_type_tipper">25 tons 12 tyres</option> <option value="array_load_type_tipper">29 tons 14 tyres</option> <option value="array_load_type_tipper">30 tons 14 tyres</option> <option value="array_load_type_mini">Mini Truck Tata Ace(0.75 tons)</option> <option value="array_load_type_mini">Mini Truck Tata Ace(1 tons)</option> <option value="array_load_type_pickUp">PickUp Truck dost(1.5 tons)</option> <option value="array_load_type_pickUp">PickUp Truck dost(2 tons)</option> <option value="array_load_type_bulker">21 tons 12 tyres</option> <option value="array_load_type_bulker">24 tons 12 tyres</option> <option value="array_load_type_bulker">25 tons 12 tyres</option> <option value="array_load_type_bulker">29 tons 14 tyres</option> <option value="array_load_type_bulker">30 tons 14 tyres</option> <option value="array_load_type_lcv_open_body">2.5 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">3 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">3.5 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">4 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">4.5 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">5 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">5.5 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">6 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">6 tons 6 tyres</option> <option value="array_load_type_lcv_open_body">7 tons 4 tyres</option> <option value="array_load_type_lcv_open_body">7 tons 6 tyres</option> <option value="array_load_type_open_body">7.5 tons 6 tyres</option> <option value="array_load_type_open_body">8 tons 6 tyres</option> <option value="array_load_type_open_body">9 tons 6 tyres</option> <option value="array_load_type_open_body">10 tons 6 tyres</option> <option value="array_load_type_open_body">12 tons 6 tyres</option> <option value="array_load_type_open_body">15 tons 10 tyres</option> <option value="array_load_type_open_body">16 tons 10 tyres</option> <option value="array_load_type_open_body">18 tons 10 tyres</option> <option value="array_load_type_open_body">18.5 tons 10 tyres</option> <option value="array_load_type_open_body">19 tons 10 tyres</option> <option value="array_load_type_open_body">19 tons 6 tyres</option> <option value="array_load_type_open_body">20 tons 10 tyres</option> <option value="array_load_type_open_body">20 tons 12 tyres</option> <option value="array_load_type_open_body">21 tons 10 tyres</option> <option value="array_load_type_open_body">21 tons 12 tyres</option> <option value="array_load_type_open_body">22 tons 10 tyres</option> <option value="array_load_type_open_body">22 tons 12 tyres</option> <option value="array_load_type_open_body">24 tons 12 tyres</option> <option value="array_load_type_open_body">25 tons 10 tyres</option> <option value="array_load_type_open_body">25 tons 12 tyres</option> <option value="array_load_type_open_body">26 tons 12 tyres</option> <option value="array_load_type_open_body">29 tons 14 tyres</option> <option value="array_load_type_open_body">30 tons 14 tyres</option> <option value="array_load_type_open_body">33 tons 12 tyres</option> <option value="array_load_type_open_body">35 tons 14 tyres</option> <option value="array_load_type_open_body">35 tons 16 tyres</option> <option value="array_load_type_open_body">35 tons 18 tyres</option> <option value="array_load_type_open_body">36 tons 16 tyres</option> <option value="array_load_type_open_body">38 tons 18 tyres</option> <option value="array_load_type_open_body">43 tons 14 tyres</option> <option value="array_load_type_trailers_dala_body">22 tons</option> <option value="array_load_type_trailers_dala_body">25 tons</option> <option value="array_load_type_trailers_dala_body">26 tons</option> <option value="array_load_type_trailers_dala_body">27 tons</option> <option value="array_load_type_trailers_dala_body">28 tons</option> <option value="array_load_type_trailers_dala_body">29 tons</option> <option value="array_load_type_trailers_dala_body">30 tons</option> <option value="array_load_type_trailers_dala_body">31 tons</option> <option value="array_load_type_trailers_dala_body">32 tons</option> <option value="array_load_type_trailers_dala_body">33 tons</option> <option value="array_load_type_trailers_dala_body">34 tons</option> <option value="array_load_type_trailers_dala_body">35 tons</option> <option value="array_load_type_trailers_dala_body">36 tons</option> <option value="array_load_type_trailers_dala_body">37 tons</option> <option value="array_load_type_trailers_dala_body">38 tons</option> <option value="array_load_type_trailers_dala_body">39 tons</option> <option value="array_load_type_trailers_dala_body">40 tons</option> <option value="array_load_type_trailers_dala_body">41 tons</option> <option value="array_load_type_trailers_dala_body">42 tons</option> <option value="array_load_type_trailers_dala_body">43 tons</option> <option value="array_load_type_trailers_flat_bed">16 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">16 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">17 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">17 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">18 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">18 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">19 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">19 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">21 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">21 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">22 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">22 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">23 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">23 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">24 tons 19 feet</option> <option value="array_load_type_trailers_flat_bed">24 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">25 tons 29 feet</option> <option value="array_load_type_trailers_flat_bed">25 tons 34 feet</option> <option value="array_load_type_trailers_flat_bed">25 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">26 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">27 tons 21 feet</option> <option value="array_load_type_trailers_flat_bed">27 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">28 tons 35 feet</option> <option value="array_load_type_trailers_flat_bed">28 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">29 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">29 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">30 tons 30 feet</option> <option value="array_load_type_trailers_flat_bed">30 tons 35 feet</option> <option value="array_load_type_trailers_flat_bed">30 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">30 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">31 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">31 tons 42 feet</option> <option value="array_load_type_trailers_flat_bed">32 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">33 tons 35 feet</option> <option value="array_load_type_trailers_flat_bed">33 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">33 tons 39 feet</option> <option value="array_load_type_trailers_flat_bed">33 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">33 tons 41 feet</option> <option value="array_load_type_trailers_flat_bed">34 tons 20 feet</option> <option value="array_load_type_trailers_flat_bed">34 tons 35 feet</option> <option value="array_load_type_trailers_flat_bed">34 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">34 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">34 tons 42 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 35 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 36 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 39 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 41 feet</option> <option value="array_load_type_trailers_flat_bed">35 tons 44 feet</option> <option value="array_load_type_trailers_flat_bed">40 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">40 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">40 tons 41 feet</option> <option value="array_load_type_trailers_flat_bed">40 tons 42 feet</option> <option value="array_load_type_trailers_flat_bed">40 tons 43 feet</option> <option value="array_load_type_trailers_flat_bed">41 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">42 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">42 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">42 tons 42 feet</option> <option value="array_load_type_trailers_flat_bed">43 tons 32 feet</option> <option value="array_load_type_trailers_flat_bed">43 tons 38 feet</option> <option value="array_load_type_trailers_flat_bed">43 tons 40 feet</option> <option value="array_load_type_trailers_flat_bed">43 tons 42 feet</option> <option value="array_load_type_trailers_flat_bed">43 tons 43 feet</option> </select></div>'
				}
			},
			{
				"data": "rc_book", wrap: true, "mRender": function (data) {
					return '<div class="rc_book_view" onclick="onClickImagePreviw(\'' + data + '\')">View Insurence <img alt="profile" src="img/view_eye.png" width="15"></div>'
				}
			},
			{
				"data": "vehicle_insurance", wrap: true, "mRender": function (data) {
					return '<div class="vehicle_insurance_view" onclick="onClickImagePreviw(\'' + data + '\')" >View Insurence <img alt="profile" src="img/view_eye.png" width="15"> </div>'
				}
			},
			{ "data": null, title: 'Update', wrap: true, "render": function (data, type, row) { return '<div class="update-button"> <button type="button" truck_id="' + row.truck_id + '" value="0">Update</button></div>' } }
		]

	} else if (truckDetails == "DriverDetails") {
		data = jsonData.data.driverdetails
		columns = [
			{
				"data": "is_dl_verified", "mRender": function (data) {
					return '<div class="ratin_view"><img alt="profile" src="img/rating.png" width="10"> ' + data + '</div>'
				}
			},
			{ "data": "driver_name" },
			{ "data": "driver_number" },
			{
				"data": "alternate_ph_no", wrap: true, "mRender": function (data, type, row) {
					return '<div class="alternate_ph_view"><input type="tel" minlength="10" maxlength="10" pattern="[0][0-9]"  value="' + data + '" id="alternate_ph_no" name="alternate_ph_no"></div>'
				}
			},
			{
				"data": "dl_number", wrap: true, "mRender": function (data, type, row) {
					var isVerfied = "";
					if (row.is_dl_verified == 1) {
						isVerfied = "checked"
					}

					return '<div class="dl_number_view"><input type="text"  value="' + data + '" id="dl_number" name="dl_number"><input class="checkbox" type="checkbox" ' + isVerfied + '></div>'
				}
			},
			{ "data": null, title: 'Update', wrap: true, "render": function (data, type, row) { return '<div class="update-button"> <button type="button" driver_id="' + row.driver_id + '"  value="0">Update</button></div>' } }
		]

	}


	$.fn.dataTable.ext.errMode = 'none';
	var table = $('#' + truckDetails + 'Data').DataTable({
		pagination: "bootstrap",
		filter: true,
		data: data,
		destroy: true,
		lengthMenu: [5, 10, 25],
		pageLength: 10,
		"columns": columns,
		"initComplete": function (settings, json) {
			if (truckDetails == "TruckDetails") {
				$("#TruckDetails tbody > tr").each(function () {
					console.log($(this).find(".truck_type_view select").attr("id"))
					var truck_type = $(this).find(".truck_type_view select");
					var truck_load_type_view = $(this).find(".truck_load_type_view select").attr("id");
					$(truck_type).change(function () {
						if ($(this).data('options') === undefined) {
							/*Taking an array of all options-2 and kind of embedding it on the select1*/
							$(this).data('options', $('#' + truck_load_type_view + ' option').clone());
						}
						var id = $(this).val();
						var options = $(this).data('options').filter('[value=' + id + ']');
						$('#' + truck_load_type_view).html(options);
					});

				})




				$(".truck_type_view select > option").each(function () {
					var selectedVal = $(this).parent().attr("value")
					var currentTarget = this.text
					if (selectedVal == currentTarget) {
						$(this).attr("selected", "true")
						$(this).trigger("change");
					}
					// var truck_load_type_view = $(this).parent().parent().parent().next().find("select").attr("id");
					// console.log("............"+truck_load_type_view)
					// if ($(this).parent().data('options') === undefined) {
					// 	/*Taking an array of all options-2 and kind of embedding it on the select1*/
					// 	$(this).parent().data('options', $('#'+truck_load_type_view+' option').clone());
					//   }
					//   var id = $(this).parent().val();
					//   var options = $(this).parent().data('options').filter('[value=' + id + ']');
					//   $('#'+truck_load_type_view).html(options);

				});
				$(".truck_load_type_view select > option").each(function () {
					var selectedVal = $(this).parent().attr("value")
					var currentTarget = this.text
					if (selectedVal == currentTarget) {
						$(this).attr("selected", "true")
					}
				});
			}
			removeShowEntriesInDatatable()
			editPath = []

			//Personal Details
			var tr = "#PersonalDetailsData tbody tr"
			$(tr+" td:eq(4) input").change("propertychange", function() {
				editPath.push("Alternate Number")
			});

			
			$(tr+" td:eq(5) input").change("propertychange", function() {
				editPath.push("Email")
			});
			$(tr+" td:eq(10) input:eq(0)").change("propertychange", function() {
				editPath.push("KYC Adhar")
			});
			$(tr).find("td:eq(10) input:eq(1)").change(function() {
				var isChecked = $(this).is(':checked')
				if(isChecked){
					editPath.push("KYC Adhar Verified")
				}else{
					editPath.push("KYC Adhar Unverified")
				}
			  });
			  $(tr+" td:eq(11) input:eq(0)").change("propertychange", function() {
				editPath.push("KYC Pan")
			});
			$(tr).find("td:eq(11) input:eq(1)").change(function() {
				var isChecked = $(this).is(':checked')
				if(isChecked){
					editPath.push("KYC Pan Verified")
				}else{
					editPath.push("KYC Pan Unverified")
				}
			  });

			  //Firmn Details
			var tr = "#FirmDetailsData tbody tr"
			$(tr+" td:eq(2) input").change("propertychange", function() {
				editPath.push("GST Number")
			});
			$(tr+" td:eq(3) input").change("propertychange", function() {
				editPath.push("PAN Number")
			});

			
			  //Bank Details
			  var tr = "#BankDetailsData tbody tr"
			  $(tr+" td:eq(0) input").change("propertychange", function() {
				  editPath.push("Bank Name")
			  });
			  $(tr+" td:eq(1) input").change("propertychange", function() {
				  editPath.push("A/C Number")
			  });
			  $(tr+" td:eq(2) input").change("propertychange", function() {
				editPath.push("IFCI Code")
			});
			//Truck Details
			var tr = "#TruckDetailsData tbody tr"
			$(tr+" td:eq(0) input").change("propertychange", function() {
				editPath.push("Vehicle Number")
			});
			$( tr+" td:eq(1) select" ).change(function() {
				editPath.push("Body Type")
			  });
			  $( tr+" td:eq(2) select" ).change(function() {
				editPath.push("Load Type")
			});

			//Driver Details
			var tr = "#DriverDetailsData tbody tr"
			$(tr+" td:eq(3) input").change("propertychange", function() {
				editPath.push("Alternate Number")
			});
			$( tr+" td:eq(4) input:eq(0)").change("propertychange", function() {
				editPath.push("Driver License")
			  });

			  $(tr).find("td:eq(4) input:eq(1)").change(function() {
				var isChecked = $(this).is(':checked')
				if(isChecked){
					editPath.push("Driver License Verified")
				}else{
					editPath.push("Driver License Unverified")
				}
			  });

		}
	});





}
// $(window).on('load', function(){ 
// 	console.log($( "#truck_type_view select" ).html())
// });




// function setTruckType(){
// 	alert("how are you");  

// 	console.log($(ele).html())
// 	//return "slected"
// }

$('body').on('click', '#PersonalDetailsData tbody .update-button button', function () {
	var tr = $(this).parents('tr')
	var user_id = $(this).attr("user_id")

	var alternatePh = tr.find("td:eq(4) input").val();
	var email = tr.find("td:eq(5) input").val();
	var adhar = tr.find("td:eq(10) input:eq(0)").val();
	var adharVerified = tr.find("td:eq(10) input:eq(1)")[0].checked
	var pan = tr.find("td:eq(11) input:eq(0)").val();
	var panVerified = tr.find("td:eq(11) input:eq(1)")[0].checked
	//console.log(tr.find("td:eq(11) input:eq(1)")[0].checked)
	var data = JSON.stringify({
		"alternate_ph_no": parseInt(alternatePh),
		"email_id": email,
		"aadhaar_number": adhar,
		"pan_number": pan,
		"is_Addhar_verfied": adharVerified ? 1 : 0,
		"is_pan_verfied": panVerified ? 1 : 0,
		"isActiveClick": 0
	})

	var settings = {
		"url": BASE_URL + "adminWeb/truckownersByUserId/" + user_id,
		"method": "PUT",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": data
	};

	$.ajax(settings).done(function (response) {
		alert("Updated successfully.")
		console.log(editPath)
		createLogs("Profiles/"+userTypePath+"/Personal Details", editPath)
		editPath = []
	});

});




$('body').on('click', '#PersonalDetailsData tbody .active-button button, #TruckDetailsData tbody .active-button button', function () {
	var text = $(this).text()
	var user_id = $(this).attr("user_id")
	var isActive = 0
	if (text == "Active") {
		$(this).text("Deactive")
		isActive = 0
	} else {
		$(this).text("Active")
		isActive = 1
	}


	var data = JSON.stringify({
		"is_account_active": isActive,
		"isActiveClick": 1
	})


	var settings = {
		"url": BASE_URL + "adminWeb/truckownersByUserId/" + user_id,
		"method": "PUT",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": data
	};

	$.ajax(settings).done(function (response) {

		alert("Updated successfully.")
		editPath = []
		editPath.push("Active Button")
		createLogs("Profiles/"+userTypePath+"/Personal Details", editPath)
		editPath = []
	});

});





$('body').on('click', '#PersonalDetailsData tbody .delete-button button, #TruckDetailsData  tbody .delete-button button', function () {
	let text = "Are you sure do you want delete account";

	if (confirm(text) == true) {

	} else {
		return;
	}
	var user_id = $(this).attr("user_id")
	var truckListpage = $(this).attr("truckListpage")
	var settings = {
		"url": BASE_URL + "adminWeb/truckownersByUserId/" + user_id,
		"method": "DELETE",
		"timeout": 0,
	};

	$.ajax(settings).done(function (response) {
		alert("Deleted successfully.")
		if (truckListpage == "true") {
			//location.reload();
			allTruckList();
		} else {
			location.replace(document.referrer);

		}
	});
});




$('body').on('click', '#FirmDetailsData tbody .update-button button', function () {
	var tr = $(this).parents('tr')
	var company_id = $(this).attr("company_id")

	var gstNumber = tr.find("td:eq(2) input").val();
	var panNumber = tr.find("td:eq(3) input").val();

	var data = JSON.stringify({
		"company_gst_no": gstNumber,
		"company_pan": panNumber
	})

	var settings = {
		"url": BASE_URL + "adminWeb/truckowners/companyDetails/" + company_id,
		"method": "PUT",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": data
	};

	$.ajax(settings).done(function (response) {
		alert("Updated successfully.")
		console.log(editPath)
		createLogs("Profiles/"+userTypePath+"/Firm Details", editPath)
		editPath = []
	});

});

$('body').on('click', '#BankDetailsData tbody .update-button button', function () {
	var tr = $(this).parents('tr')
	var bankId = $(this).attr("bank_id")

	var bankName = tr.find("td:eq(0) input").val();
	var accountNumber = tr.find("td:eq(1) input").val();
	var IFSICODE = tr.find("td:eq(2) input").val();

	var data = JSON.stringify({
		"bank_name": bankName,
		"account_number": accountNumber,
		"IFSI_CODE": IFSICODE
	})

	var settings = {
		"url": BASE_URL + "adminWeb/truckowners/bankDetails?bankId=" + bankId,
		"method": "PUT",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": data
	};

	$.ajax(settings).done(function (response) {
		alert("Updated successfully.")
		console.log(editPath)
		createLogs("Profiles/"+userTypePath+"/Bank Details", editPath)
		editPath = []
	});

});

$('body').on('click', '#TruckDetailsData tbody .update-button button', function () {
	var tr = $(this).parents('tr')
	var truckId = $(this).attr("truck_id")

	var vehicleNo = tr.find("td:eq(0) input").val();
	var truckType = tr.find("td:eq(1) select :selected").text();
	var truckCarryingCapacity = tr.find("td:eq(2) select :selected").text();




	var data = JSON.stringify({
		"vehicle_no": vehicleNo,
		"truck_type": truckType,
		"truck_carrying_capacity": truckCarryingCapacity
	})

	//console.log("data..........", data);

	var settings = {
		"url": BASE_URL + "adminWeb/truckowners/TruckDetails/td/td?truckId=" + truckId,
		"method": "PUT",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": data
	};

	$.ajax(settings).done(function (response) {
		alert("Updated successfully.")
		console.log(editPath)
		createLogs("Profiles/"+userTypePath+"/Truck Details", editPath)
		editPath = []
	});

});
$('body').on('click', '#DriverDetailsData tbody .update-button button', function () {
	var tr = $(this).parents('tr')
	var driverId = $(this).attr("driver_id")

	var alternatePhNo = tr.find("td:eq(3) input").val();
	var dlNumber = tr.find("td:eq(4) input:eq(0)").val();
	var isDlVerified = tr.find("td:eq(4) input:eq(1)")[0].checked;



	var data = JSON.stringify({
		"alternate_ph_no": alternatePhNo,
		"dl_number": dlNumber,
		"is_dl_verified": isDlVerified
	})

	var settings = {
		"url": BASE_URL + "adminWeb/truckowners/driverDetails/dl?driverId=" + driverId,
		"method": "PUT",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": data
	};

	$.ajax(settings).done(function (response) {
		alert("Updated successfully.")
		console.log(editPath)
		createLogs("Profiles/"+userTypePath+"/Driver Details", editPath)
		editPath = []
	});

});





$(document).on("click", "#addFirmDetails", function () {
	$('.formsubmit').trigger("reset");
	$("#firmDetails").modal("toggle");
})

$(document).on("click", "#addBankDetails", function () {
	$('.formsubmit').trigger("reset");
	$("#bankDetails").modal("toggle");
})

$(document).on("click", "#addTruckDetails", function () {
	$('.formsubmit').trigger("reset");
	$("#truckDetails").modal("toggle");
})

$(document).on("click", "#addDriverDetails", function () {
	$('.formsubmit').trigger("reset");
	$("#driverDetails").modal("toggle");
})

$(document).on("click", ".uploadImageBtn", function () {
		$('.formsubmit').trigger("reset");
		$('#blah').attr('src', "img/place_holder.png");
		$('.custom-file-label').text("Choose file");
		$(".alert").removeClass("loading").hide();
	var imageType = $(this).attr("alt")
	$("#uploadImage").attr("data", imageType);
	$("#uploadImage").find(".modal-title").text("Upload "+imageType)
	$("#uploadImage").modal("toggle");
})



//FirtmDetails
function onFirmDetailsSubmit(form) {
	var data = new FormData(form)
	var form = Array.from(data.entries())
	var object = {};
	for (const [name, value] of form) {
		//console.log({ name, value })
		object[name] = value
	}

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var userId = urlParams.get('userId')

	object["user_id"] = userId
	//console.log( object );

	addFirm(object)
	return false; //don't submit
}


function addFirm(object) {
	var settings = {
		"url": BASE_URL + "company/create",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(object),
	};

	$.ajax(settings).done(function (response) {
		//console.log(response);

		if (response.Success == 0) {
			alert(response.Message)
		} else {
			$('.truckownerTab button').removeClass("active");
			$("#firmDetails").modal("toggle");
			$('#firmClick').trigger("onclick");
			$('#firmClick').addClass("active");
			$('#profileClick').removeClass("active");
		}

	});
}


//Bank Details
function onBankDetailsSubmit(form) {
	var data = new FormData(form)
	var form = Array.from(data.entries())
	var object = {};
	for (const [name, value] of form) {
		//console.log({ name, value })
		object[name] = value
	}

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var userId = urlParams.get('userId')

	object["user_id"] = userId
	//console.log( object );

	addBank(object)
	return false; //don't submit
}


function addBank(object) {
	var settings = {
		"url": BASE_URL + "bank/createBkAcc",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(object),
	};

	$.ajax(settings).done(function (response) {
		//console.log(response);

		if (response.Success == 0) {
			alert(response.Message)
		} else {
			$('.truckownerTab button').removeClass("active");
			$("#bankDetails").modal("toggle");
			$('#bankClick').trigger("onclick");
			$('#bankClick').addClass("active");
			$('#profileClick').removeClass("active");
		}

	});
}



//Truck Details
function onTruckDetailsSubmit(form) {
	var data = new FormData(form)
	var form = Array.from(data.entries())
	var object = {};
	for (const [name, value] of form) {
		console.log({ name, value })
		if (name == "truck_type") {
			var truck_type = $('#truck_type :selected').text();
			object[name] = truck_type
		} else if (name == "truck_carrying_capacity") {
			var truck_carrying_capacity = $('#truck_carrying_capacity :selected').text();
			object[name] = truck_carrying_capacity
		} else {
			object[name] = value
		}

	}
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var userId = urlParams.get('userId')

	object["user_id"] = userId
	//console.log( object );
	addTruck(object)
	return false; //don't submit
}


function addTruck(object) {
	var settings = {
		"url": BASE_URL + "truck/addtruck",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(object),
	};

	$.ajax(settings).done(function (response) {
		//console.log(response);

		if (response.Success == 0) {
			alert(response.Message)
		} else {
			$('.truckownerTab button').removeClass("active");
			$("#truckDetails").modal("toggle");
			$('#truckClick').trigger("onclick");
			$('#truckClick').addClass("active");
			$('#profileClick').removeClass("active");
		}

	});
}

//driver Details
function onDriverDetailsSubmit(form) {
	var data = new FormData(form)
	var form = Array.from(data.entries())
	var object = {};
	for (const [name, value] of form) {
		//console.log({ name, value })
		object[name] = value
	}

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var userId = urlParams.get('userId')

	object["user_id"] = userId
	//console.log( object );
	addDriver(object)
	return false; //don't submit
}


function addDriver(object) {
	var settings = {
		"url": BASE_URL + "driver/addDriver",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(object),
	};

	$.ajax(settings).done(function (response) {
		//console.log(response);

		if (response.Success == 0) {
			alert(response.Message)
		} else {
			$('.truckownerTab button').removeClass("active");
			$("#driverDetails").modal("toggle");
			$('#driverClick').trigger("onclick");
			$('#driverClick').addClass("active");
			$('#profileClick').removeClass("active");

		}
	});
}


$("#truck_type").change(function () {
	if ($(this).data('options') === undefined) {
		/*Taking an array of all options-2 and kind of embedding it on the select1*/
		$(this).data('options', $('#truck_carrying_capacity option').clone());
	}
	var id = $(this).val();
	var options = $(this).data('options').filter('[value=' + id + ']');
	$('#truck_carrying_capacity').html(options);
});



function onClickImagePreviw(image) {
	//alert(image)
	$("#imagePreview img").attr("src", "");
	$("#imagePreview img").attr("src", image);
	$("#imagePreview").modal("toggle");
}
//$("#imagePreview").modal("toggle");



//Upload Images
$("#inputGroupFile01").change(function (event) {
	RecurFadeIn();
	readURL(this);
});
$("#inputGroupFile01").on('click', function (event) {
	RecurFadeIn();
});
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		var filename = $("#inputGroupFile01").val();
		filename = filename.substring(filename.lastIndexOf('\\') + 1);
		reader.onload = function (e) {
			$('#blah').attr('src', e.target.result);
			$('#blah').hide();
			$('#blah').fadeIn(500);
			$('.custom-file-label').text(filename);
		}
		reader.readAsDataURL(input.files[0]);
	}
	$(".alert").removeClass("loading").hide();
}
function RecurFadeIn() {
	console.log('ran');
	FadeInAlert("Wait for it...");
}
function FadeInAlert(text) {
	$(".alert").show();
	$(".alert").text(text).addClass("loading");
}
$("#uploadImageSubmit").on('click', function (event) {
	var imageType = $("#uploadImage").attr("data");
	var file_data = $('#inputGroupFile01').prop('files')[0];
	if (file_data == null) {
		alert("Please upload kyc details")
		return;
	}
	RecurFadeIn()
	var form_data = new FormData();
	form_data.append('file', file_data);
	var form = new FormData();
	form.append("file", file_data);

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var userId = urlParams.get('userId')

	var settings = {
		"url": BASE_URL + "imgbucket/creatImg",
		"method": "POST",
		"timeout": 0,
		"headers": {
		  "Content-Type": "application/json"
		},
		"data": JSON.stringify({
		  "user_id": userId,
		  "image_type": imageType,
		  "image_url": ""
		}),
	  };
	  
	  $.ajax(settings).done(function (response) {
			settings = {
				"url": BASE_URL + "imgbucket/updateImage/"+userId+"/"+imageType,
				"method": "PATCH",
				"timeout": 0,
				"processData": false,
				"mimeType": "multipart/form-data",
				"contentType": false,
				"data": form
			};
		
			$.ajax(settings).done(function (response) {
				console.log(response);
				$("#uploadImage").modal("toggle");
				getAllDetails();
		
			});
	  });

	

});
