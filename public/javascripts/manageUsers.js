allUsers();

$('.dataTables_length label select').remove();

function allUsers(){
	$("#user_details").empty()
	var settings = {
		"url": BASE_URL+"admin/adminUsers",
		"method": "GET",
	  };
	  
	  $.ajax(settings).done(function (response) {
		var data = response.data
		for(var i=0; i<data.length;i++){
			var obj = data[i]
			var email = (obj.email_id!=null)?(" - "+obj.email_id):""
			$("#user_details").append("<option value="+obj.user_id+">"+obj.admin_user_name+email+"</option>")

		}
		//setDataToTable(response);
	  });
}

$("#Delete").click(function () {
	var email =$( "#user_details option:selected" ).val()
	var settings = {
		"url": "http://13.234.163.179:3000/admin/deleteUser/"+email,
		"method": "DELETE",
		"timeout": 0,
	  };
	  
	  $.ajax(settings).done(function (response) {
		alert(response.Message);
		if(response.Success==1){
			allUsers()
		}
	  });
	
});
function onCreateAdmin(form){
	var data = new FormData(form)
	var form = Array.from(data.entries())
	var object = {};
	for (const [name, value] of form) {
		//console.log({ name, value })
		object[name] = value
	}
	object["is_super_admin"]=0
	var settings = {
		"url": BASE_URL+"admin/creatAdmin",
		"method": "POST",
		"timeout": 0,
		"headers": {
		  "Content-Type": "application/json"
		},
		"data":  JSON.stringify(object),
	  };

	  console.log(object);
	  
	  $.ajax(settings).done(function (response) {
		$('.formsubmit').trigger("reset");
		alert(response.Message)
		console.log(response);
		if(response.Success==1){
			allUsers()
		}
		
		
	  })
	  .fail(function(response) {
		alert(response.responseJSON.error);
	  });
	  return false;
}


	  
