    //___start config___
    
    var speed=30        ;//1-100
    var skipedTop=70    ;//px
    var step=40         ;//px
    
    //____end config____



    var ti=null;
    var delay=1000/speed;
    var count=0;

    function getCurrentScroll()
    {
    var scrollTop;
    if(typeof(window.pageYOffset) == 'number'){
        // DOM compliant, IE9+
        scrollTop = window.pageYOffset;
    }
    else{
        // IE6-8 workaround
        if(document.body && document.body.scrollTop){
            // IE quirks mode
            scrollTop = document.body.scrollTop;
        }
        else if(document.documentElement && document.documentElement.scrollTop){
            // IE6+ standards compliant mode
            scrollTop = document.documentElement.scrollTop;
        }
    }
    return scrollTop;
}
function pageScrollDown(y) {
   if(getCurrentScroll()>y-step || count < 1){
        clearTimeout(ti);
        window.scrollTo(0,y);
        count=0;
        return ;
    }
    count--;
    window.scrollBy(0,step); 
    ti=setTimeout('pageScrollDown('+y+')',delay); 
}

function pageScrollUp(y) {
    if(getCurrentScroll() < y+step || count < 1){
        clearTimeout(ti);
        window.scrollTo(0,y);
        count=0;
        return;
    }
    count--;
    window.scrollBy(0,-step);
    ti=setTimeout('pageScrollUp('+y+')',delay);
}


function pageScrollTo(y) {
    
    count=Math.abs(getCurrentScroll()-y)/step;
    clearTimeout(ti);

    if(y>document.getElementsByTagName('body')[0].height)
        y=document.getElementsByTagName('body')[0].height;
    if(getCurrentScroll()<y){
        pageScrollDown(y-skipedTop);
    }
    else{
        pageScrollUp(y-skipedTop);
    }
    return false;
}

function pageScroll(el) {
    var pre=document.getElementById('pre_active');
    pre.className="";
    pre.id="";

    el.parentNode.className="active";
    el.parentNode.id="pre_active";

    var url=el.href;
    var li=url.lastIndexOf("#")+1;
    if(li<1)//widthout # or only #
        return true;
    var hash=url.substring(li);
    var anchor=document.getElementsByName(hash)[0];
    var top=getTopPosition(anchor);
    pageScrollTo(top);
    // window.location.hash='';
    return false;
}

function getTopPosition(ele) {

    var top = 0;
    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        ele = ele.offsetParent;
    } 
    return top;
   
}

