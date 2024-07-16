var ui={}
ui.global={}

//create a unique id for ui object
ui.createName=function(){
	var a=0;
	while (a in ui.global) {
		a=randonInt(0,99999);
	}
	return a;
}

//create a notification at topup right
//param: text to notify
ui.notif=function(text){
	var notifname=this.createName();
	var html='<div style="position:fixed;right:10px;top:10px;border-radius:8px;width:160px;min-height:60px;color:black;background:#e9e9e9;padding:8px;opacity:0">'
			+'	Thông báo<br>'
			+text
			+'</div>';
	this.global[notifname]=document.createElement("div");
	this.global[notifname].innerHTML=html;
	document.body.appendChild(this.global[notifname]);

	this.global[notifname].children[0].style.opacity = 0;
	this.global[notifname].children[0].style.transition = 'opacity 0.6s'
	this.global[notifname].children[0].offsetHeight
	this.global[notifname].children[0].style.opacity = 1;
	setTimeout(function(){
		ui.global[notifname].children[0].style.opacity = 0;
		setTimeout(function(){
			document.body.removeChild(ui.global[notifname]);
			delete ui.global[notifname];
		},500);
	}, 3000);
}
function getPosFromEvent(e){
	if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        return {x:touch.pageX,y:touch.pageY};
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        return {x:e.clientX,y:e.clientY};
    }
}
