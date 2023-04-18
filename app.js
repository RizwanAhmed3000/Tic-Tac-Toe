const info = document.querySelector('#info');
let boxes = document.querySelectorAll('.box');
let move = "circle";
let winPopUp = document.querySelector('.winPopUp')
let winner = document.querySelector('.winner')
let overlay = document.querySelector('.overlay')
let playAgain = document.querySelector('.playAgain')
info.innerHTML = "Circle goes first"
// console.log(winner.textContent = 'bye');
// console.log(overlay)
// let boxHover = Array.from(boxes)

playAgain.addEventListener('click', ()=>{
    location.reload()
})


boxes.forEach((cell, index) => {
    cell.id = index;
    // console.log(cell);
    cell.addEventListener('mouseenter', () => {
        cell.classList.add(`boxHoverFor${move}`)
    })
    cell.addEventListener('mouseleave', () => {
        cell.classList.remove(`boxHoverFor${move}`)
    })
    cell.addEventListener('click', yourMove);
})

function yourMove(element) {
    // console.log(element.target)
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
    checkScore();
    console.log(move)
    return move
}


function checkScore() {
    let allBoxes = boxes;
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]


    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allBoxes[cell].firstChild?.classList.contains('circle'));


        if (circleWins) {
            info.innerHTML = `Circle Wins`
            overlay.classList.remove('hidden')
            winPopUp.classList.remove('hidden')
            winner.innerHTML = 'Circle'

            allBoxes.forEach(box =>
                box.replaceWith(box.cloneNode(true)));
            return
        }

    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allBoxes[cell].firstChild?.classList.contains('cross'));
        if (crossWins) {
            info.innerHTML = `Cross Wins`
            overlay.classList.remove('hidden')
            winPopUp.classList.remove('hidden')
            winner.innerHTML = 'Cross'
            winPopUp.style.textShadow = '0px 0px 20px gold'
            allBoxes.forEach(box =>
                box.replaceWith(box.cloneNode(true)));
            return
        }


    })
}
