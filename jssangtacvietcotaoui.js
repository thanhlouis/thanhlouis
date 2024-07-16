//core util
function g(i){
	return document.getElementById(i);
}
function q(i){
	return document.querySelectorAll(i);
}
function isInDocumentTree(element,d) {
	if(!d){
		d = document;
	}
	while (element = element.parentNode) {
		if (element == d) {
			return true;
		}
	}
	return false;
}
Element.prototype.qq = function(i){
	return this.querySelectorAll(i);
};
Element.prototype.gg = function(i){
	return this.querySelector(i);
};
function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}
String.prototype.contain=function(str){
	return this.indexOf(str)>-1;
}
String.prototype.endwith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
}
Array.prototype.contain=function(obj){
	return this.indexOf(obj)>=0;
}
String.prototype.lastChar=function(){
	return this[this.length-1];
}
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
function cap(s) {
	if(typeof(s)!="undefined")
     return s.charAt(0).toUpperCase() + s.slice(1);
}
function clearSelection () {
	if (document.selection)
	document.selection.empty();
	else if (window.getSelection)
	window.getSelection().collapseToStart();
}
function createModal(name){
	var div=document.createElement("div");
	div.innerHTML='<div class="modal fade" style="font-size:12px;">'+
			    '<div class="modal-dialog modal-md modal-dialog-centered" onclick="event.stopPropagation()">'+
			    '	<div class="modal-content">'+
			        	'<div class="modal-header">'+
			             	'<h6 class="modal-title"></h6>'+
			       	  	    '<button type="button" class="close" >&times;</button>'+
			       	    '</div>'+
			       	    '<div class="modal-body">'+
				 	    '</div>'+
			      	    '<div class="modal-footer">'+
			      		    ''+
			    	    '</div>'+
			 	    '</div>'+
				'</div>'+
			'</div>';
	div.body=function(){
		return this.querySelector(".modal-body");
	}
	div.tit=function(str){
		this.querySelector(".modal-title").innerHTML=str;
	}
	div.querySelector(".modal-title").innerHTML=name;
	div.footer=function(){
		return this.querySelector(".modal-footer");
	}
	div.button=function(text,click,colorclass,datatag){
		var btn=document.createElement("button");
		btn.innerHTML=text;
		btn.setAttribute("onclick",click);
		btn.setAttribute("class","btn "+colorclass);
		if(typeof datatag !="undefined"){
			btn.setAttribute("data-tag",datatag);
			btn.data=function(a){
				if(typeof a=="undefined")
					return this.getAttribute("data-tag");
				else {
					this.setAttribute("data-tag",a);
				}
			}
		}
		this.footer().appendChild(btn);
		return btn;
	}
	div.show=function(){
		document.body.appendChild(this);
		$(this.children[0]).modal('show');
	}
	div.size=function(si){
		this.querySelector(".modal-dialog").className="modal-dialog modal-dialog-centered modal-"+si;
	}
	div.onhide=function(){}
	div.hide=function(){
		$(this.children[0]).modal('hide');
		setTimeout(function(){
			div.innerHTML="";
			div=null;
		},500);
		this.onhide();
	}
	div.querySelector('.fade').addEventListener("click", function(){
		div.hide();
	});
	div.querySelector('.close').addEventListener("click", function(){
		div.hide();
	});
	return div;
}
//make a api request to sangtacviet server
//param: query string, callback: function(response){}
function ajax(params,callb, retry){
	if(retry == null){
		retry = 0;
	}
	if(retry > 3){
		return;
	}
	var http = new XMLHttpRequest();
	var url = '/index.php';
	if(params.indexOf("ajax=")>=0){
		url+="?ngmar="+params.substr(5,4);
	}
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			if(callb!=null) callb(this.responseText);
		}else if(http.readyState == 4 && http.status == 502){
			setTimeout(function(){
				ajax(params,callb, retry+1);
			}, 1000);
		}
	}

	http.send(params);
}
function ajaxUrl(url,params,callb,fallback, retry){
	if(retry == null){
		retry = 0;
	}
	if(retry > 3){
		return;
	}
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			if(callb!=null) callb(this.responseText);
		}else if(http.readyState == 4 && http.status == 502){
			setTimeout(function(){
				ajaxUrl(url,params,callb,fallback, retry+1);
			}, 1000);
		}
	}
	http.onerror = function(e){
		ajaxUrl(fallback,params,callb, fallback, retry+1);
	}
	http.send(params);
}
function getDomain(l){
	var domain = location.hostname;
	return l.replace("{}", domain);
}
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
function getPosFromEvent(e){
	if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        return {x:touch.pageX,y:touch.pageY};
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        return {x:e.clientX,y:e.clientY};
    }
}
ui.floatbtn = function(act,ico,text){
	var btn = document.createElement("button");
	var btnid = ui.createName();
	$(btn).attr({
		type:"button",
		id:"fbtn-"+btnid,
		onclick: act
	});
	if(text){
		if(text.length>8){
			text=text.substr(0,8) + "..";
		}
	}else{
		text = "";
	}
	btn.innerHTML='<i class="fas '+ico+'"></i><br><span style="font-size:10px">'+text+'</span>';
	g("float-btn").insertBefore(btn,g("float-btn").children[0]);
	return btn;
}
ui.longpress = function(node, calb){
	var holder = {
		threshold : 500,
		isdown : false,
		holdend : calb,
		startx:0,
		starty:0,
		cx:0,cy:0,
		node:node,
		holdstart : function(){
			var pos = getPosFromEvent(event);
			this.startx = pos.x;
			this.starty = pos.y;
			this.node.addEventListener("touchmove",this.move);
			this.node.addEventListener("mousemove",this.move);
			this.node.addEventListener("touchend",this.end);
			this.node.addEventListener("mouseup",this.end);
			this.timer = setTimeout(function(){
				if(holder.isdown)
				if(Math.abs(holder.cx - holder.startx) < 20 && Math.abs(holder.cy - holder.starty) < 20 ){
					holder.holdend(holder.node);
				}
			}, this.threshold);
			this.isdown= true;
		},
		move: function(){
			var pos = getPosFromEvent(event);
			holder.cx = pos.x;
			holder.cy = pos.y;
		},
		end:function(){
			holder.isdown = false;
			this.removeEventListener("touchmove",holder.move);
			this.removeEventListener("mousemove",holder.move);
			this.removeEventListener("touchend",holder.end);
			this.removeEventListener("mouseup",holder.end);
		}
	};
	node.addEventListener("mousedown",function(){ holder.holdstart(); });
	node.addEventListener("touchdown",function(){ holder.holdstart(); });
}
//rotate a block at specific round per second
//param: block, rpm
ui.rotate=function(node,speed){
	//speed:round per second;
	var nodename=this.createName();
	node.setAttribute("id", "ui-"+nodename);
	var time=1/speed;
	node.style.transition="transform "+time+"s linear";
	node.style.transform = 'rotate(0deg)';
	var rotation=360;
	this.global[nodename]=node;
	node.rotatetimer=setInterval(function(){
		rotation+=360;
		node.style.transform = 'rotate('+rotation+'deg)';
	}, time*1000);
	node.style.transform = 'rotate('+rotation+'deg)';
}
ui.guide=function(guidename){

}
ui.snap=function(node,direction,fun){

}
ui.swipe=function(node,direction,fun){
	if(!node.tagName){
		node = g(node);
	}
	var directionid= "sw-"+direction;
	node[directionid] = {
		startx:0,
		starty:0,
		x:0,
		y:0,
		threshold:240,
		draggable:false,
		timerange: 350,
		dir: direction,
		timer: 0, 
		outoftime: false,
		reset:function(){
			this.x=0;this.y=0;this.startx=0;this.starty=0;
		},
		setThreshold:function( val ){
			this.threshold = val;
			return this;
		},
		setDraggable:function( val , lockx, locky ){
			node.style.transform = "translate(0,0)";
			this.draggable = val;
			if(lockx){
				this.lockx=true;
			}
			if(locky){
				this.locky=true;
			}
			return this;
		},
		setSnap:function( val ){
			this.snaprange = val;
			if(this.direction=="left" || this.direction =="right"){
				this.locky = true;
			}
			if(this.direction=="up" || this.direction =="down"){
				this.lockx = true;
			}
			return this;
		},
		setTimerange:function( val ){
			this.timerange = val;
			return this;
		},
		touchstart:function(){
			if(event.changedTouches.length != 1){
				return;
			}
			var tc0 = event.changedTouches[0];
			if(tc0){
				node[directionid].startx = tc0.pageX;
				node[directionid].starty = tc0.pageY;
				node[directionid].x = tc0.pageX;
				node[directionid].y = tc0.pageY;
			}else{
				node[directionid].outoftime=true;
				return;
			}
			node[directionid].outoftime=false;
			node[directionid].timer = setTimeout(function(){
				node[directionid].outoftime = true;
				node[directionid].setTouchmove(false);
			}, node[directionid].timerange);
			node[directionid].firstTouch = true;
			node[directionid].setTouchmove(true);
		},
		setTouchmove: function(enable){
			if(enable){
				node.addEventListener("touchmove",node[directionid].touchmove);
			}else{
				node.removeEventListener("touchmove",node[directionid].touchmove);
			}
		},
		touchmove:function(event){
			if(event.changedTouches.length != 1){
				return;
			}
			var tc0 = event.changedTouches[0];
			if(tc0){
				node[directionid].x = tc0.pageX;
				node[directionid].y = tc0.pageY;
				if(node[directionid].firstTouch){
					node[directionid].firstTouch = false;
					if(direction=="left" || direction=="right"){
						if(Math.abs(node[directionid].x - node[directionid].startx) < Math.abs(node[directionid].y - node[directionid].starty)){
							node[directionid].outoftime = true;
							node[directionid].setTouchmove(false);
							return;
						}
					}
					if(direction=="up" || direction=="down"){
						if(Math.abs(node[directionid].x - node[directionid].startx) > Math.abs(node[directionid].y - node[directionid].starty)){
							node[directionid].outoftime = true;
							node[directionid].setTouchmove(false);
							return;
						}
					}
				}
				if(node[directionid].draggable){
					if(node[directionid].lockx && node[directionid].locky){
						return;
					}else if(node[directionid].lockx){
						node.style.transform = "translate(0px,"+(tc0.pageY - node[directionid].starty)+"px)";
					}else if(node[directionid].locky){
						node.style.transform = "translate("+(tc0.pageX - node[directionid].startx)+"px,0px)";
					}else{
						node.style.transform = "translate("+(tc0.pageX - node[directionid].startx)+"px,"+(tc0.pageY - node[directionid].starty)+"px)";
					}
				}
			}
		},
		touchend:function(){
			if(!node[directionid].outoftime){
				if(direction == "down"){
					if(Math.abs(node[directionid].startx - node[directionid].x) < 220){
						if(node[directionid].y - node[directionid].starty > node[directionid].threshold){
							node[directionid].trigger();
						}
					}
				}
				if(direction == "up"){
					if(Math.abs(node[directionid].startx - node[directionid].x) < 220){
						if(node[directionid].starty - node[directionid].y > node[directionid].threshold){
							node[directionid].trigger();
						}
					}
				}
				if(direction == "left"){
					if(Math.abs(node[directionid].starty - node[directionid].y) < 150){
						if(node[directionid].startx - node[directionid].x > node[directionid].threshold){
							node[directionid].trigger();
						}
					}
				}
				if(direction == "right"){
					if(Math.abs(node[directionid].starty - node[directionid].y) < 150){
						if(node[directionid].x - node[directionid].startx > node[directionid].threshold){
							node[directionid].trigger();
						}
					}
				}
			}
			if(node[directionid].draggable){
				node.style.transform = "translate(0px,0px)";
			}
			node[directionid].outoftime = true;

			clearTimeout(node[directionid].timer);
			node[directionid].timer = 0;
		},
		touchcancel:function(){
			if(node[directionid].draggable){
				node.style.transform = "translate(0px,0px)";
			}
			node[directionid].outoftime = true;
			clearTimeout(node[directionid].timer);
			node[directionid].timer = 0;
		},
		trigger:function(){
			node[directionid].outoftime = true;
			clearTimeout(node[directionid].timer);
			node[directionid].timer = 0;
			fun();
		}
	};
	node.addEventListener("touchstart",node[directionid].touchstart);
	//node.addEventListener("touchmove",node[directionid].touchmove);
	node.addEventListener("touchend",node[directionid].touchend);
	node.addEventListener("touchcancel",node[directionid].touchcancel);
	return node[directionid];
}
//copy text to clipboard
//param: a string
ui.copy=function(valuetocopy){
	if(navigator.clipboard){
		navigator.clipboard.writeText(valuetocopy);
		return;
	}

	var ip=document.createElement("textarea");
	document.body.appendChild(ip);
	ip.value=valuetocopy;
	if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(ip);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(ip);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    document.execCommand("copy");
    ip.remove();
}
ui.infinity=function(container,endpoint,calb){
	container.threshold=125;
	container.setThreshold=function(i){
		this.threshold=i;
		return this;
	}
	container.setAnim=function(anim){
		if(anim){
			this.onloading=anim;
		}else{
			this.onloading=function(){
				if(this.loading){
					var dv = document.createElement("div");
					dv.style.padding="10px;";
					dv.style.textAlign = 'center';
					dv.innerHTML='<i class="spinner-border"> </i>';
					dv.className="infinity-spinner";
					this.appendChild(dv);
				}else{
					setTimeout(function(){
						container.querySelector(".infinity-spinner").remove();
					}, 10);
				}
			}
		}
		return this;
	}
	container.setPager=function(pname,start,offset){
		if(!offset){
			offset=1;
		}
		if(!start){
			start=0;
		}
		if(!pname){
			pname="&p=";
		}else{
			pname="&"+pname+"=";
		}
		this.pager=pname+start;
		this.onpagechange=function(){
			start += offset;
			this.pager=pname+start;
		}
		return this;
	}
	container.setEndpoint = function(ep){
		endpoint = ep;
	}
	container.pager="";
	if(!calb){
		calb=function(d){
			this.innerHTML+=d;
		}
	}
	container.ended = false;
	if(endpoint){
		container.onautoload=function(rs){if(rs!=""){calb.apply(container,[rs]);}else{this.ended=true;}};
		var overflowdefalut = getComputedStyle(container);
		if(overflowdefalut.overflowY=="visible" || overflowdefalut.overflowY =="hidden"){
			window.addEventListener("scroll", function(){
				if(container.loading||container.ended){
					return;
				}
				if(document.body.scrollTop + container.threshold > document.body.scrollHeight - document.body.clientHeight){
					container.loading = true;
					if(container.onloading){
						container.onloading();
					}
					if(typeof endpoint=='function'){
						endpoint(container.pager);
						container.loading=false;
						if(container.onloading){
							container.onloading();
						}
						if(container.onpagechange){
							container.onpagechange();
						}
					}else
					ajax(endpoint+container.pager,function(down){
						container.onautoload(down);
						container.loading=false;
						if(container.onloading){
							container.onloading();
						}
						if(container.onpagechange){
							container.onpagechange();
						}
					});
				}
			});
		}else
		container.addEventListener("scroll", function(){
			if(this.loading||container.ended){
				return;
			}
			if(this.scrollTop + this.threshold > this.scrollHeight - this.clientHeight){
				this.loading = true;
				if(this.onloading){
					this.onloading();
				}
				if(typeof endpoint=='function'){
					endpoint();
					container.loading=false;
					if(container.onloading){
						container.onloading();
					}
					if(container.onpagechange){
						container.onpagechange();
					}
				}else
				ajax(endpoint+this.pager,function(down){
					container.onautoload(down);
					container.loading=false;
					if(container.onloading){
						container.onloading();
					}
					if(container.onpagechange){
						container.onpagechange();
					}
				});
			}
		});
	}
	return container;
}

//create a table with two function
//param: column 1, column 2,..
//return: a table element with function:
//table.row: insert a row to the table
//param: markup for column 1,...
//table.destroy: remove the table
ui.table=function(){
	var cols=arguments.length;
	var nodename=this.createName();
	var table=document.createElement("table");
	table.appendChild(document.createElement("tr"));
	this.global[nodename]=table;
	for(var i=0;i<cols;i++){
		var th=document.createElement("th");
		th.innerHTML=arguments[i];
		table.children[0].appendChild(th);
	}
	table.row=function(){
		var tr=document.createElement("tr");for(var i=0;i<arguments.length;i++){
			var td=document.createElement("td");
			td.innerHTML=arguments[i];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	table.destroy=function(){
		table.remove();
		delete ui.global[nodename];
	}
	return table;
}
ui.dropdown=function(node){
	var nodename=this.createName();
	var menu=document.createElement("div");
	$(menu).css({
		"background":'white',
		'border-radius':'6px;'
	});
}
//create a resize div between two ajacent block.
//param: block left, block right, orientation: horizontal|vertical
//exception: two block is not ajacent.
ui.resize=function(node1,node2,orient,isTouch){
	var modulename=this.createName();
	if(node1.nE()!==node2){
		return console.log("node1 is not node2 previousElementSibling");
	}
	var eventNames = ["mousedown", "mousemove", "mouseup", "mousecancel"];
	if(isTouch){
		eventNames = ["touchstart", "touchmove", "touchend", "touchcancel"];
	}
	if(orient=="horizontal"){
		var css1=getComputedStyle(node1);
		var css2=getComputedStyle(node2);
		this.global[modulename]={
			ihr1:parseInt(css1.width),
			ihr2:parseInt(css2.width),
			nd1:node1,
			nd2:node2,
			widthtotal:parseInt(css1.width)+parseInt(css2.width),
			width1cr:parseInt(css1.width),
			width2cr:parseInt(css2.width),
			resize:function(e){
				var pX = isTouch ? e.touches[0].pageX : e.pageX;
				var mv=pX - this.crX;
				this.width1cr+=mv;
				this.nd1.style.width = this.width1cr +"px";
				this.width2cr-=mv;
				this.nd2.style.width = this.width2cr +"px";
				this.crX=pX;
			}
		};
		var div=document.createElement("div");
		this.global[modulename].resizediv=div;
		$(div).css({width:"2px"
			,height:"100%"
			,position:"static"
			//,left:""
			//,top:"0"
			,border:"1px solid gray"
			,borderWidth:"0 1px 0 1px"
			//,zIndex:10
			,cursor:'col-resize'
		});
		div.classList.add("resize-horizontal");
		//if(css1.position=="static"){
			//node1.style.position="relative";
		//}
		var ltTarget = isTouch ? div : document;
		div.addEventListener(eventNames[0],function(e){
			console.log("a");
			ui.global[modulename].crX=isTouch ? e.touches[0].pageX : e.pageX;
			ui.global[modulename].width1cr=parseInt(getComputedStyle(node1).width);
			ui.global[modulename].width2cr=parseInt(getComputedStyle(node2).width);
			var funmm=function(ev){
				//console.log("move");
				ui.global[modulename].resize(ev);
			}
			ltTarget.addEventListener(eventNames[1],funmm);
			var funmv=function(){
				ltTarget.removeEventListener(eventNames[1], funmm);
				ltTarget.removeEventListener(eventNames[2], funmv);
				ltTarget.removeEventListener(eventNames[3], funmv);
			}
			ltTarget.addEventListener(eventNames[2],funmv);
			ltTarget.addEventListener(eventNames[3],funmv);
		});
		node1.parentElement.insertBefore(div, node2);
		return div;
	}else 
	if(orient=="vertical"){
		var css1=getComputedStyle(node1);
		var css2=getComputedStyle(node2);
		this.global[modulename]={
			ihr1:parseInt(css1.height),
			ihr2:parseInt(css2.height),
			nd1:node1,
			nd2:node2,
			widthtotal:parseInt(css1.height)+parseInt(css2.height),
			width1cr:parseInt(css1.height),
			width2cr:parseInt(css2.height),
			resize:function(e){
				var pY = isTouch ? e.touches[0].pageY : e.pageY;
				var mv=pY - this.crY;
				this.width1cr+=mv;
				this.nd1.style.height = this.width1cr +"px";
				this.width2cr-=mv;
				this.nd2.style.height = this.width2cr +"px";
				this.crY=pY;
			}
		};
		var div=document.createElement("div");
		div.classList.add("resize-vertical");
		this.global[modulename].resizediv=div;
		$(div).css({width:"100%"
			,height:"2px"
			,position:"static"
			//,left:""
			//,top:"0"
			,border:"1px solid gray"
			,borderWidth:"1px 0 1px 0"
			//,zIndex:10
			,cursor:'row-resize'
		});
		//if(css1.position=="static"){
			//node1.style.position="relative";
		//}
		var ltTarget = isTouch ? div : document;
		div.addEventListener(eventNames[0],function(e){
			//console.log("a");
			ui.global[modulename].crY=isTouch ? e.touches[0].pageY : e.pageY;
			ui.global[modulename].width1cr=parseInt(getComputedStyle(node1).height);
			ui.global[modulename].width2cr=parseInt(getComputedStyle(node2).height);
			var funmm=function(ev){
				ui.global[modulename].resize(ev);
				//console.log("move");
			}
			ltTarget.addEventListener(eventNames[1],funmm);
			var funmv=function(){
				ltTarget.removeEventListener(eventNames[1], funmm);
				ltTarget.removeEventListener(eventNames[2], funmv);
				ltTarget.removeEventListener(eventNames[3], funmv);
			}
			ltTarget.addEventListener(eventNames[2],funmv);
			ltTarget.addEventListener(eventNames[3],funmv);
		});
		node1.parentElement.insertBefore(div, node2);
		return div;
	}
}
ui.press=function(btn){
	btn.oldMk=btn.innerHTML;
	btn.innerHTML="<span class='spinner-border'></span>";
	btn.disabled=true;
	btn.end=function(){
		this.innerHTML=this.oldMk;
		this.disabled=false;
	}
}
ui.uploadimg=function(calb,previewer,customhandler,selected,maxsize){
	maxsize = maxsize||4;
	var ip=document.createElement("input");
	ip.setAttribute("type", "file");
	ip.setAttribute("accept","image/*");
	ip.style.display="none";
	ip.addEventListener("change",function(){
		if(selected!=null)selected();
		if (this.files != null) {
			if (this.files[0].size > maxsize * 1000000) {
				alert("Kích thước tối đa "+ maxsize +"MB");
				return;
			} else {
				var FR = new FileReader();
				FR.addEventListener("load", function(e) {
					var base64 = e.target.result;
					if(previewer!=null){
						previewer.src=base64;
					}
					var http = new XMLHttpRequest();
					var url = '/index.php';
					var params = (customhandler||"ajax=cboximg")+"&imgdata=" + base64;
					http.open('POST', url, true);
					http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					http.onreadystatechange = function() {
						if (http.readyState == 4 && http.status == 200) {
							ip.remove();
							var x = http.responseText.split(":::");
							if (x[0]=="filename") {
								if(calb!=null){
									calb(x[1]);
								}
							} else {
								console.log(x[1]);
							}
						}
					}
					http.send(params);
				});
				FR.readAsDataURL(this.files[0]);
			}
		}
	});
	ip.click();
	
}
ui.preloader=function() {
	var d=document.createElement("div");
	d.setAttribute("style", "position:fixed;top:0;left:0;width:100vw;height:100vh;background:white;z-index:9999");
	d.innerHTML="<div style='position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)'>"+
	"<div class='spinner-border' style='width:200px;height:200px;'></div></div>";
	document.body.appendChild(d);
}
ui.swiftload=function(url,scrollto,onload){
	if(!history || !history.pushState){
		return;
	}
	if(url.tagName=="A"){
		if(!window.setting || !window.setting.enableswiftload) return;
		url = url.href;
		event.preventDefault();
	}
	var args = arguments;
	var purl = url.contain("?")?url+"&sw=":url+"?~sw-~";
	var swiftrotator = new XMLHttpRequest();
	swiftrotator.open("GET",purl,true);
	swiftrotator.setRequestHeader("SWIFT-ROTATOR",new Date().getTime());
	swiftrotator.onreadystatechange = function() {
		if(swiftrotator.readyState == 4 && swiftrotator.status == 200) {
			window.stop();
			var lastscr = document.body.scrollTop;
			if(ui.swiftload.anistart){
				if(ui.swiftload.aniend)
					ui.swiftload.aniend();
			}
			history.replaceState({"html":g("inner").innerHTML,"pageTitle":document.title,"scrolllast":lastscr},"");
			g("inner").innerHTML="<br>"+swiftrotator.responseText;
			if(onload){
				onload();
			}
			var arr = g("inner").getElementsByTagName('script');
			try{
				ga('set', 'page', url);
				ga('send', 'pageview');
			}catch(excep){}
			
			document.title="Sáng Tác Việt - Nền tảng văn học mạng mở mới";
			history.pushState({"html":g("inner").innerHTML,"pageTitle":document.title,"scrolllast":lastscr}, "" ,url);
			g("inner").setAttribute("style","");
			g("full").setAttribute("style","min-height:99vh");
			
			
				(async function(arr){
					for (var n = 0; n < arr.length; n++){
						var script = arr[n];
						if(script.hasAttribute("src")){
							if(script.hasAttribute("async") || script.hasAttribute("defer")){
								ui.scriptmanager.load(script.src);
							}else{
								await new Promise(function(resolve, reject) {
									ui.scriptmanager.load(script.src,resolve);
								});
							}
						}else{
							// global scope
							(function(value) {
								eval.apply(window, [value]);
							})(script.innerHTML);
						}
					}
				})(arr);
				// if(arr[n].hasAttribute("src")){
				// 	(function(d, script,src) {
				// 		if(q("[uniq=\""+src+"\"]")[0]!=null)return;
				// 		script = d.createElement('script');
				// 		script.type = 'text/javascript';
				// 		script.async = true;
				// 		script.onload = function(){};
				// 		script.setAttribute("uniq",src);
				// 		script.src = src;
				// 		d.getElementsByTagName('head')[0].appendChild(script);
				// 	}(document,null,arr[n].src));
				// }
				// else
				// (function(){
				// 	try{
				// 		eval.apply(this, arguments);
				// 	}catch(exce){
				// 		//console.log("retry"+arguments[0]);
				// 		var jsd=arguments[0];
				// 		setTimeout(function(){
				// 			(function(){
				// 				try{
				// 					eval.apply(this, arguments);
				// 				}catch(exce2){
				// 					console.log("failed");
				// 					console.log(exce2);
				// 				}
				// 			}(jsd))
				// 		},200);
				// 	}
				// }(arr[n].innerHTML));
			
			if(scrollto){
				$([document.documentElement, document.body]).animate({
					scrollTop: $("#"+scrollto).offset().top+50
				}, 200);
			}else{
				document.body.scrollTop=0;
			}
			if(window.ismenu2show){
				g("usermenupos").children[0].style.display="none";
				ismenu2show=false;
			}
		}else if(swiftrotator.readyState == 4 && swiftrotator.status == 502){
			setTimeout(function(){
				ui.swiftload(args);
			}, 1000);
		}
	}
	swiftrotator.send();
	if(ui.swiftload.anistart){
		ui.swiftload.anistart();
	}
}
ui.scrollto=function(ele,offset, scroller){
	$(scroller || [document.documentElement, document.body]).animate({
		scrollTop: $("#"+ele).offset().top+(offset||0)
	}, 200);
}
function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}
ui.stickable = function(stickele, classname){
	if(!stickele.push){
		stickele=[stickele];
	}
	var sticky = getCoords(stickele[0]).top;
	for(var i=0;i<stickele.length;i++){
		stickele[i].style.width=getComputedStyle(stickele[i]).width;
	}
	
	window.addEventListener("scroll",function() {
		if(window.pageYOffset >= sticky){
			for(var i=0;i<stickele.length;i++){
				stickele[i].classList.add(classname);
			}
			
		}else{
			for(var i=0;i<stickele.length;i++){
				stickele[i].classList.remove(classname);
			}
		}
	});
}
window.onpopstate = function(e){
	window.stop();
    if(e.state){

        document.getElementById("inner").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
		var arr = g("inner").getElementsByTagName('script');
		g("inner").setAttribute("style","");
		g("full").setAttribute("style","");
		for (var n = 0; n < arr.length; n++){
			(function(){
				try{
					eval.apply(this, arguments);
				}catch(exce){}
			}(arr[n].innerHTML));
		}
		setTimeout(function(){
			//document.body.scrollTop=e.state.scrolllast;
		},100);
    }
};
ui.autoresize=function(ip){
	ip.style.height="auto";
	ip.style.overflowY="hidden";
	ip.addEventListener("input", function(){
		this.style.height = 'auto';
		this.style.height = (this.scrollHeight) + 'px';
	}, false);
}
ui.attachAutoresize=function(ip){
	if(ip.autoresizeAttached)return;
	//ip.style.height="auto";
	//ip.style.overflowY="hidden";
	var h = ip.clientHeight;
	function countLines(){
		var lines = ip.value.split(/\r|\r\n/);
		var count = 0;
		for(var i=0;i<lines.length;i++){
			count += Math.ceil(lines[i].length/ip.cols);
		}
		return count;
	}
	ip.addEventListener("input", function(){
		this.style.height = countLines()*h + 'px';
		this.style.height = (this.scrollHeight) + 'px';
	}, false);
	ip.autoresizeAttached=true;
}
//display on or off a div, return a function handler.
//param: a block to toggle
//returned function param: true of false or ommited.
//true or false force the block to display on or off, onmit for toggling.
ui.toggle=function(div){
	div.currentMode=getComputedStyle(div).display;
	if(div.currentMode=="none"){
		return function(force){
			if(force==null){
				if(div.currentMode=="block"){
					div.currentMode="none";
				}else{
					div.currentMode="block";
				}
			}else{
				if(force){
					div.currentMode="block";
				}else{
					div.currentMode="none";
				}
			}
			div.style.display=div.currentMode;
		}
	}else{
		div.defaultMode=div.currentMode;
		return function(force){
			if(force==null){
				if(div.currentMode==div.defaultMode){
					div.currentMode="none";
				}else{
					div.currentMode=div.defaultMode;
				}
			}else{
				if(force){
					div.currentMode=div.defaultMode;
				}else{
					div.currentMode="none";
				}
			}
			div.style.display=div.currentMode;
		}
	}
}
//make a popup hide on clicked outside
//param: a block, window.conditionname
ui.clickoutside=function(div,condition){
	if(condition==null){
		div.addEventListener("click",function(){
			event.stopPropagation();
		});
		window.addEventListener("click",function(){
			div.style.display = 'none';
		});
	}else{
		div.addEventListener("click",function(){
			if(!window[condition])
			event.stopPropagation();
		});
		window.addEventListener("click",function(){
			if(!window[condition])
			div.style.display = 'none';
		});
	}

}
window.pl="scr";
ui.expand=function(container, maxh){
	if(container.getAttribute("isexpanded")){
		return;
	}
	container.setAttribute("isexpanded","false");
	container.style.overflow = 'hidden';
	var sty=getComputedStyle(container);
	var mh = maxh || sty.maxHeight;
	var expander=document.createElement("div");
	expander.style.textAlign = 'center';
	expander.style.backgroundColor = sty.backgroundColor;
	expander.style.color=sty.color;
	expander.style.padding = '6px';
	expander.innerHTML='<i class="fas fa-chevron-down"></i>';
	expander.addEventListener("click",function(){
		var expd=container.getAttribute("isexpanded");
		if(expd=="true"){
			container.style.maxHeight = mh;
			container.setAttribute("isexpanded","false");
			this.innerHTML='<i class="fas fa-chevron-down"></i>';
		}else{
			container.style.maxHeight = 'none';
			container.setAttribute("isexpanded","true");
			this.innerHTML='<i class="fas fa-chevron-up"></i>';
		}
		if(container.onexpand){
			container.onexpand();
		}
	});
	if(maxh){
		container.style.maxHeight = mh;
	}
	container.parentElement.insertBefore(expander, container.nextSibling);
}
ui.sh=function(nindex) {
	document.addEventListener(pl+"oll",nindex);
}
ui.tab=function(tabber,tabdiv){
	for(var i=0;i<tabber.children.length;i++){
		tabber.children[i].addEventListener("click",
			function(){
				for(var j=0;j<tabber.children.length;j++){
					if(tabber.children[j]==this){
						this.classList.add("active");
						tabdiv.children[j].style.display='block';
					}else{
						tabber.children[j].classList.remove("active");
						tabdiv.children[j].style.display = 'none';
					}
					
				}
				
			}
		);
	}
}
ui.stab=function (tabber,tabdiv) {
	tabdiv.setAttribute("style","transform:translateX(0px);transition:transform .4s;display:flex;flex-wrap:nowrap;");
	tabdiv.parentElement.style.overflowX = 'hidden';
	tabdiv.style.width = ""+tabber.children.length+'00%';
	var widthspl = 100 / tabber.children.length;
	for(var i=0;i<tabber.children.length;i++){
		tabber.children[i].addEventListener("click",
			function(){
				for(var j=0;j<tabber.children.length;j++){
					if(tabber.children[j]==this){
						this.classList.add("active");
						tabdiv.style.transform='translateX(-'+(j*widthspl)+'%)';
					}else{
						tabber.children[j].classList.remove("active");
					}
					
				}
				
			}
		);
	}
	tabdiv.nextTab=function(){
		for(var j=0;j<tabber.children.length;j++){
			if(tabber.children[j].className.contain("active")){
				if(j+1<tabber.children.length){
					tabber.children[j+1].click();
					return;
				}
			}
		}
	}
	tabdiv.prevTab=function(){
		for(var j=0;j<tabber.children.length;j++){
			if(tabber.children[j].className.contain("active")){
				if(j-1 > -1){
					tabber.children[j-1].click();
					return;
				}
			}
		}
	}
	ui.swipe(tabdiv,"left",function(){
		tabdiv.nextTab();
	}).setThreshold(150);
	ui.swipe(tabdiv,"right",function(){
		tabdiv.prevTab();
	}).setThreshold(150);
}
ui.smtab = function(tab, snapfirst, nodrag, noswipe, animateMethod, useCvRender){
	var tabdiv;
	var tabber;
	var mark;
	var tabpointer;
	var tabdivcontainer;
	if(typeof snapfirst == "object"){
		var options = snapfirst;
		snapfirst = options.snapfirst;
		nodrag = options.nodrag;
		noswipe = options.noswipe;
		animateMethod = options.animateMethod;
		useCvRender = options.useCvRender;
	}
	if(!animateMethod){
		animateMethod = 0;
	}
	for(var i=0;i<tab.children.length;i++){
		if(tab.children[i].tagName == "DIV"){
			tabdiv = tab.children[i].children[0];
			tabdivcontainer = tab.children[i];
		}
		if(tab.children[i].tagName == "TABBAR"){
			tabber = tab.children[i];
		}
		if(tab.children[i].tagName == "TABPOINTER"){
			mark = tab.children[i].querySelector("tabpointermark");
			tabpointer = tab.children[i];
		}
	}
	var cvRender = null;
	if(useCvRender){
		cvRender = {
			canvas:document.createElement("canvas"),
			context: null,
			color: null,
			x: 0,
			w: 0,
			tween: null,
			setBarWidth:function(w){
				this.canvas.width = w;
			},
			setMarkWidth:function(w){
				this.w = w;
				this.drawMark(this.x,this.w);
			},
			setMarkPos:function(x){
				this.x = x;
				this.drawMark(x,this.w);
			},
			setMarkPosWidth:function(x,w,f){
				if(f && this.tween){
					this.tween.kill();
				}
				this.x = x;
				this.w = w;
				this.drawMark(x,w);
			},
			drawMark: function(x,w){
				this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
				this.context.fillStyle = this.color;
				var rX = x + w/4;
				var rW = w/2;
				this.context.fillRect(rX,0,rW,this.canvas.height);
			},
			init: function(container){
				if(!container){
					container = mark.parentElement;
				}
				this.canvas.width = container.clientWidth;
				this.canvas.height = 3;
				this.context = this.canvas.getContext("2d");
				if(container.q("span").style.backgroundColor){
					this.color = app.theme.getColorVar(container.q("span").style.backgroundColor);
					var cVar = container.q("span").style.backgroundColor;
					var t = this;
					app.theme.onBgColorChange(function(c){
						t.color = app.theme.getColorVar(cVar);
						t.drawMark(t.x,t.w);
					});
					app.theme.onAccentColorChange(function(c){
						t.color = app.theme.getColorVar(cVar);
						t.drawMark(t.x,t.w);
					});
				}else{
					this.color = app.theme.getColorVar("var(--color)");
					var t = this;
					app.theme.onBgColorChange(function(){
						t.color = app.theme.getColorVar("var(--color)");
						t.drawMark(t.x,t.w);
					});
				}
				container.children[0].remove();
				container.appendChild(this.canvas);
			},
			setMarkPosAnim:function(x,w, duration){
				var that = this;
				if(this.tween){
					this.tween.kill();
				}
				this.tween = gsap.fromTo(this, duration, {
					x:that.x,
					w:that.w
				}, {
					x:x,
					w:w,
					onUpdate:function(){
						that.drawMark(that.x, that.w);
					},
					onComplete:function(){},
					ease:Power2.easeOut});
			},
			setColor:function(color){},
		};
		tab.cvRender = cvRender;
	}
	var tabcount = tabber.children.length;
	tabdiv.style.width = tabcount+'00%';
	var widthspl = 100 / tabcount;
	
	tabdiv.style.width = (tabcount * 100) + "%";
	var tabwidth = tabdivcontainer.scrollWidth;
	var snapPoint = [];
	var pSnapPoint = [];
	var ctab = 0;
	window.lockDrag = false;
	var markOffset = 0;
	var timer = 0;
	var tmpDisableScrollEvent = false;
	var cx = 0, dragstart = false, cy = 0, firstTouch = false;
	for(var i=0;i<tabber.childNodes.length;i++){
		if(tabber.childNodes[i].nodeType == 3){
			tabber.childNodes[i].remove();
		}
	}
	var buildSnapPoint = function(){
		snapPoint = [];
		pSnapPoint = [];
		markOffset = 0;
		var sw = tabdivcontainer.scrollWidth;
		for(var i=0;i<tabber.children.length;i++){
			snapPoint.push(i * widthspl * sw / 100);
			pSnapPoint.push({
				o: markOffset,
				w: tabber.children[i].scrollWidth,
			});
			markOffset += pSnapPoint[i].w;
		}
	}
	for(var i=0;i<tabber.children.length;i++){
		buildSnapPoint();
		tabber.children[i].addEventListener("click",
			function(){
				for(var j=0;j<tabber.children.length;j++){
					if(tabber.children[j]==this){
						ctab = j;
						this.classList.add("active");
						var nextPos = snapPoint[j];
						//var cPos = getInt(tabdiv.style.transform);
						var dist = Math.abs(nextPos - tabdivcontainer.scrollLeft);
						//var dist = Math.abs(nextPos - cPos);
						var timeneed = 250 * (dist / (snapPoint[1] - snapPoint[0]));
						if(timeneed > 250){
							timeneed = 250;
						}
						tabdivcontainer.isanimating = true;
						var markAnimTime = 0.18;
						if(animateMethod == 0){
							$(tabdivcontainer).animate({
								scrollLeft: nextPos
							}, timeneed, "swing", function(){
								tabdivcontainer.isanimating = false;
							});
						}else if(animateMethod === 1){
							markAnimTime = 0.55;
							tabdivcontainer.scrollTo({
								left: tabdivcontainer.scrollLeft, 
								behavior: 'instant'
							});
							setTimeout(function(){
								// $(tabdivcontainer).animate(
								// 	{
								// 		scrollLeft: nextPos
								// 	}, timeneed, "swing", function(){
								// 		tabdivcontainer.isanimating = false;
								// 	});
								// }, 
								tmpDisableScrollEvent = true;
								tabdivcontainer.scrollTo({
									left: nextPos, 
									behavior: 'smooth'
								});
								setTimeout(function(){
									tmpDisableScrollEvent = false;
									tabdivcontainer.isanimating = false;
								}, 550);
							}, 36);
						}else if(animateMethod === 2){
							gsap.fromTo(tabdiv,{x:getPxFromTranslate(tabdiv.style.transform)},{
								x:-nextPos,duration:timeneed/ 1000,
								ease:"Power2.easeOut",
								onComplete:function(){
									tabdivcontainer.isanimating = false;
								}
							});
						}
						var markLeft = pSnapPoint[j].o;
						var markWidth = pSnapPoint[j].w;
						if(useCvRender){
							tab.cvRender.setMarkPosAnim(markLeft, markWidth, markAnimTime);
						}
						else{
							mark.style.transition = 'all '+markAnimTime+'s linear 0s';
							mark.style.transform='translateX('+markLeft+'px)';
							setTimeout(function(){
								mark.style.transform='translateX('+markLeft+'px)';
								mark.style.width = markWidth + "px";
							}, 200);
							mark.style.width = markWidth + "px";
						}
						
						if(tabdiv.children[j].onfirstload && !tabdiv.children[j].firstload){
							tabdiv.children[j].onfirstload();
							tabdiv.children[j].firstload = true;
						}
						if(tabdiv.children[j].onload){
							tabdiv.children[j].onload();
						}
						if(tab.ontabchange){
							tab.ontabchange(ctab);
						}
					}else{
						tabber.children[j].classList.remove("active");
						if(tabdiv.children[j].onfadeout){
							tabdiv.children[j].onfadeout();
						}
					}
				}
			}
		);
		//tabdiv.children[i].addEventListener("scroll",function(){
			// window.lockDrag = true;
			// dragstart = false;

			// if(timer){
			// 	clearTimeout(timer);
			// }else{
			// 	snap();
			// }
			// timer = setTimeout(function(){
			// 	window.lockDrag = false;
			// 	timer = 0;
			// }, 100);
		//});
	}
	if(tab.querySelector("ntab")){
		var ntab = tab.querySelector("ntab");
		tabber.addEventListener("scroll", function(){ ntab.parentElement.scrollLeft = tabber.scrollLeft });
		ntab.style.width = tabber.scrollWidth + snapPoint[1];
		buildSnapPoint();
	}
	if(useCvRender){
		tab.cvRender.init();
		tab.cvRender.setMarkPosWidth(0, pSnapPoint[0].w);
	}
	if(animateMethod === 1){
		var childCount = tabdiv.children.length;
		for(var i=0;i<childCount;i++){
			let ttabview = tabdiv.children[0];
			ttabview.classList.add("scrollsnap");
			tabdivcontainer.appendChild(ttabview);
		}
		tabdiv.remove();
		tabdiv = tabdivcontainer;
		tabdiv.classList.add("xmandatory");
	}
	tabdiv.nextTab=function(){
		if(ctab < tabcount - 1){
			ctab++;
			tabber.children[ctab].click();
			event.stopPropagation();
		}
	}
	tabdiv.prevTab=function(){
		if(ctab > 0){
			ctab--;
			tabber.children[ctab].click();
			event.stopPropagation();
		}
	}
	if(!noswipe && animateMethod !== 1){
		ui.swipe(tabdivcontainer,"left",function(){
			tabdiv.nextTab();
		}).setThreshold(50);
		ui.swipe(tabdivcontainer,"right",function(){
			tabdiv.prevTab();
		}).setThreshold(50);
	}
	
	var isFrameEnded = true;
	var offsetSkip  = 0;
	function touchstart(){
		var eve = event;
		isFrameEnded = true;
		//setTimeout(function(){
			if(window.lockDrag){
				dragstart = false;
				return;
			}
			dragstart = false;
			
			if(eve.changedTouches.length != 1){
				return;
			}
			var tc0 = eve.changedTouches[0];
			if(tc0){
				cx = tc0.pageX;
				cy = tc0.pageY;
				//setTimeout(function(){
					if(!window.lockDrag){
						dragstart = true;
						mark.style.transition = 'none';
						firstTouch = true;
					}
				//},30);
				
			}
		//}, 30);
		eve.stopPropagation();
	}
	tabdiv.style.transform = 'translateX(0px)';
	tabdiv.style.transition = "none";
	function getInt(str){
		var px = str.match(/\d+/);
		return parseInt(px[0]);
	}
	function touchmove(event){
		if(window.lockDrag || !dragstart){dragstart = false; return;}
		if(event.changedTouches.length != 1){
			return;
		}
		var tc0 = event.changedTouches[0];
		if(tc0){
			if(firstTouch){
				firstTouch = false;
				var offsetY = tc0.pageY - cy;
				var offsetX = tc0.pageX - cx;
				if(Math.abs(offsetX) < Math.abs(offsetY)){
					dragstart = false;
					return;
				}
			}
			
			//var o = tabdivcontainer.scrollLeft -=  tc0.pageX - cx;
			var o = tabdivcontainer.scrollLeft - tc0.pageX + cx;
			//console.log(tc0.pageX);
			var tmp = tc0.pageX - cx + offsetSkip;
			offsetSkip = 0;
			var animators = [];
			if(isFrameEnded){
				// requestAnimationFrame(function(){
				// 	tabdivcontainer.scrollLeft = o;
				// 	isFrameEnded = true;
				// });
				animators.push(function(){
					tabdivcontainer.scrollLeft -= tmp;
				});
				
			}else{
				offsetSkip += tmp;
			}
			cx = tc0.pageX;
			//var o = getInt(tabdiv.style.transform) - (tc0.pageX - cx);
			//tabdiv.style.transform = 'translateX('+ -o +'px)';
			
			var j = tabcount;
			while(j--){
				if(o > snapPoint[j]){
					if( j < tabcount - 1){
						var percent = ( o - snapPoint[j]) / (snapPoint[1]-snapPoint[0]);
						if(isFrameEnded){
							// requestAnimationFrame(function(){
							// 	mark.style.width = (pSnapPoint[j].w + ((pSnapPoint[j+1].w - pSnapPoint[j].w) * percent)) + "px";
							// 	mark.style.transform = "translateX("+ (pSnapPoint[j].o + (Math.abs(pSnapPoint[j+1].o - pSnapPoint[j].o) * percent)) +"px)";
							// 	isFrameEnded = true;
							// });
							if(useCvRender){
								animators.push(function(){
									var width = (pSnapPoint[j].w + ((pSnapPoint[j+1].w - pSnapPoint[j].w) * percent));
									var left = pSnapPoint[j].o + (Math.abs(pSnapPoint[j+1].o - pSnapPoint[j].o) * percent);
									tab.cvRender.setMarkPosWidth(left, width);
								});
							}else{
								animators.push(function(){
									mark.style.width = (pSnapPoint[j].w + ((pSnapPoint[j+1].w - pSnapPoint[j].w) * percent)) + "px";
									mark.style.transform = "translateX("+ (pSnapPoint[j].o + (Math.abs(pSnapPoint[j+1].o - pSnapPoint[j].o) * percent)) +"px)";
								});
							}
							requestAnimationFrame(function(){
								for(var i=0;i<animators.length;i++){
									animators[i]();
								}
								isFrameEnded = true;
							});
						}
						//mark.style.width = (pSnapPoint[j].w + ((pSnapPoint[j+1].w - pSnapPoint[j].w) * percent)) + "px";
						//mark.style.transform = "translateX("+ (pSnapPoint[j].o + (Math.abs(pSnapPoint[j+1].o - pSnapPoint[j].o) * percent)) +"px)";
						event.stopPropagation();
						if(event.cancelable)
						event.preventDefault();
						window.tabdragging = tab.id;
					}
					break;
				}
			}
		}
	}
	function snap(){
		var mindist = 9999, mini = ctab, half = (snapPoint[1] - snapPoint[0]) / 2, cp = tabdivcontainer.scrollLeft + half;//getInt(tabdiv.style.transform) +half;//
		for(var i=0;i<snapPoint.length;i++){
			var dist = Math.abs(cp - (snapPoint[i] + half));
			if(dist < mindist){
				mindist = dist; mini = i;
			}
		}
		ctab = mini;
		
		$(tabdivcontainer).animate({
			scrollLeft: snapPoint[mini]
		}, 120);
		if(useCvRender){
			tab.cvRender.setMarkPosAnim(pSnapPoint[mini].o,pSnapPoint[mini].w, 0.18);
		}else{
			mark.style.transition = 'all 0.18s linear 0s';
			mark.style.transform='translateX('+(pSnapPoint[mini].o)+'px)';
			mark.style.width = pSnapPoint[mini].w + "px";
		}
		if(tabdiv.children[ctab].onfirstload && !tabdiv.children[ctab].firstload){
			tabdiv.children[ctab].onfirstload();
			tabdiv.children[ctab].firstload = true;
		}
		if(tab.ontabchange){
			tab.ontabchange(ctab);
		}
	}
	if(!nodrag && animateMethod !== 1){
		tabdivcontainer.addEventListener("touchstart",touchstart);
		if(animateMethod !== 1)
		tabdivcontainer.addEventListener("touchmove",touchmove, {passive: false});
		tabdivcontainer.addEventListener("touchend",function(){
			setTimeout(function(){
				if(!tabdivcontainer.isanimating)
				if(tabdivcontainer["sw-left"].timer == 0 || tabdivcontainer["sw-left"].outoftime || window.tabdragging != tab.id){
					snap();
				}
			}, 30);
			dragstart = false;
		});
		tab.addEventListener("touchcancel",function(){
			snap();
			dragstart = false;
		});
	}
	if(animateMethod === 1){
		var sk = false;
		tabdivcontainer.addEventListener("scroll", function(){
			if(tmpDisableScrollEvent)return;
			//sk = !sk;
			//if(sk){
			//	return;
			//}
			var o = tabdivcontainer.scrollLeft;
			var j = tabcount;
			var animators=[];
			while(j--){
				if(o > snapPoint[j]){
					if( j < tabcount - 1){
						var percent = ( o - snapPoint[j]) / (snapPoint[1]-snapPoint[0]);
						if(isFrameEnded){
							if(useCvRender){
								animators.push(function(){
									var width = (pSnapPoint[j].w + ((pSnapPoint[j+1].w - pSnapPoint[j].w) * percent));
									var left = pSnapPoint[j].o + (Math.abs(pSnapPoint[j+1].o - pSnapPoint[j].o) * percent);
									tab.cvRender.setMarkPosWidth(left, width, true);
								});
							}else{
								animators.push(function(){
									mark.style.width = (pSnapPoint[j].w + ((pSnapPoint[j+1].w - pSnapPoint[j].w) * percent)) + "px";
									mark.style.transform = "translateX("+ (pSnapPoint[j].o + (Math.abs(pSnapPoint[j+1].o - pSnapPoint[j].o) * percent)) +"px)";
								});
							}
							requestAnimationFrame(function(){
								for(var i=0;i<animators.length;i++){
									animators[i]();
								}
								isFrameEnded = true;
							});
						}
						window.tabdragging = tab.id;
					}
					if(ctab != j){
						ctab = j;
						if(tabdiv.children[ctab].onfirstload && !tabdiv.children[ctab].firstload){
							tabdiv.children[ctab].onfirstload();
							tabdiv.children[ctab].firstload = true;
						}
						if(tab.ontabchange){
							tab.ontabchange(ctab);
						}
					}
					break;
				}
			}
		}, {passive: true});
		if(!useCvRender){
			tabdivcontainer.addEventListener("touchstart", function(){
				mark.style.transition = "none";
			});
		}
	}
	tab.setTabColor = function(hex,text){
		app.pushStatusColor(hex);
		tabber.style.backgroundColor = hex;
		tabpointer.style.backgroundColor = hex;
		if(text){
			tabber.style.color = text;
			mark.children[0].style.backgroundColor = text;
			mark.style.width = pSnapPoint[ctab].w + "px";
		}
		return this;
	}
	tab.current = function(){
		return ctab;
	}
	tab.lock = function(l){
		dragstart = l;
		
	}
	tab.currentTabNode = function(){
		return tabdiv.children[ctab];
	}
	window.addEventListener("resize",function(){
		for(i=0;i<tabber.children.length;i++){
			snapPoint[i] = i * widthspl * tabdivcontainer.scrollWidth / 100;
		}
		snap();
	});
	if(snapfirst)
	snap();
	ui.tabs = ui.tabs || [];
	ui.tabs.push(tab);
	ui.tabs.lock = function(lock){
		for(var i=0;i<ui.tabs.length;i++){
			if(!isInDocumentTree(ui.tabs[i])){
				ui.tabs.splice(i,1);
				i--;
				continue;
			}
			ui.tabs[i].lock(lock);
		}
	}
	return tab;
}
ui.hold = function(e,calb){
	var holdstart = false;
	var xs,ys;
	var tmove = function(){
		holdstart = false;
		e.removeEventListener("touchmove",tmove);
	}
	var tstart = function(event){
		holdstart = true;
		xs = event.changedTouches[0].pageX;
		ys = event.changedTouches[0].pageY;
		setTimeout(function(){
			if(holdstart){
				window.eventpass = {
					target: e,
					clientX: xs,
					clientY: ys
				}
				calb();
			}
			holdstart = false;
		},500);
		e.addEventListener("touchmove",tmove);
	}
	e.addEventListener("touchstart", tstart);
	var tend = function(){
		holdstart = false;
		e.removeEventListener("touchmove",tmove);
	}
	e.addEventListener("touchend", tend);
	e.addEventListener("touchcancel",tend);
	e.unhold = function(){
		e.removeEventListener("touchstart", tstart);
		e.removeEventListener("touchend", tend);
		e.removeEventListener("touchcancel",tend);
	}
}
ui.select=function(){
	var md=createModal("Tùy chọn");
	var bd=md.body();
	md.option=function(val,text){
		var opt=document.createElement("div");
		opt.className="seloption";
		opt.innerHTML=text;
		opt.setAttribute("value",val);
		opt.addEventListener("click", function(){
			md.proc(this.getAttribute("value"));
		});
		bd.appendChild(opt);
	}
	return md;
}
ui.addfilter=function(input,container){
	input.addEventListener("keyup",function(){
		var t = input.value.trim().toLowerCase();
		var c = container.children;
		if(t==""){
			for(var i=0;i<c.length;i++){
				c[i].style.display="";
			}
			return;
		}
		for(var i=0;i<c.length;i++){
			if(c[i].innerHTML.toLowerCase().indexOf(t)>-1){
				c[i].style.display="";
			}else{
				c[i].style.display="none";
			}
		}
	});
	return input;
}
ui.filter=function(input,container){
	var t = input.value.trim().toLowerCase();
	var c = container.children;
	if(t==""){
		for(var i=0;i<c.length;i++){
			c[i].style.display="";
		}
		return;
	}
	for(var i=0;i<c.length;i++){
		if(c[i].innerHTML.toLowerCase().indexOf(t)>-1){
			c[i].style.display="";
		}else{
			c[i].style.display="none";
		}
	}
}
function applyFixedHeight(listOfNodes){
	var baseHeight = parseInt(getComputedStyle(listOfNodes[0]).height);
	for(var i=0;i<listOfNodes.length;i++){
		listOfNodes[i].setAttribute("offset", i * baseHeight);
	}
}
function queryInViewport(parent){
	var c = parent.qq("[sleepwake]");
	var r = [];
	var notInViewport = [];
	var vh = document.body.scrollHeight;
	var sTop = parent.scrollTop;
	var sMax = parent.scrollHeight - vh;
	function isInViewport(el) {
		var y = parseFloat(el.getAttribute("offset") || el.offsetFixed);
		if(y < sTop || y > sTop + vh){
			return false;
		}
		return true;
	}
	for(var i=0;i<c.length;i++){
		if(isInViewport(c[i])){
			r.push(c[i]);
		}else{
			notInViewport.push(c[i]);
		}
	}
	return {
		inViewport: r,
		notInViewport: notInViewport
	};
}
ui.filterSel=function(input,container,sel){
	var t = input.value.trim().toLowerCase();
	var c = container.qq(sel);
	if(t==""){
		for(var i=0;i<c.length;i++){
			c[i].style.display="";
		}
		container.removeAttribute("searching");
		var viewInfo = queryInViewport(container);
		viewInfo.notInViewport.forEach(function(e){
			e.sleep();
		});
		viewInfo.inViewport.forEach(function(e){
			e.wake();
		});
		return;
	}
	for(var i=0;i<c.length;i++){
		if(c[i].innerHTML.toLowerCase().indexOf(t)>-1){
			c[i].style.display="";
		}else{
			c[i].style.display="none";
		}
	}
	container.setAttribute("searching","true");
	container.qq("[sleepwake]").forEach(function(e){e.wake()});
}
//search for bookname when user typed at input#id
ui.minisearch=function(val){
	clearTimeout(window.minisearchtimeout);
	window.minisearchtimeout=setTimeout(function(){
		ajax("ajax=minisearch&search="+val,function(down){
			g("searchbox").innerHTML=down;
		});
	}, 500);
}
ui.readfile =function(calb,fileext, encoding){
	var ip = document.createElement("input");
	ip.type="file";
	ip.onchange = function(){
		var reader = new FileReader();
	    reader.addEventListener('load', function(){
			if(encoding){
				var textDecoder = new TextDecoder(encoding);
				calb(textDecoder.decode(reader.result));
			}else{
				calb(reader.result);
			}
	        
	    });
		if(encoding){
			reader.readAsArrayBuffer(this.files[0]);
		}else{
			reader.readAsText(this.files[0]);
		}
	    
	}
	ip.click();
}
//index.php
//change reader background

function changebg(e) {
	var color = e.style.backgroundColor;
	localStorage.setItem("backgroundcolor", color);
	try {
		g(contentcontainer).style.backgroundColor = color;
		g("full").style.backgroundColor = (color.split(")")[0]+", 0.7)").replace("rgb","rgba");
	} catch (x) {

	}
}

//change reader font color
function changebgx(e) {
	var color = e.style.color;
	localStorage.setItem("fontcolor", color);
	try {
		g(contentcontainer).style.color = color;
	} catch (x) {

	}
}

//change reader font size
function changefontsize(e) {
	var def = e.value;
	try {
		g(contentcontainer).style.fontSize = def + "px";
	} catch (x) {

	}
	localStorage.setItem("fontsize", def);
}

//change reader lineheight
function changelineheight(e) {
	var def = e.value;
	try {
		g(contentcontainer).style.lineHeight = def;
	} catch (x) {

	}
	localStorage.setItem("fontsize2", def);
}
function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex||rgb;
}
function rgbToInt(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = (0xff<<24) + (r << 16) + (g << 8) + b;
    }
    return hex;
}
//load previous config and init some var
function loadConfig() {
	var fontc = localStorage.getItem("fontcolor");
	var bg = localStorage.getItem("backgroundcolor");
	var fonts = localStorage.getItem("fontsize");
	var lh = localStorage.getItem("fontsize2");
	var fontfam=localStorage.getItem("fontfamily");
	var cfont=localStorage.getItem("ctpfont");
	var padding = localStorage.getItem("padding");
	var align=localStorage.getItem("textalign");
	var setting=localStorage.getItem("setting");
	var lshadow=localStorage.getItem("textlshadow");
	if(setting!=null){
		window.setting = JSON.parse(setting);
	}else{
		window.setting = {
			autosave:true,
			autosync:false,
			autofootprint:false,
			allowchiname:true,
			peoplefilter:true,
			factionfilter:true,
			allowtaptoedit:true,
			scopefilter:true,
			skillfilter:true,
			skilluppercase:false,
			allownamev3:true,
			allowanalyzerupdate:true
		};
		localStorage.setItem("setting", JSON.stringify(window.setting));
	}
	if(window.setting.allowunitymode){
		$("#btnunitymode").css({display:"block",opacity : 1});
		document.addEventListener("scroll", ui.unity.scroll);
		document.addEventListener("touchstart", ui.unity.touchstart);
		document.addEventListener("touchmove", ui.unity.touchmove);
	}
	//ui.sh(ui.web.s);
	//cfg_autonext = (localStorage.getItem("cfg_autonext") == 'true');
	//cfg_infscroll = (localStorage.getItem("cfg_infscroll") == 'true');
	var isstylable=false;
	var stylablediv = q(".contentbox");
	if(stylablediv.length > 0){
		isstylable=true;
	}
	if(isstylable){
		stylablediv.forEach(function(e){
			if (fontc != null) {
				try {
					e.style.color = fontc;
				} catch (e2) {}
			}
			if(bg==null){
				//bg = "rgb(234,228,211)";
			}
			if (bg != null) {
				try {
					e.style.backgroundColor = bg;
					g("full").style.backgroundColor = (bg.split(")")[0]+", 0.7)").replace("rgb","rgba");
					if(getCookie("theme")=="light"){
						g("tm-bot-nav").className+=" reader-add";
						g("mainbar").className+=" reader-add";
						g("commentportion").className+=" reader-add";
						g("tm-credit-section").className+=" reader-add";
						g("full").appendChild(g("tm-credit-section"));
						g("id").className+=" reader-add";
					}
					var mt = document.createElement("meta");
					mt.setAttribute("name", "theme-color");
					mt.setAttribute("content", rgbToHex(bg));
					document.head.appendChild(mt);
				} catch (e2) {}
			}
			if(fonts==null){
				//fonts = 24;
			}
			if (fonts != null) {
				try {
					e.style.fontSize = fonts + "px";
					g("changefs").value = fonts;
				} catch (e2) {}
			}
			if(lh == null){
				//lh = "1.8";
			}
			if (lh != null) {
				try {
					e.style.lineHeight = lh;
					g("changefs2").value = lh;
				} catch (e2) {}
			}
			if (fontfam != null ) {
				if(!window.lockCtp){
					try {
						e.style.fontFamily = fontfam;
						g("selfont").value = fontfam;
						window.fontfam = fontfam;
					} catch (e2) {}
				}
				else{
					try {
						var stvfont = ["arial","tahoma","verdana"];
						if(stvfont.indexOf(fontfam) > -1){
							fontfam = "stv"+fontfam;
						}
						e.style.fontFamily = fontfam;
						g("selfont").value = fontfam;
						window.fontfam = fontfam;
					} catch (e2) {}
					if(cfont!=null){
						try {
							e.style.fontFamily = cfont;
							g("selfont").value = cfont;
							//setFontset();
						} catch (e2) {}
					}
				}
			}
			if (padding != null) {
				if(!window.isComic)
				try {
					e.style.padding = padding;
				} catch (e2) {}
			}
			if (align != null) {
				try {
					e.style.textAlign= align;
				} catch (e2) {}
			}
			if (lshadow != null) {
				try {
					e.style.textShadow = lshadow;
				} catch (e2) {}
			}
		});
	}
	
	var timeelap=document.querySelectorAll(".timeelap");
	timeelap.forEach(function(e){
		e.innerHTML=timeElapsed(e.innerHTML,true);
	});
	setTimeout(function(){
		var timeelap=document.querySelectorAll(".timeelap");
			timeelap.forEach(function(e){
				e.innerHTML=timeElapsed(e.innerHTML,true);
			});
	}, 3000)
	//synctusach();
	//syncvp();
	if(isstylable)
	try{
		ui.unity(true);
	}catch(xxxxx){}
	
}

//show user notification modal
function notification(){
	var md=createModal("Thông báo");
	md.size("md");
	md.body().innerHTML="<center><br><span class='spinner-border'></span><br>Đang tải thông báo...</center>";
	md.body().style.maxHeight = '325px';
	md.body().style.overflowY = 'auto';
	md.body().style.padding = "0px";
	md.querySelector(".modal-footer").style.display = 'none';
	md.querySelector(".modal-content").style.overflow = 'hidden';
	var xhttp = new XMLHttpRequest();
	var params="ajax=notification";
	xhttp.open("POST","/index.php",true);
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
			md.body().innerHTML=this.responseText;
			g("notifmarker").removeAttribute("havenotif");
			ui.infinity(md.body(),"ajax=notification")
				.setAnim().setPager("p",1);
		}
	};
    xhttp.send(params);
    md.show();
}

//
function closemenuwindow(){
	g("menunavigator").style.display="none";
	ismenushow=false;
}
var ismenushow=false;
function showmenu(a){
	if(ismenushow){
		a.children[1].style.display="none";
		ismenushow=false;
	}else{
		a.children[1].style.display="block";
		ismenushow=true;
	}
}

//decrease reader fontsize
function decreaseFontsize(){
	var curr = parseInt(g("changefs").value);
	curr--;
	if(curr<10)curr=10;
	try{
		g(contentcontainer).style.fontSize=curr +"px";
		g("changefs").value=curr;
	}catch(x){}
	localStorage.setItem("fontsize",curr);
}

//increase reader fontsize
function increaseFontsize(){
	var curr = parseInt(g("changefs").value);
	curr++;
	if(curr>50)curr=50;
	try{
		g(contentcontainer).style.fontSize=curr +"px";
		g("changefs").value=curr;
	}catch(x){}
	localStorage.setItem("fontsize",curr);
}

//change reader textalign
function changealign(el){
	try {
		g(contentcontainer).style.textAlign = el.getAttribute("val");
		localStorage.setItem("textalign", el.getAttribute("val"));
	} catch(e) {
		console.log(e);
	}
}

//decrease reader lineheight
function decreaseLineheight(){
	var curr = parseFloat(g("changefs2").value);
	curr-=0.1;
	if(curr<0.5)curr=0.5;
	curr=curr.toFixed(1);
	try{
		g(contentcontainer).style.lineHeight=curr;
		g("changefs2").value=curr;
	}catch(x){}
	localStorage.setItem("fontsize2",curr);
}

//increase reader padding
function increasepadding(){
	try{
		g(contentcontainer).style.padding = (parseInt(g(contentcontainer).style.padding)+4) +"px";
		localStorage.setItem("padding", g(contentcontainer).style.padding);
	}catch(x){
		g(contentcontainer).style.padding = "4px";
		localStorage.setItem("padding", g(contentcontainer).style.padding);
	}
}

//decrease reader padding
function decreasepadding(){
	try{
		g(contentcontainer).style.padding = (parseInt(g(contentcontainer).style.padding)-4) +"px";
		localStorage.setItem("padding", g(contentcontainer).style.padding);
	}catch(x){}
}

//increase reader lineheight
function increaseLineheight(){
	var curr = parseFloat(g("changefs2").value);
	curr+=0.1;
	if(curr>3)curr=3;curr=curr.toFixed(1);
	try{
		g(contentcontainer).style.lineHeight=curr;
		g("changefs2").value=curr;
	}catch(x){}
	localStorage.setItem("fontsize2",curr);
}

//
function fastCreateN(e){
	g("fastgentext").value=titleCase(e.value);
}

//show the reader styling box
function showConfigBox(){
	if(g("configBox").style.display=="block")
		g("configBox").style.display="none";
	else g("configBox").style.display="block";
}
//window.wt=+new Date();
//setTimeout(function(){
//	if(window.tryCollect){
//		window.fc=tryCollect;
//		window.tryCollect=function(){};
//	}
//}, 2000);
//setTimeout(function(){
//	if(window.scrollY==ui.web.s.h&&100<ui.web.s.t){
//		window.tryCollect=window.fc;
//	}
//},14000);
//unity-reading-mode
ui.unity=function(onoff){
	if(!window.setting.allowunitymode){
		return;
	}
	if(!/truyen\/\w+\/\d\/\d+\/[1-9]/.test(location.href))return;
	if(onoff==null){
		var onoff2 = localStorage.getItem("unitymode");
		if(onoff2==null){
			localStorage.setItem("unitymode","true");
			onoff=true;
		}else if(onoff2=="false"){
			onoff=true;
			localStorage.setItem("unitymode","true");
		}else if(onoff2=="true"){
			onoff=false;
			localStorage.setItem("unitymode","false");
		}
	}else{
		var onoff2 = localStorage.getItem("unitymode");
		if(onoff2==null){
			localStorage.setItem("unitymode","false");
			onoff=false;
		}else if(onoff2=="true"){
			onoff=true;
		}else if(onoff2=="false"){
			onoff=false;
		}
	}
	if(onoff){
		
		g("btnnextchapter").style.display = 'block';
		g("btnprevchapter").style.display = 'block';
		g("commentportion").style.display = 'none';
		g("tm-credit-section").style.display='none';
		g("breadcum").className='';
		var mct=g(contentcontainer).parentElement;
		var cn=mct;
		var cpst;
		while (cn.nE()!=null&&cn.nE().nE()!=null&&cn.nE().nE().nE()!=null) {
			cn=cn.nE();
			cpst=getComputedStyle(cn);
			if(cpst.display != 'none'){
				cn.defdis=cpst.display;
				ui.unity.hidden.push(cn);
				cn.style.display = 'none';
			}
		}
		cn=mct;
		while (cn.pE()!=null) {
			cn=cn.pE();
			if(cn.id=="breadcum")continue;
			cpst=getComputedStyle(cn);
			if(cpst.display != 'none'){
				cn.defdis=cpst.display;
				ui.unity.hidden.push(cn);
				cn.style.display = 'none';
			}
		}
		cn=g("inner");
		while (cn.pE()!=null) {
			cn=cn.pE();

			cpst=getComputedStyle(cn);
			if(cpst.display != 'none'){
				cn.defdis=cpst.display;
				ui.unity.hidden.push(cn);
				cn.style.display = 'none';
			}
		}
	}else{
		g("btnnextchapter").style.display = 'none';
		g("btnprevchapter").style.display = 'none';
		g("commentportion").style.display = 'block';
		g("tm-credit-section").style.display='block';
		g("breadcum").className='container bg-light tm-reader-top-br';
		while (ui.unity.hidden.length>0) {
			var ele=ui.unity.hidden.pop();
			ele.style.display = ele.defdis;
		}
	}
}
ui.unity.hidden=[];
ui.unity.scroll=function(){
	if(document.body.scrollTop + document.body.clientHeight 
		> document.body.scrollHeight - 350){
		$("#btnnextchapter").css({background : 'wheat',opacity :1});
		if(!window.setting.blockunitymerge)
		ui.unity.getnextchapterkey();
		document.addEventListener("touchstart", ui.unity.touchstart);
	}else{
		document.removeEventListener("touchstart",ui.unity.touchstart);
		$("#btnnextchapter").css({background : 'none',opacity :0.3});
	}
	if(document.body.scrollTop < 80){
		$("#btnprevchapter").css({background : 'wheat',opacity : 1});
		$("#btnunitymode").css({display:"block",display : "block"});
	}else{
		$("#btnprevchapter").css({background : 'none',opacity : 0.3});
		$("#btnunitymode").css({display:"none",display : "none"});
	}
}
ui.web={};
ui.web.s=function(){
	ui.web.s.t+=(window.scrollY - ui.web.s.h);
	ui.web.s.h=window.scrollY;
}
ui.web.s.h=0;
ui.web.s.t=0;
ui.unity.touchstart=function(e){
	ui.unity.starty=e.targetTouches ? e.targetTouches[0].screenY : e.screenY;
}
ui.unity.threshold=(window.innerHeight||document.body.clientHeight) * 0.25;
ui.unity.touchmove=function(e){
	if(document.body.scrollTop + (window.innerHeight||document.body.clientHeight) 
		> document.body.scrollHeight - 10){
		var endy=e.targetTouches ? e.targetTouches[0].screenY : e.screenY;
		if(window.setting.blockunitymerge && ui.unity.starty - endy > ui.unity.threshold){
			g("navnexttop").click();
		}
	}
}
ui.unity.getnextchapterkey =function(){
	if(typeof newchapid == "undefined" || newchapid=="0"){
		return;
	}
	ui.unity._getnextchapterkey=ui.unity.getnextchapterkey;
	ui.unity.getnextchapterkey=function(){};
	g("navnexttop").setAttribute("href",g("navnextbot").href);
	var contentfather = g("content-container");
	var newchapcontent = document.createElement("div");
	newchapcontent.setAttribute("style", g(contentcontainer).getAttribute("style"));
	newchapcontent.setAttribute("id", contentcontainer);
	newchapcontent.setAttribute("cid", newchapid);
	newchapcontent.style.marginTop = "15px";
	newchapcontent.className="contentbox";
	newchapcontent.innerHTML = '<br><center><span class="spinner-border"></span><br>Đang tải nội dung chương...</center><br>';
	g(contentcontainer).setAttribute("id", "oldmaincontent-"+currentid);
	contentfather.appendChild(newchapcontent);
	//var a=document.createElement("script");
	//document.body.appendChild(a);
	//a.onload=function(){
		ui.unity.loadnextchapter(newchapcontent);
	//}
	//a.src="/keygenerate.php?nc="+newchapid+"&k="+k.join(",");
	
	//window.keygenerated=function(k){
	//	window.k=k;
	//	setTimeout(function(){
	//		a.remove();
	//	}, 1000);
	//	window.keygenerated=null;
	//	ui.unity.loadnextchapter(newchapcontent);
	//}
}
ui.unity.loadnextchapter=function(newchapcontent){
	ui.unity._loadnextchapter=ui.unity.loadnextchapter;
	ui.unity.loadnextchapter=function(){};

	chapterfetcher.open('POST', '/index.php?ajax=readchapter&bookid='+bookid+'&h='+bookhost+'&c='+newchapid+'&sty='+booksty,true);
	chapterfetcher.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	chapterfetcher.onreadystatechange = function() {
		if (chapterfetcher.readyState == 4 && chapterfetcher.status == 200) {
			var x = JSON.parse(chapterfetcher.responseText);
			if (x.code == "0") {
				chapcache[newchapid]=x;
				newchapcontent.setAttribute("chapname", x.chaptername);
				g("navnextbot").setAttribute("href", `/truyen/${x.bookhost}/1/${x.bookid}/${x.next}/`);
				g("navcenterbot").setAttribute("href", `/truyen/${x.bookhost}/1/${x.bookid}/`);
				document.title=x.chaptername+" - " +x.bookname +" - Sáng Tác Việt - sangtacviet.com";
				//newchapcontent.innerHTML=x.chaptername+"<br><br>"+x.data;
				//loadnodedata();
				
				//var tmpct = document.createElement("div");
				//tmpct.innerHTML= preprocess(x.chaptername+"<br><br>"+x.data);
				//moveitoupper(tmpct.innerHTML);
				x.data = "<div class='text-center p-2'>"+x.chaptername+"</div><br>"+x.data;
				if(window.moveitoupper){
					tmpctn.innerHTML= preprocess(x.data);
					moveitoupper(tmpctn.innerHTML);
				}else{
					g(contentcontainer).innerHTML = preprocess(x.data);
				}

				currentid=newchapid;
				history.replaceState({},document.title,`/truyen/${x.bookhost}/1/${x.bookid}/${newchapid}/`);
				updateTusach();
				ui.unity.getnextchapterkey=ui.unity._getnextchapterkey;
				ui.unity.loadnextchapter=ui.unity._loadnextchapter;
				var thischapid = window.newchapid;
				
				if(x.next==0||x.next=="0"||x.prev==0||x.prev=="0"){
					updatenewlink(x.bookhost,x.bookid,thischapid);
				}
				window.newchapid=x.next;
				applyNodeList();
				excute();
			} else {
				alert(x.err+"\n"+location.href);
			}
			if(g("content-container").children.length>2){
				var contentfather = g("content-container");

				for(var i=0;i<contentfather.children.length-2;i++){
					var oldc = contentfather.children[i];
					oldc.style.height = oldc.clientHeight;
					oldc.innerHTML="";
				}
				
			}
		}else {
			if (chapterfetcher.readyState == 4 && chapterfetcher.status-500 >= 0){
				newchapid.innerHTML = '<br><center>Http Error '+chapterfetcher.status+'</center><br>';
			}
		}
	}
	chapterfetcher.send();
}
ui.win={}
ui.win.close=function(n){
	if(n.className=="window"){
  	n.onclose();
  }else
  {
  	while(n.className!="window"){
    	n=n.parentElement;
    }
    n.onclose();
  }
}
ui.win.fullscreen=function(n){
  	while(n.className!="window"){
    	n=n.parentElement;
    }
    n.children[0].classList.toggle("full");
    try {
    	if(n.hasAttribute("fullscreen")){
	    	n.removeAttribute("fullscreen");
	    	if(q('[fullscreen]').length == 0){
	    		document.body.style.overflow="auto";
	    	}
	    	n.querySelector(".head").style.cursor="move";
	    	n.querySelector(".fuller").children[0].className="fas fa-expand";
	    }else{
	    	n.setAttribute("fullscreen", "true");
	    	n.querySelector(".fuller").children[0].className="fas fa-compress";
	    	n.querySelector(".head").style.cursor="default";
			document.body.style.overflow="hidden";
	    }
    }catch(e){}
}
ui.win.minimize=function(n){
	if(n.className=="window"){}
	else
	{
	  	while(n.className!="window"){
	    	n=n.parentElement;
	    }
	}
	if(n.getAttribute("instack")=="true"){}else{
		ui.win.stack.put(n);
	}
	n.setAttribute("minimized", "true");
	n.style.display="none";
}
ui.win.stack={
	show:function(wid){
		if(this[wid]){
			var w = this[wid];
			w.setAttribute("minimized","false");
			w.style.display="block";
		}
	},
	put:function(win){
		var wdname ="win" + randonInt(0,1000);
		while(wdname in this){
			wdname ="win" + randonInt(0,1000);
		}
		this[wdname] = win;
		win.setAttribute("instack", "true");
		win.onclose=function(){
			this.setAttribute("minimized", "true");
			this.style.display="none";
		}
		this.createButton(wdname);
	},
	createButton:function(wdname){
		var btn = document.createElement("button");
		$(btn).attr({
			type:"button",
			id:"bs-"+wdname,
			onclick:"ui.win.stack.show('"+wdname+"')"
		});
		var btntext = this[wdname].tit();
		if(btntext.length>8){
			btntext=btntext.substr(0,8) + "..";
		}
		btn.innerHTML='<i class="fas fa-window-maximize"></i><br><span style="font-size:10px">'+btntext+'</span>';
		g("float-btn").insertBefore(btn,g("float-btn").children[0]);
	}
}

ui.win.create=function(title){
	var win=document.createElement("div");
  win.className="window";
  win.innerHTML='<div onclick="event.stopPropagation()"><div class="head" b><span class="headtext"></span><span class="closer" onclick="ui.win.close(this)"><i class="fas fa-times"></i></span><span class="fuller" onclick="ui.win.fullscreen(this)"><i class="fas fa-expand"></i></span></div><div class="body"></div></div>';
  win.body=function(){
  	return win.querySelector(".body");
  }
  win.tit=function(nt){
  	if(nt)
  		win.querySelector(".headtext").innerHTML=nt;
  	else{
  		return win.querySelector(".headtext").innerHTML;
  	}
  }
  var header = win.querySelector(".head");
  win.movestate={
  		init:false,
  		nd:win.children[0],
		resize:function(){
			var mvlr=event.pageX - this.crX;
			var mvud=event.pageY - this.crY;
			this.crX=event.pageX;
			this.crY=event.pageY;
			var movedx = this.left + mvlr;
			var movedy = this.top + mvud;
			this.nd.style.left = movedx;
			this.nd.style.top = movedy;
			this.left=movedx;
			this.top=movedy;
		}
  }
  header.addEventListener("mousedown", function(){
  	 	var wd = ui.win.getWindow(this);
  	 	var wdbox =wd.children[0];
  		if(wd.hasAttribute("fullscreen")){
  			return;
  		}
  		if(wd.movestate.init==false){
  			wd.movestate.init=true;
  			var bounding = wdbox.getBoundingClientRect();
  			wd.movestate.left=bounding.x + bounding.width/2;
  			wd.movestate.top=bounding.y + bounding.height/2;
  			wdbox.style.left=wd.movestate.left;
  			wdbox.style.top=wd.movestate.top;
  		}
		wd.movestate.crX=event.pageX;
		wd.movestate.crY=event.pageY;
		var funmm=function(){
			wd.movestate.resize();
		}
		document.addEventListener("mousemove",funmm);
		var funmv=function(){
			document.removeEventListener("mousemove", funmm);
			document.removeEventListener("mouseup", funmv);
		}
		document.addEventListener("mouseup",funmv);
  });
  win.tit(title);
  win.onclose=function(){
  	if(this.hasAttribute("fullscreen")){
  		if(q('[fullscreen]').length == 1){
    		document.body.style.overflow="auto";
    	}
  	}
  	this.remove();
  }
  win.minimizable=function(){
  	var sp = document.createElement("span");
  	$(sp).attr({class:"minimize",onclick:"ui.win.minimize(this)"});
  	sp.innerHTML='<i class="far fa-window-minimize"></i>';
  	win.querySelector(".head").appendChild(sp);
  }
  win.setAttribute("onclick","ui.win.close(this)");
  win.body.sec=function(text){
  	var sc = document.createElement("div");
    sc.setAttribute("sechead","");
    sc.innerHTML=text;
    win.body().appendChild(sc);
    return sc;
  }
  win.body.row=function(text){
  	if(text!=null){
    	win.body.sec(text);
    }
  	var r = document.createElement("div");
    r.className="roww";
    win.body().appendChild(r);
    r.addPadder=function(){
    	this.appendChild(win.padder());
    }
    r.addText=function(text){
    	r.innerHTML+="<span class='txt'>"+text+"</span>";
    	return r.lastChild;
    }
    r.addToggle=function(oncheckchange){
    	var tg= win.toggle(oncheckchange);
      r.addPadder();
      this.appendChild(tg);
      return tg;
    }
    r.addInput=function(id,placeholder){
      var ip= win.input();
      ip.setAttribute("id",id);
      ip.setAttribute("placeholder",placeholder);
      this.appendChild(ip);
    	return ip;
    }
    r.addButton=function(text,click,color,right){
    	var btn=win.button(text,click,color);
      if(right!=null){
      	r.addPadder();
      }
      r.appendChild(btn);
      return btn;
    }
    return r;
  }
  win.checkbox=function(){}
  win.toggle=function(cb){
  	var tg = document.createElement("input");
    tg.setAttribute("type","checkbox");
    tg.setAttribute("right","");
    tg.setAttribute("toggle","");
    tg.onclick=cb;
    return tg;
  }
  win.padder=function(){
  	var pd=document.createElement("div");
    pd.className="padder";
    return pd;
  }
  win.input=function(){
  	var tg = document.createElement("input");
    tg.setAttribute("type","text");
    return tg;
  }
  win.label=function(){}
  win.data=function(key,value){
  	if(value!=null){
    	win.key=value;
    }else{
    	return key;
    }
  }
  win.button=function(text,onclick,color){
  	var btn=document.createElement("button");
    btn.setAttribute("onclick",onclick||"");
    btn.innerHTML=text;
    btn.className=color||"";
    return btn;
  }
  win.show=function(){
  	document.body.appendChild(win);
  }
  win.hide=function(){
  	win.remove();
  }
  win.addContent=function(str){
  	var token=str.split("|");
    var rw=win.body.row();
    if(token[0]=="btn"){
    	
      if(token[1]){};
    }
  }
  return win;
}
ui.win.createFrame=function(title,link){
	var wd=ui.win.create(title);
	var wdname = ui.createName();
	wd.showLink=function(reallink){
		if(!reallink){
			reallink=link;
		}
		var sp =document.createElement("span");
		sp.className="gotolink";
		sp.innerHTML='<i class="fas fa-arrow-alt-to-right"></i>';
		sp.onclick=function(){
			window.location = reallink;
		}
		wd.querySelector(".head").appendChild(sp);
	}
	wd.body().innerHTML="<iframe id='window-"+wdname+"' src='"+link+"&sourcename="+wdname+"' style='width:100%;height:100%;border:none;'  target='_self'></iframe>";
	return wd;
}
ui.win.createBox=function(title,link){
	var wd=ui.win.create(title);
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var response = ajax.responseText;
			wd.body().innerHTML=response;
			var arr = wd.body().getElementsByTagName('script');
			for (var n = 0; n < arr.length; n++)
				(function(){
				    eval.apply(this, arguments);
				}(arr[n].innerHTML))
		}
	};
	ajax.open("GET", "/frame/"+link+".php", true);
	ajax.send();
	return wd;
}
ui.win.getWindow=function(e){
	while(e.className!="window"){
    	e=e.parentElement;
    }
    return e;
}
function ip(id){
	var e = g("ip-"+id);
	if(!e){
		return g(id);
	}
	return e;
}
function val(id){
	var e = ip(id);
	if(e.type=="checkbox"){
		return ip(id).checked;
	}
	return ip(id).value||ip(id).checked||"";
}
function setval(id,val){
	ip(id).value=val;
}
function modact(param,callb){
	var http = new XMLHttpRequest();
	http.open('POST', "/background/action.php", true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			if(callb){
				callb(http.responseText);
			}
		}
	}
	http.send(param);
}
var pushserver=null;
ui.style={};
ui.style.buildcss=function(obj){
	var css="";
	for(var style in obj){
		css += style.replace(/([A-Z])/g, function(m){
			return "-" + m.toLowerCase();
		}) + ":" + obj[style] + ";";
	}
	return css;
}
ui.style.parsecss=function(txt){
	var obj = txt.split(";");
	var css={};
	var _t;
	for(var i=0;i<obj.length;i++){
		_t = obj[i].trim();
		if(_t != ""){
			var express = _t.split(":");
			css[express[0].trim()]=express[1].trim();
			if(_t[0]!="-")
			css[express[0].replace(/([a-z]\-[a-z])/g, function(a,b){ return a[0]+a[2].toUpperCase() })] = express[1].trim() || ""; 
		}
	}
	return css;
}
ui.style.create=function(text){
	var st = document.createElement("style");
	st.collection={};
	st.build=function(){
		var css=[];
		for(var id in this.collection){
			css.push(id+"{"+this.collection[id].txt+"}");
		}
		this.innerHTML=css.join("");
		return this;
	};

	st.set=function(id,css){
		if(typeof css == "string"){
			this.collection[id] = {txt:css, css: ui.style.parsecss(css)};
		}else{
			this.collection[id] = {txt:ui.style.buildcss(css), css: css};
		}
		this.build();
		return this;
	};
	st.update=function(id,val){
		var stl = this.collection[id];
		if(typeof css == "string"){
			var newstl = ui.style.parsecss(css);
			for(var style in newstl){
				stl.css[style] = newstl[style];
			}
			stl.txt = ui.style.buildcss(stl.css);
		}else{
			for(var style in val){
				stl.css[style] = val[style];
			}
			stl.txt = ui.style.buildcss(stl.css);
		}
		this.build();
		return this;
	}
	st.refresh = function(){
		for(var key in this.collection){
			var o = this.collection[key];
			o.txt = ui.style.buildcss(o.css);
		}
		this.build();
	}
	st.use=function(){
		document.head.appendChild(st);
		return this;
	}
	st.hide=function(){
		document.head.removeChild(st);
		return this;
	}
	if(text != null){
		st.innerHTML=text;
	}
	return st;
}
ui.scriptmanager={stack:{}};
ui.scriptmanager.load = function(scrurl, onload, nocache){
	if(scrurl in this.stack){
		if(onload){
			(async function(pm, onload){
				await pm;
				onload();
			})(this.stack[scrurl], onload);
		}
		return;
	}else{
		var sc = document.createElement("script");
		var loaded = false, load = null;
		document.head.appendChild(sc);
		sc.onload = function(){
			loaded = true;
			if(onload){
				onload();
			}
			if(load){
				load();
			}
			this.remove();
		}
		if(nocache){
			scrurl += "?nocache="+Math.random();
		}
		sc.src = scrurl;
		this.stack[scrurl] = new Promise(function(rs){
			if(loaded){rs();}
			load = rs;
		});
	}
}
var st=ui.style;
function loadTusachModal(){
	var md = createModal("Dữ liệu cá nhân");
	var doma = location.protocol + "//" + location.host;
	md.body().innerHTML = 
	"<br><center>Vị trí dữ liệu hiện tại: "+doma+"</center><br>"
	+
	"<br><center><button class='btn btn-primary' onclick='exportTusach()'>Tải xuống lịch sử đọc và name <i class=\"fas fa-file-download\"></i></button></center><br>"
	+"<br><center><button class='btn btn-primary' onclick='g(\"importfile\").click()'>Nhập lịch sử đọc và name<i class=\"fas fa-file-import\"></i></button></center><br>"
	+"<input type='file' name='aaa' style='display:none' id='importfile'  accept='.txt' onchange='importTusach(this.files)'>"+
	"<center>Ghi chú: dữ liệu hiện có sẽ bị ghi đè, nếu vị trí dữ liệu của bạn k vào dc, có thể dùng <b>VPN</b> truy cập, tải về, rồi sang web mới.</center>";
	md.show();
}
function importTusach(fl) {
    const reader = new FileReader();
    reader.addEventListener('load', function(){
        var js = JSON.parse(reader.result);
        if(js.tusach){
        	localStorage.setItem("tusach", js.tusach);
        }
        for(var hn in js.name){
			localStorage.setItem(hn,js.name[hn]);
		}
		location.reload();
    });
    reader.readAsText(fl[0]);
}
function exportTusach() {
	if(window.hmeta){
		var hostname = [];
		for(var n in hmeta){
			hostname.push(n);
		}
		var nm = new RegExp("^("+hostname.join("|")+")\\d+","i");
		var jdata = { name: {}};
		if(localStorage.getItem("tusach")){
			jdata.tusach = localStorage.getItem("tusach");
		}
		for(var k in localStorage){
			if(nm.exec(k)){
				jdata.name[k]=localStorage.getItem(k);
			}
		}
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(jdata)));
		element.setAttribute('download', "dulieu"+(new Date().toJSON().slice(0,10)) + ".txt");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}else
	ui.scriptmanager.load("/stv.host.js",exportTusach);
}
function indexTusach(){
	window.tusach = {};
	window.orderedTusach = [];
	var ts = store.getItem("tusach").split("~/~");
	for(var i=0;i<ts.length;i++){
		var e = ts[i];
		if(e){
			var j = JSON.parse(e);
			tusach[j.host+"-"+j.id] = i;
			orderedTusach.push(e);
		}else{
			orderedTusach.push(e);
		}
	}
}
function clearOldHistory(){
	var ts = store.getItem("tusach").split("~/~");
	for(var i=750;i<ts.length;i++){
		var e = ts[i];
		if(e){
			var j = JSON.parse(e);
			var order = getChapterOrder(j.current);
			if(order > 0 && order < 6){
				ts[i] = "";
			}
		}
	}
	if([].filter){
		var cleaned = ts.filter(function(e){return e!="";}).join("~/~");
		store.setItem("tusach", cleaned);
	}
}
function getChapterOrder(name){
	var rg =/[0-9]+/;
	var m = rg.exec(name);
	if(m){
		return parseInt(m[0]);
	}else{
		return 999;
	}
}
function syncdo(type){
	if(type=="sync"){
		var l = store.getItem("tusach");
		if(l)l=l.length;
        ajax("ajax=synctusach&step=1&length="+l,function(data){
            if(data=="needsync"){
                ajax("ajax=synctusach&step=2",function(data2){
                    var ss=store.getItem("tusach");
                    if(ss!=null){
                        var oldleng=ss.length;
                        //var clienttusach=ss.split("~/~");
                        indexTusach();
                        var servertusach=data2.split("~/~");
                        servertusach.forEach(function(e){
                            if(e!=""){
                                try {
                                    var f=JSON.parse(e);
                                    var ind = f.host+"-"+f.id;
                                    if(!(ind in tusach)){
                                    	orderedTusach.push(e);
                                    }
                                    // var flag=false;
                                    // clienttusach.forEach(function(e2){
                                    //     try {
                                    //         var f2=JSON.parse(e2);
                                    //         if(f2.host==f.host&&f2.id==f.id){
                                    //             flag=true;
                                    //         }
                                    //     } catch(e6) {
                                    //     }
                                    // });
                                    // if(!flag){
                                    //     clienttusach.push(e);
                                    // }
                                } catch(e5) {
                                }
                            }
                        });
                        var newss=orderedTusach.join("~/~");
                        store.setItem("tusach",newss);
                        if(newss.length>oldleng){
                            syncdo("update");
                        }
                    }else
                    store.setItem("tusach",data2);
                });
            }else{
                if(this.responseText=="needupload"){
					
				}
            }
        });
	}else if (type=="update") {
		clearOldHistory();
		ajax("ajax=synctusach&step=3&data="+encodeURIComponent(store.getItem("tusach")),function(d){});
	}
}
function setSelectOptions(s,o){
	s.innerHTML = "";
	for(var i in o){
		var option = document.createElement("option");
		option.value = i;
		option.innerHTML = o[i];
		s.appendChild(option);
	}
}
function setFontset(){
	setSelectOptions(g("selfont"),{
		"opensans":"OpenSans",
		"nunito":"Nunito",
	});
}
ui.createMenu = function(menu){
	var div = document.createElement("div");
	div.className = "contextmenu";
	for(var i=0; i<menu.item.length; i++){
		var d = document.createElement("div");
		d.className = "contextmenuitem";
		d.innerHTML = menu.item[i].text;
		if(menu.item[i].text.length >= 30){
			d.style.whiteSpace = "normal";
			d.style.maxWidth = "250px";
		}
		let action = menu.item[i].onclick;
		if(menu.item[i].value){
			d.value = menu.item[i].value;
		}
		d.addEventListener("click", function(){
			if(menu.type == "select" && menu.selection){
				eval(menu.selection+`='${this.value}'`);
			}
			if(typeof action == "function"){
				action();
			}else{
				eval(action);
			}
		});
		if(menu.selection && menu.item[i].value == eval(menu.selection)){
			d.classList.add("selected");
		}
		div.appendChild(d);
	}
	return div;
}
ui.showMenu = function(menu){
	var menupop = this.createMenu(menu);
	g("ctxoverlay").appendChild(menupop);
	var width = menupop.scrollWidth;
	var screenWidth = document.body.scrollWidth;
	var e = event || window.eventpass;
	var x = e.clientX;
	var y = e.clientY;
	if(x + width < screenWidth){
		menupop.style.left = x + "px";
	}else{
		menupop.style.left = (x - width) + "px";
	}
	menupop.style.top = e.clientY + "px";
	if(menu.type == "tap"){
	}
	if(menu.type == "select"){
		menupop.classList.add("contextmenu-select");
	}
	if(!g("ctxoverlay").onclick){
		g("ctxoverlay").onclick = function(){
			g("ctxoverlay").innerHTML = "";
		}
		g("ctxoverlay").oncontextmenu = function(){
			g("ctxoverlay").innerHTML = "";
			return false;
		}
	}
}

ui.color = {
	lighter: function(color, percent){
		var num = parseInt(color.slice(1),16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = (num >> 8 & 0x00FF) + amt,
		G = (num & 0x0000FF) + amt;
		return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
	},
	darker: function(color, percent){
		var num = parseInt(color.slice(1),16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) - amt,
		B = (num >> 8 & 0x00FF) - amt,
		G = (num & 0x0000FF) - amt;
		return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
	},
	rgbToHex: function(r, g, b){
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	},
	rgbStringToHex: function(rgb){
		if(this.isHex(rgb)){
			return rgb;
		}
		var rgb = rgb.replace("rgb(","").replace(")","").split(",");
		return this.rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
	},
	rgbaToHex: function(r, g, b, a){
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + Math.round(a * 255).toString(16);
	},
	hexToRgb: function(hex){
		if(this.isRgb(hex)){
			return hex;
		}
		var bigint = parseInt(hex.replace("#",""), 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		return [r,g,b];
	},
	hexToRgbString: function(hex){
		var rgb = this.hexToRgb(hex);
		return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
	},
	isLight: function(color){
		var rgb = this.hexToRgb(color);
		var a = 1 - ( 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2])/255;
		if(a < 0.5){
			return true;
		}else{
			return false;
		}
	},
	isDark: function(color){
		return !this.isLight(color);
	},
	addOpacity: function(color, opacity){
		var rgb = this.hexToRgb(color);
		return "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+opacity+")";
	},
	compare: function(color1, color2){
		var rgb1 = this.hexToRgb(color1);
		var rgb2 = this.hexToRgb(color2);
		var r = Math.abs(rgb1[0] - rgb2[0]);
		var g = Math.abs(rgb1[1] - rgb2[1]);
		var b = Math.abs(rgb1[2] - rgb2[2]);
		return r+g+b;
	},
	isEqual: function(color1, color2){
		if(this.isRgb(color1)){
			color1 = this.rgbStringToHex(color1);
		}
		if(this.isRgb(color2)){
			color2 = this.rgbStringToHex(color2);
		}
		return this.compare(color1, color2) == 0;
	},
	isHex: function(color){
		return color.match(/^#[0-9A-F]{6}/i) != null;
	},
	isRgb: function(color){
		return color.match(/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/i) != null;
	},
	invert: function(color){
		var rgb = this.hexToRgb(color);
		return this.rgbToHex(255-rgb[0], 255-rgb[1], 255-rgb[2]);
	},
	getPair: function(backgroundColor, percent, opacity){
		if(this.isRgb(backgroundColor)){
			backgroundColor = this.rgbStringToHex(backgroundColor);
		}
		if(this.isLight(backgroundColor)){
			var darkerColor = this.darker(backgroundColor, percent);
			var lightTextColor = this.lighter(darkerColor, 50);
			var darkTextColor = this.darker(darkerColor, 50);
			var textColor = this.optimalTextColor(darkerColor,lightTextColor, darkTextColor);
			if(opacity){
				//darkerColor = this.addOpacity(darkerColor, opacity);
				var rgb = this.hexToRgb(darkerColor);
				darkerColor = this.rgbaToHex(rgb[0], rgb[1], rgb[2], opacity);
			}
			return [darkerColor, textColor];
		}else{
			var lighterColor = this.lighter(backgroundColor, percent);
			var lightTextColor = this.lighter(lighterColor, 50);
			var darkTextColor = this.darker(lighterColor, 50);
			var textColor = this.optimalTextColor(lighterColor,lightTextColor, darkTextColor);
			if(opacity){
				var rgb = this.hexToRgb(lighterColor);
				lighterColor = this.rgbaToHex(rgb[0], rgb[1], rgb[2], opacity);
			}
			return [lighterColor, textColor];
		}
	},
	optimalTextColor: function(backgroundColor, lightColor, darkColor){
		if(this.isRgb(backgroundColor)){
			backgroundColor = this.rgbStringToHex(backgroundColor);
		}
		var lightColor = lightColor || "#FFFFFF";
		var darkColor = darkColor || "#000000";
		var lightContrast = this.compare(backgroundColor, lightColor);
		var darkContrast = this.compare(backgroundColor, darkColor);
		if(lightContrast > darkContrast){
			return lightColor;
		}else{
			return darkColor;
		}
	},
	getAlterColor: function(color, percent){
		if(this.isRgb(color)){
			color = this.rgbStringToHex(color);
		}
		if(this.isLight(color)){
			return this.darker(color, percent);
		}else{
			return this.lighter(color, percent);
		}
	},
	grayScale: function(color){
		if(this.isRgb(color)){
			color = this.rgbStringToHex(color);
		}
		var rgb = this.hexToRgb(color);
		var gray = Math.round((rgb[0] + rgb[1] + rgb[2]) / 3);
		return this.rgbToHex(gray, gray, gray);
	},
	grayScaleFloat: function(color){
		if(this.isRgb(color)){
			color = this.rgbStringToHex(color);
		}
		var rgb = this.hexToRgb(color);
		var gray = (rgb[0] + rgb[1] + rgb[2]) / 3;
		return gray;
	}
}
function disableObserver(e){
	var obs = e.q("[sleepwake]");
	if(!obs){
		return;
	}else{
		obs = obs.observer;
	}
	e.qq("[sleepwake]").forEach(function(e){
		if(e.detached){
			return;
		}
		obs.unobserve(e);
		e.detached = true;
	});
};
function enableObserver(e){
	var obs = e.q("[sleepwake]");
	if(!obs){
		return;
	}else{
		obs = obs.observer;
	}
	e.qq("[sleepwake]").forEach(function(e){
		if(e.detached){
			obs.observe(e);
			e.detached = false;
		}
	});
}
ui.dragOut = function(e,c){
	var sx, sy, cx, cy, co;
	var isCancel = false, isSwipeTimeout = false;
	var timer = null;
	var initDrag = false;
	var isFrameEnded = true;
	if(!c){
		c = e;
	}
	var preventScroll = function(e){
		// Disable the default touch action for the element

	}
	var tmove = function(e){
		cx = e.touches[0].screenX;
		cy = e.touches[0].screenY;
		//console.log(e);
		if(initDrag){
			if(Math.abs(cy - sy) > Math.abs(cx - sx)){
				isCancel = true;
				this.removeEventListener("touchmove", tmove);
				co = 0;
			}else{
				//this.style.boxShadow = "0 0 8px gray";
				//this.style.overflow = "hidden";
			}
			initDrag = false;
			if(!isCancel){
				disableObserver(c);
				if(window.tempDisableObserver){
					window.tempDisableObserver();
				}
			}
		}
		if(!isCancel){
			co = cx - sx;
			if(co != 0){
				// requestAnimationFrame(function(){
				if(e.cancelable)e.preventDefault();
				e.stopPropagation();
				var newTransform = "translateX("+co+"px)";
				//this.style.transform = "translateX("+co+"px)";
				if(isFrameEnded && c.style.transform != newTransform){
					requestAnimationFrame((function(){
						c.style.transform = newTransform;
						isFrameEnded = true;
					}).bind(this));
				}
				// }.bind(this));
				//gsap.to(this, {x: co, duration: 0.1});
				//this.style.left = co+"px";
			}
		}
	}
	e.addEventListener("touchstart", function(e){
		if(e.target && e.target.hasAttribute("type")){
			if(e.target.getAttribute("type") == "range"){
				isCancel = true;
				return;
			}
		}
		sx = e.touches[0].screenX;
		sy = e.touches[0].screenY;
		co = 0;
		isCancel = isSwipeTimeout = false;
		isFrameEnded = true;
		if(timer){
			clearTimeout(timer);
		}
		initDrag = true;
		timer = setTimeout(function(){
			isSwipeTimeout = true;
		}, 200);
		this.addEventListener("touchmove", tmove, {passive: false});
		
	});
	e.addEventListener("touchend", function(e){
		initDrag = false;
		this.removeEventListener("touchmove", tmove);
		if(isCancel){
			if(co !=0){
				gsap.fromTo(c, {x: co}, {x: 0, duration: 0.2, onComplete: (function(){
				//	this.style.transform = "none";
				//	this.style.overflow = "auto";
					enableObserver(c);
				}).bind(this)});
				//this.style.boxShadow = "";
				console.log("tend");
			}
			enableObserver(c);
			
			return;
		}
		if(!isSwipeTimeout){
			console.log(co);
			isSwipeTimeout= true;
			
			if(co > 50){
				this.dragOut(true, co);
				return;
			}else
			if(co < -50){
				this.dragOut(false, co);
				return;
			}
		}
		clearTimeout(timer);
		if(!isCancel){
			var vw = document.body.scrollWidth;
			if(co > vw * 0.4){
				this.dragOut(true, co);
			}else if(co < -vw * 0.4){
				this.dragOut(false, co);
			}else if(co != 0){
				gsap.fromTo(c, {x: co}, {x: 0, duration: 0.2, onComplete: (function(){
				//	this.style.transform = "none";
				//	this.style.overflow = "auto";
					enableObserver(c);
					if(window.reactivateObserver){
						window.reactivateObserver();
					}
				}).bind(this)});
			}else{
				enableObserver(c);
				if(window.reactivateObserver){
					window.reactivateObserver();
				}
			}
			isCancel = true;
		}
	});
	e.addEventListener("touchcancel", function(e){
		this.removeEventListener("touchmove", tmove);
		isCancel = true;
		isSwipeTimeout= true;
		clearTimeout(timer);
		if(co!=0){
			gsap.fromTo(c, {x: co}, {x: 0, duration: 0.1, onComplete: (function(){
				enableObserver(c);
				if(window.reactivateObserver){
					window.reactivateObserver();
				}
			}).bind(this)});
			console.log("tcancel");
		}else{
			this.style.transform = "none";
			enableObserver(c);
			if(window.reactivateObserver){
				window.reactivateObserver();
			}
		}
	});
}
ui.drag = function(e,fun){
	var sx, sy, cx, cy, co;
	var isCancel = false, isSwipeTimeout = false;
	var initDrag = false;
	var tmove = function(e){
		cx = e.touches[0].screenX;
		cy = e.touches[0].screenY;
		if(initDrag){
			if(Math.abs(cy - sy) > Math.abs(cx - sx)){
				isCancel = true;
				this.removeEventListener("touchmove", tmove);
				co = 0;
			}
			initDrag = false;
		}
		if(!isCancel){
			co = cx - sx;
			if(co != 0){
				fun(co);
			}
		}
	}
	e.addEventListener("touchstart", function(e){
		sx = e.touches[0].screenX;
		sy = e.touches[0].screenY;
		co = 0;
		isCancel = isSwipeTimeout = false;
		isFrameEnded = true;
		initDrag = true;
		this.addEventListener("touchmove", tmove, {passive: false});
	});
	e.addEventListener("touchend", function(e){
		initDrag = false;
		this.removeEventListener("touchmove", tmove);
		if(isCancel){
			return;
		}
		if(!isCancel){
			isCancel = true;
		}
	});
	e.addEventListener("touchcancel", function(e){
		this.removeEventListener("touchmove", tmove);
		isCancel = true;
		isSwipeTimeout= true;
	});
}
ui.h2img = function(e, callback){
	var opts = {
		logging: false,
		width: e.scrollWidth,
		height: e.scrollHeight,
		//backgroundColor: null,
		//allowTaint: true,
		//foreignObjectRendering: true,
	}
	html2canvas(e,opts).then(function(canvas) {
		//var ctx = canvas.getContext('2d');
        //ctx.webkitImageSmoothingEnabled = true;
        //ctx.mozImageSmoothingEnabled = true;
        //ctx.imageSmoothingEnabled = true;
		var image = canvas.toDataURL("image/png");
		callback(image);
	});
}
ui.ah2img = function(e){
	this.h2img(e,function(img){
		var holder = document.createElement("img");
		holder.src = img;
		e.parentNode.insertBefore(holder, e);
		e.parentNode.removeChild(e);
	});
}
ui.pullToRefresh = function(e,scroller, language){
	if(!language){
		language = ["Kéo xuống để làm mới", "Thả để làm mới", 
			"Đang làm mới", "Làm mới thành công", "Làm mới thất bại"];
	}
	var isCancel = false;
	var initDrag = false;
	var sx, sy, co;
	var displayElement = document.createElement("div");
	displayElement.className = "pull2f";
	var canvas = document.createElement("canvas");
	displayElement.appendChild(canvas);
	canvas.width = 150;
	canvas.height = 50;
	var pixRatio = window.devicePixelRatio;
	var ctx = canvas.getContext("2d");
	var fontStyle = (12 * pixRatio) + "px Arial";
	canvas.style.width = "150px";
	canvas.style.height = "50px";
	canvas.height = 50 * pixRatio;
	canvas.width = 150 * pixRatio;
	var getColor = function(){
		if(window.app){
			return window.app.theme.getColorVar("--color");
		}
		return "black";
	}
	var drawArrowState = function(arrowDir, text){
		var c = getColor();
		ctx.strokeStyle = c;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate(canvas.width/2, canvas.height/2);
		//ctx.rotate(arrowDir * Math.PI/180);
		ctx.beginPath();
		// 10px height arrow
		if(arrowDir == 0){
			ctx.moveTo(-10 * pixRatio, -10 * pixRatio);
			ctx.lineTo(0, 0);
			ctx.lineTo(10 * pixRatio, -10 * pixRatio);
		}else{
			ctx.moveTo(-10 * pixRatio, 0);
			ctx.lineTo(0, -10 * pixRatio);
			ctx.lineTo(10 * pixRatio, 0);
		}
		ctx.stroke();
		ctx.restore();
		ctx.fillStyle = c;
		ctx.font = fontStyle;
		ctx.textAlign = "center";
		ctx.fillText(text, canvas.width/2, canvas.height/2 + 20 * pixRatio);
	}
	var spinnerAnimator = null;
	var drawSpinnerState = function(deg){
		var c = getColor();
		ctx.strokeStyle = c;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.rotate(deg * Math.PI/180);
		ctx.beginPath();
		ctx.arc(0, 0, 10 *pixRatio, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -10 * pixRatio);
		ctx.stroke();
		ctx.restore();
		ctx.fillStyle = c;
		ctx.font = fontStyle;
		ctx.textAlign = "center";
		ctx.fillText(language[2], canvas.width/2, canvas.height/2 + 20 * pixRatio);
	}
	var drawVTickState = function(){
		var c = getColor();
		ctx.strokeStyle = "2px solid " + c;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.moveTo(canvas.width/2 - 10 * pixRatio, canvas.height/2 - 8 * pixRatio);
		ctx.lineTo(canvas.width/2, canvas.height/2);
		ctx.lineTo(canvas.width/2 + 10 * pixRatio, canvas.height/2 - 20 * pixRatio);
		ctx.stroke();
		ctx.fillStyle = c;
		ctx.font = fontStyle;
		ctx.textAlign = "center";
		ctx.fillText(language[3], canvas.width/2, canvas.height/2 + 20 * pixRatio);
	}
	var drawXState = function(){
		var c = getColor();
		ctx.strokeStyle = c;
		ctx.fillStyle = c;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		var tenXRatio = 10 * pixRatio;
		ctx.moveTo(canvas.width/2 - tenXRatio, canvas.height/2 - tenXRatio);
		ctx.lineTo(canvas.width/2 + tenXRatio, canvas.height/2 + tenXRatio);
		ctx.moveTo(canvas.width/2 - tenXRatio, canvas.height/2 + tenXRatio);
		ctx.lineTo(canvas.width/2 + tenXRatio, canvas.height/2 - tenXRatio);
		ctx.stroke();
		ctx.fillStyle = c;
		ctx.font = fontStyle;
		ctx.textAlign = "center";
		ctx.fillText(language[4], canvas.width/2, canvas.height/2 + 20 * pixRatio);
	}
	var startSpinner = function(){
		var deg = 0;
		spinnerAnimator = setInterval(function(){
			deg += 10;
			drawSpinnerState(deg);
		}, 100);
	}
	var stopAnimator = function(){
		if(spinnerAnimator){
			clearInterval(spinnerAnimator);
			spinnerAnimator = null;
		}
	}
	var p2fState = 0;
	var setP2fState = function(state){
		if(p2fState == state) return;
		p2fState = state;
		switch(state){
			case 0:
				stopAnimator();
				drawArrowState(0, language[0]);
				break;
			case 1:
				stopAnimator();
				drawArrowState(180, language[1]);
				break;
			case 2:
				startSpinner();
				break;
			case 3:
				stopAnimator();
				drawVTickState();
				break;
			case 4:
				stopAnimator();
				drawXState();
				break;
		}
	}
	var pullReadyOffset = 100;
	var isFrameEnded = true;
	e.insertBefore(displayElement, e.firstChild);
	var tmove = function(e){
		if(initDrag){
			if(Math.abs(e.touches[0].clientX - sx) > Math.abs(e.touches[0].clientY - sy)){
				isCancel = true;
				co = 0;
				this.removeEventListener("touchmove", tmove);
			}else{
				if(e.touches[0].clientY - sy < 0){
					isCancel = true;
					co = 0;
					this.removeEventListener("touchmove", tmove);
				}else{
					//this.insertBefore(displayElement, this.firstChild);
					//setP2fNormal();
					setP2fState(0);
				}
			}
			initDrag = false;
		}
		if(!isCancel){
			co = e.touches[0].clientY - sy;
			e.preventDefault();
			if(co != 0){
				if(co > pullReadyOffset){
					var slowMove = pullReadyOffset + (co - pullReadyOffset)/2;
					co = slowMove / 2;
					var newTransform = "translateY("+(slowMove / 2)+"px)";
					if(isFrameEnded){
						requestAnimationFrame((function(){
							this.style.transform = newTransform;
							isFrameEnded = true;
						}).bind(this));
					}
					//setP2fReady();
					setP2fState(1);
				}else{
					if(isFrameEnded){
						var co2 = co/2;
						requestAnimationFrame((function(){
							this.style.transform = "translateY("+co2+"px)";
							isFrameEnded = true;
						}).bind(this));
					}
					co /= 2;
					//setP2fNormal();
					setP2fState(0);
				}
			}
		}
	}
	e.addEventListener("touchstart", function(e){
		sx = e.touches[0].clientX;
		sy = e.touches[0].clientY;
		co = 0;
		if(p2fState > 1){
			isCancel = true;
			return;
		}
		isFrameEnded = true;
		if(scroller){
			if(scroller.scrollTop == 0){
				initDrag = true;
				isCancel = false;
				this.addEventListener("touchmove", tmove, {passive: false});
			}
		}else{
			if(this.scrollTop == 0){
				initDrag = true;
				isCancel = false;
				this.addEventListener("touchmove", tmove, {passive: false});
			}
		}
	});
	e.addEventListener("touchend", function(){
		initDrag = false;
		this.removeEventListener("touchmove", tmove);
		if(isCancel){
			if(co !=0){
				gsap.fromTo(this, {y: co}, {y: 0, duration: 0.2, onComplete: function(){
					stopAnimator();
					//displayElement.remove();
				}});
			}
			return;
		}
		if(!isCancel){
			if(co > pullReadyOffset / 2){
				//setP2fLoading();
				setP2fState(2);
				if(this.onrefresh){
					var ref = this;
					this.onrefresh(function(success){
						if(success){
							//setP2fSuccess();
							setP2fState(3);
						}else{
							//setP2fError();
							setP2fState(4);
						}
						setTimeout(function(){
							gsap.fromTo(ref, {y: pullReadyOffset / 2}, {y: 0, duration: 0.2, onComplete: function(){
								//displayElement.remove();
								stopAnimator();
								//setP2fNormal();
								setP2fState(0);
							}});
						}, 1000);
					});
				}else{
					gsap.fromTo(this, {y: co}, {y: 0, duration: 0.2, onComplete: function(){
						//displayElement.remove();
						//setP2fNormal();
						setP2fState(0);
					}});
					return;
				}
				gsap.fromTo(this, {y: co}, {y: pullReadyOffset / 2, duration: 0.2, onComplete: function(){}});
			}else{
				//setP2fNormal();
				setP2fState(0);
				gsap.fromTo(this, {y: co}, {y: 0, duration: 0.2, onComplete: function(){
					//displayElement.remove();
				}});
			}
			isCancel = true;
		}
	});
	e.addEventListener("touchcancel", function(){
		this.removeEventListener("touchmove", tmove);
		isCancel = true;
		if(co!=0){
			gsap.fromTo(this, {y: co}, {y: 0, duration: 0.2, onComplete: function(){
				//displayElement.remove();
				stopAnimator();
			}});
		}else{
			this.style.transform = "none";
		}
	});
}
ui.snapY = function(target,snapPoint, onSnap){
	// snapPoint = [offset1, offset2, offset3]

	var dragFunction = function(e){
		var y = e.touches[0].clientY - sy;
		if(y > 0){
			e.preventDefault();
			if(y > snapPoint){
				y = snapPoint + (y - snapPoint)/2;
			}
			target.style.transform = "translateY("+y+"px)";
		}
	}
	var dragStartFunction = function(e){
		sy = e.touches[0].clientY;
		target.addEventListener("touchmove", dragFunction, {passive: false});
	}
	var dragEndFunction = function(e){
		target.removeEventListener("touchmove", dragFunction);
		var y = e.changedTouches[0].clientY - sy;
		if(y > 0){
			if(y > snapPoint){
				if(onSnap){
					onSnap();
				}
				target.style.transform = "translateY("+snapPoint+"px)";
			}else{
				target.style.transform = "none";
			}
		}
	}
	target.addEventListener("touchstart", dragStartFunction);
}
