if(!window.mall){
    window.mall = {};
}
mall.iSilder = function(obj){
    /*调用的时候没有初始化的话就是初始化一次*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(obj);
    this.init(obj);
};
mall.iSilder.prototype={
	constructor:mall.iSilder,
	init:function(obj){
		this.timer=null;
		//设置索引值
		this.index=1;
		//获取宽高
		this.height=obj.offsetHeight;
		console.log(this.width,this.height);
		//获取ul的标签
		this.imgUl=obj.getElementsByTagName("ul")[0];
		//获取li的个数
		this.LiArr=this.imgUl.getElementsByTagName("li");
		this.circleL=this.LiArr.length;
		//复制前后的li标签
		var firstLi=this.LiArr[0].cloneNode(true);
		var lastLi=this.LiArr[this.LiArr.length-1].cloneNode(true);
		this.imgUl.insertBefore(lastLi,this.LiArr[0]);
		this.imgUl.appendChild(firstLi);
		this.LiNArr=this.imgUl.getElementsByTagName("li");
		this.LiLength=this.LiNArr.length;
		this.imgUl.style.width=100*this.LiLength+"%";
		console.log(this.imgUl.style.width);
		//设置基本样式
		for(var i=0;i<this.LiLength;i++){
			this.LiNArr[i].style.float="left";
			this.LiNArr[i].style.width=100/this.LiLength+"%";
			console.log(this.LiNArr[i].style.width)
			this.LiNArr[i].style.height=this.height;
		}
		this.width=this.LiNArr[0].offsetWidth;
		console.log(this.width);
		this.setTransform(-this.index*this.width);

		this.circleShow(obj);
		this.autoPlay();
		this.addEvent(obj);
	},
	circleShow:function(obj){
		//动态创建li标签
		var ol=document.createElement("ol");
		var tag="";
		for(var i=0;i<this.circleL;i++){
			tag+="<li></li>";
		}
		ol.innerHTML=tag;
		console.log(ol);
		obj.appendChild(ol);
		this.circleArr=ol.getElementsByTagName("li");
		this.circleIndex=0;
		this.cn="current"||"";
		this.circleArr[this.circleIndex].className=this.cn;
	},
	autoPlay:function(){
		var that=this;
		clearInterval(this.timer);
		this.timer=setInterval(function(){
			that.toNext();
			that.circleSlider();
		},3000);
	},
	toNext:function(){
		this.index++;
		this.setTransition();
		this.setTransform(-this.width*this.index);
		var that=this;
		this.imgUl.addEventListener("transitionend",function(){
			if(that.index>that.LiLength-2){
				that.removeTransition();
				that.index=1;
				that.setTransform(-that.width*that.index);
			}
		})
	},
	toPrev:function(){
		this.index--;
		this.setTransition();
		this.setTransform(-this.width*this.index);
		var that=this;
		this.circleSlider();
		this.imgUl.addEventListener("transitionend",function(){
			if(that.index<1){
				that.removeTransition();
				that.index=that.LiLength-2;
				that.setTransform(-that.width*(that.index));
			}
		})
	},
	circleSlider:function(){
		if(this.index<1){
			this.circleIndex=this.circleL-1;
		}else if(this.index>this.LiLength-2){
			this.circleIndex=0;
		}else{
			this.circleIndex=this.index-1;
		}
		for(var i=0;i<this.circleL;i++){
			this.circleArr[i].className="";
		}
		this.circleArr[this.circleIndex].className=this.cn;
	},
	setTransform:function(param){
		this.imgUl.style.transform="translateX("+param+"px)";
		this.imgUl.style.webkitTransform="translateX("+param+"px)";
	},
	setTransition:function(){
		this.imgUl.style.transition="all .2s";
		this.imgUl.style.webkitTransition="all .2s";
	},
	removeTransition:function(){
		this.imgUl.style.transition="none";
		this.imgUl.style.webkitTransition="none";
	},
	addEvent:function(obj){
		this.start=0;
		this.dis=0;
		this.isMove=false;
		this.move=0;
		this.limit=this.width*0.15;
		var that=this;
		obj.addEventListener("touchstart", function (e) {
        that.start= e.touches[0].clientX;
        console.log(that.start);
        clearInterval(that.timer);
    })
    	obj.addEventListener("touchmove", function (e) {
        that.isMove=true;
        that.move= e.touches[0].clientX;
        that.dis=that.move-that.start;
        console.log(that.dis);
        that.removeTransition();
        that.setTransform(-that.width*that.index+that.dis);
    })
    	obj.addEventListener("touchend",function(e){
    		if(that.isMove&&Math.abs(that.dis)>that.limit){
    			if(that.dis>0){
    				that.toPrev();
    				// that.circleSlider();
    			}else{
    				that.toNext();
    				that.circleSlider();
    			}
    		}else{
    			that.setTransition();
    			that.setTransform(-that.width*that.index);
    		}	
    		that.isMove=false;
    		that.start=0;
    		that.dis=0;
    		that.timer=setInterval(function(){
    			that.toNext();
				that.circleSlider();
    		},3000);
    	})
	}
}