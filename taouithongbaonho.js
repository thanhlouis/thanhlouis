var ui={}
ui.global={}
//generate a random integer between two integer(included)
//param: min, max
function randonInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
//create a unique id for ui object
ui.createName=function(){
	var a=0;
	while (a in ui.global) {
		a=randonInt(0,99999);
	}
	return a;
}
//create a modal with specific text
//param: text to show, a title for modal or default: Thông báo
ui.alert=function(text,title){
	var mdname=this.createName();
	this.global[mdname] = createModal(title||"Thông báo");
	this.global[mdname].body().innerHTML=text;
	this.global[mdname].button("Biết rồi!","ui.global["+mdname+"].hide()","btn-primary");
	this.global[mdname].onhide=function(){
		delete ui.global[mdname];
	}
	this.global[mdname].show();
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
