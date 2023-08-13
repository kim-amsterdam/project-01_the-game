class Player {
      constructor() {
        this.height = 20;
        this.width = 60;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;
        // this.updatePostion();

      }
      moveLeft() {
        this.positionX -= 20;
        console.log(`move left, new position is ${this.positionX}`);
        this.updatePosition();
      }
      moveRight() {
        this.positionX += 20;
        console.log(`move right, new position is ${this.positionX}`);
        this.updatePosition();
      }
      updatePosition() {
        const playerLinked = document.getElementById('player');
        playerLinked.style.left = this.positionX + 'px';
        // playerLinked.style.height = this.height + 'px';
        // playerLinked.style.width = this.width + 'px';
      }
    }

    const player = new Player();

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        player.moveLeft();
      } else if (event.key === 'ArrowRight') {
        player.moveRight();
    }
})

