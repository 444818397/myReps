if(!window.Try){
    window.Try = {};
}
Try.fixNav = function(option){
    /*���õ�ʱ��û�г�ʼ���Ļ����ǳ�ʼ��һ��*/
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
        //1.�жϣ���������֧��window.pageYOffset;��ôֱ��ʹ��
        if(window.pageYOffset != undefined){
            return {
                top: window.pageYOffset,
                left: window.pageXOffset
            };
            //2.Ҫ�������Ҳ����û��DTDԼ�������û��ִ��document.body.scrollTop;
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
        //3.����ִ��document.documentElement.scrollTop;
        //4.����һ��json,key�ֱ���top��left��
    },
}