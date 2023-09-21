const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
}

// Função para tocar o audio
function playSound(audionName) {
    let audio = new Audio(`./src/audio/${audionName}.m4a`)
    audio.volume = .2
    audio.play()
}

// Função para gerar um número aleatório
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })
    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]

    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

// Função para o contador 'TimeLeft'
function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert('Game Over! Seu resultado foi: ' + state.values.result)
        // playSound("gameover")
    }
}

// Função para adicionar o Ralph
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
        if(square.id === state.values.hitPosition) {
            state.values.result++
            state.view.score.textContent = state.values.result
            state.values.hitPosition = null
            playSound("hit")
        }
    })
  })
}

// Inicializador
function initialize() {
    addListenerHitBox()
}

initialize()
