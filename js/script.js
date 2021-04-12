let timer;

let m_start = 10;
let s_start = 0;

let m = m_start;
let s = s_start;

let wrapper = document.getElementById("wrapper");
let display = document.getElementById("display");
let clock = document.getElementById("clock");
let text = document.getElementById("text");
let button = document.getElementById("startButton");
let record = document.getElementById("record");
let tries = document.getElementById("tries");

let audio = new Audio('https://share.schneider.today/beep.mp3');

function showTime() {

    if (s == 0) {
        m--;
    }
    s = (s == 0 ? 59 : --s);

    let time = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    clock.innerText = time;
    clock.textContent = time;

    if (s == 0 && m == 0) {
        wrapper.classList.remove("action");
        wrapper.classList.remove("finish");
        wrapper.classList.toggle("done");
        text.innerText = "You did it!";
        text.textContent = "You did it!";
    } else if (s == 15 && m == 0) {
        wrapper.classList.remove("action");
        wrapper.classList.add("finish");
        text.innerText = "Last 15 Seconds!";
        text.textContent = "Last 15 Seconds!";
        audio.play();
    } else if (s == 15) {
        wrapper.classList.toggle("action");
        text.innerText = "Break";
        text.textContent = "Break";
        audio.play();
    } else if (s == 0) {
        wrapper.classList.toggle("action");
        text.innerText = "Action!";
        text.textContent = "Action!";
        audio.play();
    }

    if (m == 0 || s == 0) {
        clearInterval(timer);
        surrender();
    }
}

function start() {
    button.style.display = "none";
    display.style.display = "block";
    if (s > 15 || s == 0) {
        text.innerText = "Action!";
        text.textContent = "Action!";
    } else {
        wrapper.classList.remove("action");
        text.innerText = "Break";
        text.textContent = "Break";
    }
    showTime();
    timer = setInterval(showTime, 1000);
}

function surrender() {
    clearInterval(timer);
    let seconds = (m_start * 60 + s_start) - (m * 60 + s);
    let tries = (localStorage.getItem('tries') ? JSON.parse(localStorage.getItem('tries')) : [])
    tries.push({
        'date': Date.now(),
        'seconds': seconds
    });
    localStorage.setItem('tries', JSON.stringify(tries));
    let recordTime = Math.max.apply(null, tries.map(x => x.seconds));
    localStorage.setItem('record', recordTime);
    record.innerHTML = "Your record is " + Math.floor(recordTime / 60) + " minutes and " + recordTime % 60 + " seconds!"
    display.style.display = "none";
    record.style.display = "block";
}

function showPedestal() {
    if(tries.style.display == "block"){
        tries.style.display = "none"
        startButton.style.display = "block";
        m = m_start;
        s = s_start

        while (tries.firstChild) {
            tries.removeChild(tries.firstChild);
        }
    }else{
        display.style.display = "none";
        record.style.display = "none";
        startButton.style.display = "none";
        tries.style.display = "block";
    
        JSON.parse(localStorage.getItem('tries')).forEach(element => {
            console.log(element)
            let p = document.createElement("p");
            let date = new Date(element.date)
            p.textContent = date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " - " +  (Math.floor(element.seconds / 60) < 10 ? '0' : Math.floor(element.seconds / 60)) + ":" + (element.seconds % 60 < 10 ? '0' : '') + element.seconds % 60;
            tries.appendChild(p);
        });
    }
}