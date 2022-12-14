const APIEndpoint = "http://api.quotable.io/random";
const textToWrite = document.querySelector(".text-to-write")
const textToTest = document.querySelector(".text-to-test")
const time = document.querySelector(".time")
let currentScore = document.querySelector(".current-score")
const timerDiv = document.querySelector(".timer")
const scoreDiv = document.querySelector(".score")
let ApiContent = {};
let timer = 50
let score = 0


const getNewSentence = async () => {
  try {
    let response = await fetch(APIEndpoint)
    if (!response.ok) throw Error()
    let result =  await response.json()
    ApiContent.lengthApiSentence = result.length
    ApiContent.ApiSentence = result.content
    displayContent(ApiContent)
  } catch (error) {
    console.log(error)
  }
}

const displayContent = (ApiContent) => {
  textToWrite.textContent = ApiContent.ApiSentence;
}

const decreaseTime = () => {
  time.innerText = timer
  if (timer === 0) {
    return
  }
  if (timer%2 == 0) {
    timerDiv.style.backgroundImage= "linear-gradient(270deg, rgba(233,67,196,1) 0%, rgba(251,133,29,1) 100%)"
  } else {
    timerDiv.style.backgroundImage = "linear-gradient(270deg, rgba(143,233,67,1) 0%, rgba(29,251,222,1) 100%)"
  }
  timer--
}

getNewSentence()
setInterval(decreaseTime, 1000)
decreaseTime()

const compareString = (event) => {
  userText = event.target.value
  userTextLength = event.target.value.length
  testToVerify = ApiContent.ApiSentence.slice(0,userTextLength)

  if (userText === testToVerify) {
    if (timer === 0) {
      return
    }
    score++
    currentScore.innerHTML = score
  }

  if (userText === testToVerify && userTextLength === ApiContent.lengthApiSentence) {
    textToTest.textContent = ""
    textToTest.value = ""
    getNewSentence()
  }
}

const resetGame = (event) => {
  if (event.keyCode === 27) {
    timer = 50;
    score = 0
    currentScore.innerHTML = score;
    textToTest.textContent = ""
    textToTest.value = ""
    getNewSentence()
  }
}
window.addEventListener("keydown", resetGame)
textToTest.addEventListener("input", compareString)
