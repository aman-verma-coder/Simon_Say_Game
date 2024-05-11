let gameSequence = [];
let userSequence = [];
let check = false;
let level = 0;
let btns = ["red", "yellow", "green", "purple"];
let h3 = document.querySelector("h3");
let highestScore = 0;
document.addEventListener("keypress", function (event) {
    if (check == false) {
        console.log("Game Started");
        check = true;
        levelUp();
    }
});
function levelUp() {
    userSequence = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randidx = (Math.floor((Math.random()) * 4));
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSequence.push(randcolor);
    console.log(gameSequence);
    gameBlink(randbtn);
}
function gameBlink(btn) {
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function userBlink(btn) {
    btn.classList.add("userflash")
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}
function checkAns(idx) {
    if (userSequence[idx] === gameSequence[idx]) {
        if (userSequence.length == gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("Same Value");
    } else {
        if (highestScore < level) {
            highestScore = level;
        }
        h3.innerHTML = `Game Over! Your score is <b>${level}</b>. <br> Your highest score is ${highestScore}. <br> Press any key to restart.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 100);
        reset();
    }
}
function btnPress() {
    let btn = this;
    userBlink(btn);
    let clickedBtnColor = btn.getAttribute("id");
    userSequence.push(clickedBtnColor);
    checkAns(userSequence.length - 1);
}
let allBtns = document.querySelectorAll(".bttn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    check = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}