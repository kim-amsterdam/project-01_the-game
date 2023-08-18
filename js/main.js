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

    // energy counter
    this.energy = 98;

    // life counter
    this.lifesLeft = 3;
    this.lifesCounter = 10;
    this.lifes();

    this.bonusCounter = 1;
    this.bonusStart = false;
    this.intervalIdBonusToggle = null;
    this.bonusFlashPoints = document.querySelector("#score-board");
    this.bonusFlashTitle = document.querySelector("#header");
    this.intervalIdBonusVegetable;
    this.bonusVegetableRainIsStopped = false;

    // For the speed increase:
    this.intervalDecrease = 15;
    this.speedSteps = 5;

    this.addPoints();
    this.energyDiv();
    // this.energyLevel();
  }
  addPoints() {
    document.getElementById(
      "total-score"
    ).innerHTML = `TOTAL SCORE: ${this.totalScore}`;
    this.totalScore++;

    document.getElementById(
      "vegetable-score"
    ).innerHTML = `VEGETABLES: ${this.vegetableScore}`;

    document.getElementById(
      "fruit-score"
    ).innerHTML = `FRUITS: ${this.fruitScore}`;

    document.getElementById(
      "legume-score"
    ).innerHTML = `LEGUMES: ${this.legumeScore}`;

    document.getElementById(
      "grain-score"
    ).innerHTML = `WHOLE GRAINS: ${this.grainScore}`;

    document.getElementById(
      "nut-score"
    ).innerHTML = `NUTS AND SEEDS: ${this.nutScore}`;

    // console.log("This is the totalscore: "  + this.totalScore)
    // console.log("This is the lifesCounter: "  + this.lifesCounter)
    // console.log("This is the lifesLeft: "  + this.lifesLeft)

    if (this.totalScore === this.lifesCounter && this.lifesLeft <= 2) {
      this.lifesLeft++;
      this.lifesCounter += 5;
      this.lifesUpdate();
      // console.log("NEW LIFE!");
    }

    this.increaseSpeed();
    this.checkForBonus();
    // this.energyLevel()
  }
  lifes() {
    const lifeDiv = document.createElement("div");
    this.lifeDiv = lifeDiv;
    this.lifeDiv.id = "lifes";
    this.lifeDiv.style.backgroundImage = `url("./images/life${this.lifesLeft}.png")`;
    const parentOfLifes = document.getElementById("score-board");
    parentOfLifes.appendChild(lifeDiv);
  }
  lifesUpdate() {
    this.lifeDiv.style.backgroundImage = `url("./images/life${this.lifesLeft}.png")`;
  }
  energyLevel() {
    this.energyIntervalId = setInterval(() => {
      if (this.energy > 0) {
        this.energy -= 0.1;
        this.energyInsideDiv.style.width = this.energy + "%";
      }
      if (this.energy <= 100 && this.energy >= 51) {
        this.energyInsideDiv.style.backgroundColor = "rgb(119, 202, 133)";
      }
      if (this.energy <= 50 && this.energy >= 25) {
        this.energyInsideDiv.style.backgroundColor = "rgb(223, 152, 86)";
      }
      if (this.energy <= 24 && this.energy >= 0) {
        this.energyInsideDiv.style.backgroundColor = "rgb(224, 59, 59)";
      }
      if (this.energy < 1) {
        this.lifesLeft--;
        this.lifesUpdate();
        clearInterval(this.energyIntervalId);
        this.energy = 98;
        this.energyLevel();
      }
      console.log(this.energy);
    }, 50);
  }
  energyDiv() {
    const energyOutsideDiv = document.createElement("div");
    this.energyOutsideDiv = energyOutsideDiv;
    this.energyOutsideDiv.id = "energy-outside";

    const energyLevelDiv = document.createElement("div");
    this.energyLevelDiv = energyLevelDiv;
    this.energyLevelDiv.id = "energy-level";

    const energyInsideDiv = document.createElement("div");
    this.energyInsideDiv = energyInsideDiv;
    this.energyInsideDiv.id = "energy-inside";
    this.energyInsideDiv.style.width = this.energy + "%";

    const parentOfenergys = document.getElementById("score-board");
    parentOfenergys.appendChild(energyOutsideDiv);
    energyOutsideDiv.appendChild(energyInsideDiv);

    this.energyLevel();
  }
  checkForBonus() {
    if (
      this.vegetableScore >= this.bonusCounter &&
      this.fruitScore >= this.bonusCounter &&
      this.legumeScore >= this.bonusCounter &&
      this.grainScore >= this.bonusCounter &&
      this.nutScore >= this.bonusCounter
    ) {
      this.bonusStart = true;
      if (this.bonusStart) {
        // console.log(`BONUS TIME!`);
        this.toggleColorBonus();
        this.bonusCounter *= 3;
        // console.log(this.bonusCounter + "check bonuscounter");
      }
    }
  }
  toggleColorBonus() {
    this.toggleCount = 0;
    this.totalToggles = 15;
    this.toggleInterval = 200;
    this.createBonusVegetableInterval();
    this.intervalIdBonusToggle = setInterval(() => {
      this.toggleCount++;
      if (this.bonusFlashPoints.style.color === "rgb(253, 255, 184)") {
        this.bonusFlashPoints.style.color = "rgb(89, 255, 0)";
        this.bonusFlashTitle.style.color = "rgb(89, 255, 0)";
        //this.bonusFlashPoints.style.color === "rgb(253, 255, 184)"
      } else {
        this.bonusFlashPoints.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.innerHTML = "VEGETABLE RAIN!!!";
      }
      // createVegetableInterval();
      document.getElementById("total-score").innerHTML = `BONUS TIME! +++`;
      if (this.toggleCount >= this.totalToggles) {
        this.bonusFlashPoints.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.innerHTML = "PLANT-BASED WHOLE-FOOD SHOPPING GAME";
        clearInterval(this.intervalIdBonusToggle);
        // clearInterval(invervalIdVegetable);
        return;
      }
    }, 200);
  }
  increaseSpeed() {
    // console.log("Before the if: The current score is at: " + this.totalScore);
    // console.log(
    //   "Before the if: The current speed is at: " + this.intervalDecrease
    // );
    // console.log(
    //   "Before the if: The current speedstep is at: " + this.speedSteps
    // );
    if (this.totalScore === this.speedSteps) {
      this.intervalDecrease -= 2;
      this.speedSteps += 10;
      restartInterval();
      // console.log("After the if: The current score is at: " + this.totalScore);
      // console.log(
      //   "After the if: The current speed is at: " + this.intervalDecrease
      // );
      // console.log(
      //   "After the if: The current speedstep is at: " + this.speedSteps
      // );
    }
  }
  createBonusVegetableInterval() {
    const vegetableBonusArr = [];

    this.intervalIdBonusVegetable = setInterval(() => {
      if (!this.bonusVegetableRainIsStopped) {
        const newBonusVegetable = new Vegetables();
        vegetableBonusArr.push(newBonusVegetable);
      }
    }, 100);

    setTimeout(() => {
      this.bonusVegetableRainIsStopped = true;
    }, 3000);

    setInterval(() => {
      vegetableBonusArr.forEach(function (vegetableAppear, index) {
        vegetableAppear.moveDown();
        if (
          player.positionX <
            vegetableAppear.positionX + vegetableAppear.width &&
          player.positionX + player.width > vegetableAppear.positionX &&
          player.positionY <
            vegetableAppear.positionY + vegetableAppear.height &&
          player.positionY + player.height > vegetableAppear.positionY
        ) {
          vegetableBonusArr.splice(index, 1);
          vegetableAppear.vegetableDiv.remove();
          vegetableAppear.updateVegetableScore();
          game.addPoints();
        }
        if (vegetableAppear.positionY > 450) {
          vegetableBonusArr.splice(index, 1);
          vegetableAppear.vegetableDiv.remove();
        }
      });
    }, game.intervalDecrease);
    this.bonusVegetableRainIsStopped = false;
  }
}

/******************** PLAYER CLASS ********************/
class Player {
  constructor() {
    this.height = 50; //was 20
    this.width = 60; // was 60
    this.positionX = 350 - this.width / 2;
    this.positionY = 480 - this.height;

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
  moveUp() {
    this.positionY -= 40;
    this.updatePosition();
  }
  moveDown() {
    this.positionY += 40;
    this.updatePosition();
  }
  updatePosition() {
    this.playerDiv.style.left = this.positionX + "px";
    this.playerDiv.style.top = this.positionY + "px";
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
    this.vegetableDiv.style.backgroundImage = `url("./images/img_plant-based-products/${this.typeOfProduct}.png")`;
    const parentOfvegetables = document.getElementById("game-board");
    parentOfvegetables.appendChild(vegetableDiv);

    this.vegetableDiv.style.height = this.height + "px";
    this.vegetableDiv.style.width = this.width + "px";
    this.vegetableDiv.style.left = this.positionX + "px";

    this.updatePosition(); // calling current position
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
    this.vegetableDiv.style.top = this.positionY + "px"; // re-positioning vegetableDiv
  }
}

/******************** ANIMAL CLASS ********************/
class Animal {
  constructor() {
    this.height = 32;
    this.width = 32;
    this.positionX = Math.random() * (700 - this.width);
    this.positionY = 0;

    this.getRandomBackgroundImage();
    this.createDomElement();
  }
  getRandomBackgroundImage() {
    this.productGroup = [
      "chicken",
      "redmeat",
      "cheese",
      "egg",
      "fastfood",
      "cake",
      "fish",
      "candy",
      "icecream",
      "drink",
    ];
    this.randomProductGroup =
      this.productGroup[Math.floor(Math.random() * this.productGroup.length)];
    this.randomProductIndex = Math.floor(Math.random() * 3);
    this.typeOfProduct = this.randomProductGroup + this.randomProductIndex;
  }
  createDomElement() {
    /******************** CREATING THE vegetable DIV & ADD IT TO THE DOM ********************/
    const animalDiv = document.createElement("div");
    this.animalDiv = animalDiv;
    this.animalDiv.className = "animals";
    this.animalDiv.id = this.typeOfProduct;
    this.animalDiv.style.backgroundImage = `url("./images/img_animal-products/${this.typeOfProduct}.png")`;
    const parentOfAnimals = document.getElementById("game-board");
    parentOfAnimals.appendChild(animalDiv);

    /******************** GIVING animalDiv A SIZE ********************/
    this.animalDiv.style.height = this.height + "px";
    this.animalDiv.style.width = this.width + "px";
    this.animalDiv.style.left = this.positionX + "px";

    this.updatePosition(); // calling the current position
  }
  moveDown() {
    this.positionY += 1;
    this.updatePosition();
  }

  updatePosition() {
    this.animalDiv.style.top = this.positionY + "px"; // re-positioning animalDiv
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
  } else if (event.key === "ArrowUp") {
    if (player.positionY + player.height > 80) {
      player.moveUp();
    }
  } else if (event.key === "ArrowDown") {
    if (player.positionY + player.height < 480) {
      player.moveDown();
    }
  }
});

/******************** VEGGIES ********************/
const vegetableArr = []; // making empty array to catch all the new vegetables

setInterval(() => {
  const newVegetable = new Vegetables(); // making a new const inside this interval for the new vegetables to automaticalle make new vegetable from the class.
  vegetableArr.push(newVegetable); // push the vegetable div's the the empty array
}, 1200);

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
        vegetableArr.splice(index, 1);
        vegetableAppear.vegetableDiv.remove();
        vegetableAppear.updateVegetableScore();
        // game.vegetablesScore();
        game.addPoints(); //EXTRA add name of the vegetable as argument to check how many points to win
        if (game.energy < 93) {
          game.energy += 5;
          //  console.log(game.energy);
        }
        /******************** REMOVE vegetable FROM DOM ********************/
      }
      if (vegetableAppear.positionY > 450) {
        // to access the positionY inside the class there's no need for "this."" because it already is looping through the specific class div.
        vegetableArr.splice(index, 1); // splice in case I want to try different speeds for the vegetables.
        vegetableAppear.vegetableDiv.remove(); // addressing the current vegetable class (vegetableAppear), access the DOM element I stored as "vegetableDiv" and remove this one.
      }
    });
  }, game.intervalDecrease);
}

/******************** ANIMALS ********************/
const animalArr = []; // making empty array to catch all the new ANIMALS

const intervalIdAnimalAppear = setInterval(() => {
  const newAnimal = new Animal(); // making a new const inside this interval for the new animals to automaticalle make new vegetable from the class.
  animalArr.push(newAnimal); // push the vegetable div's the the empty array
}, 1000);

let intervalIdAnimal = createAnimalInterval();

function createAnimalInterval() {
  return setInterval(() => {
    animalArr.forEach(function (animalAppear, index) {
      animalAppear.moveDown();

      /******************** COLLISION DETECTION ********************/
      if (
        player.positionX < animalAppear.positionX + animalAppear.width &&
        player.positionX + player.width > animalAppear.positionX &&
        player.positionY < animalAppear.positionY + animalAppear.height &&
        player.positionY + player.height > animalAppear.positionY
      ) {
        // console.log("Game over!");
        /******************** REMOVE ANIMAL FROM DOM ********************/
        animalArr.splice(index, 1);
        animalAppear.animalDiv.remove();
        if (game.energy <= 49) {
          game.lifesLeft--;
          game.energy = 98;
          console.log("current life: " + game.lifesLeft);
          console.log("Here the game got - game.energy: " + game.energy);
          // console.log("Lifes left: " + game.lifesLeft);
          game.lifesUpdate();
        } else if (game.energy >= 50) {
          game.energy -= 50;
          console.log("Here the game got - 50: " + game.energy);
          console.log("current life: " + game.lifesLeft);
        }
        if (game.lifesLeft === 0) {
          location.href = "./gameover.html";
        }
      }
      if (animalAppear.positionY >= 450) {
        animalArr.splice(index, 1);
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
