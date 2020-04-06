let wordId;
let wordArray = [];
const span = document.createElement("span");
let victory = false;
let defeat = false;
let ATTEMPTS = 10;

const checkVictory = () => {
    victory = !(wordArray.includes(" _ "));
    
    if (victory) {
        setTimeout( () => {
            alert("You win!")
            location.reload();
        }, 50)
    }
}

const checkDefeat = () => {
    if (ATTEMPTS === 0) {
        defeat = true;
    }

    if (defeat && !victory) {
        setTimeout( () => {
            alert("You lose!")
            location.reload();
        }, 50)
    }
}

const checkLetter = (event) => {
    const letter = event.key;
    --ATTEMPTS;
    
    fetch(`/hangman/guess/${wordId}/${letter}`)
    .then(res => res.json())
    .then(data => {
        
        data.forEach(function(datum, index) {
            if (datum) {
                wordArray[index] = letter;
                span.innerText = wordArray.join("");;
            }
        })
        
        return wordArray;
    })
    .then ( (data) => {
        checkVictory();
        checkDefeat();
    })
    
}

startGame = (event) => {
    event.preventDefault();
    
    const button = document.getElementById("start-button");
    const form = document.getElementById("start-game");
    form.removeChild(button);

    fetch("/hangman/words")
        .then (res => res.json())
        .then (data => {
            const { id, letterCount } = data;
            wordId = id;

            for (let i = 0; i < letterCount; ++i) {
                wordArray[i] = " _ ";
            }
            
            span.innerText = wordArray.join("");
            document.getElementById("game-screen").appendChild(span);
        })

    document.addEventListener("keydown", checkLetter);
}