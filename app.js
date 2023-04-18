//getting Elements
const info = document.querySelector('#info');
let boxes = document.querySelectorAll('.box');
let winPopUp = document.querySelector('.winPopUp')
let winner = document.querySelector('.winner')
let overlay = document.querySelector('.overlay')
let playAgain = document.querySelector('.playAgain')
let allBoxes = boxes; //to cycle through 2d array
let count = 0; //for draw logic
let move = "circle";
info.innerHTML = "Circle goes first"
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

//Play Again button
playAgain.addEventListener('click', () => {
    location.reload()
})

//Main logic for "x" & "O"
boxes.forEach((cell, index) => {
    cell.id = index;
    cell.addEventListener('mouseenter', () => {
        cell.classList.add(`boxHoverFor${move}`)
    })
    cell.addEventListener('mouseleave', () => {
        cell.classList.remove(`boxHoverFor${move}`)
    })
    cell.addEventListener('click', yourMove);
})

//move changing function

function yourMove(element) {
    const moveDisplay = document.createElement('div')
    moveDisplay.classList.add(move);
    element.target.append(moveDisplay);
    if (move !== 'circle') {
        move = 'circle'
    } else {
        move = 'cross'
    }
    info.innerHTML = `It is now ${move}'s turn`
    element.target.removeEventListener('click', yourMove)
    count += 1;
    if (count == 9) {
        drawFunction();
    }
    checkScore();
    console.log(move)
    return move
}

//Checking for draw

function drawFunction() {
    info.innerHTML = `Match Draw`
    overlay.classList.remove('hidden')
    winPopUp.classList.remove('hidden')
    winner.innerHTML = "It's a Draw"
    allBoxes.forEach(box =>
        box.replaceWith(box.cloneNode(true)));
        return
}


//Checking for a win

function checkScore() {

    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allBoxes[cell].firstChild?.classList.contains('circle'));
        const crossWins = array.every(cell =>
            allBoxes[cell].firstChild?.classList.contains('cross'));


        if (circleWins) {
            info.innerHTML = `Circle Wins`
            overlay.classList.remove('hidden')
            winPopUp.classList.remove('hidden')
            winner.innerHTML = 'Circle wins'

            allBoxes.forEach(box =>
                box.replaceWith(box.cloneNode(true)));
            return
        } else if (crossWins) {

            info.innerHTML = `Cross Wins`
            overlay.classList.remove('hidden')
            winPopUp.classList.remove('hidden')
            winner.innerHTML = 'Cross wins'

            allBoxes.forEach(box =>
                box.replaceWith(box.cloneNode(true)));
            return
        }
    })
}
