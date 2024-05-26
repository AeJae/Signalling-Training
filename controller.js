document.querySelector("footer").style.backgroundImage = "url(\"/img/60-lines.png\")"; // Doesn't work in CSS

const gerOptions = ["ks_clear", "ks_clear_restricted", "ks_expect_stop", "ks_stop", "clear", "clear_100", "clear_60", "clear_40", "stop", "expect_clear", "expect_100", "expect_40_or_60", "expect_stop", "main", "distant", "repeater"]
const ausOptions = ["clear", "clear_60", "clear_40", "stop", "expect_clear", "expect_60", "expect_40", "expect_stop", "shunt_clear", "shunt_admitted", "shunt_stop", "repeater_clear", "repeater_restriction", "repeater_stop", "repeater_stop_ack"]

const regions = document.getElementById("regionSelector").children;
const gerSelectedLine = document.getElementById("gerSelector");
const ausSelectedLine = document.getElementById("ausSelector");
const inputBox = document.getElementById("userInput");
const signal = document.getElementById("signal");
let gerSelected = true;

ausSelectedLine.style.visibility = "hidden";

regions[0].addEventListener("click", germanyClicked);
regions[1].addEventListener("click", austriaClicked);

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function germanyClicked() {
    if (!gerSelected) {
        gerSelectedLine.style.visibility = "";
        ausSelectedLine.style.visibility = "hidden";
        gerSelected = true;
    }
    setImage();
}

function austriaClicked() {
    if (gerSelected) {
        gerSelectedLine.style.visibility = "hidden";
        ausSelectedLine.style.visibility = "";
        gerSelected = false;
    }
    setImage();
}

function setImage() {
    let randomNum;
    let src;
    if (gerSelected) {
        randomNum = randomIntFromInterval(0, gerOptions.length-1);
        src = `https://aejae.github.io/Signalling-Training/img/signals/german/${gerOptions[randomNum]}.gif`;
        console.log(gerOptions[randomNum]);
    } else {
        randomNum = randomIntFromInterval(0, ausOptions.length-1);
        src = `https://aejae.github.io/Signalling-Training/img/signals/austrian/${ausOptions[randomNum]}.gif`;
        console.log(ausOptions[randomNum]);
    }
    signal.setAttribute("src", src);
}

function userInput(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (inputBox.value.trim() !== "") {
            console.log(inputBox.value);
        }
    }
}

document.addEventListener("keydown", userInput)
setImage();
