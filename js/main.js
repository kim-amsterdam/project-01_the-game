class Game {
  constructor() {
    this.height = 40;
    this.width = 700;

    // score board:
    this.totalScore = 0;
    this.vegetableScore = 0;
    this.fruitScore = 0;
    this.legumeScore = 0;
    this.grainScore = 0;
    this.nutScore = 0;

    // energy & life counter:
    this.energy = 98;
    this.lifesLeft = 3;
    this.lifesCounter = 10;
    this.lifes();

    // bonus counter:
    this.bonusCounter = 1;
    this.bonusStart = false;
    this.intervalIdBonusToggle = null;
    this.bonusFlashPoints = document.querySelector("#score-board");
    this.bonusFlashTitle = document.querySelector("#header");
    this.intervalIdBonusVegetable;
    this.bonusVegetableRainIsStopped = false;

    // for the speed increase:
    this.intervalDecrease = 15;
    this.speedSteps = 5;

    this.addPoints();
    this.energyDiv();
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

    if (this.totalScore === this.lifesCounter && this.lifesLeft <= 2) {
      this.lifesLeft++;
      this.lifesCounter += 5;
      this.lifesUpdate();
    }

    this.increaseSpeed();
    this.checkForBonus();
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
    if (this.lifesLeft <= 0 && this.energy < 1) {
      location.href = "./gameover.html";
    }
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
    }, 50);
  }

  checkEnergyLevel() {
    this.energyInsideDiv.style.width = this.energy + "%";
    if (this.energy < 1 && this.lifesLeft <= 0) {
      location.href = "./gameover.html";
    }
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
        this.toggleColorBonus();
        this.bonusCounter *= 3;
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
      } else {
        this.bonusFlashPoints.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.innerHTML = "VEGETABLE RAIN!!!";
      }
      document.getElementById("total-score").innerHTML = `BONUS TIME! +++`;
      if (this.toggleCount >= this.totalToggles) {
        this.bonusFlashPoints.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.style.color = "rgb(253, 255, 184)";
        this.bonusFlashTitle.innerHTML = "PLANT-BASED WHOLE-FOOD SHOPPING GAME";
        clearInterval(this.intervalIdBonusToggle);
        return;
      }
    }, 200);
  }

  increaseSpeed() {
    if (this.totalScore === this.speedSteps) {
      this.intervalDecrease -= 2;
      this.speedSteps += 10;
      restartInterval();
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
    this.vegetableDiv.style.top = this.positionY + "px";
  }
}

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
    const animalDiv = document.createElement("div");
    this.animalDiv = animalDiv;
    this.animalDiv.className = "animals";
    this.animalDiv.id = this.typeOfProduct;
    this.animalDiv.style.backgroundImage = `url("./images/img_animal-products/${this.typeOfProduct}.png")`;
    const parentOfAnimals = document.getElementById("game-board");
    parentOfAnimals.appendChild(animalDiv);

    this.animalDiv.style.height = this.height + "px";
    this.animalDiv.style.width = this.width + "px";
    this.animalDiv.style.left = this.positionX + "px";

    this.updatePosition();
  }
  moveDown() {
    this.positionY += 1;
    this.updatePosition();
  }

  updatePosition() {
    this.animalDiv.style.top = this.positionY + "px"; // re-positioning animalDiv
  }
}

// invoking classes:
const game = new Game();
const player = new Player();

// detecting player and invoke arrow key movement:
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

// vegetables products movement:
const vegetableArr = [];
setInterval(() => {
  const newVegetable = new Vegetables();
  vegetableArr.push(newVegetable);
}, 1200);

let invervalIdVegetable = createVegetableInterval();

function createVegetableInterval() {
  return setInterval(() => {
    vegetableArr.forEach(function (vegetableAppear, index) {
      vegetableAppear.moveDown();
      // collision detection:
      if (
        player.positionX < vegetableAppear.positionX + vegetableAppear.width &&
        player.positionX + player.width > vegetableAppear.positionX &&
        player.positionY < vegetableAppear.positionY + vegetableAppear.height &&
        player.positionY + player.height > vegetableAppear.positionY
      ) {
        // remove vegetables from the DOM after collision:
        vegetableArr.splice(index, 1);
        vegetableAppear.vegetableDiv.remove();
        vegetableAppear.updateVegetableScore();
        game.addPoints();
        if (game.energy < 93) {
          game.energy += 5;
        }
      }
      // remove vegetables from the DOM at the end of game-board:
      if (vegetableAppear.positionY > 450) {
        vegetableArr.splice(index, 1);
        vegetableAppear.vegetableDiv.remove();
      }
    });
  }, game.intervalDecrease);
}

// animal products movement:
const animalArr = [];
const intervalIdAnimalAppear = setInterval(() => {
  const newAnimal = new Animal();
  animalArr.push(newAnimal);
}, 1000);

let intervalIdAnimal = createAnimalInterval();

function createAnimalInterval() {
  return setInterval(() => {
    animalArr.forEach(function (animalAppear, index) {
      animalAppear.moveDown();

      // collision detection:
      if (
        player.positionX < animalAppear.positionX + animalAppear.width &&
        player.positionX + player.width > animalAppear.positionX &&
        player.positionY < animalAppear.positionY + animalAppear.height &&
        player.positionY + player.height > animalAppear.positionY
      ) {
        // remove animal from the DOM after collision:
        animalArr.splice(index, 1);
        animalAppear.animalDiv.remove();

        // reduce energy & lifes / or game-over / after collision:
        if (game.energy <= 51) {
          if (game.lifesLeft >= 0) {
            game.lifesLeft--;
            game.energy = 98;
          } else {
            location.href = "./gameover.html";
          }
        }
        if (game.energy > 51) {
          if (game.lifesLeft >= 0) {
            game.energy -= 50;
          } else {
            location.href = "./gameover.html";
          }
        }
        game.lifesUpdate();
        game.checkEnergyLevel() 
      }
      // remove animal from the DOM at the end of game-board:
      if (animalAppear.positionY >= 450) {
        animalArr.splice(index, 1);
        animalAppear.animalDiv.remove();
      }
    });
  }, game.intervalDecrease);
}
// restart interval for speed-increasement
function restartInterval() {
  clearInterval(intervalIdAnimal);
  intervalIdAnimal = createAnimalInterval();
  clearInterval(invervalIdVegetable);
  invervalIdVegetable = createVegetableInterval();
}
