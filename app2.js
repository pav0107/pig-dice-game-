
var scores, roundScores, activePlayer, gamePlaying;

init();



// listen for when the dice is rolled and call the function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
            // 1. Random whole number from 1 to 6
        var dice = Math.ceil(Math.random() *6);

        // 2 Display the result.
        var diceDOM = document.querySelector('.dice')
        // make the dice visible again by setting the display to block.
        diceDOM.style.display = 'block';
        // select the dice png that matches the dice number generated.
        diceDOM.src = 'dice-' + dice + '.png';

        // 3 Update the round score if the rolled number is not a 1
        if (dice !== 1) {
            // add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // Next player
            nextPlayer();
        }
    }

   

});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
            // add current score to total score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;           
        } else {
            winningScore = 100;
        }


        // check if player won the game
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; 
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }

    }

    
})


function nextPlayer() {
// Next player
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
roundScore = 0;

// Reset both current scores to 0
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// change the 'active' grey background to the new active player
document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');

// Hide the dice again for the start of the new player's turn
document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // hide the dice when the page is loaded by setting display to none.
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2'; 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
