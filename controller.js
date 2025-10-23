document.querySelector("footer").style.backgroundImage = "url(\"/img/60-lines.png\")"; // Doesn't work in CSS

const gerOptions = ["repeater_expect_clear", "40_expect_stop", "40_expect_40_or_60", "40_expect_100", "40_expect_clear", "60_expect_stop", "60_expect_40_or_60", "60_expect_100", "60_expect_clear", "ks_clear", "ks_clear_restricted", "ks_expect_stop", "ks_stop", "clear_expect_stop","clear_expect_40_or_60", "clear_expect_100", "clear_expect_clear", "clear", "100_expect_stop", "100_expect_40_or_60", "100_expect_100", "100_expect_clear", "clear_100", "clear_60", "clear_40", "stop", "expect_clear", "expect_100", "expect_40_or_60", "expect_stop", "main", "distant", "repeater"]
const ausOptions = ["clear", "clear_60", "clear_40", "stop", "expect_clear", "expect_60", "expect_40", "expect_stop", "shunt_clear", "shunt_admitted", "shunt_stop", "repeater_clear", "repeater_restricted", "repeater_stop", "repeater_stop_ack"]

const regions = document.getElementById("regionSelector").children;
const gerSelectedLine = document.getElementById("gerSelector");
const ausSelectedLine = document.getElementById("ausSelector");
const inputBox = document.getElementById("userInput");
const signal = document.getElementById("signal");
let gerSelected = true;
let currentSignal = "";
let previousRandomNum = -1;

ausSelectedLine.style.visibility = "hidden";

regions[0].addEventListener("click", germanyClicked);
regions[1].addEventListener("click", austriaClicked);

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function nonRepeatedRandomInt(min, max) { // min and max included
    let output;
    while (true) {
        output = randomIntFromInterval(min, max);
        if (output !== previousRandomNum) { previousRandomNum = output; break; }
    }
    return output;
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
        randomNum = nonRepeatedRandomInt(0, gerOptions.length-1);
        src = `https://aejae.github.io/Signalling-Training/img/signals/german/${gerOptions[randomNum]}.gif`;
        currentSignal = gerOptions[randomNum];
    } else {
        randomNum = nonRepeatedRandomInt(0, ausOptions.length-1);
        src = `https://aejae.github.io/Signalling-Training/img/signals/austrian/${ausOptions[randomNum]}.gif`;
        currentSignal = ausOptions[randomNum];
    }
    signal.setAttribute("src", src);
}

function userInput(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const userAnswer = inputBox.value.trim().toLowerCase();
        if (userAnswer !== "") {
            let answer = currentSignal.split("_");
            if (answer[0] === "ks") {
                delete answer[0];
            }
            answer = answer.join(" ").trim().toLowerCase();
            if (userAnswer === answer) {
                console.log("Correct");
            } else {
                console.log("Answer:", answer.toUpperCase());
                alert("Answer: " + answer.toUpperCase());
            }
            inputBox.value = "";
            setImage();
        }
    }
}

document.addEventListener("keydown", userInput)
setImage();
