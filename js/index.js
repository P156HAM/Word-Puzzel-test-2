"use strict";

// Word Puzzle
let words = [
  {
    startWord: "FOUR",
    endWord: "FIVE",
  },
  {
    startWord: "EYE",
    endWord: "LID",
  },
  {
    startWord: "TIGER",
    endWord: "ROSES",
  },
  {
    startWord: "WHEAT",
    endWord: "BREAD",
  },
];

let word = randomizeWord();
let input = document.querySelector("#inputText");
let newWord = "";
let previousWord;
let correctWordSpace = document.querySelector('.correct-word')

function randomizeWord() {
  let index = Math.floor(Math.random() * words.length);
  return words[index];
}

document.querySelector(".btn").addEventListener("click", function () {
  word = randomizeWord();
  previousWord = word.startWord;
  document.querySelector(".startWord").innerHTML = word.startWord;
  document.querySelector(".endWord").innerHTML = word.endWord;
  correctWordSpace.innerHTML = '';
  input.style.display = 'block'
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.length === word.startWord.length) {
    newWord = input.value.toUpperCase();
    console.log(newWord);
    let diff = 0;
    for (let i = 0; i < newWord.length; i++) {
      if (newWord[i] !== previousWord[i]) {
        diff++;
      }
    }

    console.log(diff);

    if (diff === 1) {
      gameEngine(newWord)
      previousWord = newWord;
      if(newWord === word.endWord) {
        gameWin()
      }
    } else {
      console.log('You can only change 1 letter!');
    }
    input.value = ''
  } else {
    console.log("Wrong");
  }
});

async function gameEngine(word) {
  const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const data = await fetch(baseUrl);
  const json = await data.json();

  if (json.title === 'No Definitions Found') {
    console.log('This word is not a correct word, try again!.')
  } else {
    correctWordSpace.innerHTML += 
    `<p>${word}</p>`;
  }
}

function gameWin() {
    correctWordSpace.innerHTML = 
    `<p>YOU WIN</p>
    <p>Click on the New word button to play again.</p>`;
    input.style.display = 'none'
}
