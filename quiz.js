let currentIndex = 0
const question = document.getElementById('question')
const buttonContainer = document.getElementById('buttons')
const message = document.getElementById('message')
const card = document.getElementById('card')
const progressFill = document.getElementById('progressFill')
const mascot = document.getElementById('mascot')

const questions = [
  {
    text: "Give me a color that starts with the letter M",
    options: [
      { label: "Mlue", isCorrect: true },
      { label: "Magenta", isCorrect: false },
      { label: "Magnet", isCorrect: false },
      { label: "Mark", isCorrect: false }
    ]
  },
  {
    text: "Which adds an element to the end of an array?",
    options: [
      { label: ".push()", isCorrect: true },
      { label: ".pop()", isCorrect: false },
      { label: ".shift()", isCorrect: false },
      { label: ".append()", isCorrect: false }
    ]
  },
  {
    text: "What does === check that == does not?",
    options: [
      { label: "Scope", isCorrect: false },
      { label: "Value", isCorrect: false },
      { label: "Type ", isCorrect: true },
      { label: "Length", isCorrect: false }
    ]
  },
  {
    text: "What is the output of typeof null?",
    options: [
      { label: "null", isCorrect: false },
      { label: "object", isCorrect: true },
      { label: "undefined", isCorrect: false },
      { label: "boolean", isCorrect: false }
    ]
  }
]

const confettiColors = ['#58cc02', '#ffc800', '#1cb0f6', '#ff4b4b', '#a560f5']

function launchConfetti(originX, originY) {
  const pieceCount = 18
  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('div')
    piece.classList.add('confetti-piece')
    piece.style.left = originX + 'px'
    piece.style.top = originY + 'px'
    piece.style.backgroundColor = confettiColors[i % confettiColors.length]

    const angle = Math.random() * Math.PI * 2
    const distance = 60 + Math.random() * 80
    const endX = Math.cos(angle) * distance
    const endY = Math.sin(angle) * distance - 40
    const spin = Math.random() * 360

    piece.style.setProperty('--confetti-end', `translate(${endX}px, ${endY}px)`)
    piece.style.setProperty('--confetti-spin', `${spin}deg`)

    document.body.appendChild(piece)
    setTimeout(() => piece.remove(), 950)
  }
}

function setMessage(text, type) {
  message.innerText = text
  message.className = "font-semibold"
  if (type === "success") {
    message.classList.add('text-green-600')
  } else if (type === "error") {
    message.classList.add('text-red-600')
  }
}

function setMascot(state) {
  mascot.classList.remove('mascot-normal', 'mascot-happy', 'mascot-sad')
  mascot.classList.add(`mascot-${state}`)
}

function updateProgress() {
  const percent = Math.min((currentIndex / questions.length) * 100, 100)
  progressFill.style.width = percent + '%'
}

function renderQuestion() {
  updateProgress()

  if (currentIndex >= questions.length) {
    renderCompletion()
    return
  }

  question.innerText = questions[currentIndex].text
  buttonContainer.innerHTML = ""
  setMessage("", null)
  setMascot('normal')
  card.classList.replace('bg-green-50', 'bg-white')
  card.classList.replace('border-green-200', 'border-slate-100')

  const options = questions[currentIndex].options
  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    const button = document.createElement('button')
    button.innerText = option.label
    button.dataset.isCorrect = option.isCorrect
    button.classList.add('btn', 'hover:scale-110', 'transition-all', 'duration-200', 'cursor-pointer')
    button.addEventListener('click', () => {
      checkAnswer(button)
    })
    buttonContainer.appendChild(button)
  }
}

function renderCompletion() {
  question.innerText = "Yayy! You did it! 🎉"
  buttonContainer.innerHTML = ""
  setMessage("You've completed all the questions", "success")
  setMascot('happy')
  card.classList.replace('bg-white', 'bg-green-50')
  card.classList.replace('border-slate-100', 'border-green-200')

  const restartButton = document.createElement('button')
  restartButton.innerText = "Play Again"
  restartButton.classList.add('btn', 'hover:scale-110', 'transition-all', 'duration-200', 'cursor-pointer', 'col-span-4')
  restartButton.addEventListener('click', () => {
    currentIndex = 0
    renderQuestion()
  })
  buttonContainer.appendChild(restartButton)
}

function checkAnswer(button) {
  const allButtons = buttonContainer.querySelectorAll('button')

  if (button.dataset.isCorrect === "true") {
    allButtons.forEach(b => {
      b.disabled = true
      b.classList.remove('hover:scale-110', 'cursor-pointer')
    })

    button.classList.add('btn-correct')
    card.classList.replace('bg-white', 'bg-green-50')
    card.classList.replace('border-slate-100', 'border-green-200')
    setMessage("YAYYYY! Correct", "success")
    setMascot('happy')

    const rect = button.getBoundingClientRect()
    launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)

    setTimeout(() => {
      currentIndex++
      renderQuestion()
    }, 1000)
  }
  else {
    button.classList.add('btn-incorrect')
    button.classList.remove('cursor-pointer', 'hover:scale-110')
    button.disabled = true
    setMessage("EHHH! Try Again", "error")
    setMascot('sad')
  }
}

renderQuestion()