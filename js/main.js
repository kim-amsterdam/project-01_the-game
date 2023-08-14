class Game {
  constructor() {
    this.height = 40;
    this.width = 500;
    this.score = 0;
    this.addPoints();
  }
  addPoints() {
    console.log(this.score);
    this.score++;
    document.getElementById("score").innerHTML = `SCORE: ${this.score}`;
  }
}

/******************** PLAYER CLASS ********************/
class Player {
  constructor() {
    this.height = 20;
    this.width = 60;
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
    this.positionX -= 20;
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
/******************** VEGGIE CLASS ********************/
class Veggie {
  constructor() {
    this.height = 20;
    this.width = 20;
    this.positionX = Math.random() * (500 - this.width);
    this.positionY = 0;
    // this.image = imgArr[Math.floor(Math.random() * imgArr.length)] if you want to add lots of different veggies :)
    //EXAMPLE IMAGE NAME broccoli.png
    //this.name = this.image.slice(9)

    //switch(veggieType){
    // case("broccoli")   
    //}
    this.createDomElement();
  }
  createDomElement() {
    /******************** CREATING THE VEGGIE DIV & ADD IT TO THE DOM ********************/
    const veggieDiv = document.createElement("div");
    this.veggieDiv = veggieDiv;
    this.veggieDiv.className = "veggies";
    const parentOfVeggies = document.getElementById("game-board");
    parentOfVeggies.appendChild(veggieDiv);

    /******************** GIVING VEGGIEDIV A SIZE ********************/
    this.veggieDiv.style.height = this.height + "px";
    this.veggieDiv.style.width = this.width + "px";
    this.veggieDiv.style.left = this.positionX + "px";

    /******************** CALLING THE CURRENT POSITION  ********************/
    this.updatePosition();
  }
  moveDown() {
    this.positionY += 1;
    this.updatePosition();
  }
  updatePosition() {
    /******************** RE-POSITIONING VEGGIEDIV ********************/
    this.veggieDiv.style.top = this.positionY + "px";
  }
}

/******************** ANIMAL CLASS ********************/
class Animal {
  constructor() {
    this.height = 20;
    this.width = 20;
    this.positionX = Math.random() * (500 - this.width);
    this.positionY = 0;

    this.createDomElement();
  }
  createDomElement() {
    /******************** CREATING THE VEGGIE DIV & ADD IT TO THE DOM ********************/
    const animalDiv = document.createElement("div");
    this.animalDiv = animalDiv;
    this.animalDiv.className = "animals";
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
    if(player.positionX  > 0 ) {
         player.moveLeft();
    }
   
  } else if (event.key === "ArrowRight") {
    if(player.positionX + player.width < 500 ) {
        player.moveRight();
    } 
    
  }
});

/******************** INTERVAL FOR ADDING VEGGIES, MOVING VEGGIES DOWN & REMOVE VEGGIES FROM ARRAY ********************/
const veggieArr = []; // making empty array to catch all the new veggies

setInterval(() => {
  const newVeggie = new Veggie(); // making a new const inside this interval for the new veggies to automaticalle make new veggie from the class.
  veggieArr.push(newVeggie); // push the veggie div's the the empty array
}, 2000);

/******************** MOVE VEGGIE DOWN ********************/
setInterval(() => {
  veggieArr.forEach(function (veggieAppear, index) {
    // veggieAppear = the current veggie (like veggieArr[0], veggieArr[1] etc.), possible to add "", index" in case of splicing, but because they all have the same speed it will always be the first one to cut off the string so shift() works too.
    veggieAppear.moveDown();
    /******************** COLLISION DETECTION ********************/
    if (
      player.positionX < veggieAppear.positionX + veggieAppear.width &&
      player.positionX + player.width > veggieAppear.positionX &&
      player.positionY < veggieAppear.positionY + veggieAppear.height &&
      player.positionY + player.height > veggieAppear.positionY
    ) {
      console.log("Veggie catch!");
      veggieAppear.veggieDiv.remove()
      veggieArr.splice(index, 1); // splice in case I want to try different speeds for the veggies.
      game.addPoints(); //EXTRA add name of the vegetable as argument to check how many points to win 
      /******************** REMOVE VEGGIE FROM DOM ********************/
    }
    if (veggieAppear.positionY > 480) {
      // to access the positionY inside the class there's no need for "this."" because it already is looping through the specific class div.
      veggieArr.splice(index, 1); // splice in case I want to try different speeds for the veggies.
      veggieAppear.veggieDiv.remove(); // addressing the current veggie class (veggieAppear), access the DOM element I stored as "veggieDiv" and remove this one.
    }
  });
}, 10);

/******************** INTERVAL FOR ADDING ANIMALS, MOVING ANIMALS DOWN & REMOVE ANIMALS FROM ARRAY ********************/
const animalArr = []; // making empty array to catch all the new ANIMALS

setInterval(() => {
  const newAnimal = new Animal(); // making a new const inside this interval for the new animals to automaticalle make new veggie from the class.
  animalArr.push(newAnimal); // push the veggie div's the the empty array
}, 1500);

setInterval(() => {
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
    if (animalAppear.positionY >= 480) {
      animalArr.shift();
      animalAppear.animalDiv.remove();
    }
  });
}, 10);
