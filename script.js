let order = []; //takes in the random numbers
let tableData = [];
let inputOrder = []; //the players inputs
const imgs = [8]; //the 9 images we have on the screen
let sortDirection = false;
let hide; //keeps track of how many times the comp has hid the images
let turn; //the level we are on
let rightChoice; //boolean to see if the player has made the right choice or not
let compTurn; //boolean variable to check if its the comps turn or the players
let intervalId; //keeps track of the intervals
let on = false; //checks if the game is on or off. so while off the player cannot push the buttons.
let lose; //boolean that checks if you have lost or not
let named;

const turnCounter = document.querySelector("#turn"); //access to the HTML
const startButton = document.querySelector("#startBtn"); //access to the HTML

for (let i = 0; i < 9; i++) {
    //putting the imgs in the imgs array
    imgs[i] = document.getElementById("img" + (i + 1));
}

startButton.addEventListener("click", () => {
    //when button is clicked excute the play function
    nameInput();
    play();
});

function nameInput() {
    let i = 0;
    named = prompt("What is your name?");
    localStorage.setItem("name", named);
    while (!named) {
        var conf = prompt("Your name cannot be empty. Please enter again");
        localStorage.setItem("name", named);
    }
}

function play() {
    //resets all the variables and excutes the gameTurn function
    lose = false;
    order = [];
    inputOrder = [];
    intervalId = 0;
    turn = 1;
    hide = 0;
    compTurn = true;
    turnCounter.innerHTML = "Level: " + turn;
    rightChoice = true;
    for (var i = 0; i < 30; i++) {
        order.push(Math.floor(Math.random() * 9) + 1);
    }
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (hide == turn) {
        //if the comps turn is over then excute this if condition
        clearInterval(intervalId);
        resetImg();
        compTurn = false;
        on = true;
    }

    if (compTurn) {
        //if its the comps turn then excute this if condition
        resetImg();
        setTimeout(() => {
            let i = 1;
            while (i < 10) {
                if (order[hide] == i) {
                    hideNumber(i - 1);
                    hide++;
                    break;
                }
                i++;
            }
        }, 200);
    }
}

function check() {
    if (inputOrder[inputOrder.length - 1] != order[inputOrder.length - 1])
    //checks if you have made a mistake
        rightChoice = false;

    if (rightChoice == false) {
        //if you've made a mistake then restart
        turnCounter.innerHTML = "Wrong";
        setTimeout(() => {
            addToTheTableData(named, turn);
            loadTableData(tableData);
            // play();
        }, 500);
    }

    if (turn == inputOrder.length && rightChoice && !lose) {
        //if right then continue
        turn++;
        inputOrder = [];
        compTurn = true;
        hide = 0;
        turnCounter.innerHTML = "Level: " + turn;
        intervalId = setInterval(gameTurn, 800); //we call the game turn again to make some sort of loop
    }
}

function resetImg() {
    //the images reapeare
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = "block";
    }
}

//hides the specified image
function hideNumber(i) {
    imgs[i].style.display = "none";
}

//checks if the chosen image is the right choice or not. if not then you lose and you have to restart, if true then continue.
for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", (event) => {
        if (on) {
            inputOrder.push(i + 1);
            check();
            hideNumber(i);
            if (!lose) {
                setTimeout(() => {
                    resetImg();
                }, 200);
            }
        }
    });
}

function addToTheTableData(named, score) {
    let a = { named: named, score: score };
    tableData.push(a);
}

function loadTableData(tableData) {
    const tableBody = document.querySelector(".tableData");
    let datahtml = " ";
    let index = 1;
    for (let tds of tableData) {
        datahtml += `<tr> <td>${index}</td> <td>${tds.named}</td><td>${tds.score}</td></tr>`;
        index++;
    }
    tableBody.innerHTML = datahtml;
    console.log(datahtml);
}

function sortColumn(columnName) {
    sortNumberColumn(columnName);
    loadTableData(tableData);
}

function sortNumberColumn(columnName) {
    tableData = tableData.sort((p1, p2) => {
        return p1[columnName] - p2[columnName];
    });
}

function sortColumnUp(columnName) {
    sortNumberColumnUp(columnName);
    loadTableData(tableData);
}

function sortNumberColumnUp(columnName) {
    tableData = tableData.sort((p1, p2) => {
        return p2[columnName] - p1[columnName];
    });
}