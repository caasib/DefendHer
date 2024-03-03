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
    
    // For each prompt, create a list item to be inserted in the list group
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
    
    // For each possible value, create a button for each to be inserted into each li of the quiz
    // function createValueButtons() {
        
    // 	for (var li_index = 0; li_index < prompts.length; li_index++) {
    // 		for (var i = 0; i < prompt_values.length; i++) {
    // 			var val_button = document.createElement('button');
    // 			var val_text = document.createTextNode(prompt_values[i].value);
    
    // 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
    // 			val_button.appendChild(val_text);
    
    // 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
    // 		}
    // 	}
    // }
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
    
    // Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
    // Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
    var total = 0;
    
    // Get the weight associated to group number
    function findPromptWeight(prompts, group) {
        var weight = 0;
    
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
    
        return weight;
    }
    
    // Get the weight associated to the value
    function findValueWeight(values, value) {
        var weight = 0;
    
        for (var i = 0; i < values.length; i++) {
            if (values[i].value === value) {
                weight = values[i].weight;
            }
        }
    
        return weight;
    }
    
// When user clicks a value to agree/disagree with the prompt
$(document).on('click', '.value-btn', function () {
    var classList = $(this).attr('class');
    var classArr = classList.split(" ");
    var this_group = classArr[0];
    var selectedValue = $(this).text();

    // Remove active class from other buttons in the same group
    $('.' + this_group).removeClass('active');
    
    // Add active class to the clicked button
    $(this).addClass('active');

    // Lighten the background color of previously clicked buttons in the same group
    $clickedButton.siblings().css('background-color', '');

    // Add active class to the clicked button
    $clickedButton.addClass('active');

    // Darken the background color of the clicked button
    $(this).css('background-color', '#333');

    // Calculate the total score based on user selections
    total = 0;
    $('.value-btn.active').each(function () {
        var buttonClassList = $(this).attr('class');
        var buttonClassArr = buttonClassList.split(" ");
        var buttonGroup = buttonClassArr[0];
        var buttonValue = $(this).text();
        total += findPromptWeight(prompts, buttonGroup) * findValueWeight(prompt_values, buttonValue);
    });

    console.log(total);
});

// When user clicks the submit button
$(document).on('click', '#submit-btn', function () {
    $('.results').removeClass('hide').addClass('show');

    if (total < -15) {
        document.getElementById('results').innerHTML = '<b>Beginner</b><br><br>\
            Based on your quiz responses, you have been placed in the Beginner level. This means that you are just starting your journey in self-defense and may have limited experience or training in this area. In the Beginner course, you will learn foundational self-defense techniques, such as basic strikes, blocks, and escapes, designed to help you build confidence and develop essential skills for personal safety. Through structured lessons and practice sessions, you will gradually improve your ability to protect yourself in various situations.\
            ';
    } else if (total > 15) {
        document.getElementById('results').innerHTML = '<b>Advanced</b><br><br>\
            Based on your quiz responses, you have been placed in the Advanced level. This signifies that you possess a high level of skill and proficiency in self-defense. In the Advanced course, you will refine and master advanced techniques, strategies, and tactics for effectively defending yourself in challenging situations. You will learn advanced striking combinations, intricate grappling maneuvers, and specialized defense techniques tailored to various threats. Additionally, you will focus on developing mental toughness, situational awareness, and the ability to adapt to dynamic encounters. Prepare to elevate your self-defense skills to the highest level and become a formidable defender.\
            ';
    } else {
        document.getElementById('results').innerHTML = '<b>Intermediate</b><br><br>\
            Based on your quiz responses, you have been placed in the Intermediate level. This indicates that you have some experience or training in self-defense and are ready to further develop your skills. In the Intermediate course, you will build upon the foundational techniques learned in the Beginner level and delve deeper into more advanced concepts. You will learn techniques for handling more complex situations, refining your striking and grappling skills, and enhancing your overall self-defense proficiency. With dedication and practice, you will continue to progress towards becoming a more confident and capable defender.\
            '
    }

    // Hide the quiz after they submit their results
    $('#quiz').addClass('hide');
    $('#submit-btn').addClass('hide');
    $('#retake-btn').removeClass('hide');
});

// When user clicks the retake quiz button
$(document).on('click', '#retake-btn', function () {
    $('#quiz').removeClass('hide');
    $('#submit-btn').removeClass('hide');
    $('#retake-btn').addClass('hide');

    $('.results').addClass('hide').removeClass('show');
});
