const dinosaurs = [
    {
        name: 'allosaurus',
        url: './assets/allosaurus.jpg',
    },
    {
        name: 'allosaurus',
        url: './assets/allosaurus.jpg',
    },
    {
        name: 'baryonyx',
        url: './assets/baryonyx.jpg',
    },
    {
        name: 'baryonyx',
        url: './assets/baryonyx.jpg',
    },
    {
        name: 'deinonychus',
        url: './assets/deinonychus.jpg',
    },
    {
        name: 'deinonychus',
        url: './assets/deinonychus.jpg',
    },
    {
        name: 'stegosaurus',
        url: './assets/stegosaurus.jpg',
    },
    {
        name: 'stegosaurus',
        url: './assets/stegosaurus.jpg',
    },
    {
        name: 'velociraptor',
        url: './assets/velociraptor.jpg',
    },
    {
        name: 'velociraptor',
        url: './assets/velociraptor.jpg',
    },
    {
        name: 'triceratops',
        url: './assets/triceratops.jpg',
    },
    {
        name: 'triceratops',
        url: './assets/triceratops.jpg',
    },
    {
        name: 'lambeosaurus',
        url: './assets/lambeosaurus.jpg',
    },
    {
        name: 'lambeosaurus',
        url: './assets/lambeosaurus.jpg',
    },
    {
        name: 'trex',
        url: './assets/trex.jpg',
    },
    {
        name: 'trex',
        url: './assets/trex.jpg',
    },
    

];




const myApp = {};

matchApp.moves = 0;
matchApp.firstMove = null;
matchApp.secondMove = null;
matchApp.resultArray = [];
matchApp.flippedCardOne = null;
matchApp.flippedCardTwo = null;
matchApp.resultArray = [];
matchApp.opened = [];
matchApp.moves = 0;
matchApp.timer; 
matchApp.seconds = 0;






//This function loads the cards on page load
matchApp.displayCard = () => {

        matchApp.shuffle(dinosaurs);

    dinosaurs.forEach((dinos, index) => {
        console.log(dinos, index);
        let cardsHtml = `
            <div class="card">
                <img class="faceBack" src="${dinos.url}" alt="${dinos.name}" data-id="${index}">
                <img class="claw visible" src="./assets/claws.png" alt="claws">
            </div>`;
       

        $('.grid').append(cardsHtml);

    });
    
}

//Thanks to Esther for sharing the Fisher-Yates Shuffle Method
//This function shuffles the cards to create a different card arrangement everytime the user starts the game
matchApp.shuffle = (array) => {

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

matchApp.isGameOver = () => {    

}
    
matchApp.storeCard = (selectedCardContainer) => {
  let cardSide = $(selectedCardContainer).children().eq(0).attr("class");

  //check if the user is clicking on the same card
  

  if (cardSide !== "faceFront") {
    $(selectedCardContainer).children().eq(0).toggleClass("faceFront faceBack");
    $(selectedCardContainer).children().eq(1).removeClass("visible");


    const openedCard = {};
    //QUESTION - should this be in a variable -> $(this).children().attr("data-id")

    openedCard.name =
      dinosaurs[$(selectedCardContainer).children().eq(0).attr("data-id")].name;
    openedCard.id = $(selectedCardContainer).children().eq(0).attr("data-id");
    matchApp.opened.push({ name: openedCard.name, id: openedCard.id });
    matchApp.moves++;
    matchApp.updateMoves();
    matchApp.compareCards();

  }
};
   
matchApp.compareCards = () => {
//   console.log(selectedCardContainer);

  //check if the number of opened cards is greater than one

  if (matchApp.opened.length === 2) {
    if (matchApp.opened[0].name === matchApp.opened[1].name) {
      //add them to the result array and clear opened array
        matchApp.opened.forEach((matchedDinos) => {

        matchApp.resultArray.push(matchedDinos);
      });

        matchApp.updateSuccessfulMoves();
        if (matchApp.resultArray.length === dinosaurs.length) {
           let totalTime = matchApp.getTotalTime();
            clearInterval(matchApp.timer);
            $("#gameOver").addClass("visible");
         
        
            // alert(`You have won`);
        //capture the timer and moves
      }
      matchApp.opened = [];
    } else {
      //close/turn the cards back again with a timeout function

      setTimeout(() => {
        matchApp.opened.forEach((card) => {
            console.log($(`[data-id="${card.id}"]`));
          $(`[data-id="${card.id}"]`)
            .toggleClass("faceFront faceBack");
         console.log($(`[data-id="${card.id}"]`).siblings());
          $(`[data-id="${card.id}"]`).siblings().addClass('visible');
            
        });
        matchApp.opened = [];
      }, 500);
    }
  } 
}
   
 matchApp.updateSuccessfulMoves = () => {
   
    $("#success-count").html(matchApp.resultArray.length);
    
 };

 matchApp.updateMoves = () => {

   $("#moves-count").html(matchApp.moves);
 };

 matchApp.startTimer = function(){
    //   let seconds = 0;

      function pad(val) {
        return val > 9 ? val : "0" + val;
      }
     matchApp.timer = setInterval(() => {
        $("#seconds").html(pad(++matchApp.seconds % 60));
        $("#minutes").html(pad(parseInt(matchApp.seconds / 60, 10)));        
      }, 1000);

 }

 matchApp.getTotalTime = () => {
    console.log(`seconds`, matchApp.seconds);
    let minutes = parseInt(matchApp.seconds / 60, 10);
    let second = matchApp.seconds % 60;
    console.log(`${minutes}:${second}`);
    return (`${minutes}${second}`);

 };



matchApp.gameRestart = () => {

    $('.grid').empty();
     $("#seconds").html('00');
     $("#minutes").html('00');
      $("#success-count").html(0);
      $("#moves-count").html(0);

    matchApp.resultArray = [];
    matchApp.opened = [];
    matchApp.moves = 0;
    console.log(`clear all 1${matchApp.resultArray.length}`);
    console.log(`clear all  2${matchApp.opened.length}`); 
    console.log(`clear all 3${matchApp.moves}`);
    

   
    console.log(`timer`,matchApp.timer); 
    matchApp.displayCard();


};

matchApp.cardClickEventListener = function () {

    $(".goAgain").on("click", function() {

        $('#gameOver').removeClass('visible');
        matchApp.gameRestart();

    });

  $(".grid").on("click", ".card", function () {
       // change this to on click of start
       if(matchApp.moves === 0) {
            matchApp.startTimer(); 
       }
        matchApp.storeCard(this);
        
  });   

};

matchApp.init = () => {

    
    matchApp.cardClickEventListener();
   
}


$(function () {
 
    matchApp.init();
});
