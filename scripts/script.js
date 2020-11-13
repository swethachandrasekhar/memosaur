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
    // {
    //     name: 'deinonychus',
    //     url: './assets/deinonychus.jpg',
    // },
    // {
    //     name: 'deinonychus',
    //     url: './assets/deinonychus.jpg',
    // },
    // {
    //     name: 'stegosaurus',
    //     url: './assets/stegosaurus.jpg',
    // },
    // {
    //     name: 'stegosaurus',
    //     url: './assets/stegosaurus.jpg',
    // },
    // {
    //     name: 'velociraptor',
    //     url: './assets/velociraptor.jpg',
    // },
    // {
    //     name: 'velociraptor',
    //     url: './assets/velociraptor.jpg',
    // },
    // {
    //     name: 'triceratops',
    //     url: './assets/triceratops.jpg',
    // },
    // {
    //     name: 'triceratops',
    //     url: './assets/triceratops.jpg',
    // },
    // {
    //     name: 'lambeosaurus',
    //     url: './assets/lambeosaurus.jpg',
    // },
    // {
    //     name: 'lambeosaurus',
    //     url: './assets/lambeosaurus.jpg',
    // },
    // {
    //     name: 'trex',
    //     url: './assets/trex.jpg',
    // },
    // {
    //     name: 'trex',
    //     url: './assets/trex.jpg',
    // },
    

];




const myApp = {};

myApp.moves = 0;
myApp.firstMove = null;
myApp.secondMove = null;
myApp.resultArray = [];
myApp.flippedCardOne = null;
myApp.flippedCardTwo = null;

myApp.opened = [];






//This function loads the cards on page load
myApp.displayCard = () => {

        myApp.shuffle(dinosaurs);

    dinosaurs.forEach((dinos, index) => {
        // console.log(dinos, index);
        let cardsHtml = `
            <div class="card">
                <img class="faceBack" src="${dinos.url}" alt="${dinos.name}" data-id="${index}">
            </div>`;
        $('.grid').append(cardsHtml);

    });
    
}

//Thanks to Esther for sharing the Fisher-Yates Shuffle Method
//This function shuffles the cards to create a different card arrangement everytime the user starts the game
myApp.shuffle = (array) => {

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

myApp.isGameOver = () => {    

}
    
myApp.storeCard = (selectedCardContainer) => {
  let cardSide = $(selectedCardContainer).children().attr("class");

  //check if the user is clicking on the same card

  if (cardSide !== "faceFront") {
    $(selectedCardContainer).children().toggleClass("faceFront faceBack");

    const openedCard = {};
    //QUESTION - should this be in a variable -> $(this).children().attr("data-id")

    openedCard.name =
      dinosaurs[$(selectedCardContainer).children().attr("data-id")].name;
    openedCard.id = $(selectedCardContainer).children().attr("data-id");
    myApp.opened.push({ name: openedCard.name, id: openedCard.id });
    myApp.moves++;
    myApp.compareCards();

  }
};
   
myApp.compareCards = () => {
//   console.log(selectedCardContainer);

  //check if the number of opened cards is greater than one

  if (myApp.opened.length === 2) {
    if (myApp.opened[0].name === myApp.opened[1].name) {
      //add them to the result array and clear opened array
      myApp.opened.forEach((matchedDinos) => {
        myApp.resultArray.push(matchedDinos);
      });

      if (myApp.resultArray.length === dinosaurs.length) {
        alert(`You have won`);
        //capture the timer and moves
      }
      myApp.opened = [];
    } else {
      //close/turn the cards back again with a timeout function

      setTimeout(() => {
        myApp.opened.forEach((card) => {
          $(`[data-id="${card.id}"]`).toggleClass("faceFront faceBack");
        });
        myApp.opened = [];
      }, 500);
    }
  }
}
   
    


myApp.cardClickEventListener = function () {

  $(".grid").on("click", ".card", function () {
        myApp.storeCard(this);
        
  });

};

myApp.init = () => {
    myApp.displayCard();
    myApp.cardClickEventListener();
   
}


$(function () {
 
    myApp.init();
});
