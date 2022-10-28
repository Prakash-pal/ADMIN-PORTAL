var BASE_URL= "http://13.234.163.179:3000/";


$(document).ready(function(){
	  $("#signIn").click(function(){
		var userName = $("#userName").val().trim()
		var password = $("#passWord").val().trim()
		if(userName =="" || password ==""){
			swal({ 
				title: "Please enter User name and Password", 
				type: "warning" 
			});
			return;
		}else{
			var settings = {
				"url": BASE_URL+"admin/adminLogin/"+userName+"/"+password,
				"method": "GET",
				"timeout": 0,
			  };
			  
			  $.ajax(settings).done(function (response) {
				console.log(response);
				if(response.Success == 0){
					swal({ 
						title: response.Message, 
						type: "error" 
					});
				}else{
					if(response.data!=null){
						localStorage.setItem("USERNAME", response.data[0].admin_user_name);
						localStorage.setItem("IS_SUPER_ADMIN", response.data[0].is_super_admin);
						window.location.replace("/dashboard");
					}
				
				}
			  });
		}
	  });
});
