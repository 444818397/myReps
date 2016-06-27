if(!window.mall){
    window.mall = {};
}
mall.iScrollNews = function(param){
    /*调用的时候没有初始化的话就是初始化一次*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(param);
    this.init(param);
};
mall.iScrollNews.prototype={
	init:function(param){
		this.index=0;
		//初始化css样式
		param.obj.style.position="relative";
		var width=param.obj.offsetWidth;
		var height=param.obj.offsetHeight;
		console.log(width,height);
		this.liArr=param.obj.getElementsByTagName('li');
		this.dir="left";
		this.L=width;
		this.tran="translateX";
		if(param.dir=="y"){
			this.dir="top";
			this.L=height;
			this.tran="translateY";
		}
		for(var i=0;i<this.liArr.length;i++){
			this.liArr[i].style.position="absolute";
			this.liArr[i].style[this.dir]=this.L+"px";
		}
		//初始化第一个li
		this.liArr[this.index].style[this.dir]=0;
		console.log(this.L);
		this.autoPlay(param);
	},
	autoPlay:function(param){
		var that=this;
		// this.next=1;
		// this.timer=setInterval(function(){
		// 	if(that.index>that.liArr.length-1){
		// 		that.index=0;
		// 	}
		// 	if(that.next>that.liArr.length-1){
		// 		that.next=0;
		// 	}
		// 	console.log(that.next+" "+that.L);
		// 	that.liArr[that.next].transition="all 0s";
		// 	that.liArr[that.next].style[that.dir]=that.L+"px";
		// 	setTimeout(function(){
		// 		that.setTransition(that.liArr[that.index],-that.L);
		// 		that.setTransition(that.liArr[that.next],0);
		// 	},300)
		// 	that.index++;
		// 	that.next++;
		// },param.time)
		this.timer=setInterval(function(){
      	that.setTransition(that.liArr[that.index],-that.L);  //当前
      	that.index++;
	    if(that.index > that.liArr.length-1){
	      that.index=0;
	    }
	    that.liArr[that.index].style.transition = "all 0s";
	    that.liArr[that.index].style[that.dir] = "60px";
	    setTimeout(function(){
	      that.setTransition(that.liArr[that.index],0);  //下一张
	    }, 10);
		},param.time);
	},
	setTransition:function(obj,num){
		obj.style.transition="all .4s";
		obj.style.webkitTransition="all .4s";
		obj.style[this.dir]=num+"px";
	}
}