/**
 * Created by john on 2016/6/22.
 */
(function($){

    $.extend($.fn,{
        banner: function(){
            $.init.call(this);
        }
    });
    //其他方法
    $.extend($,{
        //初始状态
        init:function(){
            //获取广告图盒子
            var $box=$(this).find(".box");
            var $lu=$box.find("ul");
            //第一张
            var firstLi= $lu.find($lu.find("li:first-child")).clone(true);
            //最后一张
            var lastLi= $lu.find($lu.find("li:last-child")).clone(true);
            //复制最后一张插广告图插入前面
            $lu.find("li:first-child").before(lastLi);
            //复制前面第一张插
            $lu.append(firstLi);
            //获取所有li元素
            var $lis=$lu.find("li");
            //获取盒子的宽度
            var boxW=$box.width();
            //获取导航点的父盒子
            var $pointBox=$(this).find("nav");
            //找到第一个导航点的给设设置类
            $pointBox.find("i:nth-child(1)").addClass("cur");
            //获取所有导航点
            var $points=$pointBox.find("i");
            //获取li的总长度
             this.lisLength=$lis.length;
            //ul的的宽度通过box的宽度在去乘li的个数
            $lu.css("width",boxW*this.lisLength+"px");
            //设置ul偏移一张广告图的宽度
            $lu[0].style.webkitTransform = "translateX(-"+boxW+"px)";
            $lu[0].style.transform = "translateX(-"+boxW+"px)";
            //设置每个li的宽度与box的宽度一样
            $lis.css("width",boxW+"px");
            //绑定事件
            $.bindEvent.call(this,boxW,$lu[0]);
            //定时器开启
            $.paly.call(this);
            return this;
        },
        //绑定touch事件
        bindEvent:function(boxW,$ul){
            this.index=1;
            this.startX=0;
            this.distanceX=0;
            this.moveX=0;
            this.ismove=false;
            this.boxW=$(this).width();
            this.timer=null;
            var that=this;
            $(this).on("touchstart",function(e){
                clearInterval(that.timer);
                that.startX= e.targetTouches[0].clientX;
            });
            $(this).on("touchmove",function(e){
                that.ismove=true;
                that.moveX= e.targetTouches[0].clientX;
                that.distanceX=that.moveX-that.startX;
                var translateX=-that.index*that.boxW+that.distanceX;
                $.removeTransition($ul);
                $.setTranslateX($ul,translateX);
            });
            $(this).on("touchend",function(){

                if(Math.abs(that.distanceX)>(that.boxW/3)&&that.ismove){
                    if(that.distanceX>0){
                        that.index--;
                    }
                    else{
                        that.index++;
                    }
                    $.addTransition($ul);
                    $.setTranslateX($ul,-that.index*that.boxW)
                    $.dot.call(that);
                }
                else{
                    $.addTransition($ul);
                    $.setTranslateX($ul,-that.index*that.boxW)
                }
                that.startX = 0;//记录刚刚触摸屏幕时候的坐标x
                that.moveX = 0; //记录滑动时候的坐标x
                that.distanceX = 0; //移动的距离
                that.ismove = false;//是否滑动过
                clearInterval(that.timer);
                $.paly.call(that);
            });
            $.transitionEnd($ul,function(){
                       if(that.index >=that.lisLength-1){
                           that.index = 1;
                           /*清楚过渡*/
                           $.removeTransition($ul);
                           /*瞬间定位*/
                           $.setTranslateX($ul,-that.index*that.boxW);
                           $.dot.call(that);
                       }else if(that.index<=0){
                           that.index = that.lisLength-2;
                           /*清楚过渡*/
                           $.removeTransition($ul);
                           /*瞬间定位*/
                           $.setTranslateX($ul,-that.index*that.boxW);
                           $.dot.call(that);
                       }

            });
        },
        //滑动广告图对应的选中定位圆点
        dot:function(){

            $(this).find("nav").find("i").eq(this.index-1).addClass("cur").siblings().removeClass("cur");
        },
        paly:function(){
        var that=this;
        var $ul= $(that).find("ul");
        $.addTransition($ul[0]);
        that.timer =setInterval(function(){
            that.index--;
            $.addTransition($ul[0]);
            $.dot.call(that);
            $.setTranslateX($ul[0],-that.index*that.boxW);
        },2000)
    }
    })
    //开启时间定时器

    //自己写的过渡方法
    $.extend($,{
         addTransition: function(dom){

             dom.style.webkitTransition = "all .2s";
             dom.style.transition = "all .2s";
        },
        /*清除过渡*/
        removeTransition:function(dom){
            dom.style.webkitTransition = "none";
            dom.style.transition = "none";
        },
        /*向左移动*/
       setTranslateX: function(dom,translateX){

           dom.style.webkitTransform = "translateX("+translateX+"px)";
           dom.style.transform = "translateX("+translateX+"px)";

        },
        transitionEnd:function(dom,callback){
                /*基本判断*/
                if(typeof  dom == 'object'){
                    dom.addEventListener('webkitTransitionEnd',function(){
                        /* if(callback){
                         callback();
                         }*/
                        /*短路与*/
                        callback && callback();
                    });
                    dom.addEventListener('transitionEnd',function(){
                        callback && callback();
                    });
                }
         }

    })
})(Zepto);
