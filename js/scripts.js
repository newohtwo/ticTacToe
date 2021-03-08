//moudle for gameboard wher most of the function regarding it will be stored
//has private and public options
const board = (() =>{
    'use strict';
    const _boardNodes = [];


    function addClickEvent(node , index){
        node.addEventListener("click", event =>{
            console.log(index);
            
        })
    }


    //initialize board
    (function initBoard(){
        let array = document.querySelector(".board").childNodes;
        let counter = 0;

        for (let index = 0; index < array.length; index++) 
                if(array[index].nodeType === 1 && array[index].nodeType !== 3){
                    addClickEvent(array[index] , counter++);
                    _boardNodes.push(array[index]);

                }
    })();

    
    return{
       
    }

    
})();

//evertything related to game mode choice and settings ui
const settings = (() =>{
    'use strict';
    let playerBox = document.querySelector("#choice-box-player");
    playerBox.style.display = "none";
    let computerBox = document.querySelector("#choice-box-computer");
    computerBox.style.display = "none";

    let playerVsPlayerBtn = document.querySelector("#player-versus-player");
    let playerVsComputerBtn = document.querySelector("#player-versus-computer");
    
    (function openChoiceBox(){

        playerVsPlayerBtn.onclick = function(){
            if(playerBox.style.display === "none"){
                playerBox.style.display = "block";
            }else{
                playerBox.style.display = "none";
            }
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
        
        let modal = document.querySelector("#myModal");
        let btn = document.querySelector("#myBtn");
        let background = document.querySelector(".container");
        

        btn.onclick = function() {
        modal.style.display = "block";
        background.style.filter = "blur(8px)";

        }

        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            background.style.filter = "none";
            }
        } 

    }());


})();


