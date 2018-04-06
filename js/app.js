/*
 * Create a list that holds all of your cards
 */
var deck = document.querySelector('.deck');
var cardList = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt',
'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
var cardsOpened = [];
var moves = 0;
var matches = 0;
var cardsClicked = 0;
var secondsCount = 0;
var stars = document.querySelector('.stars');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

 function setTimer() {
   secondsCount++;
   var minutes = Math.floor(secondsCount / 60);
   var seconds = Math.floor(secondsCount % 60);
   if (minutes < 10) {minutes = "0" + minutes}
   if (seconds < 10) {seconds = "0" + seconds}
   document.querySelector('.minutes').innerHTML = minutes;
   document.querySelector('.seconds').innerHTML = seconds;
 }

 function generate() {
   var newCards = shuffle(cardList);
   for (i = 0; i < newCards.length; i++) {
     let newCard = document.createElement('li');
     newCard.classList.add('card');
     let newIcon = document.createElement('i');
     newIcon.classList.add('fa', 'fa-' + newCards[i]);
     newCard.appendChild(newIcon);
     deck.appendChild(newCard);
   }
 }

 function addMoves() {
   moves++;
   document.querySelector('.moves').innerHTML = moves;
 }

 function checkMatch(cardsOpened) {
   if (cardsOpened[0].firstChild.classList.value === cardsOpened[1].firstChild.classList.value) {
     cardsOpened[0].classList.add('match');
     cardsOpened[1].classList.add('match');
     matches++;
     cardsOpened.length = 0;
     addMoves();
   } else {
     cardsOpened[0].classList.remove('open', 'show');
     cardsOpened[1].classList.remove('open', 'show');
     cardsOpened.length = 0;
     addMoves();
   }
   if (matches === 8) {
     alert("Congratulations! You did it in " + document.querySelector('.minutes').innerHTML + " minutes and " +
      document.querySelector('.seconds').innerHTML +
     " seconds. Your rating: " + stars.children.length + " of 3 stars.");
   }
 }

 function checkStars() {
   if (moves === 3 || moves === 6 || moves === 10) {
     stars.removeChild(stars.firstChild);
   }
 }

generate();

 deck.addEventListener('click', function(event) {
   cardsClicked++;
   if (cardsClicked === 1) {
      setInterval(setTimer, 1000);
    }
   if (event.target.classList.value === 'card' && cardsOpened.length < 2) {
     event.target.classList.add('open', 'show');
     cardsOpened.push(event.target);
   }
   if (cardsOpened.length === 2) {
     setTimeout(function run() {checkMatch(cardsOpened)}, 1000);
   }
   checkStars();
 });

 document.querySelector('.restart').addEventListener('click', generate);

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
