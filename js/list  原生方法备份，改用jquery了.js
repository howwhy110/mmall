function list(){
	var xhr=new XMLHttpRequest();
	xhr.open("get","http://127.0.0.1:3000/product/pro");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result=xhr.responseText;
			var arr=JSON.parse(result);
			var html="";
			for(var i=0;i<arr.length;i++){
				html+=` 
				<a href="javascript:;" target="_black" title="" class="listItem">
			<div class="listWarp">
				<div class="lwTop">
					<img src="../img/product/keyboradlist/${arr[i].pic}">
				</div>
				<span class="iconfont icon-shandian-shi">现货</span>
				
				<div class="lwBottom">
					<p class="mainTitle">${arr[i].title}</p>
					<p class="subTitle">${arr[i].subTitle}</p>
					<p class="price">
						<span>${arr[i].price}元</span>
					</p>
				</div>
			</div>
		</a>
			`;
		}
		load_list.innerHTML=html;
		console.log(arr)
		}
	}
		xhr.send();
}
var start=0;
function loadMore(){
	start+=5;
var xhr=new XMLHttpRequest();
xhr.open('get','http://127.0.0.1:3000/product/more?start='+start);
xhr.onreadystatechange=function(){
	if(xhr.readyState==4&&xhr.status==200){
		var result=xhr.responseText;
		var arr=JSON.parse(result);
		var html='';
		for(var i=0;i<arr.length;i++){
			html+=` 
				<a href="javascript:;" target="_black" title="" class="listItem">
			<div class="listWarp">
				<div class="lwTop">
					<img src="../img/product/keyboradlist/${arr[i].pic}">
				</div>
				<span class="iconfont icon-shandian-shi">现货</span>
				
				<div class="lwBottom">
					<p class="mainTitle">${arr[i].title}</p>
					<p class="subTitle">${arr[i].subTitle}</p>
					<p class="price">
						<span>${arr[i].price}元</span>
					</p>
				</div>
			</div>
		</a>
			`;
		}
		var h=load_list.innerHTML+=html;
		load_list.innerHTML=h;
		console.log(arr)
		}
	}
xhr.send();
}
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