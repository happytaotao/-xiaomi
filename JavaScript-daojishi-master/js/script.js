//一直执行的计时器
//知道什么时间截止
//知道当前的时间是多少
//用剩余的时间算出，多少小时，多少分钟，多少秒

var h3 = document.querySelector('h3')
getTime()
//设置结束的时间
var d = new Date();
var hour = d.getHours();

h3.innerHTML = hour + '点场 倒计时-- (' + endHour + '点结束秒杀)'


var year
var mounth
var day
var endHour
var minutes
var endTime

function getTime() {
    year = new Date().getFullYear()
    mounth = new Date().getMonth() + 1
    day = new Date().getDate()
    endHour = new Date().getHours() + 1
    minutes = new Date().getMinutes()
    endTime = new Date(year + '-' + mounth + '-' + day + ' ' + endHour + ':00');

}
//设置当时的时分秒
var h = 0;
var m = 0;
var s = 0;

//定义一个秒杀函数
function seckill() {

    getTime()
    //获取当前的时间
    var nowTime = new Date();
    console.log(nowTime);
    console.log(endTime);
    //获取相差多少秒
    var disparity = endTime.getTime() - nowTime.getTime();
    console.log(disparity);
    //相差的毫秒数
    //相差的秒数

    disparity = disparity / 1000;
    // console.log(disparity);

    //取整
    disparity = parseInt(disparity);
    // console.log(disparity);
    if (disparity >= 0) {
        //根据剩余的秒数，算出剩余的小时
        h = parseInt(disparity / 3600);

        //根据剩余的秒数，算出剩余的分钟
        m = parseInt((disparity / 60) % 60);
        //根据剩余的秒数，算出剩余的秒数
        s = parseInt(disparity % 60);

        //利用2位数表示剩余的时间，如果小于10，就给前边加1个0
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
    } else {
        // alert("秒杀结束");
        // clearInterval(t4);
        console.log('jieshu');


    }

    //将剩余的时分秒，添加到网页的制定位置
    document.querySelector("#time1").innerHTML = h;
    document.querySelector("#time2").innerHTML = m;
    document.querySelector("#time3").innerHTML = s;
}
//预先执行一遍这个函数
seckill();


var t4 = setInterval(function () {
    //每秒执行一次这个函数
    seckill();
}, 1000);