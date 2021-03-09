
//TODO figure out a check behaviour
const game = (() => {
    'use strict';
    let currentGameState = new Array(9);
    let turnFlag = true;
    let turnsDone = 1;
    


    function _checkHorizontal(){
        if(currentGameState[0] === currentGameState[1] && currentGameState[0] === currentGameState[2]){
            return true
        }
        if(currentGameState[3] === currentGameState[4] && currentGameState[3] === currentGameState[5]){
            return true
        }
        if(currentGameState[6] === currentGameState[7] && currentGameState[6] === currentGameState[8]){
            return true
        }
        return false;
    }


    function _checkVertical(){

    }

    function _checkDiagonal(){

    }



    function _checkWinContidion(){
        if(_checkHorizontal){
                
        }
    }

   


    function _resetGame(){
        currentGameState = new Array(9);
        turnFlag = true;
        turnsDone = 1;
    }
    

    function startPlayerVsPlayer(node , index) {
        if(turnsDone === 9 ){
            alert("tecko");
        }

        if(turnFlag){
            node.textContent = players.getX()
        }else{
            node.textContent = players.getO();
        }

        currentGameState[index] = node.textContent;
        console.log(currentGameState);
        console.log(index);
        turnFlag = !turnFlag;
        turnsDone++;
        _checkWinContidion();
    }

    //public method and proprties
    return {
      startPvP: startPlayerVsPlayer,
      resetGame:_resetGame,
      
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

    


    function incScore (playerSign){
        playerSign ? _player1Score+=1 : _player2Score+=1;

        if(_player1Score === 5){

        }else if (_player2Score === 5){

        }
    }


    return{
        getP1Score:_getP1Score,
        getP2Score:_getP2Score,
        getX:_getX,
        getO:_getO,
        
    }

  })();






//moudle for gameboard wher most of the function regarding it will be stored
//has private and public options
const board = (() =>{
    'use strict';
    const _boardNodes = [];
    const gridNodes = document.querySelector(".board").childNodes;

    const disableNodeClick = (node) => node.onclick = null;
    
    function _setSqaureClick(node,index){
        node.onclick = function(){
            game.startPvP(node,index);
            disableNodeClick(node);
        }
    }
    
    function _getBoard(){
        return _boardNodes;
    }

    function _setBoard(arr){
        _boardNodes = arr;
    }

    function resetText(){
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


    //initialize board
    function _initBoard(){
        
        let counter = 0;
        console.log(gridNodes);
        for (let index = 0; index < gridNodes.length; index++){
                if(_nodeClassCheck(gridNodes[index])){
                _setSqaureClick(gridNodes[index] , counter++);
                _boardNodes.push(gridNodes[index]);
                }
            };
    }

    function _resetBoard(){
        resetText();
        _initBoard();
    }

    //init first time
    (function(){
        _initBoard();
    })();

    
    return{
       getBoard:_getBoard,
       setBoard:_setBoard,
       setClick:_setSqaureClick,
       initBoard:_initBoard,
       resetBoard:_resetBoard,

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
    

    

    (function buttonInit(){


        resetBtn.onclick = function(){
          game.resetGame();
          board.resetBoard();
        }

        //choose a game mode of pvp
        playerVsPlayer.onclick = function(){
            player1Score.textContent = "player 1: "+players.getP1Score();
            player2Score.textContent = "player 2: "+players.getP2Score();
            modal.style.display = "none";
            background.style.filter = "none";

        }


        playerVsComputerBtn.onclick = function(){
            if(computerBox.style.display === "none"){
                computerBox.style.display = "block";
            }else{
                computerBox.style.display = "none";
            }
        }

        
    }());


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


})();





