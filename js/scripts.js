
//TODO seperate the pvp and pve modes , make ui work properly with those categories , figure out how to change difficulty of bot
//TODO continue yesterdays work on ai difficulty , just need to make sure buttons work and the choices of difficulty
//TODO winconditions for ai
const game = (() => {
    'use strict';
    let currentGameState = _initArray();
    let turnFlag = true;
    let turnsDone = 1;
    let aiDiffculty = "";


    function _checkHorizontal(){
        if(currentGameState[0] === currentGameState[1] && currentGameState[0] === currentGameState[2]){
            _declareWinner(currentGameState[0]);
            return true;
        }
        if(currentGameState[3] === currentGameState[4] && currentGameState[3] === currentGameState[5]){
            _declareWinner(currentGameState[3]);
            return true;
        }
        if(currentGameState[6] === currentGameState[7] && currentGameState[6] === currentGameState[8]){
            _declareWinner(currentGameState[6]);
            return true;
        }
        
    }


    function _checkVertical(){
        if(currentGameState[0] === currentGameState[3] && currentGameState[0] === currentGameState[6]){
            _declareWinner(currentGameState[0]);
            return true;
        }
        if(currentGameState[1] === currentGameState[4] && currentGameState[1] === currentGameState[7]){
            _declareWinner(currentGameState[1]);
            return true;
        }
        if(currentGameState[2] === currentGameState[5] && currentGameState[2] === currentGameState[8]){
            _declareWinner(currentGameState[2]);
            return true;
        }
        
    }

    function _checkDiagonal(){
        if(currentGameState[0] === currentGameState[4] && currentGameState[0] === currentGameState[8]){
            _declareWinner(currentGameState[0]);
            return true;
        }
        if(currentGameState[2] === currentGameState[4] && currentGameState[2] === currentGameState[6] ){
            _declareWinner(currentGameState[2]);
            return true;
        }
        
        
    }



    function _checkWinContidion(){
        if(_checkDiagonal() || _checkVertical() || _checkHorizontal()){
            return true;
        }
        return false;
        
    }

    function _declareWinner(winner){
        alert(winner + "wins");
        players.incScore(winner);
        _newRound();
        
    }

    function _initArray(){
        let tempArr = new Array(9);
        for (let index = 0; index < tempArr.length; index++) {
            tempArr[index] = index;
        }
       return tempArr;
        
    };


   function _newRound(){
    setTimeout(function(){
       currentGameState =_initArray();
        board.resetBoard();
        turnFlag = true;
    },1000);
   }

   function _checkForDraw(){
    
       if(currentGameState.filter(e => typeof(e) === "number").length === 0){
           alert("its a Draw");
           _newRound();
           return true;
       }
       return false;
   }


    function _resetGame(){
        currentGameState = _initArray();
        turnFlag = true;
        turnsDone = 1;
        players.resetScore();
        
        
    }

    function _getCurrentGameStat(){
        return currentGameState;
    }
    

    function _startPlayerVsPlayer(node , index) {
       

        if(turnFlag){
            node.textContent = players.getX()
        }else{
            node.textContent = players.getO();
        }

        currentGameState[index] = node.textContent;
        turnFlag = !turnFlag;
        turnsDone++;
        
        
        
        if(!_checkWinContidion() && turnsDone === 10){
            alert("tecko");
            turnsDone = 0;
            _newRound();
        }

        //tofo figute how to work with algo
       // minimaxAi.aiMove();
    }

    function _difficultyAiSwitch (){
        
        switch (aiDiffculty){
            case "easy":
                    return minimaxAi.easyDif();
                break;
            case "medium":
                    return minimaxAi.mediumDif();
                break;
            case "hard":
                    return minimaxAi.hardDif();
                break;

            default:
                return minimaxAi.easyDif();  
            
        }
    }

    function _startPlayerVsAi(node,index){
        
        
        //player move
        node.textContent = players.getX();
        currentGameState[index] = node.textContent;
        

        turnsDone++;
        
        
        
        //this is ai move 
        let aiMoveIndex = _difficultyAiSwitch();
        currentGameState[aiMoveIndex] = "o";
        board.aiUiUpdate(aiMoveIndex);
        
        
        if(!_checkWinContidion()){
            _checkForDraw();
        }   

        
        
    }

    function _setAiDiffculty(diff){
        aiDiffculty = diff;
    }

    //public method and proprties
    return {
      startPvP: _startPlayerVsPlayer,
      resetGame:_resetGame,
      getCurrentGameStat : _getCurrentGameStat,
      startPve: _startPlayerVsAi,
      setAiDiffculty : _setAiDiffculty,

      
    };
  })();

  
  const players = (() =>{
    const _playerX = "x";
    const _playerO = "o";

    let _player1Score = 0;
    let _player2Score = 0;

    const _getP1Score = () => _player1Score;
    const _getP2Score = () => _player2Score;

    const _getX = () =>  _playerX;
    const _getO = () =>  _playerO;

    function _resetScore(){
        _player1Score = 0;
        _player2Score = 0;
    }


    function _incScore (playerSign){
        playerSign === "x" ? _player1Score+=1 : _player2Score+=1;

        if(board.getBoardMode()){
            settings.updateScore();
        }else{
            settings.updateScoreVsAi();
        }

        if(_player1Score === 5){
            alert("game finished the winner is x");
        }else if (_player2Score === 5){
            alert("game finished the winner is o");
        }

    }


    return{
        getP1Score:_getP1Score,
        getP2Score:_getP2Score,
        getX:_getX,
        getO:_getO,
        incScore:_incScore,
        resetScore:_resetScore,

        
    }

  })();


//moudle for gameboard wher most of the function regarding it will be stored
//has private and public options
const board = (() =>{
    'use strict';
    const _boardNodes = [];
    const gridNodes = document.querySelector(".board").childNodes;
    let boardMode;



    const _disableNodeClick = (node) => node.onclick = null;
    
    function _setSqaureClick(node,index){
        console.log(boardMode);
        node.onclick = function(){

            if(boardMode){
                game.startPvP(node,index);
            }else{
                console.log(boardMode);
                game.startPve(node,index);
            }

            _disableNodeClick(node);
        }
    }
    
    function _getBoard(){
        return _boardNodes;
    }

    function _setBoard(arr){
        _boardNodes = arr;
    }

    function _resetText(){
        for (let index = 0; index < gridNodes.length; index++){

            gridNodes[index].textContent ="";
        };
    }

    function _nodeClassCheck(node){
        if(node.className === "box"  || node.className === "box-left" || node.className === "box-right"){
            return true;
        }
        return false;
    }

    function _setBoardMode(flag){
        boardMode = flag;
    }

    //initialize board
    function _initBoard(){
        
        let counter = 0;
        for (let index = 0; index < gridNodes.length; index++){
                if(_nodeClassCheck(gridNodes[index])){
                _setSqaureClick(gridNodes[index] , counter++);
                _boardNodes.push(gridNodes[index]);
                }
            };
    }

    function _resetBoard(){
        _resetText();
        _initBoard();
    }

    //init first time
    (function(){
        _initBoard();
    })();

    function _updateUiAfterAi(index){
        if(index === undefined)
        return;

        let node = _boardNodes[index];
        node.textContent = "o";
        _disableNodeClick(node);
    }

    function _getBoardMode(){
        return boardMode;
    }
    
    return{
       getBoard:_getBoard,
       setBoard:_setBoard,
       setClick:_setSqaureClick,
       initBoard:_initBoard,
       resetBoard:_resetBoard,
       setBoardMode:_setBoardMode,
       aiUiUpdate:_updateUiAfterAi,
       getBoardMode:_getBoardMode,
       disableNodeClick:_disableNodeClick,


    }

    
})();



//evertything related to game mode choice and settings ui
const settings = (() =>{
    'use strict';
    let computerBox = document.querySelector("#choice-box-computer");
    computerBox.style.display = "none";
    let playerVsComputerBtn = document.querySelector("#player-versus-computer");
    let playerVsPlayer = document.querySelector("#player-versus-player");

    let modal = document.querySelector("#myModal");
    let settingsBtn = document.querySelector("#myBtn");
    let background = document.querySelector(".container");

    let resetBtn = document.querySelector(".reset-btn");

    let player1Score = document.querySelector("#player1"); 
    let player2Score = document.querySelector("#player2");

    let easyDifficultyVsAi = document.querySelector("#easyDifBtn");
    let mediumDifficultyVsAi = document.querySelector("#mediumDifBtn");
    let hardDifficultyVsAi = document.querySelector("#hardDifBtn");
    

    function _reset(){
        
        game.resetGame();
        board.resetBoard();
        board.getBoardMode() ? _updateScore() : _updateScoreVsAi();
        console.log("in reset btn func " + board.getBoardMode());
        
    }

    function _startGameVsAi(diffculty){
        board.setBoardMode(false);
        modal.style.display = "none";
        background.style.filter = "none";
        _reset();
        game.setAiDiffculty(diffculty);
    }

    (function buttonInit(){


        resetBtn.onclick = function(){
            _reset();
        }

        //choose a game mode of pvp
        playerVsPlayer.onclick = function(){
            board.setBoardMode(true);
            _updateScore();
            modal.style.display = "none";
            background.style.filter = "none";
            _reset();
            

        }


        playerVsComputerBtn.onclick = function(){

            if(computerBox.style.display === "none"){
                computerBox.style.display = "block";
            }else{
                computerBox.style.display = "none";
            }

            
        }
        //easy difficulty button  => player does the first move than ai
        easyDifficultyVsAi.onclick = function(){
            _startGameVsAi("easy"); 
        }

        mediumDifficultyVsAi.onclick = function(){
            _startGameVsAi("medium"); 
        }

        hardDifficultyVsAi.onclick = function(){
            _startGameVsAi("hard"); 
        }

        

        
    }());


    function _updateScoreVsAi(){
        player1Score.textContent = "player 1: "+players.getP1Score();
        player2Score.textContent = "pc 2: "+players.getP2Score();
    }

    function _updateScore(){
        
        player1Score.textContent = "player 1: "+players.getP1Score();
        player2Score.textContent = "player 2: "+players.getP2Score();
    }


    //make popup appear first time you get into website
    (function popUp(){
        
        window.onload = function(){
            setTimeout(function(){
                modal.style.display = "block";
                background.style.filter = "blur(8px)";
            },0);
        }

        settingsBtn.onclick = function() {
        modal.style.display = "block";
        background.style.filter = "blur(8px)";

        }

        /*
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            background.style.filter = "none";
            }
        } 
        */

    }());

    return{
        updateScore:_updateScore,
        updateScoreVsAi:_updateScoreVsAi,
    }


})();


const minimaxAi = (function() {

    //todo make the human and pc vars to change depending on what is choosen by the user
    var huPlayer = "x";
    var aiPlayer = "o";

var fc = 0;

function _easyDif(){
    let num = Math.floor(Math.random() * 10);
    if(num >=3){
        return randomMove();
    }else{
       return _bestMove();
    }
}

function _mediumDif(){
    let num = Math.floor(Math.random() * 10);
    if(num >=5){
        return randomMove();
    }else{
       return _bestMove();
    }
}

function _hardDif(){
    return _bestMove();
}


//loging the results
//TODO create radom placement generated , than use a random number perctange to choose between a good decision or a random one
function randomMove(){
    let tempArr = game.getCurrentGameStat().filter(e => typeof(e) === "number");
    let randomIndex = Math.floor(Math.random() * tempArr.length);
    return tempArr[randomIndex];
}



function _bestMove(){
    let move = minimax(game.getCurrentGameStat(), aiPlayer);
    return move.index;
}

// the main minimax function
function minimax(newBoard, player){
  //add one to function calls
  fc++;
  
  //available spots
  var availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:5};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}



// returns the available spots on the board
function emptyIndexies(board){
  return  board.filter(s => s != "o" && s != "x");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

return{
    aiMove:_bestMove,
    randomMove:randomMove,
    easyDif : _easyDif,
    mediumDif: _mediumDif,
    hardDif:_hardDif,

}



})();




