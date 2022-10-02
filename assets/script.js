const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];

let time = 100;
let countdown = document.getElementById("countdown");
let startBtn = document.getElementById("start");
let boxTitle = document.getElementById("box-title");
let boxDesc = document.getElementById("box-desc");
let op1 = document.getElementById("op1");
let op2 = document.getElementById("op2");
let op3 = document.getElementById("op3");
let op4 = document.getElementById("op4");
let err = document.getElementById("err");
let score = 0;
let i=0;
let id=0;

function startTimer(){
  time = 100;
  id = setInterval(function(){
    countdown.textContent = time;
    if(time > 0){
      time -= 1;
    }
    else{
      clearInterval(id);
      onSubmit();
    }
  }, 1000);
}

function back(){
  i = 0;
  score = 0;
  boxTitle.textContent = "Coding Quiz Challenge";
  boxDesc.innerHTML = "<p>Try to answer to following code-related questions within the time limit.</p><p>Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><button class='btn btn-success link' id='start' onclick='onStart(0); startTimer();'>Start Quiz</button>";
}

function clar(){
  i=0;
  score=0;
  localStorage.setItem("highscores", JSON.stringify(["PB - 0"]));
  boxDesc.innerHTML = "<button onclick='back()' class='btn btn-success link'>Go Back</button>";
}

function onCorrectAnswer(){
  score += 1;
  if(questions[i+1] === undefined){
    onSubmit();
    countdown.textContent = "";
    clearInterval(id);
  }
  else{
    onStart(i+1);
    i += 1;
    err.innerHTML = "<hr/><p>Correct!</p>";
  }
}

function onWrongAnswer(){
  err.innerHTML = "<hr/><p>Incorrect!</p>";
  time -= 10;
}

function checkAnswer(button_id){
  let checkedOp = document.getElementById(button_id);
  if (checkedOp.textContent != questions[i].answer){
    onWrongAnswer();
  }
  else{
    onCorrectAnswer();
  }
}

function viewHighscore(){
  let html = "";
  boxTitle.textContent = "Highscore";
  highscores = JSON.parse(localStorage.getItem("highscores"));
  for (let j=1; j < highscores.length; j++){
    html += `<p>${j}. ${highscores[j]}</p>`;
  }
  html += "<button onclick='back()' class='btn btn-success link'>Go Back</button><button onclick='clar()' class='btn btn-success ml-2 link'>Clear Highscore</button>";
  boxDesc.innerHTML = html;
}

function dashboard(){
  let html = "";
  let initials = document.getElementById("initials");
  if(localStorage.getItem("highscores") === null){
    localStorage.setItem("highscores", JSON.stringify(["PB - 0"]));
  }
  highscores = JSON.parse(localStorage.getItem("highscores"));
  highscores.push(`${initials.value} - ${score}`);
  highscores = JSON.stringify(highscores); 
  localStorage.setItem("highscores", highscores); 
  boxTitle.textContent = "Highscore";
  highscores = JSON.parse(localStorage.getItem("highscores"));
  for (let j=1; j < highscores.length; j++){
    html += `<p>${j}. ${highscores[j]}</p>`;
  }
  html += "<button onclick='back()' class='btn btn-success link'>Go Back</button><button onclick='clar()' class='btn btn-success ml-2 link'>Clear Highscore</button>";
  boxDesc.innerHTML = html;
}

function onStart(i){
    boxTitle.textContent = questions[i].questionText;
    let html = "<button id='op1' onclick='checkAnswer(this.id)' class='btn btn-success btn-block text-left link'>" + questions[i].options[0] + "</button><button id='op2' onclick='checkAnswer(this.id)' class='btn btn-success btn-block text-left link'>" + questions[i].options[1] + "</button><button id='op3' onclick='checkAnswer(this.id)' class='btn btn-success btn-block text-left link'>" + questions[i].options[2] + "</button><button id='op4' onclick='checkAnswer(this.id)' class='btn btn-success btn-block text-left link'>" + questions[i].options[3] + "</button>";
    boxDesc.innerHTML = html;
}
  
function onSubmit(){
    boxTitle.textContent = "All done!";
    let html = "<p>Your Final Score is "+ score +".</p><label for='initials'>Enter Initials: </label><input type='text' class='mx-2' id='initials'><button id='submit' onclick='dashboard()' class='btn btn-success ml-2 link'>Submit</button>";
    boxDesc.innerHTML = html;
    err.innerHTML = "";
    countdown.textContent = "";

}
