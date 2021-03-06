
//store DOM element

var newGameBtn         = document.getElementById('js-newGameButton');
var pickRock           = document.getElementById('js-playerPick_rock');
var pickPaper          = document.getElementById('js-playerPick_paper');
var pickScissors       = document.getElementById('js-playerPick_scissors');
var newGameElem        = document.getElementById('js-newGameElement');
var pickElem           = document.getElementById('js-playerPickElement');
var resultsElem        = document.getElementById('js-resultsTableElement');
var playerPointsElem   = document.getElementById('js-playerPoints');
var playerNameElem     = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem     = document.getElementById('js-playerPick');
var computerPickElem   = document.getElementById('js-computerPick');
var playerResultElem   = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');


//store game state

var gameState    =   'notStarted';  //started // ended
var player = {
        name: '',
        score: 0
    };
var computer = {
        score: 0
    };

window.onload = setGameElements();    

// add listener

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });


//function

function setGameElements() {
    switch(gameState) {
      case 'started':
          newGameElem.style.display = 'none';
          pickElem.style.display = 'block';
          resultsElem.style.display = 'block';
        break;
      case 'ended':
          newGameBtn.innerText = 'Jeszcze raz';
      case 'notStarted':
      default:
          newGameElem.style.display = 'block';
          pickElem.style.display = 'none';
          resultsElem.style.display = 'none';
    }
  }

function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
      player.score = computer.score = 0;
      gameState = 'started';
      setGameElements();
  
      playerNameElem.innerHTML = player.name;
      setGamePoints();
    }  
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  
    var winnerIs = 'player';
  
      if (playerPick == computerPick) {
          winnerIs = 'none'; 
      } else if (
          (computerPick == 'rock' &&  playerPick == 'scissors') ||
          (computerPick == 'scissors' &&  playerPick == 'paper') ||
          (computerPick == 'paper' &&  playerPick == 'rock')) {
  
          winnerIs = 'computer';
      }
  
      if (winnerIs == 'player') {
          playerResultElem.innerHTML = "Win!";
          player.score++;
          setGamePoints();
      } else if (winnerIs == 'computer') {
          computerResultElem.innerHTML = "Win!";
          computer.score++;
          setGamePoints();
      }
    checkGameWiner();  
  }

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function playerPick(playerPick) {
   var computerPick = getComputerPick();
   playerPickElem.innerHTML = playerPick;
   computerPickElem.innerHTML = computerPick;
   checkRoundWinner(playerPick, computerPick);
}

function checkGameWiner() {
    var playerWinGame;    
    if (player.score == 10 || computer.score == 10) {
        gameState = 'ended';
        if (player.score == 10) {
            alert('You are the Winner!! Congratulations')
        } else alert('I\'m very sorry but this time the Winner is Computer')
        setGameElements();
    }
}
