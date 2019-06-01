// (function(){
/***********Variables*********/
let i , cardsLength, deck , deckLi ;
let endGamePopup = document.getElementById('endGame');
let playagain = document.getElementById('playAgain');
let ratingPopup = document.querySelector('.ratingPopup');
/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

let cards = ['fa-diamond' , 'fa-paper-plane-o' , 'fa-anchor' , 'fa-bolt' , 'fa-cube' , 'fa-bomb' , 'fa-leaf' , 'fa-bicycle'];
let cards2 = [...cards, ...cards];

cards2 = shuffle(cards2);

//array length
cardsLength = cards2.length;

//catching UL Container
 deck = document.querySelector('.deck');

//looping through the array
cards2.forEach(function(item){
    let li = document.createElement('li');
    li.setAttribute('class' , 'card');
    let subLi = document.createElement('i');
    subLi.setAttribute('class', item + ' fa');
    li.appendChild(subLi);
    deck.appendChild(li);
    
});

//selector for Li
deckLi = document.querySelectorAll('li.show.open');

//click counter
let clickCounter = 0;
//new total counter
let totalCounter = 0;

//empty array to add classes from matched elements.
let tempArr = [];

//click Event / Event delegation Func.
function addClass(event){
    

    stepsCounter();
    //check if the element click is LI
    let eventChild = event.target.nodeName.toLowerCase()==='li';

    //get the class of the element clicked to be added to Array
    let eve = event.target.childNodes[0].className;

    //check if click counter is less than 3
    if(clickCounter < 2){
        if(eventChild){

        //element clicked add 2 classes show & open to
        let lis = document.querySelectorAll('ul.deck li');
        for(let p = 0 ; p < lis.length ; p++){
            if (!lis[p].classList.contains('show')) {
                event.target.classList.add('show', 'open' , 'pointerEvent');
                console.log('da el length '+tempArr.length)
            }

        }
        


        //add the classes of the clicked element in tempArr array to compare.
        tempArr.push(eve);   
            
            //check if length of the array is =2
            if(tempArr.length === 2){

                let matchArr = document.querySelectorAll('.show.open');
                //comparing element 1 and 2 of array tempArr and add class match if they match


                if(tempArr[0] === tempArr[1]){
                    for(let k = 0; k < matchArr.length ; k++){
                        matchArr[k].classList.add('match');
                    }
                    //resetting click counter & tempArr after adding match class
                    clickCounter = 0;
                    tempArr = [];

                } else{
                    //if elements of the array doesn't match remove show & open to close the elements.
                    setTimeout(() => {
                            for(let j = 0 ; j < matchArr.length ; j++){
                                if(!matchArr[j].classList.contains('match')){               
                                    matchArr[j].classList.remove('show' , 'open' , 'pointerEvent');
                                }

                            //resetting click counter & tempArr to allow selecting more elements
                            clickCounter = 0;
                            tempArr = [];
                            }
                        }, 2000);
                        
                    }
                //if all elements are matched and selected show alert after couple of seconds.    
                        let match  = document.querySelectorAll('.match');
                        if(match.length === 16){
                            //stop timer
                            clearInterval(gameTimer(0));

                            //remove stars depending on how many moves.
                            let ratingStars = document.querySelector('.stars');
                            if(totalCounter >= 21 && totalCounter <=30){
                                let ratingStars = document.querySelector('.stars');
                                ratingStars.children[0].remove();
                            } else if (totalCounter > 35) {
                                ratingStars.children[0].remove();
                                ratingStars.children[1].remove();
                            }

                            //show popup
                            endGamePopup.classList.toggle('hide');
                            ratingPopup.innerHTML = ratingStars.innerHTML;


                            //play again button
                            playagain.addEventListener('click' , function(){
                                setTimeout(() => {
                                    endGamePopup.classList.toggle('hide');
                                    resetFunc();
                                }, 1000);
                                
                            });

                        }
                }
            } 
            //ignore any clicks that is not on li
            else if(event.target.nodeName.toLowerCase()!=='li'){
                clickCounter = 0;
                console.log('not LI ya 7omar');
            }
          console.log(clickCounter);    
    }   
    clickCounter++;
}

//click event on UL Cont event delegation
deck.addEventListener('click', addClass);

let moves = document.querySelector('.moves');

//////////////////////////////// EndGame Popup////////////////////////////
endGamePopup.classList.add('hide');

/////////////////////Steps Counter //////////////////////////
function stepsCounter(){
    //moves counter
    totalCounter +=1;
    moves = document.querySelector('.moves');
    moves.textContent = totalCounter; 
}

/////////////////////Game Timer //////////////////////////
function gameTimer(intervalTime){
    var input = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    var timestamp = new Date(input.hours, input.minutes, input.seconds);

    var interval = intervalTime;

    setInterval(function () {
        timestamp = new Date(timestamp.getTime() + interval * 1000);
        document.querySelector('.countdown2').innerHTML = timestamp.getHours() + 'h:' 
        + timestamp.getMinutes() + 'm:' + timestamp.getSeconds() + 's';
    }, Math.abs(interval) * 1000);

}
gameTimer(1);



//////////////////////////////// Reset////////////////////////////

 function resetFunc(){
    let card = document.querySelectorAll('.card');

    for(let o = 0 ;  o  < card.length ; o++ ){
        if(card[o].classList.contains('match')){
            card[o].classList.remove('match' , 'show' , 'open');
        } else if (card[o].classList.contains('show')) {
            card[o].classList.remove('show' , 'open');
        }
    }
    tempArr = [];
    //////reset steps counter
    totalCounter = 0;
    moves.textContent = 0;

    /////timer reset --not done.
   
   clearInterval(gameTimer(0))
  

}
let reset = document.getElementById('restart');
reset.addEventListener('click', resetFunc);




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call 
  from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in 
  another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol 
  (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another
   function that you call from this one)
 *    + if all cards have matched, display a message with the final score 
  (put this functionality in another function that you call from this one)
 */
// })();