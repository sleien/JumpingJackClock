let m = 10
let s = 0

let wrapper = document.getElementById("MyWrapper");
let clock = document.getElementById("MyClockDisplay");
let display = document.getElementById("MyTextDisplay");
let button = document.getElementById("MyStartButton");

let audio = new Audio('https://share.schneider.today/beep.mp3');

function showTime(){

    if(s == 0){
        m--;
    }
    s = (s == 0 ? 59 : --s);
    
    let time = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    clock.innerText = time;
    clock.textContent = time;
    
    if(s == 0 && m == 0){
        wrapper.classList.remove("action");
        wrapper.classList.remove("finish");
        wrapper.classList.toggle("done");
        display.innerText = "You did it!";
        display.textContent = "You did it!";
    }else if(s == 15 && m == 0){
        wrapper.classList.remove("action");
        wrapper.classList.add("finish");
        display.innerText = "Last 15 Seconds!";
        display.textContent = "Last 15 Seconds!";
        audio.play();
    }else if(s == 15){
        wrapper.classList.toggle("action");
        display.innerText = "Break";
        display.textContent = "Break";
        audio.play();
    }else if(s == 0){
        wrapper.classList.toggle("action");
        display.innerText = "Action!";
        display.textContent = "Action!";
        audio.play();
    }
    
    if(m != 0 || s != 0){
        setTimeout(showTime, 1000);
    }
    

}

function start(){
    button.style.display = "none";
    if(s > 15 || s == 0){
        display.innerText = "Action!";
        display.textContent = "Action!";
    }else{
        wrapper.classList.remove("action");
        display.innerText = "Break";
        display.textContent = "Break";
    }

    showTime();
}