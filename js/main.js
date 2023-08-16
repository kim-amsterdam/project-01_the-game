class Game {
  constructor() {
    this.height = 40;
    this.width = 700;
    this.totalScore = 0;
    this.vegetableScore = 0;
    this.fruitScore = 0;
    this.legumeScore = 0;
    this.grainScore = 0;
    this.nutScore = 0;

    this.intervalIdBonusToggle = null;
    this.bonus1 = false;
    this.bonus2 = false;
    this.bonusLight = document.querySelector("#score-board");
console.log(this.bonusLight);
console.log(this.bonusLight.style)
    this.addPoints();

    // if (this.bonusLight.style.color === "rgb(253, 255, 184)") {
    //   this.bonusLight.style.color === "green";
    //   console.log("HALLO?")
    // } else {
    //   this.bonusLight.style.color = "rgb(253, 255, 184)";
    // }


  }
  addPoints() {
    document.getElementById(
      "total-score"
    ).innerHTML = `TOTAL SCORE: ${this.totalScore}`;
    this.totalScore++;

    document.getElementById(
      "vegetable-score"
    ).innerHTML = `Vegetables: ${this.vegetableScore}`;

    document.getElementById(
      "fruit-score"
    ).innerHTML = `Fruits: ${this.fruitScore}`;

    document.getElementById(
      "legume-score"
    ).innerHTML = `Legumes: ${this.legumeScore}`;

    document.getElementById(
      "grain-score"
    ).innerHTML = `Grains: ${this.grainScore}`;

    document.getElementById("nut-score").innerHTML = `Nuts: ${this.nutScore}`;

    this.increaseSpeed();
    this.checkForBonus();
  }
  checkForBonus() {
    if (
      this.vegetableScore >= 1 &&
      this.fruitScore >= 1 &&
      this.legumeScore >= 1 &&
      this.grainScore >= 1 &&
      this.nutScore >= 1 &&
      !this.bonus1
    ) {
      console.log(`YOUR FIRST BONUS!`);
      this.toggleColorBonus();
      this.totalScore += 5;
      // this.bonusLight.style.color = "green"
      this.bonus1 = true;
    } else if (
      this.vegetableScore >= 3 &&
      this.fruitScore >= 3 &&
      this.legumeScore >= 3 &&
      this.grainScore >= 3 &&
      this.nutScore >= 3 &&
      !this.bonus2
    ) {
      console.log(`BONUS TIME: at least 3 pieces of each!`);
      this.toggleColorBonus();
      this.totalScore += 5;
      this.bonus2 = true;
    } else if (
      this.vegetableScore >= 5 &&
      this.fruitScore >= 5 &&
      this.legumeScore >= 5 &&
      this.grainScore >= 5 &&
      this.nutScore >= 5 &&
      !this.bonus3
    ) {
      console.log(`BONUS TIME: at least 5 pieces of each!`);
      this.toggleColorBonus();
      this.totalScore += 5;
      this.bonus3 = true;
    }
  }
  toggleColorBonus() {
    this.toggleCount = 0;
    this.totalToggles = 15;
    this.toggleInterval = 200;
    this.intervalIdBonusToggle = setInterval(()=> {
      this.toggleCount++;
      console.log(this.bonusLight.style.color)
      if (this.bonusLight.style.color === "rgb(253, 255, 184)") { 
        this.bonusLight.style.color = "rgb(89, 255, 0)";
        //this.bonusLight.style.color === "rgb(253, 255, 184)"
      } else {
        this.bonusLight.style.color = "rgb(253, 255, 184)";
      }
      document.getElementById(
        "total-score"
      ).innerHTML = `BONUS TIME! +++`;
      if (this.toggleCount >= this.totalToggles) {
        this.bonusLight.style.color = "rgb(253, 255, 184)"
        clearInterval(this.intervalIdBonusToggle);
        return;
      }
    }, 200)
  }
  increaseSpeed() {
    this.intervalDecrease = 15;
    if (this.totalScore === 3 + 1) {
      this.intervalDecrease = 13;
      restartInterval();
    }
    if (this.totalScore === 7 + 1) {
      this.intervalDecrease = 11;
      restartInterval();
    }
    if (this.totalScore === 12 + 1) {
      this.intervalDecrease = 10;
      restartInterval();
    }
    if (this.totalScore === 18 + 1) {
      this.intervalDecrease = 9;
      restartInterval();
    }
    if (this.totalScore === 25 + 1) {
      this.intervalDecrease = 8;
      restartInterval();
    }
    if (this.totalScore === 33 + 1) {
      this.intervalDecrease = 7;
      restartInterval();
    }
    if (this.totalScore === 42 + 1) {
      this.intervalDecrease = 6;
      restartInterval();
    }
    if (this.totalScore === 52 + 1) {
      this.intervalDecrease = 5;
      restartInterval();
    }
    if (this.totalScore === 60 + 1) {
      this.intervalDecrease = 4;
      restartInterval();
    }
    if (this.totalScore === 70 + 1) {
      this.intervalDecrease = 3;
      restartInterval();
    }
    if (this.totalScore === 80 + 1) {
      this.intervalDecrease = 2;
      restartInterval();
    }
    if (this.totalScore === 90 + 1) {
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
    this.positionX += 40;
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
    this.height = 32;
    this.width = 32;
    this.positionX = Math.random() * (700 - this.width);
    this.positionY = 0;

    this.getRandomBackgroundImage();
    this.createDomElement();
  }

  getRandomBackgroundImage() {
    this.productGroup = ["vegetable", "fruit", "legume", "grain", "nut"];
    this.randomProductGroup =
      this.productGroup[Math.floor(Math.random() * this.productGroup.length)];
    this.randomProductIndex = Math.floor(Math.random() * 9);
    this.typeOfProduct = this.randomProductGroup + this.randomProductIndex;
  }

  createDomElement() {
    /******************** CREATING THE vegetable DIV & ADD IT TO THE DOM ********************/
    const vegetableDiv = document.createElement("div");
    this.vegetableDiv = vegetableDiv;
    this.vegetableDiv.className = "vegetables";
    this.vegetableDiv.id = this.typeOfProduct;
    const parentOfvegetables = document.getElementById("game-board");
    parentOfvegetables.appendChild(vegetableDiv);
    /******************** GIVING vegetableDIV A SIZE ********************/
    this.vegetableDiv.style.height = this.height + "px";
    this.vegetableDiv.style.width = this.width + "px";
    this.vegetableDiv.style.left = this.positionX + "px";

    /******************** CALLING THE CURRENT POSITION  ********************/
    this.updatePosition();
  }

  updateVegetableScore() {
    if (this.typeOfProduct.includes("vegetable")) {
      game.vegetableScore++;
    }
    if (this.typeOfProduct.includes("fruit")) {
      game.fruitScore++;
    }
    if (this.typeOfProduct.includes("legume")) {
      game.legumeScore++;
    }
    if (this.typeOfProduct.includes("grain")) {
      game.grainScore++;
    }
    if (this.typeOfProduct.includes("nut")) {
      game.nutScore++;
    }
  }

  moveDown() {
    this.positionY += 1.2;
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
    this.productGroup = ["chicken", "redmeat", "cheese", "egg", "fastfood", "cake", "fish", "candy", "icecream", "drink"];
    this.randomProductGroup =
      this.productGroup[Math.floor(Math.random() * this.productGroup.length)];
    this.randomProductIndex = Math.floor(Math.random() * 3);
    this.typeOfProduct = this.randomProductGroup + this.randomProductIndex;

    console.log(this.typeOfProduct)
  }
  createDomElement() {
    /******************** CREATING THE vegetable DIV & ADD IT TO THE DOM ********************/
    const animalDiv = document.createElement("div");
    this.animalDiv = animalDiv;
    this.animalDiv.className = "animals";
    this.animalDiv.id = this.typeOfProduct;
    const parentOfAnimals = document.getElementById("game-board");
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
}, 1700);

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
        vegetableArr.splice(index, 1); 
        vegetableAppear.vegetableDiv.remove();
        vegetableAppear.updateVegetableScore();
        // game.vegetablesScore();
        game.addPoints(); //EXTRA add name of the vegetable as argument to check how many points to win
        /******************** REMOVE vegetable FROM DOM ********************/
      }
      if (vegetableAppear.positionY > 470) {
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
}, 1400);

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
        location.href = "./gameover.html";
        /******************** REMOVE ANIMAL FROM DOM ********************/
      }
      if (animalAppear.positionY >= 470) {
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
