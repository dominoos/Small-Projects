// This was made in code.org. Here is the link: https://studio.code.org/projects/applab/uvkBN3ylLYGRTwO353cVnoHDlMJ6jTieydlunX-wUzs






var wordList= getColumn("Wordle", "validWordleAnswer");
var checkList=[];

// just have to make these global in case player doesn't click start.
var targetWord= wordList[randomNumber(1, 500)];
var targetLetters= splitWord(targetWord);
console.log(targetWord);
console.log(targetLetters);



// list containing row names. 
var rowNames=["rowOne","rowTwo","rowThree","rowFour","rowFive","rowSix"];
var rowNum=0; //start with first row. 

/// just some startup text
setText("textBox", "Hi, I made wordle. start with first row, press guess to guess. One letter per box. lowercase.");
///



/// code for the new word button
onEvent("newWordButton", "click", function( ) {
  setText("textBox", "Hi, I made wordle. start with first row, press guess to guess. One letter per box. lowercase.");
  // ^ set text back to intro.
  checkList=[];// clear the 0,1,2 or 3 list. 
  rowNum=0; // go back to first row
  clearRows(rowNames); 
  targetWord= wordList[randomNumber(1, 500)];// new word
  targetLetters= splitWord(targetWord);// word into list
  console.clear();
  
  console.log(targetWord);// cheats because I don't want to guess. 
  console.log(targetLetters);
  
});

function clearRows(nameOfRowsList){// function for clearing the board. 
  var clearList=[3,3,3,3,3];
  for (var i=0 ;i<6;i++){//clears each row
  colorSquares(nameOfRowsList[i],clearList);
    for (var j=0 ;j<5;j++){// clears each box in the row
      setText(nameOfRowsList[i]+j, "");
    }  
  }
}

function splitWord(word){ // function for spliting the word into a list of letters.
  var letters=[];
  for (var i = 0; i < 5; i++) {
    appendItem(letters,word[i]);
  }
  return letters;
}



var lightup=[4,4,4,4,4];// using this as the list to light up the used row.
colorSquares(rowNames[rowNum],lightup);// lights up the first row. 


/// main function for checking the letters and then creating the checkList which is used to detemine a win and the colors for the boxes. 
onEvent("guessButton", "click", function( ) {
  var guessletters= readboxes(rowNames[rowNum]);
  
  for (var i = 0; i < 5; i++) {
    if (guessletters[i]==targetLetters[i]){// this will check if the letter is in the correct spot or not.
      appendItem(checkList,1);// then make a 1 2 or 0 list, as in correct, right letter or not in word. 
    }
    else if (guessletters[i]==targetLetters[0] ||guessletters[i]==targetLetters[1] ||guessletters[i]==targetLetters[2]||guessletters[i]==targetLetters[3]||guessletters[i]==targetLetters[4]){
      appendItem(checkList,2);
    }
    else{appendItem(checkList,0)}
  }
  
  colorSquares(rowNames[rowNum],checkList);//color the squares. param 1 is the row, param two is the num corresponding to colors, see above. 
  
  if (checkWin(checkList)){ // if all of the letterss are in the right spots the list will be [1,1,1,1,1] which added together is 5.
    setText("textBox", "Yay! You won in " + (rowNum+1) +" tries, congrats! The word was " + targetWord +". Press New Word to play again!");

    console.log("you win!");
  }
  else if (rowNum !=5){
    checkList=[];
    rowNum+=1;
    colorSquares(rowNames[rowNum],lightup);
  }
  else{
    setText("textBox", "Better luck next time. The word was " + targetWord);

    console.log("you lose...");
  }
  
});


function readboxes(rowname){// this reads the boxes and makes a list of letters
  var guess=[];
  for (var i=0;i<5;i++){
    appendItem(guess,getText(rowname+i));
  }
  console.log(guess);
  return guess;
}


function colorSquares(rowname,correctList){// this will color the boxes based on answer, only does green for now.
  for (var i=0;i<5;i++){
    if (correctList[i]==1){ // right spot, right letter
      setProperty(rowname+i, "background-color", 	rgb(124,252,0)); 
    }
    else if (correctList[i]==2){ // wrong spot, right letter
      setProperty(rowname+i, "background-color", "yellow");
    }
    else if (correctList[i]==3){
      setProperty(rowname+i, "background-color", rgb(172, 207, 222));// set blank (used for the clearRows function)
    }
    else if (correctList[i]==4){
      setProperty(rowname+i, "background-color", rgb(230,230,250));// for light up the row. 
    }
    else{// ==0
      setProperty(rowname+i, "background-color", rgb(211,211,211));}
  }
}

function checkWin(correctList){//checks if the player has won or not
  var win = true;
  for (var i=0; i<5;i++){
    if (correctList[i]!==1){
      win= false;
    }
   }
   return win;
 } // this is part of my original idea of adding the points in the checkList. 
// since the code puts a 1 if the letter is in the right place, I thought it would work,
// but it also counts a win if the list is something like [2,2,1,0,0].
// I decided to just check if checkList is [1,1,1,1,1] since that is the only win. 
