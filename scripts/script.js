const animals = [
  {
    name: "allosaurus",
    url: "./assets/allosaurus.jpg",
  },
  {
    name: "baryonyx",
    url: "./assets/baryonyx.jpg",
  },
  {
    name: "deinonychus",
    url: "./assets/deinonychus.jpg",
  },
  {
    name: "stegosaurus",
    url: "./assets/stegosaurus.jpg",
  },
  {
    name: "velociraptor",
    url: "./assets/velociraptor.jpg",
  },
  {
    name: "triceratops",
    url: "./assets/triceratops.jpg",
  },

  {
    name: "lambeosaurus",
    url: "./assets/lambeosaurus.jpg",
  },
  {
    name: "trex",
    url: "./assets/trex.jpg",
  },

  {
    name: "WoolyRhino",
    url: "./assets/woolyrhino.png",
  },
  {
    name: "anklyosaurus",
    url: "./assets/Anklyosaurus.png",
  },

  {
    name: "bueraptor",
    url: "./assets/blueraptor.jpg",
  },

  {
    name: "diabloceratops",
    url: "./assets/Diabloceratops_The_Isle.png",
  },

  {
    name: "dracorex",
    url: "assets/Dracorex-_1.jpg",
  },

  {
    name: "mastadon",
    url: "./assets/mastadon.jpg",
  },

  {
    name: "sabertooth",
    url: "./assets/sabertooth.jpg",
  },

  {
    name: "spinosaurus",
    url: "./assets/Spinothumb.png",
  },

  {
    name: "sinorinthosaurus",
    url: "./assets/sinorinthosauraus.jpg",
  },
  {
    name: "trodon",
    url: "./assets/Trodon.png",
  },
  {
    name: "lion",
    url: "./assets/lion.jpeg",
  },
  {
    name: "wolf",
    url: "./assets/wolf.jpg",
  },
  {
    name: "bear",
    url: "./assets/bear.jpeg",
  },
  {
    name: "croc",
    url: "./assets/croc.jpg",
  },
  {
    name: "owl",
    url: "./assets/owl.jpg",
  },
  {
    name: "panda",
    url: "./assets/panda.jpg",
  },
  {
    name: "chimp",
    url: "./assets/chimp.jpg",
  },
];

// creating a namespace for the project

const matchApp = {};

//Declaring global variables
matchApp.moves = 0;
matchApp.resultArray = [];
matchApp.opened = [];
matchApp.timer = 0;
matchApp.seconds = 0;
matchApp.finalAnimalArray = [];

//Make a function to display appropriate

matchApp.createCardsStack = (rows = 4, columns = 4) => {
  matchApp.gameRestart();

  let numberOfUniqueCards = (rows * columns) / 2;
  let newAnimalArray = [];
  matchApp.finalAnimalArray = [];
  newAnimalArray = animals.slice(0, numberOfUniqueCards);
  newAnimalArray.forEach((animal) => {
    matchApp.finalAnimalArray.push(animal);
    matchApp.finalAnimalArray.push(animal);
  });
  // matchApp.newAnimalArray.push(matchApp.finalAnimalArray)
  console.log(`new array is `, matchApp.finalAnimalArray);
  matchApp.displayCard();
};

//This function loads the cards on page load
matchApp.displayCard = () => {
  // empty the grid
  $(".grid").empty();
  matchApp.shuffle(matchApp.finalAnimalArray);
  matchApp.finalAnimalArray.forEach((animals, index) => {
    let animalCards = `
            <div class="card">
                    <div class="cardFace cardBack" data-id="${index}">
                        <img  src="${animals.url}" alt="${animals.name}" >
                    </div>
                    <div class="cardFace cardFront visible">
                        <img  src="./assets/claws.png" alt="Dinosaurs claws marks">
                    </div>
                </div>`;

    $(".grid").append(animalCards);
  });
};

//Thanks to Esther for sharing the Fisher-Yates Shuffle Method
//This function shuffles the cards to create a different card arrangement everytime the user starts the game
matchApp.shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//Function to Store the clicked card in an array
matchApp.storeCard = (selectedCardContainer) => {
  console.log($(selectedCardContainer).children().eq(1).attr("class"));
  let cardSide = $(selectedCardContainer).children().eq(1).attr("class");
  let cardContainerVisible = $(selectedCardContainer).attr("class");
  console.log(`contianer visibe? ${cardContainerVisible}`);

  //check if the user is clicking on the same card; only store the card if the user clicks on a different card

  if (
    cardSide !== "cardFace cardBack" &&
    cardContainerVisible !== "card visible"
  ) {
    $(selectedCardContainer).toggleClass("visible");
    const openedCard = {};
    openedCard.name =
      matchApp.finalAnimalArray[
        $(selectedCardContainer).children().eq(0).attr("data-id")
      ].name;
    openedCard.id = $(selectedCardContainer).children().eq(0).attr("data-id");
    matchApp.opened.push({ name: openedCard.name, id: openedCard.id });
    matchApp.moves++;
    matchApp.updateMoves();
    matchApp.compareCards();
  }
};

//Function to Update the Number of Moves counter on the Game Stats
matchApp.updateMoves = () => {
  $("#movesCount").html(matchApp.moves);
};

//Function to Compare the two cards that were opened

matchApp.compareCards = () => {
  //check if the number of opened cards is greater than one
  // If Number of Cards clicked is less than One then do nothing; Otherwise compare the cards to see if they match

  if (matchApp.opened.length === 2) {
    if (matchApp.opened[0].name === matchApp.opened[1].name) {
      //add them to the result array and clear opened array
      matchApp.opened.forEach((matchedDinos) => {
        matchApp.resultArray.push(matchedDinos);
      });

      matchApp.updateSuccessfulMoves();
      //check if all the matchings are complete
      if (matchApp.resultArray.length === matchApp.finalAnimalArray.length) {
        let totalTime = matchApp.getTotalTime();
        let rating = matchApp.getRatings();
        $(".totalTime").html(totalTime);
        $(".ratingStar").html("");
        //Update the ratings stars to the Game Over overlay
        for (i = 1; i <= rating; i++) {
          $(".ratingStar").append("⭐️");
        }
        //Play the card match audio
        $("#gameAudio2")[0].play();
        $("#gameOver").toggleClass("visible");
        clearInterval(matchApp.timer);
        totalTime = 0;
      } else {
        //Play end of game audio
        $("#gameAudio1")[0].play();
      }
      matchApp.opened = [];
    } else {
      //close/turn the cards back again with a timeout function
      //close the cards after a second timeout
      setTimeout(() => {
        matchApp.opened.forEach((card) => {
          $(`[data-id="${card.id}"]`).parent().toggleClass("visible");
        });
        matchApp.opened = [];
      }, 1000);
    }
  }
};

//Function to Update the number of successful moves counter on the Game Stats
matchApp.updateSuccessfulMoves = () => {
  $("#successCount").html(matchApp.resultArray.length);
};

//Function to Start the game timer
matchApp.startTimer = function () {
  matchApp.seconds = 0;
  matchApp.timer = setInterval(() => {
    $("#seconds").html(matchApp.pad(++matchApp.seconds % 60));
    $("#minutes").html(matchApp.pad(parseInt(matchApp.seconds / 60, 10)));
  }, 1000);
};

//Function to Pad a zero to the timer(minutes and seconds) if value is less than 9
matchApp.pad = (val) => {
  return val > 9 ? val : "0" + val;
};

//Function to Calculate the total time taken to finish the game
matchApp.getTotalTime = () => {
  let minutes = parseInt(matchApp.seconds / 60, 10);
  let second = matchApp.seconds % 60;
  return `${minutes}.${second}`;
};

//Function to generate ratings based on the number of moves
matchApp.getRatings = () => {
  let ratings;
  if (matchApp.moves === matchApp.finalAnimalArray.length) {
    return (ratings = 5);
  } else if (
    matchApp.moves ===
    matchApp.finalAnimalArray.length + matchApp.finalAnimalArray.length * 0.25
  ) {
    return (ratings = 4);
  } else if (
    matchApp.moves ===
    matchApp.finalAnimalArray.length + matchApp.finalAnimalArray.length * 0.5
  ) {
    return (ratings = 3);
  } else return (ratings = 2);
};

////Function to restart the game
matchApp.gameRestart = () => {
  $(".grid").empty();
  $("#seconds").html("00");
  $("#minutes").html("00");
  $("#successCount").html(0);
  $("#movesCount").html(0);

  matchApp.resultArray = [];
  matchApp.opened = [];
  matchApp.moves = 0;
  //clear timer
  clearInterval(matchApp.timer);
};

//Store the diccifulty level and make the apprioriate changes to grid generation
matchApp.storeDifficultyLevel = (diffultyLevel) => {
  if (diffultyLevel === "easy") {
    //if user is on default choice and clicks on easy option again: DO NOT TOGGLE  Otherwise toggle Class to GridOne

    if ($(".grid").attr("class") !== "grid gridOne") {
      $(".grid").toggleClass("gridOne");
    }
    $(".grid").removeClass("gridTwo gridThree");
    matchApp.createCardsStack(4, 4);
  } else if (diffultyLevel === "medium") {
    $(".grid").toggleClass("gridTwo").removeClass("gridOne gridThree");
    matchApp.createCardsStack(4, 8);
  } else if (diffultyLevel === "hard") {
    $(".grid").toggleClass("gridThree").removeClass("gridOne gridTwo");
    matchApp.createCardsStack(5, 10);
  }
};

// Function to listen to all the app events
matchApp.cardClickEventListener = function () {
  //On Game Start, make the overlay invisble
  $("#gameStart").on("click", function () {
    $("#gameStart").toggleClass("visible");
  });

  //On game over, restart the game
  $(".goAgain").on("click", function () {
    $("#gameOver").toggleClass("visible");
    matchApp.gameRestart();
    matchApp.createCardsStack();
  });

  //When user changes the difficulty level, store it restart the game
  $("form").on("change", "input", function () {
    clearInterval(matchApp.timer);
    matchApp.timer = 0;
    const diffultyLevel = $(this).attr("value");
    // If the difficulty level is either easy, medium or hard then store it
    if (['easy', 'medium','hard'].includes(diffultyLevel)) {
      
      matchApp.storeDifficultyLevel(diffultyLevel);
    }
  });

  //When user clicks on a card, store the card
  $(".grid").on("click", ".card", function () {
    // One the first card click, start the timer
    if (matchApp.moves === 0) {
      matchApp.startTimer();
    }
    matchApp.storeCard(this);
  });
};

//init function always displays the card and calls the function to listen to events
matchApp.init = () => {
  matchApp.createCardsStack(2, 2);
  matchApp.cardClickEventListener();
};

//Doc ready function calls init
$(function () {
  matchApp.init();
});
