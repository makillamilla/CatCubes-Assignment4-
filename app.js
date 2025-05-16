document.addEventListener('DOMContentLoaded', () => {
    catCubesGame();
});

function catCubesGame() {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0


const catColors = [
    'url(images/blue.png)',
    'url(images/green.png)',
    'url(images/orange.png)',
    'url(images/purple.png)',
    'url(images/red.png)',
    'url(images/yellow.png)',
]


// Create Board
function createBoard() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * catColors.length)
        square.style.backgroundImage = catColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()

// Drag the candies
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragstart')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragOver')
}

function dragEnter() {
    e.preventDefault()
    console.log(this.id, 'dragEnter')
}

function dragLeave() {
    console.log(this.id, 'dragLeave')
}

function dragDrop() {
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares [squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

function dragEnd() {
    console.log(this.id, 'dragEnd')
    //what is a valid move location? up/down
    let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width,
    ]
    if (squareIdBeingReplaced && validMoves) {
        //Does move result in a match? True = swap cubes / False = don't swap cubes
        let scoredRowOfFour = checkRowForFour()
        let scoredColumnForFour = checkColumnForFour()
        let scoredRowForThree = checkRowForThree()
        let scoredColumnForThree = checkColumnForThree()
        //Check if any combo was scored
        if (scoredColumnForFour || scoredRowOfFour || scoredColumnForThree || scoredRowForThree) {
            squareIdBeingDragged = null;
        }
        //If no combo was scored, revert to orginal cube locations
        else if (!scoredColumnForFour && !scoredRowOfFour && !scoredColumnForThree && !scoredRowForThree) {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
        }
    } else if (squareIdBeingReplaced && !validMove) {
        squares [squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares [squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}


// drop cubes once some have been cleared
function dropCubes() {
    for (i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * catColors.length)
                squares[i].style.backgroundImage = catColors[randomColor]
        }
    }
} }


// Checking for matches

//check for row of Three
function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
            return true;
        }
    }
    return false;
}

//check for column of Three
function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
            return true;
        }
    }
    return false;
}


//check for row of Four
function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i+1, i+2, i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
            return true;
        }
    }
    return false;
}

//check for column of Four
function checkColumnForFour() {
    for (i = 0; i < 47; i++) {
        let columnOfFour = [i, i+width, i+width*2, i+width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
            return true;
        }
    }
    return false;
}

// Checks carried out indefinitely -- Add button to clear interval for best practice
window.setInterval(function(){
    dropCubes()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}, 100)
}