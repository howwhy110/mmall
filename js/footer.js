$(function(){
	$.ajax({
		url:"footer.html",
		type:"get",
		success:function(result){
			// console.log(result);
			$(result).replaceAll("footer");
			$(`<link rel="stylesheet" type="text/css" href="../css/footer.css">`).appendTo("head");
		}
	})
})