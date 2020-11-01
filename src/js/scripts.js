var $reset = document.getElementById('reset');
var $playPause = document.getElementById('play-pause');

var $timer = document.getElementById('timer');

var $pomodoro = document.querySelector('#pomodoro');
var $breakTime = document.querySelector('#break')
var $count = document.querySelector('#count');

var audio = document.querySelector('audio');

const PLAY_ICON_PATH = "img/icons/start.png";
const PAUSE_ICON_PATH = "img/icons/pause.png"


$playPause.addEventListener('click', controller);
$reset.addEventListener('click', reset);

var interval = null;
var running = false;
var now = '00:00';
var currentTimer = null;

$timer.innerHTML = '00:00';



// function newSection(){

//     var Section = {
//         pomodoro: 20,
//         break: 5,
//         count: 3,
//         running: false,
//         currentTimer: null
//     }
//     return Section;
// }

function controller(){
    if(!running){
        if(!check()) return;
        playPause(now);
    }else{
        pause();
    }
}

function playPause(time){
    if(running) return;
 
    if(now == '00:00'){
        min = $pomodoro.value || 0;
        if($pomodoro.value > 0) min--;

        sec = 60;
        
    }else{
        var arr = now.split(':');

        sec = arr.pop();
        min= arr.pop();
    }

    interval = setInterval(function(){
        if(sec == 0){
            if (min == 0 && sec == 0) {

                clearInterval(interval);
                $playPause.src = PLAY_ICON_PATH;

                running = false;

                if(currentTimer == 'pomodoro'|| currentTimer == null){
                    startBreak();
                    return;
                }
                if(currentTimer == 'break'){
                    if($count.value <= 1 || NaN){
                        reset();
                        return;
                    }
                    startPomodoro();
                    return;
                }
                format(0, 0);
                return;
            }else{
                sec = 60;
                min--;
            }
            
        }
        sec--;
        format(min, sec);
    }, 1000);

    running = true;
    $playPause.src = PAUSE_ICON_PATH;
}

function format(min, sec){
    if(min <= 9 && min !== '00') min = '0' + min;
    if(sec <= 9 && sec !== '00') sec = '0' + sec;

    tempo = min + ":" + sec;
    $timer.innerHTML = tempo;
}

function pause(){
    if(!running) return;

    now = $timer.innerHTML;

    clearInterval(interval);
    $playPause.src  = PLAY_ICON_PATH;
    running = false;
}

function reset(){
    $timer.innerHTML = '00:00';
    $pomodoro.value = 20;
    $breakTime.value = 5;
    $count.value = 3;

    clearInterval(interval);

    $playPause.src = PLAY_ICON_PATH;
    interval = null;
    now = '00:00';
    currentTimer = null;
    running = false;
}

function startBreak(){
    audio.play();

    now = $breakTime.value;
    format(now,0);
    now = now + ':' + "00";

    currentTimer = 'break';
    clearInterval(interval);
    
}
function startPomodoro(){
    audio.play();

    now = $pomodoro.value;
    format(now,0);
    now = now + ':' + "00";

    currentTimer = 'pomodoro';
    $count.value--;
    clearInterval(interval);
}

function check(){
    if ($pomodoro.value == NaN || $pomodoro.value == 0){
        alert("atecion",'Enter a valid value for the pomodoro field!');
        return false;
    }
    if ($breakTime.value == NaN || $breakTime.value == 0){
        alert('Enter a valid value for the break time field!');
        return false;
    }
    return true;
}
