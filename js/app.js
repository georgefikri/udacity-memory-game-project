/***********Variables*********/
let i , cardsLength, deck , deckLi ;

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
  

let cards = ['fa-diamond' , 'fa-paper-plane-o' , 'fa-anchor' , 'fa-bolt' , 'fa-cube' , 'fa-anchor' , 'fa-leaf' , 'fa-bicycle'];
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
let clickCounter = 0;
let tempArr = []

//click Event / Event delegation Func.
function addClass(event){
    clickCounter++;
    let eve = event.target.childNodes[0].className;
    if(clickCounter < 3){
        let eventChild = event.target.nodeName.toLowerCase()==='li';
        if(eventChild){
        event.target.classList.add('show', 'open');
        tempArr.push(eve);
        console.log(tempArr);

        }
    }
    if(tempArr.length === 2){
        if(tempArr[0] === tempArr[1]){
            
        } else{
            //deckLi.classList.add('card');
            console.log('nooo');
        }
    }
    
}





//click event on UL Cont event delegation
deck.addEventListener('click', addClass);




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
