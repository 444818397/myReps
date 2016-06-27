/**
 * Created by john on 2016/6/25.
 */
if(!window.mall){
    window.mall={};
}
mall.downTime=function(obj){
    if(!(this instanceof arguments.callee))return new arguments.callee(obj);
    this.init(obj);
}

mall.downTime.prototype={
    init:function(obj){

        /*
         * 1.需要倒计时的时间  自己可以定义
         * 2.倒计时    定时器
         * 3.把时间渲染到6个盒子当中
         * */
        var skTime = document.querySelector(obj.box);
        var spans = skTime.querySelectorAll('span');

        var time = 5 * 60 * 60;
        var timer = setInterval(function(){
            alert(1);
            if(time <= 0){
                clearInterval(timer);
                return false;
            }

            time --;

            /*格式化*/
            var h = Math.floor(time/3600);
            var m = Math.floor((time%3600)/60);
            var s = time%60;


            spans[0].innerHTML = Math.floor(h/10);
            spans[1].innerHTML = h%10;
            alert(spans[2].innerHTML);
            spans[2].innerHTML = Math.floor(m/10);
            spans[3].innerHTML = m%10;

            spans[4].innerHTML = Math.floor(s/10);
            spans[5].innerHTML = s%10;



        },1000);
    }

}
