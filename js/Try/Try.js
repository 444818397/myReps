$(function(){
    var json = [
        {   //  1
            width:"90%",
            top:"5%",
            left:"-40%",
            opacity:0.8,
            "zIndex":2
        },
        {  // 2
            width:"100%",
            top:0,
            left:0,
            opacity:1,
            "zIndex":3
        },
        {   // 3
            width:"90%",
            top:"5%",
            left:"50%",
            opacity:0.8,
            "zIndex":2
        },
        {  // 4
            width:"50%",
            top:0,
            left:0,
            opacity:0,
            "zIndex":1
        }
    ];

    $('.slider-wrapper a').each(function(i,key){
           console.log(i);
           for(var k in json[i]){
               key.style[k] = json[i][k];
           }
    });
    var Try_index = 0;
    $('.slider-wrapper').swipeLeft(function(){
        Try_index--;
        if(Try_index<0){
            Try_index = json.length - 1;
        }
        json.unshift(json.pop());
        $('.slider-wrapper a').each(function(i,key){
            $(key).animate(json[i],500);
        });
        $('.slider-nav i').removeClass('current').eq(Try_index).addClass('current');
    });

    $('.slider-wrapper').swipeRight(function(){
        Try_index++;
        if(Try_index>json.length - 1){
            Try_index = 0;
        }
        json.push(json.shift());
        $('.slider-wrapper a').each(function(i,key){
            $(key).animate(json[i],500);
        });
        $('.slider-nav i').removeClass('current').eq(Try_index).addClass('current');
    });

    setInterval(function(){
        Try_index++;
        if(Try_index>json.length - 1){
            Try_index = 0;
        }
        json.push(json.shift());
        $('.slider-wrapper a').each(function(i,key){
            $(key).animate(json[i],500);
        });
        $('.slider-nav i').removeClass('current').eq(Try_index).addClass('current');
    },3000)
})
