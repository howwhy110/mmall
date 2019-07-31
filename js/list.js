$(document).ready(function(){
	// if(location.serarh!==""){
	// 	var lid=location.search.split("=")[1];
	// }
	$.ajax({
		url:"http://127.0.0.1:3000/product/pro",
		type:"get",
		datatype:"JSON",
		success:function(result){
			// var arr=JSON.parse(result);
			console.log(result);
			var html="";
			for(var i=0;i<result.length;i++){
				html+=` 
				<a href="http://127.0.0.1:3000/details.html?pid=${result[i].pid}" target="_black" title="${result[i].title}" class="listItem newList" style="transition:all ${(i+1)*300}ms ease;">
			<div class="listWarp">
				<div class="lwTop">
					<img src="../img/product/keyboradlist/${result[i].pic}">
				</div>
				<span class="iconfont icon-shandian-shi">现货</span>
				
				<div class="lwBottom">
					<p class="mainTitle">${result[i].title}</p>
					<p class="subTitle">${result[i].subTitle}</p>
					<p class="price">
						<span>${result[i].price}元</span>
					</p>
				</div>
			</div>
		</a>
			`;
		}
		$("#load_list").html(html);
		setTimeout(function(){$('.newList').css({top:0,opacity:1})},100)
		}
	});
});
var start=0;

// $("#loadMore").click(function(){
	var h=325;
	var times=1;
$(document).scroll(function(){
	setTimeout(function(){
	console.log(h);
	console.log(times);
	if($(document).scrollTop()>h*times){
		start+=5;
		$.ajax({
			url:"http://127.0.0.1:3000/product/more?start="+start,
			type:"get",
			datatype:"JSON",
			success:function(result){
				var html="";
				for(var i=0;i<result.length;i++){
					html+=` 
						<a href="http://127.0.0.1:3000/details.html?pid=${result[i].pid}" target="_black" title="${result[i].title}" class="listItem newList" style="transition:all ${(i+1)*300}ms ease;">
					<div class="listWarp">
						<div class="lwTop">
							<img src="../img/product/keyboradlist/${result[i].pic}">
						</div>
						<span class="iconfont icon-shandian-shi">现货</span>
						
						<div class="lwBottom">
							<p class="mainTitle">${result[i].title}</p>
							<p class="subTitle">${result[i].subTitle}</p>
							<p class="price">
								<span>${result[i].price}元</span>
							</p>
						</div>
					</div>
				</a>
					`;
					// $('.list-con  .newList').css('transition',`top ${i*200}ms linear`)
				}
			
				// var h=$("#load_list").html()+html;
				$("#load_list").append(html);
				setTimeout(function(){$('.newList').css({top:0,opacity:1})},100);
			}
		
		});
		times++;
		if(times==5){
			$("#loadMore").html("没有更多了");
		}
	}
},300);
});
	

























//导航栏鼠标滑过显示下拉栏
$(".dropList").mouseover(function(){
	var len=$(this).children().last().children().length;
	
	$(this).children().last().css({
		height:`${len*50}px`
	})
	
}).mouseout(function(){
	$(this).children().last().css({
		height:"0"
	})
})