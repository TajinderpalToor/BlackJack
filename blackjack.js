// generate deck function
// if you want to print the deck add YES,yes,Yes or 1 to func 
const generateDeck = (displayDeck) => {
// deck of cards
const deck=[];
const suits =['Diamonds','Clovers','Hearts','Spades'];
const cards =[2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

for (const card of cards){
    for (const suit of suits){
        deck.push({Card:card,Suit:suit});
    }
}
if (displayDeck === "yes"||displayDeck ==="Yes"||displayDeck ==="YES"||displayDeck ===1){
    console.log(deck);
    console.log(" The Size of Deck is " + deck.length);
}
else{
    console.log("Enjoy and Good Luck");
}

return deck;
}
const playabledeck=generateDeck();


// draw card

const drawCard = (deck) =>{
    // have to grab from the deck of 52 randomly
    // pull out random index
    const randomIndex= Math.floor(Math.random()* deck.length);
    const card=deck[randomIndex]
    // tehcnically you could pull out this card again so gotta remove it 
     deck.splice(randomIndex,1);
     return card;
}

// player gets two cards and so does the dealer
playerhand=[];
dealerhand=[];

// two dealer cards
playerhand.push(drawCard(playabledeck));
playerhand.push(drawCard(playabledeck));
dealerhand.push(drawCard(playabledeck));
dealerhand.push(drawCard(playabledeck));



//get the score now 
const checkscore = (hand) => {
    let total=0
    for (const cardobject of hand){
        //console.log(cardobject);
        temp=cardobject.Card;
        if (temp==='K'||temp==='Q'||temp==='J'){
            
            total=total+10;
        }
        else if (temp==='A'){
            if ((total+11)>21){
                total=total+1;
            }
            else{
                total=total+11;
            }
        }
        else{
            total=total+temp
        }
    }
    return total;

}
/*
pscore=checkscore(playerhand);
dscore=checkscore(dealerhand);

console.log(" Player Total: " + pscore );
console.log(" Dealer Total: " + dscore );
*/
console.log("--------DEALER---------- ");
console.log(dealerhand);
console.log(" Dealer Score: " +  checkscore(dealerhand));
console.log("--------PLAYER---------- ");
console.log(playerhand);
console.log(" Player Score: " + checkscore(playerhand));

//console.log(playabledeck.length); 
//console.log(playerhand[0].Card);
const checkDealerFinal = () => {
    while(true){
    
        if (checkscore(dealerhand)<=16){
            //hit 
            console.log("Dealer Hits");
            dealerhand.push(drawCard(playabledeck));
            // check score and re asses
            //print score
            console.log("--------DEALER---------- ");
            console.log(dealerhand);
            console.log(" Dealer Score: " +  checkscore(dealerhand));
            console.log("--------PLAYER---------- ");
            console.log(playerhand);
            console.log(" Player Score: " + checkscore(playerhand));
            continue;

        }
        else if (checkscore(dealerhand)>=17 && checkscore(dealerhand)<=21){
            // stand
            console.log(" Dealer Stands ");
            return checkscore(dealerhand);
            //break;
        }
        else if( checkscore(dealerhand)>21){
            console.log(" DEALER BUST !! Dealer Score is " + checkscore(dealerhand) + " Player Wins ");
            break;
        }
    
        
    }
 }

 const checkPlayerFinal= () =>
 {
    if (checkscore(dealerhand)>21){
        return 1000;
    }
    while(true){
        const prompt = require("prompt-sync")({ sigint: true });
        const hitm = prompt(" Do you want to stand: [1] Y [2] N ");

        if (hitm==1)
        {
            whowins();
            break;
        }
        else if(hitm==2){
        // this is hit so generate card
        playerhand.push(drawCard(playabledeck));
        //print score
        console.log("--------DEALER---------- ");
        console.log(dealerhand);
        console.log(" Dealer Score: " +  checkscore(dealerhand));
        console.log("--------PLAYER---------- ");
        console.log(playerhand);
        console.log(" Player Score: " + checkscore(playerhand));

        score=checkscore(playerhand);
        if (score>21){
            console.log("bust!!!!");
            console.log(" DEALER : " + checkscore(dealerhand));
            console.log(" PLAYER : " + checkscore(playerhand));
            console.log(" Dealer Wins"); 
            break;
        }
        else if (score === 21){
            whowins();
            break;
        }
        else if (checkscore(dealerhand)>21){
            break;
        }
    }
    }
    //return 200;
}
const whowins = () =>{
    if (checkscore(playerhand)>checkscore(dealerhand)){
        console.log(" DEALER : " + checkscore(dealerhand));
        console.log(" PLAYER : " + checkscore(playerhand));
        console.log("Player Wins"); 
    
        
    }
    else if( checkscore(playerhand)===checkscore(dealerhand)){
        console.log("PUSH");
    }
    else{
        console.log(" DEALER : " + checkscore(dealerhand));
        console.log(" PLAYER : " + checkscore(playerhand));
        console.log(" Dealer Wins"); 
    }

}

while(true){
// ------------- Dealer--------------


const idk =checkDealerFinal();

// ------------- Player--------------
const maybe =checkPlayerFinal();



console.log("Game Finished Try Again");

const test = require("prompt-sync")({ sigint: true });
const yn = test(" Do you want to Play Again ??: [1] Y [2] N ");
if (yn==1){
    console.log("Great Good Luck");
    const playabledeck=generateDeck();
    //reset hands
    playerhand=[];
    dealerhand=[];
    playerhand.push(drawCard(playabledeck));
    playerhand.push(drawCard(playabledeck));
    dealerhand.push(drawCard(playabledeck));
    dealerhand.push(drawCard(playabledeck));

    console.log("--------DEALER---------- ");
    console.log(dealerhand);
    console.log(" Dealer Score: " + checkscore(dealerhand));
    console.log("--------PLAYER---------- ");
    console.log(playerhand);
    console.log(" Player Score: " + checkscore(playerhand));
    continue;
}
else if(yn==2){
    console.log("Thanks for playing");
    break;
}

}
