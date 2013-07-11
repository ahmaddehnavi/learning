var color = [
    'rgb(106, 210, 231)',
    'rgb(250, 104, 0)',
    'rgb(243, 132, 48)',
    'rgb(198, 244, 98)',
    'rgb(255, 107, 107)',
    'rgb(250, 204, 0)',
    'rgb(232, 125, 2)',
    'rgb(202, 232, 105)',
    'rgb(0, 169, 199)',
    'rgb(63, 191, 202)',
    'rgb(174, 225, 55)',
    'rgb(208, 231, 80)',
    'rgb(78, 189, 233)',
    'rgb(37, 174, 228)',
    'rgb(249, 214, 36)',
    'rgb(240, 122, 25)',
    'rgb(239, 169, 46)',
    'rgb(136, 197, 38)',
    'rgb(190, 242, 2)',
    'rgb(250, 42, 0)',
    'rgb(0, 178, 255)',
    'rgb(127, 255, 36)',
    'rgb(194, 255, 102)',
    'rgb(200, 255, 0)',
    'rgb(19, 205, 75)',
    'rgb(126, 112, 215)',
    'rgb(187, 233, 7)',
    'rgb(192, 250, 56)',
    'rgb(170, 255, 0)',
    'rgb(255, 170, 0)',
    'rgb(255, 0, 170)',
    'rgb(170, 0, 255)',
    'rgb(0, 170, 255)',
    'rgb(255, 255, 0)'
];

var x, y, cx, cy, x0, y0, x1, y1, i, c, randc;
var canvas =  document.getElementById("myCanvas");
var width = canvas.width=200;
var height = canvas.height=150;
var ctx = canvas.getContext("2d");


randc =3;
ctx.strokeStyle = color[c];

for (x=0 ; x < width ; x++){
    cx = x/60-2.2;

    for (y=0 ; y < height  ; y++){

        c = 1;
        cy = 1.3-y/60;
        x0 = 0;
        y0 = 0;
        for ( i=1 ; i < 10 ; i++){
            x1 = x0 * x0 - y0 * y0 + cx;
            y1 = 2 * x0 * y0 + cy;
            if ((x1 * x1 + y1 * y1) > 2000){
                ctx.fillRect(x , y , 1 , 1);
            }
            else{
                x0 = x1;
                y0 = y1;
                c += randc;
                ctx.fillStyle = color[c];
            }
        }
    }


}
  
