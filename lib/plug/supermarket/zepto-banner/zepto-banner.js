/**
 * Created by john on 2016/6/22.
 */
(function($){

    $.extend($.fn,{
        banner: function(){
            $.init.call(this);
        }
    });
    //��������
    $.extend($,{
        //��ʼ״̬
        init:function(){
            //��ȡ���ͼ����
            var $box=$(this).find(".box");
            var $lu=$box.find("ul");
            //��һ��
            var firstLi= $lu.find($lu.find("li:first-child")).clone(true);
            //���һ��
            var lastLi= $lu.find($lu.find("li:last-child")).clone(true);
            //�������һ�Ų���ͼ����ǰ��
            $lu.find("li:first-child").before(lastLi);
            //����ǰ���һ�Ų�
            $lu.append(firstLi);
            //��ȡ����liԪ��
            var $lis=$lu.find("li");
            //��ȡ���ӵĿ��
            var boxW=$box.width();
            //��ȡ������ĸ�����
            var $pointBox=$(this).find("nav");
            //�ҵ���һ��������ĸ���������
            $pointBox.find("i:nth-child(1)").addClass("cur");
            //��ȡ���е�����
            var $points=$pointBox.find("i");
            //��ȡli���ܳ���
             this.lisLength=$lis.length;
            //ul�ĵĿ��ͨ��box�Ŀ����ȥ��li�ĸ���
            $lu.css("width",boxW*this.lisLength+"px");
            //����ulƫ��һ�Ź��ͼ�Ŀ��
            $lu[0].style.webkitTransform = "translateX(-"+boxW+"px)";
            $lu[0].style.transform = "translateX(-"+boxW+"px)";
            //����ÿ��li�Ŀ����box�Ŀ��һ��
            $lis.css("width",boxW+"px");
            //���¼�
            $.bindEvent.call(this,boxW,$lu[0]);
            //��ʱ������
            $.paly.call(this);
            return this;
        },
        //��touch�¼�
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
                that.startX = 0;//��¼�ոմ�����Ļʱ�������x
                that.moveX = 0; //��¼����ʱ�������x
                that.distanceX = 0; //�ƶ��ľ���
                that.ismove = false;//�Ƿ񻬶���
                clearInterval(that.timer);
                $.paly.call(that);
            });
            $.transitionEnd($ul,function(){
                       if(that.index >=that.lisLength-1){
                           that.index = 1;
                           /*�������*/
                           $.removeTransition($ul);
                           /*˲�䶨λ*/
                           $.setTranslateX($ul,-that.index*that.boxW);
                           $.dot.call(that);
                       }else if(that.index<=0){
                           that.index = that.lisLength-2;
                           /*�������*/
                           $.removeTransition($ul);
                           /*˲�䶨λ*/
                           $.setTranslateX($ul,-that.index*that.boxW);
                           $.dot.call(that);
                       }

            });
        },
        //�������ͼ��Ӧ��ѡ�ж�λԲ��
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
    //����ʱ�䶨ʱ��

    //�Լ�д�Ĺ��ɷ���
    $.extend($,{
         addTransition: function(dom){

             dom.style.webkitTransition = "all .2s";
             dom.style.transition = "all .2s";
        },
        /*�������*/
        removeTransition:function(dom){
            dom.style.webkitTransition = "none";
            dom.style.transition = "none";
        },
        /*�����ƶ�*/
       setTranslateX: function(dom,translateX){

           dom.style.webkitTransform = "translateX("+translateX+"px)";
           dom.style.transform = "translateX("+translateX+"px)";

        },
        transitionEnd:function(dom,callback){
                /*�����ж�*/
                if(typeof  dom == 'object'){
                    dom.addEventListener('webkitTransitionEnd',function(){
                        /* if(callback){
                         callback();
                         }*/
                        /*��·��*/
                        callback && callback();
                    });
                    dom.addEventListener('transitionEnd',function(){
                        callback && callback();
                    });
                }
         }

    })
})(Zepto);
