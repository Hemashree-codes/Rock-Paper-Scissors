// GAME VARIABLES

let userScore = 0;
let computerScore = 0;
let roundNumber = 0;

const maxRounds = 5;



// EMOJIS

const emojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};



// SOUND EFFECT

function playSound(type) {

    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
        return;
    }

    const audioContext = new AudioContext();

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);


    if (type === "win") {
        oscillator.frequency.value = 700;
    }

    else if (type === "lose") {
        oscillator.frequency.value = 250;
    }

    else {
        oscillator.frequency.value = 450;
    }


    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(
        0.2,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.4
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.4
    );
}


// PLAY GAME


function playGame(userChoice) {

    // Stop after 5 rounds
    if (roundNumber >= maxRounds) {
        return;
    }


    // Choices
    const choices = [
        "rock",
        "paper",
        "scissors"
    ];


    // Computer choice
    const computerChoice =
        choices[
            Math.floor(
                Math.random() * choices.length
            )
        ];


    // Increase round
    roundNumber++;


    document.getElementById("round-number").textContent =
        roundNumber;


    // DISPLAY CHOICES
   

    document.getElementById("user-choice").textContent =
        emojis[userChoice];

    document.getElementById("computer-choice").textContent =
        emojis[computerChoice];


    // ELEMENTS
    

    const resultText =
        document.getElementById("result-text");

    const statusMessage =
        document.getElementById("status-message");


    let result = "";


    
    // DRAW
  

    if (userChoice === computerChoice) {

        result = "🤝 It's a Draw!";

        resultText.className = "draw";

        statusMessage.textContent =
            "🤝 Round ended in a draw!";

        playSound("draw");
    }


  
    // USER WINS

    else if (

        (userChoice === "rock" &&
            computerChoice === "scissors") ||

        (userChoice === "paper" &&
            computerChoice === "rock") ||

        (userChoice === "scissors" &&
            computerChoice === "paper")

    ) {

        result = "🎉 You Win!";

        userScore++;

        resultText.className = "win";

        statusMessage.textContent =
            "🎉 Great! You won this round!";

        playSound("win");
    }


    // COMPUTER WINS
    

    else {

        result = "😢 Computer Wins!";

        computerScore++;

        resultText.className = "lose";

        statusMessage.textContent =
            "😢 Computer won this round. Try again!";

        playSound("lose");
    }



    // DISPLAY RESULT


    resultText.textContent = result;


 
    // UPDATE SCORE


    document.getElementById("user-score").textContent =
        userScore;

    document.getElementById("computer-score").textContent =
        computerScore;



    // GAME OVER

    if (roundNumber === maxRounds) {

        showWinner();
    }
}



// SHOW WINNER


function showWinner() {

    const winnerScreen =
        document.getElementById("winner-screen");

    const winnerIcon =
        document.getElementById("winner-icon");

    const winnerTitle =
        document.getElementById("winner-title");

    const winnerMessage =
        document.getElementById("winner-message");


    // Show popup
    winnerScreen.style.display = "flex";


    // USER WINS


    if (userScore > computerScore) {

        winnerIcon.textContent = "🏆";

        winnerTitle.textContent =
            "🎉 You Win!";

        winnerMessage.textContent =
            `Final Score: You ${userScore} - Computer ${computerScore}`;

        createConfetti();

        playSound("win");
    }


   
    // COMPUTER WINS
   

    else if (computerScore > userScore) {

        winnerIcon.textContent = "😢";

        winnerTitle.textContent =
            "Computer Wins!";

        winnerMessage.textContent =
            `Final Score: You ${userScore} - Computer ${computerScore}`;

        playSound("lose");
    }


  
    // DRAW


    else {

        winnerIcon.textContent = "🤝";

        winnerTitle.textContent =
            "It's a Draw!";

        winnerMessage.textContent =
            `Final Score: You ${userScore} - Computer ${computerScore}`;

        playSound("draw");
    }
}



// CONFETTI


function createConfetti() {

    const confettiCount = 80;

    for (let i = 0; i < confettiCount; i++) {

        const confetti =
            document.createElement("div");

        confetti.classList.add("confetti");


        // Random position
        confetti.style.left =
            Math.random() * 100 + "vw";


        // Random size
        const size =
            Math.random() * 8 + 6;

        confetti.style.width =
            size + "px";

        confetti.style.height =
            size + "px";


        // Random animation delay
        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        // Random rotation
        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        document.body.appendChild(confetti);


        // Remove after animation
        setTimeout(() => {

            confetti.remove();

        }, 4500);
    }
}



// RESET GAME


function resetGame() {

    userScore = 0;

    computerScore = 0;

    roundNumber = 0;


    // Reset round
    document.getElementById("round-number").textContent =
        "0";


    // Reset choices
    document.getElementById("user-choice").textContent =
        "-";

    document.getElementById("computer-choice").textContent =
        "-";


    // Reset result
    const resultText =
        document.getElementById("result-text");

    resultText.textContent =
        "Make your choice!";

    resultText.className = "";


    // Reset status
    document.getElementById("status-message").textContent =
        "👆 Choose your move!";


    // Reset score
    document.getElementById("user-score").textContent =
        "0";

    document.getElementById("computer-score").textContent =
        "0";


    // Hide winner screen
    document.getElementById("winner-screen").style.display =
        "none";


    // Remove remaining confetti
    document.querySelectorAll(".confetti").forEach(
        confetti => confetti.remove()
    );
}