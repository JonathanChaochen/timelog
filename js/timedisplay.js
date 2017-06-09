/* jshint undef: true, unused: true, esversion: 6, asi: true */
var t;
function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    let alarmH = document.getElementById('alarmH').value;
    let alarmM = document.getElementById('alarmM').value;
    let alarmS = document.getElementById('alarmS').value;

    if( h == alarmH && m == alarmM && s ==alarmS )
    {
        alert("You need to take a break!")
    }

    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }  // add zero in front of numbers < 10
    return i;
}

function stopFunction() {
    clearTimeout(t);
}


