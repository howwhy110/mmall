//在body上绑定scroll事件切换顶部样式
$(document).scroll(function () {
	var topheader=$(".top_header");
	var inner=$(".header_inner");
	var headleft=$(".headerLeft");
	var logo=$(".logo");
	var block=$(".moving_block");
	var headerRight=$(".headerRight");
	var drop=$(".dropItem");
	if ($(document).scrollTop() > 0) {
		topheader.addClass("top_header_thin")
		inner.addClass("header_inner_thin")
		headleft.addClass("headerLeft_thin")
		logo.addClass("logo_thin")
		headleft.addClass("headerLeft_thin")
		block.addClass("moving_block_thin")
		headerRight.addClass("headerRight_thin")
		drop.removeClass("dropItem_b")
	}
	if ($(document).scrollTop() == 0) {
		topheader.removeClass("top_header_thin")
		inner.removeClass("header_inner_thin")
		headleft.removeClass("headerLeft_thin")
		logo.removeClass("logo_thin")
		headleft.removeClass("headerLeft_thin")
		block.removeClass("moving_block_thin")
		headerRight.removeClass("headerRight_thin")
		drop.addClass("dropItem_b")
	}
})
$(".dropList").mouseover(function () {
	var len = $(this).children().last().children().length;

	$(this).children().last().css({
		height: `${len*50}px`
	})

}).mouseout(function () {
	$(this).children().last().css({
		height: "0"
	})
})
$(document).scroll(function () {
	// console.log($(document).scrollTop());
	if ($(document).scrollTop() > 750) {
		$(".containerHead").addClass("chFix")
	} else if ($(document).scrollTop() < 750) {
		$(".containerHead").removeClass("chFix")
	}
})
$(".faqPart").click(function () {
	var text = $(this).children().last();
	if (text.css("display") == "none") {
		text.css({
			display: "block"
		})
	} else {
		text.css({
			display: "none"
		})
	}
});
//通过pid 获取对应产品图片
$(document).ready(function(){
	if(location.search!==""){
		var pid=location.search.split("=")[1];
		// console.log(pid);
		$.ajax({
			url:"http://127.0.0.1:3000/product/",
			type:"get",
			data:{pid},
			dataType:"json",
			success:function(result){
				// console.log(result);
				var html="";
				for(var pic of result){
					html+=`<img src="${pic.img_sm}" data-lg="${pic.img_lg}">`;
				}
				//将整段html填充到imgsm中
				var $imgsm=$("#imgsm");
				//定义变量保存每个img得宽度，反复使用
				var imgWidth=93;
				//根据图片张树计算div得宽，张数*图片宽度
				$imgsm.html(html).css("width",result.length*imgWidth);
				
				var $imglg=$("#imglg");
				$imglg.attr("src",result[0].img_lg);
				var $fdjImg=$("#fdjImg");
				$fdjImg.css("background-image",`url(${result[0].img_lg})`);
				// $fdjImg.attr("src",result[0].img_lg);
				var btnLeft=$("#btnLeft");
				var btnRight=$("#btnRight");
				//如果图片数量<=4张则一开始就禁用右边按钮
				// if(result.length<=4){
				// 	$btnRight.addClass("disabled");
				// }
				var times=0;
				btnRight.click(function(){
					if(!btnRight.is(".disabled")){
						times++;
						$("#imgsm").css("margin-left",-times*imgWidth);
						btnLeft.removeClass("disabled");
						if(times==result.length-1){
							btnRight.addClass("disabled");
						}
					}
				});
				btnLeft.click(function(){
					if(!btnLeft.is(".disabled")){
						times--;
						$("#imgsm").css("margin-left",-times*imgWidth);
						btnRight.removeClass("disabled");
						if(times==0){
							btnLeft.addClass("disabled");
						}
					}
				});
				//鼠标移动到小图上切换大图的图片
				
				$imgsm.on("mouseenter","img",function(){
					console.log("1");
					//获得当前图片
					//获得当前图片的data-lg属性
					//将data-lg属性赋值给#imglg的src
					$imglg.attr("src",$(this).attr("data-lg"));
					$fdjImg.css("background-image",`url(${$(this).attr("data-lg")})`);
					// $fdjImg.attr("src",$(this).attr("data-lg"));

				});
				var $mask=$("#mask");
				var $spmask=$(".super-mask");
				var mx=300;
				var my=208;
				var smx=600;
				var smy=416;
				$spmask.hover(function(){
					// $(".fdj").removeClass("m-none")
					$mask.toggle("m-none");
					$(".fdj").toggle("m-none");
				})
				//让遮罩层跟随鼠标移动
				.mousemove(function(e){
					var top=e.offsetY-my/2;
					var left=e.offsetX-mx/2;
					if(top<0){
						top=0;
					}else if(top>smy-my){
						top=smy-my;
					}
					if(left<0){
						left=0;
					}else if(left>smx-mx){
						left=smx-mx;
					}
					$mask.css({left:left+"px",top:top+"px"});
					console.log(left+"px",top+"px");
					// var fdjx=left*(1200-400);
					// var fdjy=top*(832-278);
					$fdjImg.css("background-position",`${-left*2.5}px ${-top*2.5}px`);
					// console.log(-left*fdjImg.offsetWidth-$(".fdj").offsetWidth, -top*fdjImg.offsetHeight-$(".fdj").offsetHeight);
				})
				
			}
		})
		
	}
});
//通过产品id获取右边表文字
$(document).ready(function(){
	if(location.serarh!==""){
		var pid=location.search.split("=")[1];
		$.ajax({
			url:"http://127.0.0.1:3000/product/text",
			type:"get",
			data:{pid},
			datatype:"JSON",
			success:function(result){
				// console.log(result);
				var html="";
				for(var text of result){
					html+=` 
					<h1>${text.title}</h1>
					<div class="subTitle">${text.subTitle}</div>
					<div class="productInfo">
						<div class="infoRow">
							<label for="">市场价</label>
							<div class="crossLine">
								￥<span>${text.oprice.toFixed(2)}</span>
							</div>
						</div>
						<div class="infoRow">
							<label for="">价格</label>
							<div class="boldPrice">
								￥<span>${text.price.toFixed(2)}</span>
							</div>
						</div>
						<div class="infoList">
							<label for="">型号</label>
							<div>
								<span>类红轴</span>
							</div>
						</div>
						<div class="infoRow">
							<label for="">数量</label>
							<div class="number">
								<button>-</button>
								<input type="text" value="1">
								<button>+</button>
							</div>
						</div>
					</div>
					<div class="addCart">
						<span class="iconfont icon-ai-cart"></span>
						<span>关注此商品</span>
						<span>xx人已关注</span>
					</div>
				`;
			}
			$("#rText").html(html);
			
			}

		});
	}
});





//获取右边推荐列表
$(document).ready(function () {
	$.ajax({
		url: "http://127.0.0.1:3000/product/pro2",
		type: "get",
		datatype: "JSON",
		success: function (result) {
			// var arr=JSON.parse(result);
			// console.log(result);
			var html = "";
			for (var i = 0; i < result.length; i++) {
				html += ` 
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
			setTimeout(function () {
				$('.newList').css({
					top: 0,
					opacity: 1
				})
			}, 100)
		}
	});
});