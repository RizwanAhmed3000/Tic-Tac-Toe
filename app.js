const info = document.querySelector('#info');
let boxes = document.querySelectorAll('.box');
// console.log(boxes);
let move = "circle";
info.innerHTML = "Circle goes first"
// let boxHover = Array.from(boxes)




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
    // hoverBoxes(move)
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
            allBoxes.forEach(box =>
                box.replaceWith(box.cloneNode(true)));
            return
        }


    })
}
