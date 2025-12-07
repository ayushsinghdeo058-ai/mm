const startGameBtn = document.getElementById('start-game-btn');
const messageContainer = document.getElementById('message-container');
const gameContainer = document.getElementById('game-container');
const scoreRevealContainer = document.getElementById('score-reveal-container'); // NEW
const secretMessageContainer = document.getElementById('secret-message-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const finalScoreText = document.getElementById('final-score-text'); // NEW
const secretButton = document.getElementById('secret-button'); // NEW
const timerDisplay = document.getElementById('timer-display'); // NEW
const finalHeader = document.getElementById('final-header');
const secretText = document.getElementById('secret-text');
const bdaySong = document.getElementById('bday-song');

let currentQuestionIndex = 0;
let score = 0;

// Define your fun, detailed questions and answers here!
const questions = [
    {
        question: "Thinking back to the last time we hung out, what was the most random or hilarious thing that happened that only we would remember?",
        options: [
            "The time we accidentally walked into a wedding photo shoot.", 
            "That ridiculous internal joke about the squirrel and the pineapple.", 
            "The moment we both realized we forgot the tickets.", 
            "Debating the merits of having a pet dragon versus a pet griffin."
        ],
        // 🚨 IMPORTANT: CHANGE THIS TO THE CORRECT ANSWER FOR SOHAM
        answer: "That ridiculous internal joke about the squirrel and the pineapple." 
    },
    {
        question: "If you were given a blank check to start any business or project right now, what is the *first* idea you would pursue to make the world a cooler place?",
        options: [
            "A global chain of retro-themed arcade bars that offer free tutoring.", 
            "Developing an app that translates your pet's emotional state in real-time.", 
            "An advanced sustainable energy source powered entirely by dad jokes.", 
            "Creating a highly-detailed, open-world fantasy game set in a unique Indian mythology."
        ],
        // 🚨 IMPORTANT: CHANGE THIS TO THE CORRECT ANSWER FOR SOHAM
        answer: "Creating a highly-detailed, open-world fantasy game set in a unique Indian mythology." 
    },
    {
        question: "You've been granted one minor, useless superpower (like being able to perfectly toast bread or always know the nearest Wi-Fi password). Which one would you choose and why?",
        options: [
            "Always choosing the shortest line at the supermarket.", 
            "The ability to instantly find lost socks (and only socks).", 
            "Perfectly guessing the end credits song of any movie you watch.", 
            "Being able to make your phone battery last exactly one extra minute when it hits 1%."
        ],
        // 🚨 IMPORTANT: CHANGE THIS TO THE CORRECT ANSWER FOR SOHAM
        answer: "Always choosing the shortest line at the supermarket." 
    }
];

// --- Event Listeners ---
startGameBtn.addEventListener('click', () => {
    messageContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    loadQuestion();
    bdaySong.play().catch(error => {
        console.log("Audio autoplay prevented.");
    });
});

secretButton.addEventListener('click', () => {
    secretButton.classList.add('hidden');
    startCountdown();
});


// --- Game Functions ---
function loadQuestion() {
    feedbackText.textContent = '';
    optionsContainer.innerHTML = ''; 

    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        
        // ... (Option button creation logic) ...
        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(option, q.answer));
            optionsContainer.appendChild(button);
        });
    } else {
        // All questions answered, show score and secret button!
        showScoreReveal(); 
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        feedbackText.textContent = 'Correct! 🎉';
        feedbackText.style.color = 'green';
        score++;
    } else {
        feedbackText.textContent = `Oops! The answer was: ${correctAnswer}`;
        feedbackText.style.color = 'red';
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2500);
}


// --- New: Score Reveal and Countdown Logic ---
function showScoreReveal() {
    // 1. Hide Game UI and show Score UI
    gameContainer.classList.add('hidden');
    scoreRevealContainer.classList.remove('hidden');

    // 2. Display Score
    finalScoreText.textContent = `Final Score: ${score} out of ${questions.length}!`;
    
    // 3. Show the secret button
    setTimeout(() => {
        secretButton.classList.remove('hidden');
    }, 1000); // Give a short delay after score appears
}

function startCountdown() {
    let count = 3;
    timerDisplay.textContent = count;
    
    // Start interval
    const countdownInterval = setInterval(() => {
        count--;
        if (count >= 1) {
            timerDisplay.textContent = count;
        } else if (count === 0) {
            timerDisplay.textContent = 'GO!';
        } else {
            // Stop timer and show message
            clearInterval(countdownInterval);
            showSecretMessage();
        }
    }, 1000); // Wait 1 second between counts
}


// --- Final Secret Message Function ---
function showSecretMessage() {
    // 1. Stop music and hide score UI
    bdaySong.pause();
    bdaySong.currentTime = 0;
    scoreRevealContainer.classList.add('hidden');

    // 2. Set header message based on score (for fun)
    const successMessage = score === questions.length ? 
        "PERFECT SCORE! YOU'RE A LEGEND! 👑" : 
        "CHALLENGE COMPLETE! Thanks for playing! 🥳";

    finalHeader.textContent = successMessage;
    
    // 3. Set the SECRET, UNCONDITIONAL message text (from Ayush to Soham)
    secretText.textContent = `
        Hey Soham, no matter the score, you winning in life is what truly matters! 
        I wanted to make this special just for you. 
        Hope you have an amazing year. Wishing you the best of luck with your dreams.
        - Your friend, Ayush
    `;
    
    // 4. Show the secret message container
    secretMessageContainer.classList.remove('hidden');
    secretMessageContainer.style.transform = 'scale(1.05) rotate(0deg)'; 
}