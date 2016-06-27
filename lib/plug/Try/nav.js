if(!window.Try){
    window.Try = {};
}
Try.fixNav = function(option){
    /*调用的时候没有初始化的话就是初始化一次*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(option);
    this.init(option);
};
Try.fixNav.prototype = {
    constructor:Try.fixNav,
    init:function(option){
        var that = this;
        if(option.length == 1) {
            this.topDiv = document.getElementsByClassName(option[0])[0].offsetTop;
            this.obj = document.getElementsByClassName(option[0])[0];
            window.onscroll = function () {
                if (that.scroll().top > that.topDiv) {
                    if (that.obj.className == option[0]) {
                        that.obj.className += ' fixed';
                    }
                    that.obj.nextElementSibling.style.marginTop = that.obj.offsetHeight + "px";
                } else {
                    that.obj.className = option[0];
                    that.obj.nextElementSibling.style.marginTop = 0;
                }
            }
        }else{
            that.topDiv = [];
            that.obj =[];
            for(var i = 0; i<option.length; i++){
                that.topDiv.push(document.getElementsByClassName(option[i])[0].offsetTop);
                that.obj.push(document.getElementsByClassName(option[i])[0]);
            }
            console.log(that.obj);
            console.log(that.topDiv);
            window.onscroll = function (){
                if (that.scroll().top > that.topDiv[0]) {
                    if (that.obj[0].className == option[0]) {
                        that.obj[0].className += ' fixed';
                    }
                    that.obj[0].nextElementSibling.style.marginTop = that.obj[0].offsetHeight + "px";
                    if(that.scroll().top > that.topDiv[1]){
                        console.log(that.topDiv[1]);
                        if(that.obj[1].className == option[1]){
                            that.obj[1].className += ' fixed';
                        }
                        that.obj[1].nextElementSibling.style.marginTop = that.obj[1].offsetHeight + "px";
                    }else{
                        that.obj[1].className = option[1];
                        that.obj[1].nextElementSibling.style.marginTop = 0;
                    }
                } else {
                    that.obj[0].className = option[0];
                    that.obj[0].nextElementSibling.style.marginTop = 0;
                    that.obj[1].className = option[1];
                    that.obj[1].nextElementSibling.style.marginTop = 0;
                }
            }
        }
        console.log(that.topDiv[1]);
    },

    scroll:function(){
        //1.判断，浏览器如果支持window.pageYOffset;那么直接使用
        if(window.pageYOffset != undefined){
            return {
                top: window.pageYOffset,
                left: window.pageXOffset
            };
            //2.要看浏览器也面有没有DTD约束。如果没有执行document.body.scrollTop;
        }else if(document.compatMode === "BackCompat"){
            return {
                top: document.body.scrollTop,
                left: document.body.scrollLeft
            };
        }
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        };
        //3.否则执行document.documentElement.scrollTop;
        //4.返回一个json,key分别问top和left；
    },
}