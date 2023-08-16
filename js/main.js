class Game {
  constructor() {
    this.height = 40;
    this.width = 700;
    this.totalScore = 0;
    this.vegScore = 0;
    this.addPoints();
  }
  addPoints() {
    document.getElementById(
      "total-score"
    ).innerHTML = `TOTAL SCORE: ${this.totalScore}`;
    this.totalScore++;

    document.getElementById(
      "vegetables-score"
    ).innerHTML = `Vegetables: ${this.vegScore}`;

    this.increaseSpeed();
  }
  increaseSpeed() {
    this.intervalDecrease = 10;
    if (this.totalScore === 2 + 1) {
      this.intervalDecrease = 5;
      restartInterval();
    }
    if (this.totalScore === 4 + 1) {
      this.intervalDecrease = 2;
      restartInterval();
    }
    if (this.totalScore === 6 + 1) {
      this.intervalDecrease = 1;
      restartInterval();
    }
  }
}

/******************** PLAYER CLASS ********************/
class Player {
  constructor() {
    this.height = 50; //was 20
    this.width = 70; // was 60
    this.positionX = 250 - this.width / 2;
    this.positionY = 500 - this.height;

    this.createDomElement();
  }
  createDomElement() {
    /******************** CREATING THE PLAYER DIV & ADD IT TO THE DOM ********************/
    const playerDiv = document.createElement("div"); // Making a new div
    this.playerDiv = playerDiv;
    this.playerDiv.id = "player0"; // Give the new div an id
    const parentOfPlayer = document.getElementById("game-board"); // Search for the parent we want to link the div to
    parentOfPlayer.appendChild(playerDiv); // linking the div to the parent

    /******************** GIVING PLAYERDIV A SIZE ********************/
    this.playerDiv.style.height = this.height + "px";
    this.playerDiv.style.width = this.width + "px";
    this.playerDiv.style.top = this.positionY + "px";

    /******************** CALLING THE CURRENT POSITION  ********************/
    this.updatePosition();
  }
  moveLeft() {
    this.positionX -= 40;
    this.updatePosition();
  }
  moveRight() {
    this.positionX += 20;
    this.updatePosition();
  }
  updatePosition() {
    /******************** POSITIONING PLAYERDIV ********************/
    this.playerDiv.style.left = this.positionX + "px";
  }
}
/******************** Vegetable CLASS ********************/
class Vegetables {
  constructor() {
    this.height = 50;
    this.width = 50;
    this.positionX = Math.random() * (700 - this.width);
    this.positionY = 0;

    this.getRandomBackgroundImage();
    this.createDomElement();
  }
  getRandomBackgroundImage() {
    this.imgArr = [
      "./images/broccoli.png",
      "./images/tomato.png",
      "./images/beans.png",
    ];
    this.randomImageIndex =
      this.imgArr[Math.floor(Math.random() * this.imgArr.length)];

    // this.image = imgArr[Math.floor(Math.random() * imgArr.length)] if you want to add lots of different Vegetables :)
    //EXAMPLE IMAGE NAME broccoli.png
    //this.name = this.image.slice(9)

    //switch(VegetableType){
    // case("broccoli")
    //}
  }
  createDomElement() {
    /******************** CREATING THE vegetable DIV & ADD IT TO THE DOM ********************/
    const vegetableDiv = document.createElement("div");
    this.vegetableDiv = vegetableDiv;
    this.vegetableDiv.className = "vegetables";
    const parentOfvegetables = document.getElementById("game-board");
    parentOfvegetables.appendChild(vegetableDiv);
    this.vegetableDiv.style.backgroundImage = `url('${this.randomImageIndex}')`;
    /******************** GIVING vegetableDIV A SIZE ********************/
    this.vegetableDiv.style.height = this.height + "px";
    this.vegetableDiv.style.width = this.width + "px";
    this.vegetableDiv.style.left = this.positionX + "px";

    /******************** CALLING THE CURRENT POSITION  ********************/
    this.updatePosition();
  }

  updateVegetableScore() {
    Game.vegScore++;
  }

  moveDown() {
    this.positionY += 1;
    this.updatePosition();
  }
  updatePosition() {
    /******************** RE-POSITIONING vegetableDIV ********************/
    this.vegetableDiv.style.top = this.positionY + "px";
  }
}

/******************** ANIMAL CLASS ********************/
class Animal {
  constructor() {
    this.height = 50;
    this.width = 50;
    this.positionX = Math.random() * (700 - this.width);
    this.positionY = 0;

    this.getRandomBackgroundImage();
    this.createDomElement();
  }
  getRandomBackgroundImage() {
    this.imgArr = ["/images/pig.png", "/images/cow.png", "/images/chicken.png"];
    this.randomImageIndex =
      this.imgArr[Math.floor(Math.random() * this.imgArr.length)];
  }
  createDomElement() {
    /******************** CREATING THE vegetable DIV & ADD IT TO THE DOM ********************/
    const animalDiv = document.createElement("div");
    this.animalDiv = animalDiv;
    this.animalDiv.className = "animals";
    const parentOfAnimals = document.getElementById("game-board");
    this.animalDiv.style.backgroundImage = `url('${this.randomImageIndex}')`;
    parentOfAnimals.appendChild(animalDiv);

    /******************** GIVING animalDiv A SIZE ********************/
    this.animalDiv.style.height = this.height + "px";
    this.animalDiv.style.width = this.width + "px";
    this.animalDiv.style.left = this.positionX + "px";

    /******************** CALLING THE CURRENT POSITION  ********************/
    this.updatePosition();
  }
  moveDown() {
    this.positionY += 1;
    this.updatePosition();
  }
  updatePosition() {
    /******************** RE-POSITIONING animalDiv ********************/
    this.animalDiv.style.top = this.positionY + "px";
  }
}

/******************** STORING THE CLASS IN A VALUABLE WHICH INVOKES IT AUTOMATICALLY ********************/
const game = new Game();
const player = new Player();

/******************** DETECTING PLAYER KEY & INVOKING LEFT/RIGHT ********************/
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (player.positionX > 0) {
      player.moveLeft();
    }
  } else if (event.key === "ArrowRight") {
    if (player.positionX + player.width < 700) {
      player.moveRight();
    }
  }
});

/******************** INTERVAL FOR ADDING vegetableS, MOVING vegetableS DOWN & REMOVE vegetableS FROM ARRAY ********************/
const vegetableArr = []; // making empty array to catch all the new vegetables

setInterval(() => {
  const newVegetable = new Vegetables(); // making a new const inside this interval for the new vegetables to automaticalle make new vegetable from the class.
  vegetableArr.push(newVegetable); // push the vegetable div's the the empty array
}, 2000);

/******************** MOVE vegetable DOWN ********************/
let invervalIdVegetable = createVegetableInterval();

function createVegetableInterval() {
  return setInterval(() => {
    vegetableArr.forEach(function (vegetableAppear, index) {
      // vegetableAppear = the current vegetable (like vegetableArr[0], vegetableArr[1] etc.), possible to add "", index" in case of splicing, but because they all have the same speed it will always be the first one to cut off the string so shift() works too.
      vegetableAppear.moveDown();
      /******************** COLLISION DETECTION ********************/
      if (
        player.positionX < vegetableAppear.positionX + vegetableAppear.width &&
        player.positionX + player.width > vegetableAppear.positionX &&
        player.positionY < vegetableAppear.positionY + vegetableAppear.height &&
        player.positionY + player.height > vegetableAppear.positionY
      ) {
        console.log("Vegetable catch!");

        vegetableAppear.updateVegetableScore();
        // game.vegetablesScore();
        game.addPoints(); //EXTRA add name of the vegetable as argument to check how many points to win
        vegetableAppear.vegetableDiv.remove();
        vegetableArr.splice(index, 1); // splice in case I want to try different speeds for the vegetables.
        /******************** REMOVE vegetable FROM DOM ********************/
      }
      if (vegetableAppear.positionY > 480) {
        // to access the positionY inside the class there's no need for "this."" because it already is looping through the specific class div.
        vegetableArr.splice(index, 1); // splice in case I want to try different speeds for the vegetables.
        vegetableAppear.vegetableDiv.remove(); // addressing the current vegetable class (vegetableAppear), access the DOM element I stored as "vegetableDiv" and remove this one.
      }
    });
  }, game.intervalDecrease);
}

/******************** INTERVAL FOR ADDING ANIMALS, MOVING ANIMALS DOWN & REMOVE ANIMALS FROM ARRAY ********************/
const animalArr = []; // making empty array to catch all the new ANIMALS

const intervalIdAnimalAppear = setInterval(() => {
  const newAnimal = new Animal(); // making a new const inside this interval for the new animals to automaticalle make new vegetable from the class.
  animalArr.push(newAnimal); // push the vegetable div's the the empty array
}, 1500);

let intervalIdAnimal = createAnimalInterval();

function createAnimalInterval() {
  return setInterval(() => {
    animalArr.forEach(function (animalAppear) {
      animalAppear.moveDown();

      /******************** COLLISION DETECTION ********************/
      if (
        player.positionX < animalAppear.positionX + animalAppear.width &&
        player.positionX + player.width > animalAppear.positionX &&
        player.positionY < animalAppear.positionY + animalAppear.height &&
        player.positionY + player.height > animalAppear.positionY
      ) {
        console.log("Game over!");
        // location.href = "./gameover.html";
        /******************** REMOVE ANIMAL FROM DOM ********************/
      }
      if (animalAppear.positionY >= 480) {
        animalArr.shift();
        animalAppear.animalDiv.remove();
      }
    });
  }, game.intervalDecrease);
}

function restartInterval() {
  clearInterval(intervalIdAnimal);
  intervalIdAnimal = createAnimalInterval();
  clearInterval(invervalIdVegetable);
  invervalIdVegetable = createVegetableInterval();
}
