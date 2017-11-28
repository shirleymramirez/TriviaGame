$(document).ready(function() {

	//List of Arrays in an Objects for our questions
	var myQuestions = [
		{
			question: "The llama is a domesticated camelid that is native to which continent?",
			choicesList: [ "A: South America", "B: Asia", "C: Europe", "D: South Africa" ],
			answer: 0
		},{
			question: "In the children's books about a 25 foot tall red dog, what is the name of the dog?",
			choicesList: [ "A: Goofy", "B: Clifford", "C: Charlie", "D: Snoopy" ],
			answer: 1	
		},{ 
			question: "What does the acronym \"lol\" stand for when used in phone texts and on the internet?",
			choicesList: [ "A: Laugh out loud", "B: League of Legends", "C: Lots of Love", " D: Laugh or Love" ],
			answer: 0	
		},{
			question: "Which musician is often called the fifth Beatle?",
			choicesList: [ "A: John Lennon", "B: Ringo Starr", "C: George Harrison", "D: Pete Best" ],
			answer: 3	
		},{ 
			question: "What is professional wrestler John Cena's famous catchphrase?",
			choicesList: [ "A: Hell yah!", "B: You can't see me!", "C: I'm coming", "D: Catch yah!" ],
			answer: 1
		},{
			question: "Which President is on the United States 1,000 dollar bill?",
			choicesList: [ "A: George Washington", "B: Barack Obama", "C: Grover Cleveland", "D: Bill Clinton" ],
			answer: 2	
		},{
			question: "What 2013 science fiction blockbuster starred Sandra Bullock and George Clooney?",
			choicesList: [ "A: Up in the air", "B: The Proposal", "C: Two Weeks Notice","D: Gravity" ],
			answer: 3	
		},{
			question: "The companies HP, Microsoft and Apple were all started in a what?",
			choicesList: [ "A: Garage", "B: Office", "C: School", "D: Park"],
			answer: 0	
		},{
			question: "Kopi luwak is a very expensive type of what?",
			choicesList: [ "A: Candy", "B: Milk", "C: Coffee", "D: Chocolates" ],
			answer: 2	
		},{
			question: "What is the largest organ of the human body?",
			choicesList: [ "A: Liver", "B: Lungs", "C: Skin", "D: Heart" ],
			answer:2
		}
	];

	//Variable Declaration
	var clickSound = new Audio("assets/audio/button-click.mp3");

	var imageArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
	var currentQuestion; 
	var correctAnswer; 
	var incorrectAnswer; 
	var unanswered; 
	var seconds; 
	var time; 
	var answered; 
	var userSelect;

	//declaration of messages
	var messages = {
		correct: "Yes! that is right!",
		incorrect: "Oh oh! that is wrong.",
		endTime: "You're out of time.",
		finished: "Alright! let's see how well you did"
	}
	
	//hide the choices' list at first
	$('.choicesList').hide();
	

	//start button function
	$('#startBtn').on('click', function() {
		$(this).hide();
		newGame();
	});

	//re-start button function
	$('#startOverBtn').on('click', function() {
		$(this).hide();
		newGame();
	});

	// start a new game function
	function newGame() {
		$('#finalMessage').empty();
		$('#correctAnswers').empty();
		$('#incorrectAnswers').empty();
		$('#unAnswered').empty();
		currentQuestion = 0;
		correctAnswer = 0;
		incorrectAnswer = 0;
		unanswered = 0;
		newQuestion();
	}

	//new question function
	function newQuestion() {
		$('#message').empty();
		$('#correctedAnswers').empty();
		$('#image').empty();
		$('.choicesList').show();
		answered = true;

		//set up new questions and choiceslist
		$('.question').html('<h2>' + myQuestions[currentQuestion].question + '</h2>');

		//loop through all the choicesList's(A-D)
		for( var i = 0; i < 4; i++) {
			var choices = $('<div>');
			choices.text(myQuestions[currentQuestion].choicesList[i]);		
			choices.attr({'data-index': i });
			choices.addClass('thisChoice');
	
			//append to each choice's list(A-D)
			if( i === 0 ){
				$('#choiceA').append(choices);
			}
			else if( i === 1) {
				$('#choiceB').append(choices);	
			}
			else if( i === 2) {
				$('#choiceC').append(choices);	
			}
			else if( i === 3) {
				$('#choiceD').append(choices);	
			}

		}
		countDown();
		//clicking an answer will pause the time and setup answerPage
		$('.thisChoice').on('click', function(){
			userSelect = $(this).data('index');
			clearInterval(time);
			answerPage();
			clickSound.play();
		});
	}

	//countdown function to answer for 1 question 
	function countDown(){
		seconds = 15;
		$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
		answered = true;

		//sets timer to go down
		time = setInterval(showCountDown, 1000);
	}

	//function to show countdown 
	function showCountDown(){
		seconds--;
		$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
		if(seconds < 1){
			clearInterval(time);
			answered = false;
			answerPage();
		}
	}

	//funtion to validate user's guess 
	function answerPage(){
		$('#currentQuestion').empty();
		$('.thisChoice').empty();             
		$('.question').empty();

		//variable to hold the right answer
		var rightAnswerText = myQuestions[currentQuestion].choicesList[myQuestions[currentQuestion].answer];
		var rightAnswerIndex = myQuestions[currentQuestion].answer;

		//image of the correct answer will appear in the html element
		$('#image').html('<img id = "answerImage" src = "assets/images/'+ imageArray[currentQuestion] +'.gif">');
		$('.choicesList').hide();

		//checks to see if userSelect is correct
		if((userSelect == rightAnswerIndex) && (answered == true)){
			correctAnswer++;
			$('#message').html(messages.correct);

		//checks to see if userSelect is incorrect
		} else if((userSelect != rightAnswerIndex) && (answered == true)){
			incorrectAnswer++;
			$('#message').html(messages.incorrect);
			$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);

		//checks to see if userSelect is unanswered
		} else{
			unanswered++;
			$('#message').html(messages.endTime);
			$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
			answered = true;
		}
		
		//set time out before proceeding to the next question
		if(currentQuestion == (myQuestions.length-1)){
			setTimeout(scoreboard, 3000)
		} else{
			currentQuestion++;
			setTimeout(newQuestion, 3000);
		}	
	}

	//update html elements
	function scoreboard(){
		$('#timeLeft').empty();
		$('#message').empty();
		$('#correctedAnswer').empty();
		$('#image').empty();

		$('#finalMessage').html(messages.finished);
		$('#correctAnswers').html("Correct Answers: " + correctAnswer);
		$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
		$('#unanswered').html("Unanswered: " + unanswered);
		$('#startOverBtn').addClass('reset');
		$('#startOverBtn').show();
		$('#startOverBtn').html('Start Over?');
	}

});