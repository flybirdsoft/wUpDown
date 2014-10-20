/*
编写：邬畏畏 
write by :wu wei wei 


*/

var wUpDown=function(p,options){
	this.parent=$(p);
	this.parentName=p;
	this.options=options;
	this.min=options.min||0;
	this.max=options.max||10;
	this.value=options.value||0;
	this.step=options.step||1;
	this.onError=function(){};/*文本框onkeydonw中调用此函数*/
	var html='<div id="{wUpDown}" class="wUpDown" style="overflow:hidden;"><div class="wContent" style="float:left;width:85%;overflow:hidden;position:relative;">{input}<div id="wValue" class="wValue" style="position:absolute;top:0;left:0;display:none;">{00}</div></div><div class="wBtn" style="float:right;width:14%;">{btnHtml}</div></div>';
	var input = '<input type="text" style="width:96%;height:100%;border:none;outline:none;margin:0" name="{wInput}" value="{0}"/>';
	var btnHtml='<div class="wUpBtn" style="cursor:pointer">{+}</div><div class="wDownBtn" style="cursor:pointer">{-}</div>';
	var innerHTML =html.replace("{input}",input);
	innerHTML =innerHTML.replace("{btnHtml}",btnHtml);
	innerHTML =innerHTML.replace("{+}",this.options.upText||"+");
	innerHTML =innerHTML.replace("{-}",this.options.downText||"-");
	innerHTML =innerHTML.replace("{wInput}",this.options.inputName||"wInput");
	innerHTML =innerHTML.replace("{wUpDown}",this.options.id||"wUpDown");
	innerHTML =innerHTML.replace("{0}",this.options.value||"0");
	innerHTML =innerHTML.replace("{00}",this.options.value||"0");
	
	this.parent.html(innerHTML);
	if(this.options.autoHeight!=undefined&&!this.options.autoHeight)/*不是自动高度*/
	{
		if(this.options.width!=undefined)
		{
			$(this.parentName+" .wUpDown").css("width",this.options.width);
			
		}
		if(this.options.height!=undefined)
		{
			$(this.parentName+" .wUpDown").css("height",this.options.height);
			$(this.parentName+" .wUpBtn").css("height",this.options.height/2);
			$(this.parentName+" .wDownBtn").css("height",this.options.height/2);
			$(this.parentName+" .wUpBtn").css("line-height",this.options.height/2+"px");
			$(this.parentName+" .wDownBtn").css("line-height",this.options.height/2+"px");
			$(this.parentName+" .wUpDown input").css("height",this.options.height);
			$(this.parentName+" .wUpDown input").css("line-height",this.options.height+"px");
			$(this.parentName+" .wUpDown #wValue").css("height",this.options.height);
			$(this.parentName+" .wUpDown #wValue").css("line-height",this.options.height+"px");
		}
	}
	else
	{
		$(this.parentName+" .wUpDown input").css("height",this.parent[0].offsetHeight);
		$(this.parentName+" .wUpDown input").css("line-height",this.parent[0].offsetHeight+"px");
		$(this.parentName+" .wUpDown #wValue").css("height",this.parent[0].offsetHeight);
		$(this.parentName+" .wUpDown #wValue").css("line-height",this.parent[0].offsetHeight+"px");
		$(this.parentName+" .wUpBtn").css("height",this.parent[0].offsetHeight/2);
		$(this.parentName+" .wDownBtn").css("height",this.parent[0].offsetHeight/2);
		$(this.parentName+" .wUpBtn").css("line-height",this.parent[0].offsetHeight/2+"px");
		$(this.parentName+" .wDownBtn").css("line-height",this.parent[0].offsetHeight/2+"px");
	}
	if(this.options.readOnly)
	{
		$(this.parentName+" .wUpDown input").hide();
		$(this.parentName+" .wUpDown #wValue").show();
		$(this.parentName+" .wUpDown .wContent").css("height","auto");
		$(this.parentName+" .wUpDown .wContent").css("overflow","visible");
	}
	this.initEvent();
}
wUpDown.prototype.initEvent=function(){
	var th=this,v;
	$(this.parentName+" .wUpDown .wUpBtn").click(function(){
		th.addValue();
	});
	$(this.parentName+" .wUpDown .wDownBtn").click(function(){
		th.divValue();
	});
	$(this.parentName+" .wUpDown input").keydown(function(e){
		var r=/^(\d{1,})|(\d{1,}\.\d{1,})$/;
		if(e.keyCode==13)
		{
			if(!r.test($(this).val()))
			{
				$(th.parentName+" .wUpDown input").val(th.value);
			}
			else
			{
				v = parseInt($(th.parentName+" .wUpDown input").val());
				if(v>=th.min&&v<=th.max)
				{
					$(th.parentName+" .wUpDown input").val(v);
					th.value = v;
				}
				else
				{
					$(th.parentName+" .wUpDown input").val(th.value);
					th.onError.call(th,v);
				}
			}
		}
	});
}

wUpDown.prototype.addValue=function(){
	if(this.value<this.max&&this.value+this.step<=this.max)
	{
		this.value+=this.step;
		$(this.parentName+" .wUpDown input").val(this.value);
		$(this.parentName+" .wUpDown #wValue").html(this.value);
	}
}
wUpDown.prototype.divValue=function(){
	if(this.value>this.min&&this.value+this.step>=this.min)
	{
		this.value-=this.step;
		$(this.parentName+" .wUpDown input").val(this.value);
		$(this.parentName+" .wUpDown #wValue").html(this.value);
	}
}

wUpDown.prototype.validate=function(){
	if(this.value>=this.min&&this.value<=this.max)
	{
		return true;
	}
	return false;
}

wUpDown.prototype.getValue=function(){
	return $(this.parentName+" .wUpDown input").val();
}

wUpDown.prototype.setValue=function(value){
	if(value<this.min||value>this.max){return false;}
	this.value=value;
	$(this.parentName+" .wUpDown input").val(value);
	$(this.parentName+" .wUpDown #wValue").html(value);
}

