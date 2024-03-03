// Hide the Course 1 button initially
$('#course1-btn').addClass('hide');

// Defense quiz upon sign-up

var prompts = [
    {
        prompt: 'I feel physically capable of defending myself in a threatening situation.',
        weight: 1,
        class: 'group0'
    },
    {
        prompt: 'I have previous experience or training in martial arts or self defense.',
        weight: 1,
        class: 'group1'
    },
    {
        prompt: 'I am comfortable with the idea of using physical force to protect myself if necessary.',
        weight: 1,
        class: 'group2'
    },
    {
        prompt: 'I have good coordination and balance, which would aid me in self-defense techniques.',
        weight: 1,
        class: 'group3'
    },
    {
        prompt: 'I am confident in my ability to maintain composure and focus under pressure.',
        weight: 1,
        class: 'group4'
    },
    {
        prompt: 'I am familiar with basic self-defense concepts such as striking, blocking, and escaping holds.',
        weight: 1,
        class: 'group5'
    },
    {
        prompt: 'I have quick reflexes and reaction times, which would benefit me in a self-defense scenario.',
        weight: 1,
        class: 'group6'
    },
    {
        prompt: 'I am mentally prepared to defend myself against an attacker if the occasion arises.',
        weight: 1,
        class: 'group7'
    },
    {
        prompt: 'I have practiced situational awareness and can quickly assess potential threats.',
        weight: 1,
        class: 'group8'
    },
    {
        prompt: 'I understand the importance of practicing self-defense techniques regularly to maintain proficiency.',
        weight: 1,
        class: 'group9'
    }
    
    ]
    
    // This array stores all of the possible values and the weight associated with the value. 
    // The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
    var prompt_values = [
    {
        value: 'Strongly Agree', 
        class: 'btn-default btn-strongly-agree',
        weight: 5
    },
    {
        value: 'Agree',
        class: 'btn-default btn-agree',
        weight: 3,
    }, 
    {
        value: 'Neutral', 
        class: 'btn-default',
        weight: 0
    },
    {
        value: 'Disagree',
        class: 'btn-default btn-disagree',
        weight: -3
    },
    { 
        value: 'Strongly Disagree',
        class: 'btn-default btn-strongly-disagree',
        weight: -5
    }
    ]

// Function to create prompt items
function createPromptItems() {
    for (var i = 0; i < prompts.length; i++) {
        var prompt_li = document.createElement('li');
        var prompt_p = document.createElement('p');
        var prompt_text = document.createTextNode(prompts[i].prompt);

        prompt_li.setAttribute('class', 'list-group-item prompt');
        prompt_p.appendChild(prompt_text);
        prompt_li.appendChild(prompt_p);

        document.getElementById('quiz').appendChild(prompt_li);
    }
}

// Function to create value buttons
function createValueButtons() {
    for (var li_index = 0; li_index < prompts.length; li_index++) {
        var group = document.createElement('div');
        group.className = 'btn-group btn-group-justified';

        for (var i = 0; i < prompt_values.length; i++) {
            var btn_group = document.createElement('div');
            btn_group.className = 'btn-group';

            var button = document.createElement('button');
            var button_text = document.createTextNode(prompt_values[i].value);
            button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
            button.appendChild(button_text);

            btn_group.appendChild(button);
            group.appendChild(btn_group);
        }

        document.getElementsByClassName('prompt')[li_index].appendChild(group);
    }
}

createPromptItems();
createValueButtons();

var total = 0;

// Function to calculate total score
function calculateTotal() {
    total = 0;
    $('.value-btn.active').each(function () {
        var buttonClassList = $(this).attr('class');
        var buttonClassArr = buttonClassList.split(" ");
        var buttonGroup = buttonClassArr[0];
        var buttonValue = $(this).text();
        total += findPromptWeight(prompts, buttonGroup) * findValueWeight(prompt_values, buttonValue);
    });

    console.log(total);
}

// Function to find prompt weight
function findPromptWeight(prompts, group) {
    var weight = 0;
    for (var i = 0; i < prompts.length; i++) {
        if (prompts[i].class === group) {
            weight = prompts[i].weight;
        }
    }
    return weight;
}

// Function to find value weight
function findValueWeight(values, value) {
    var weight = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i].value === value) {
            weight = values[i].weight;
        }
    }
    return weight;
}

// Event listener for value buttons
$(document).on('click', '.value-btn', function () {
    var classList = $(this).attr('class');
    var classArr = classList.split(" ");
    var this_group = classArr[0];
    var selectedValue = $(this).text();

    $('.' + this_group).removeClass('active');
    $('.' + this_group).css('background-color', '');
    $(this).addClass('active');
    $(this).css('background-color', '#333');

    calculateTotal();
});

// Event listener for submit button
$(document).on('click', '#submit-btn', function () {
    $('.results').removeClass('hide').addClass('show');

    if (total < -15) {
        var course1Button = document.createElement('button');
        course1Button.setAttribute('id', 'course1-btn');
        course1Button.setAttribute('class', 'button');
        course1Button.textContent = 'Take Course 1';
        document.getElementById('results').appendChild(course1Button);

        course1Button.addEventListener('click', function() {
            window.location.href = './course1.html';
        });
    } else if (total > 15) {
        document.getElementById('results').innerHTML = '<b>Advanced</b><br><br>Based on your quiz responses, you have been placed in the Advanced level.';
    } else {
        document.getElementById('results').innerHTML = '<b>Intermediate</b><br><br>Based on your quiz responses, you have been placed in the Intermediate level.';
    }

    $('#quiz').addClass('hide');
    $('#submit-btn').addClass('hide');
});