var BASE_URL= "http://13.234.163.179:3000/";
//var BASE_URL= "http://localhost:3000/";

$(document).ready(function(){
	// var element = $('meta[name="active-menu"]').attr('content');
	// $('#' + element).addClass('active');
	// console.log(element)
	var userName = localStorage.getItem("USERNAME");
	console.log(userName)
	if(userName !=null && userName !=""){
		//move
		$('.top-bar p span').text(userName)
	}else{
		$(".top-bar, .navbar-container, .section-container").remove()
		window.location.replace("/");
		return;
	}
	

	$("#logout").click(function(){
		swal({
			title: "Logout",
			text: "Are you sure you want to log out?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5bc0de",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			closeOnConfirm: false,
			closeOnCancel: true 
		},
		function(isConfirm) {
			if (isConfirm) {
				localStorage.clear();
				window.location.replace("/");
			}
		}
	);


	});
	$(".navlist .navlist-head").click(function(){
		//console.log("menu.....",$(this).text())
		$(".navlist .navlist-head").removeClass('active');
		$(".navlist .sub-navlist").hide();
		$(this).addClass('active');
		$(this).next( ".sub-navlist" ).show();
		
	  });
	  $("#menuBtn").click(function(){
		$(".navbar-container").toggleClass("open");
	  });

	  var isAdminRoll = localStorage.getItem("IS_SUPER_ADMIN");
	  if(isAdminRoll ==1){
		$("#manageUser").show();
		$("#userLogs").show();
	  }else{
		$("#manageUser").hide();
		$("#userLogs").hide();
		var path = window.location.pathname
		if(path=="/userLogs" || path=="/manageUsers"){
			window.location.replace("/dashboard");
		}
		console.log(window.location.pathname)
	  }
});
function convertDate(d) {
	const date = new Date(d);

	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();
  
	var mmChars = mm.split('');
	var ddChars = dd.split('');
  
	return yyyy+'-'+(mmChars[1]?mm:"0"+mmChars[0])+'-'+(ddChars[1]?dd:"0"+ddChars[0]);
  }

  function camelcaseToSentence(text){
	var result = text.replace( /([A-Z])/g, " $1" );
	var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
	if(finalResult =="End"){
		return finalResult+"ed"
	}
	return finalResult;
}



function removeShowEntriesInDatatable(){
	$('.dataTables_length label').each(function () {
		// Confused here
		$(this).contents().filter(function () {
			return this.nodeType === 3 && $.trim(this.nodeValue).length;
		}).replaceWith('');
	});
	$('.dataTables_length label select').before('Show: ');

}

function alert(msg){
	console.log(msg)
	swal({ 
		title: msg
	});
}
$(document).on('click', ".top-bar .dropdown", function() {
    $(this).toggleClass("open")     
});



// $(document).on('click', ".top-bar", function() {
//     $(this).toggleClass("open")     
// });


// $("#profileDropdown").click(function(){
// 	$("#profileDropdown").toggleClass("open")
// });

function createLogs(path, createLogs){
	if(createLogs.length==0){
		return;
	}
	let edit_field_descip = createLogs.join(",");

	var userName = localStorage.getItem("USERNAME");
	var isAdminRoll = localStorage.getItem("IS_SUPER_ADMIN");
	//var path = window.location.pathname

	var settings = {
		"url": BASE_URL+"admin/createLog",
		"method": "POST",
		"timeout": 0,
		"headers": {
		  "Content-Type": "application/json"
		},
		"data": JSON.stringify({
		  "admin_user_name":userName,
		  "role": isAdminRoll,
		  "edit_section_path": path,
		  "edit_field_descip": edit_field_descip
		}),
	  };
	  
	  $.ajax(settings).done(function (response) {
		console.log(response);
	  });
}