// Quiz questions and answers
var quizData = [
    {
        question: 'How do you do an arm grab?',
        answers: [
            { text: 'Grab fist with opposite hand, point elbow up, slice downwards using your core.', correct: true },
            { text: 'Push the attacker away with both hands.', correct: false },
            { text: 'Try to reason with the attacker.', correct: false }
        ]
    },
    {
        question: 'What can you do if someone grabs you from behind?',
        answers: [
            { text: 'Stand still and wait for help.', correct: false },
            { text: 'Grab the attacker\'s arms, strike the groin, and escape.', correct: true },
            { text: 'Panic and scream for help.', correct: false }
        ]
    },
    {
        question: 'How to escape from a choke hold?',
        answers: [
            { text: 'Run away as fast as possible.', correct: false },
            { text: 'Kick the attacker.', correct: false },
            { text: 'Lift one arm up, turn whole body to opposite side, crunch downwards, trapping attacker\'s hand.', correct: true },
        ]
    },
    {
        question: 'How to escape from a hair grab?',
        answers: [
            { text: 'Punch the attacker.', correct: false },
            { text: 'Kick the attacker.', correct: false },
            { text: 'Lock both hands on top of attacker\'s, squeeze elbows in to protect the face, go under the arm and up and around, push arm forward to dislocate attacker\'s shoulder.', correct: true },
        ]
    },
    {
        question: 'What are key areas to hit if someone attacks you?',
        answers: [
            { text: 'Arms and legs.', correct: false },
            { text: 'Eyes, nose, throat, groin.', correct: true },
            { text: 'Back and shoulders.', correct: false },
        ]
    },
    {
        question: 'What should you do if someone points a gun at you?',
        answers: [
            { text: 'Try to reason with the attacker.', correct: false },
            { text: 'Run in a straight line.', correct: false },
            { text: 'Run zigzag and scream.', correct: true },
        ]
    },
    {
        question: 'What should you do if you must fight?',
        answers: [
            { text: 'Hesitate and back off.', correct: false },
            { text: 'Fully commit to become the aggressor.', correct: true },
            { text: 'Try to talk your way out of it.', correct: false },
        ]
    },
    {
        question: 'What should you do if you are overpowered?',
        answers: [
            { text: 'Give up immediately.', correct: false },
            { text: 'Relax and fake compliance, then fight when you can.', correct: true },
            { text: 'Start crying for help.', correct: false },
        ]
    },
    // Add more questions as needed
];

// Function to create quiz questions
function createQuiz() {
    const questionList = document.getElementById('question-list');

    quizData.forEach((data, index) => {
        const questionItem = document.createElement('li');
        questionItem.classList.add('list-group-item');

        const questionHeader = document.createElement('h3');
        questionHeader.textContent = `Question ${index + 1}: ${data.question}`;

        const answerList = document.createElement('ul');

        data.answers.forEach(answer => {
            const answerItem = document.createElement('li');
            const answerBtn = document.createElement('button');

            answerBtn.classList.add('value-btn', 'btn');

            answerBtn.textContent = answer.text;
            answerBtn.dataset.correct = answer.correct;

            answerItem.appendChild(answerBtn);
            answerList.appendChild(answerItem);
        });

        questionItem.appendChild(questionHeader);
        questionItem.appendChild(answerList);

        questionList.appendChild(questionItem);
    });
}

createQuiz();

// Function to handle submit button click event
document.getElementById('submit-btn').addEventListener('click', () => {
    const resultsContainer = document.getElementById('results');
    let score = 0;

    document.querySelectorAll('.value-btn').forEach(button => {
        if (button.classList.contains('active') && button.dataset.correct === 'true') {
            score++;
        }
    });

    resultsContainer.innerHTML = `You got ${score} out of ${quizData.length} questions correct.`;
});

// Function to handle submit button click event
document.getElementById('submit-btn').addEventListener('click', () => {
    const resultsContainer = document.getElementById('results');
    let score = 0;

    document.querySelectorAll('.value-btn').forEach(button => {
        if (button.classList.contains('active') && button.dataset.correct === 'true') {
            score++;
        }
    });

    resultsContainer.innerHTML = `You got ${score} out of ${quizData.length} questions correct.`;

    // Check if all questions are answered correctly
    if (score === quizData.length) {
        // Mark Module 1 as completed
        markModule1AsCompleted();
    }
});

// Function to mark Module 1 as completed
function markModule1AsCompleted() {
    // You can add code here to mark Module 1 as completed, such as changing its appearance or adding a checkmark icon.
    // For example:
    const module1Button = document.querySelector('.module-button');
    module1Button.classList.add('completed');
}


// Function to handle click event on answer buttons
document.addEventListener('click', event => {
    const button = event.target;
    if (button.classList.contains('value-btn')) {
        document.querySelectorAll('.value-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
});
