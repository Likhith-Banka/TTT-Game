let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset-button');
let newGameButton = document.querySelector('.new-game-button');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');
// Track the player's turn
let turnO = true;
// Store all the winning patterns in a 2-D array
let count = 0;
const winPatterns = [
   [0,1,2],
   [0,3,6],
   [0,4,8],
   [1,4,7],
   [2,5,8],
   [2,4,6],
   [3,4,5],
   [6,7,8]
];

boxes.forEach((box)=>{
   box.addEventListener('click',()=>{

     if(turnO) {
        box.innerText = 'O';
        box.classList.add("box-color");
        turnO = false;
     }
     else{
        box.innerText = 'X';
        box.classList.remove("box-color");
        turnO = true;
     }
     box.disabled = true;
     count += 1;

    let isWinner = checkWinner();
    if(count === 9 && !isWinner){
      gameDraw();
    }
   });
});

const gameDraw =() =>{
   msg.innerText = `Game ended as a Draw`;
   msgContainer.classList.remove("hide");
   disableBoxes();
};
const disableBoxes =() =>{
   for(let box of boxes){
      box.disabled = true;
   }
}
const enableBoxes = () =>{
   for(let box of boxes){
      box.disabled=false;
      box.innerText = '';
   }
}
const showWinner = (winner) => {
      msg.innerText = `Congratulations ${winner} You Won! `;
      disableBoxes();
      msgContainer.classList.remove("hide");
}
const checkWinner = ()=>{
   for(let pattern of winPatterns){
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
     if(pos1Val != "" && pos2Val !="" && pos3Val!=""){
         if((pos1Val === pos2Val) && (pos2Val === pos3Val)){
            console.log(`Winner! ${pos1Val}`);
            showWinner(pos2Val);
            return true;
         }
     }
   }
   return false;
};

const resetGame =()=>{
   turnO = true;
   count = 0;
   enableBoxes();
   msgContainer.classList.add("hide");
}

newGameButton.addEventListener('click', resetGame);
resetButton.addEventListener('click',resetGame);