/**
 * Created by DDD on 2016/6/21 0021.
 */
;(function ($) {
    $(function () {
        $.Classify = function (axis,id,box) {
            this.ul = $(id)
            //ul下的所有li
            //this.li = $('.main-left-ul > li')
            this.li = this.ul.children();
            this.init(axis,box)
        }

        //初始化属性
        $.Classify.prototype = {
            init : function (axis,box) {
                //console.log($.isObj(obj))
                if(axis == 'x'){
                    this.ulwidth = this.ul.width();//1560
                    this.main = $(box).width();//736
                    //定位区间
                    this.minpx = this.main - this.ulwidth;//-824
                    console.log(this.minpx)
                    //this.toWumiss()
                    //this.toWumiss(axis)

                }else if(axis == 'y') {
                    this.ulHeight = this.ul.height();//1560
                    this.main = $(box).height();//736
                    //定位区间
                    this.minpx = this.main - this.ulHeight;//-824
                }
                //定位区间
                this.maxpx = 0;
                //触碰屏幕时的距离
                this.clickY = 0;
                //滑动的距离
                this.moveY = 0;
                this.moveOut = 0;
                //初始化位置
                this.curren = 0;
                //定义一个缓冲距离
                this.maxSpeca = 100;
                //滑动区间
                this.maxQujian = this.maxpx + this.maxSpeca;
                this.minQujian = this.minpx - this.maxSpeca;
                //是否有移动过
                this.move = false;

                this.ulClick(this.ul,axis)
                this.ulMove(this.ul,axis)
                this.ulOut(this.ul,axis)
                //this.liClick(this.li)
            },
            //获取触碰屏幕时的坐标
            ulClick : function (obj,axis) {
                var that = this;
                obj.on('touchstart', function (e) {
                    if(axis == 'x'){
                        that.clickY = e.touches[0].clientX;
                    }else if(axis == 'y'){
                        that.clickY = e.touches[0].clientY;
                    }
                });
            },
            //获取移动时的距离
            ulMove : function (obj,axis) {
                var _this = this;
                obj.on('touchmove', function (e) {
                    if(axis == 'x'){
                        _this.moveY = e.touches[0].clientX;
                        //移动过后的坐标 - 手指刚触碰屏幕时的坐标
                        _this.moveOut = _this.moveY - _this.clickY;
                    }else if(axis == 'y'){
                        _this.moveY = e.touches[0].clientY;
                        //移动过后的坐标 - 手指刚触碰屏幕时的坐标
                        _this.moveOut = _this.moveY - _this.clickY;
                    }

                    //这里要先清除动画
                    obj.animate({transition : 'none'})
                    //obj[0].style.transition="none";
                    if(axis == 'x'){
                        obj.animate({translateX : _this.curren + _this.moveOut + 'px'},20,'linear');
                    }else if((_this.curren + _this.moveOut) < _this.maxQujian && (_this.curren + _this.moveOut) > _this.minQujian){
                        obj.animate({translateY : _this.curren + _this.moveOut + 'px'},20,'linear');
                    }
                    //这里代表有移动过
                    _this.move = true;
                    console.log(_this.move)
                    //obj[0].style.transform = 'translateY('+(_this.curren + _this.moveOut)+'px)'
                    e.preventDefault();//阻止'默认行为'
                });
            },
            //离开屏幕时进行判断
            ulOut : function (obj,axis) {
                var that = this;
                obj.on('touchend', function (e) {
                    //如果超出了最大滑动的距离，吸附回去
                    if((that.curren + that.moveOut) > that.maxpx){
                        that.curren = that.maxpx;
                        //手指松开的时候在调用吴
                        that.toWumiss(axis)
                    //如果超出了最小滑动的距离，吸附回去
                    }else if((that.curren + that.moveOut) < that.minpx){
                        if(axis == 'x'){
                            that.curren = 0;
                        }else if(axis == 'y'){
                            that.curren = that.minpx;
                        }
                        that.toWumiss(axis)
                    } else{
                        //正常的
                        that.curren = that.curren + that.moveOut;
                    }

                    if(that.move == false){
                        //alert(1)
                        that.liClick(that.li)
                    }
                    that.move = false;
                });
            },
            //点击滑动与红名
            liClick : function (lis,curren) {
                console.log(this.move)

                var _this = this;
                //遍历所有的li
                $(lis).each(function (index,obj) {
                    $(this).on('tap', function (event) {

                        $(lis).removeClass('current')
                        //var bubble = event.target.parentNode;
                        $(this).addClass('current')
                        //console.log(_this.curren)
                        _this.curren = (index * 60)

                        if(-_this.curren < _this.minpx){
                            //alert(1)x
                            _this.curren = -_this.minpx;
                        }
                        //console.log(event)
                        if(!_this.move){
                            _this.ul.animate({translateY : -_this.curren + 'px'},200,'linear');
                        }
                        //_this.curren = _this.curren
                        //console.log(_this.curren)
                    });
                });
            },
            //给Miss吴佳儿的
            toWumiss : function (axis) {
                var _this = this;
                //console.log(axis)
                if(axis == 'x'){
                    console.log(_this.curren)
                    _this.ul.animate({translateX : _this.curren +'px'},200,'linear');
                    //_this.move = false;
                }else{
                    _this.ul.animate({translateY : _this.curren + 'px'},200,'linear');
                    //_this.move = false;
                }
            }
        }
    });


    console.dir($)
    //$.fx.off = true;

})(Zepto);