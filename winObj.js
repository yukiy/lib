var winObj =function(){
	this.id = null;
	this.wait = false;
	this.body=  null;
	this.xpos= null;
	this.ypos= null;
	this.xvel= null;
	this.yvel= null;
	this.w= null;
	this.h= null;
	this.inits= {
		xpos:100,
		ypos:400,
		xvel:10,
		yvel:10,
		w: 200,
		h: 200
	};
	this.getAllPram= function(){
		var	allPram={
			xpos: this.xpos,
			ypos: this.ypos,
			xvel: this.xvel,
			yvel: this.yvel,
			w: this.w,
			h: this.h,
			inits: {
				xpos:this.inits.xpos,
				ypos:this.inits.ypos,
				xvel:this.inits.xvel,
				yvel:this.inits.yvel,
				w: this.inits.w,
				h: this.inits.h
			}
		};
		return allPram;
	};
	this.create= function(url){
		var option="menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no";
		this.body = window.open(url,null,option);
		this.init();
		return this;
	};
	this.init= function(){
		this.xpos = this.inits.xpos;
		this.ypos = this.inits.ypos;
		this.xvel = this.inits.xvel;
		this.yvel = this.inits.yvel;
		this.w = this.inits.w;
		this.h = this.inits.h;
		this.body.moveTo(this.xpos, this.ypos);
		this.body.resizeTo(this.w,this.h);
	};

	this.setInitPos= function(_xpos, _ypos){
		this.inits.xpos = _xpos;
		this.inits.ypos = _ypos;
	};
	
	this.setInitSize= function(_w, _h){
		this.inits.w = _w;
		this.inits.h = _h;
	};
	
	this.setInitVel= function(_xvel, _yvel){
		this.inits.xvel = _xvel;
		this.inits.yvel = _yvel;
	};
	
	this.setPos= function(_xpos, _ypos){
		this.xpos = _xpos;
		this.ypos = _ypos;
		this.body.moveTo(this.xpos,this.ypos);
	};
	
	this.setSize= function(_w, _h){
		this.w = _w;
		this.h = _h;
		this.body.resizeTo(this.w,this.h);
	};
	
	this.setVelocity= function(_xvel, _yvel){
		this.xvel = _xvel;
		this.yvel = _yvel;
	};
	
	this.move= function(_xvel, _yvel){
		if(_xvel != undefined && _xvel != undefined){
			this.xvel = _xvel;
			this.yvel = _yvel;
		}
		this.body.moveBy(this.xvel,this.yvel);
		this.updateCurPos();
	};
	
	
	this.getCurPos= function(){
		var xpos= this.body.screenX;
		var ypos= this.body.screenY;
		var position ={
			x: xpos,
			y: ypos
		}
		return position;
	};
	
	this.getCurSize= function(){
		var width= this.body.document.documentElement.clientWidth;
		var height= this.body.document.documentElement.clientHeight + 50; // +50 for chrome url bar
		var size ={
			w: width,
			h: height
		}
		return size;
	};
	
	this.updateCurPos = function(){
		var curPos = this.getCurPos();
		this.xpos = curPos.x;
		this.ypos = curPos.y;
	};
	
	this.updateCurSize = function(){
		var curSize = this.getCurSize();
		this.w = curSize.w;
		this.h = curSize.h;
	};
	
	this.isOverScreenHorizontal= function(){
		var curPos = this.getCurPos();
		if(curPos.x <= 0 || curPos.x + this.w >= screen.width){
			return true;
		}else{
			return false;
		}
	};
	
	this.isOverScreenVertical= function(){
		var curPos = this.getCurPos();
		if(curPos.y <= 0 || curPos.y + this.h >= screen.height){
			return true;
		}else{
			return false;
		}
	};
	
	this.reflect= function(){
		if(this.isOverScreenHorizontal()){
			this.xvel *= -1;
		}
		if(this.isOverScreenVertical()){
			this.yvel *= -1;
		}
	};
	
	this.setColor= function(_color){
		var color = _color;
		var body = this.body.document.body;
		body.style.backgroundColor= color;
	};
	
	this.html= function(_str){
		var str = _str;
		var body = this.body.document.body;
		body.innerHTML = str;
	};
	
	this.empty= function(){
		var body = this.body.document.body;
		body.innerHTML = "";
	};
	
	this.appendElement= function(_type, _id, _str){
		var type = _type;
		var id= _id;
		var str = _str;
		var body = this.body.document.body;
		var el = document.createElement(type);
		el.id= id;
		el.innerHTML = str;
		body.appendChild(el);
	};
	
	this.appendText= function(_str){
		var str = _str;
		var body = this.body.document.body;
		var el = document.createTextNode(str);
		body.appendChild(el);
	};
	
	this.append= function(_str){
		var str = _str;
		var contents = this.body.document.body.innerHTML;
		this.body.document.body.innerHTML = "";
		this.body.document.write(contents + str);
	};
	
	this.waitFor = function(delay){
		var me = this;
		var to = setTimeout(function(){me.wait=true;clearTimeout(to);},delay);
	}
	this.waitFor(1000);
}
