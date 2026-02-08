// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Trivia Elements
const triviaContainer = document.getElementById("trivia-container");
const triviaQuestion = document.getElementById("trivia-question");
const triviaOptions = document.querySelectorAll(".trivia-btn");
const backBtn = document.getElementById("back-btn");

// Video Elements
const videoBtn = document.getElementById("video-btn");
const videoContainer = document.getElementById("video-container");
const surpriseVideo = document.getElementById("surprise-video");

let currentState = 0; // 0: Envelope, 1: Letter, 2: Final/Trivia Start, 3: Trivia, 4: Video

// Trivia Data
const questions = [
    {
        question: "What is my biggest dream?",
        options: ["To be a Web3 Dev", "To get married to you!", "To become a musician", "To buy a Porsche with you!"],
        correct: 0
    },
    {
        question: "What is my favorite Hobby?",
        options: ["Making Music", "Playing Video Games", "Beatboxing", "Workout"],
        correct: 1
    },
    {
        question: "How much do I love you? ❤️",
        options: ["A lot", "Infinity ♾️", "To the moon 🌙", "More than You!"],
        correct: 1
    }
];

let currentQuestionIndex = 0;

// Helper to update state
function updateState(newState) {
    currentState = newState;
    if (currentState === 0) {
        backBtn.style.display = "none";
    } else {
        backBtn.style.display = "flex";
    }
}

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
    updateState(1);
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yayyyy! Lesgooo Chat! she said yess🙈!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
    updateState(2);
});

// Surprise/Trivia Click
finalText.addEventListener("click", () => {
    // Hide the letter content
    letter.style.display = "none";

    // Show the trivia container
    triviaContainer.style.display = "flex";
    currentQuestionIndex = 0;
    loadQuestion(currentQuestionIndex);
    updateState(3);
});

function loadQuestion(index) {
    if (index < questions.length) {
        const q = questions[index];
        triviaQuestion.textContent = q.question;
        triviaOptions.forEach((btn, i) => {
            btn.textContent = q.options[i];
        });
    } else {
        // Finished all questions
        finishTrivia();
    }
}

// Handle Answer Clicks
triviaOptions.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        // Just proceed to next question for now
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            finishTrivia();
        }
    });
});

function finishTrivia() {
    triviaContainer.style.display = "none";
    letter.style.display = "flex";

    // Update letter content to show final celebration
    title.innerHTML = "You answered all Correct!<br>Here's a surprise gift for you Ayra! 💖";
    title.style.fontSize = "28px"; // Make text smaller to fit
    catImg.src = "cat_heart.gif";
    finalText.style.display = "none"; // Hide the trivia start button

    // Show Video Button
    videoBtn.style.display = "inline-block";

    // We stay in state 2 logic-wise for "Result Screen", or we can define a sub-state.
    // But since back button behavior for State 2 (Result) -> State 1 (Letter) is acceptable (resetting), we can leave it.
    // However, we need to hide videoBtn if we go back.
    updateState(2);
}

// Video Button Click
videoBtn.addEventListener("click", () => {
    letter.style.display = "none";
    videoContainer.style.display = "flex";
    surpriseVideo.play();
    updateState(4);
});

// Back Button Click
backBtn.addEventListener("click", () => {
    if (currentState === 4) {
        // Video -> Final Celebration (Result Screen)
        videoContainer.style.display = "none";
        letter.style.display = "flex";
        surpriseVideo.pause();
        surpriseVideo.currentTime = 0;
        updateState(2);
    } else if (currentState === 3) {
        // Trivia -> Final (Trivia Start Screen)
        triviaContainer.style.display = "none";
        letter.style.display = "flex";
        updateState(2);
    } else if (currentState === 2) {
        // Final -> Letter
        title.textContent = "Will you be my Valentine Ayra?"; // Restore text
        title.style.fontSize = ""; // Reset font size
        catImg.src = "cat_heart.gif";
        document.querySelector(".letter-window").classList.remove("final");
        buttons.style.display = "flex";
        finalText.style.display = "none";
        videoBtn.style.display = "none"; // Ensure video button is hidden
        updateState(1);
    } else if (currentState === 1) {
        // Letter -> Envelope
        letter.style.display = "none";
        envelope.style.display = "block";
        document.querySelector(".letter-window").classList.remove("open");
        updateState(0);
    }
});

