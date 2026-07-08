function drawX() {
  return `
  <svg viewBox="0 0 100 100" width="120" height="120">
    <line x1="25" y1="25" x2="75" y2="75" stroke="#ff6666" stroke-width="14" stroke-linecap="round" />
    <line x1="75" y1="25" x2="25" y2="75" stroke="#ff6666" stroke-width="14" stroke-linecap="round" />
  </svg>
  `
}

function drawO() {
  return `
  <svg viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="35" fill="none" stroke="#7cadfc" stroke-width="14" stroke-linecap="round" />
  </svg>
  `
}
let isPlayerX = true
let board = Array(9).fill("")
let gameOver = false

const message = document.getElementById('turn')
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const cells = document.querySelectorAll('.grid')
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (board[index] !== "" || gameOver) {
      return
    }
    const innerdiv = cell.querySelector('.inner')
    board[index] = isPlayerX ? "X" : "O"
    if (isPlayerX) {
      innerdiv.innerHTML = drawX()
      message.innerText = "Player O's Turn"
    } else {
      innerdiv.innerHTML = drawO()
      message.innerText = "Player X's Turn"
    }
    isPlayerX = !isPlayerX
    checkWinning()
  })
})

function checkWinning() {
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i]
    const a = combo[0]
    const b = combo[1]
    const c = combo[2]
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
      message.innerText = `Player ${board[a]} Won!`
      gameOver = true
      document.querySelector('.container').classList.add('gameover')
      message.classList.replace('bg-slate-200', 'bg-green-200')
      drawWinningLine(combo)
      combo.forEach(index => {
        cells[index].querySelector('.inner').classList.add('pulse')
      })
      setTimeout(() => {
        alert(`Player ${board[a]} Won!`)
        resetBoard()
      }, 1200)
      return
    }
  }

  if (board.every(cell => cell !== "")) {
    message.innerText = "It's a Tie!"
    gameOver = true
    document.querySelector('.container').classList.add('gameover')
    message.classList.replace('bg-slate-200', 'bg-yellow-200')
    setTimeout(() => {
      alert("It's a Tie!")
      resetBoard()
    }, 300)
  }
}
function getCoords(index) {
  const col = index % 3
  const row = Math.floor(index / 3)
  const x = col * 160 + 80
  const y = row * 160 + 80
  return { x, y }
}
function drawWinningLine(combo) {
  const start = getCoords(combo[0])
  const end = getCoords(combo[2])

  const svgNS = "http://www.w3.org/2000/svg"
  const line = document.createElementNS(svgNS, "line")
  line.setAttribute("id", "winLine")
  line.setAttribute("x1", start.x)
  line.setAttribute("y1", start.y)
  line.setAttribute("x2", end.x)
  line.setAttribute("y2", end.y)
  line.setAttribute("stroke", "#4ade80")
  line.setAttribute("stroke-width", "10")
  line.setAttribute("stroke-linecap", "round")

  document.getElementById("lines").appendChild(line)
}
function resetBoard() {
  board = Array(9).fill("")
  isPlayerX = true
  gameOver = false

  cells.forEach(cell => {
    const innerdiv = cell.querySelector('.inner')
    innerdiv.innerHTML = ""
    innerdiv.classList.remove('pulse')
  })
  const winLine = document.getElementById('winLine')
  if (winLine) {
    winLine.remove()
  }
  message.innerText = "Player X's Turn"

  document.querySelector('.container').classList.remove('gameover')
  message.classList.remove('bg-green-200', 'bg-yellow-200')
  message.classList.add('bg-slate-200')
}