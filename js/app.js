
const gameOverSign = document.querySelector("#gameOver");
const title = document.querySelector("#titleScreen");
const win = document.querySelector("#winScreen");

const lifeBar = document.querySelector(".lives");
const heart1 = document.querySelector("#heart1");
const heart2 = document.querySelector("#heart2");
const heart3 = document.querySelector("#heart3");

const death = document.querySelector("#death");


// background Music
const bgm = document.querySelector("#bgm");
bgm.play();
bgm.volume = 0.1;

// the sound that plays everytime the character moves
const moveSound = document.querySelector("#moveSound");

moveSound.volume = 0.1;
moveSound.play();

// default player Sprite
let playerImage = 'images/megaman.png';

// properties of the Enemy
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step*5;
    this.sprite = 'images/enemy.png';
};

Enemy.prototype.update = function(dt) {
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    }
    else {
        this.x = 0;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// the three different sprites
document.querySelector("#megaman").addEventListener("click", megaSelector);
document.querySelector("#protoman").addEventListener("click", protoSelector);
document.querySelector("#bass").addEventListener("click", bassSelector);

function megaSelector() {
    player.sprite = 'images/megaman.png';
    hideTitle();
}

function protoSelector() {
    player.sprite = "images/protoman.png";
    hideTitle();
}

function bassSelector() {
    player.sprite ="images/bass.png";
    hideTitle();
}
// by choosing a character on the title screen, the function gets invoked and the game starts
function hideTitle() {
    title.style.display = "none";
    lifeBar.style.display = "block";

}
// Our heros properties
class Hero {
    constructor () {
        this.points = 0
        this.life = 3;
        this.step = 101;
        this.jump = 83;
        this.startX = this.step*2;
        this.startY = (this.jump*4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        this.fail = false;
        this.sprite = playerImage;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // the movement limitations and the map limitations
    handleInput(input) {
        switch(input) {
            case "left":
            if (this.x > 0){
                this.x -= this.step;
            }
            break;
            case "up":
            if (this.y > 0){
                this.y -= this.jump;
            }
            break;
            case "right":
            if (this.x < this.step*4)
                this.x += this.step;
            break;
            case "down":
            if (this.y < this.jump*4) {
                this.y += this.jump;
            }
            break;
        }
    }
    // collision properties
    update() {
        for (let enemy of allEnemies) {
            if ( this.y === enemy.y && (enemy.x + enemy.step > this.x +25 && enemy.x +25 < this.x + this.step)) {
                this.life -= 1;
                this.damage();
            }
        }
        // the penalties or rewards if catched by the enemy or success by reaching the sea
        if (this.y < 55) {
            this.points += 1;
            this.point();
        }
        if (this.life === 0) {
            this.fail = true;
        }
        if (this.points === 3){
            this.victory = true;
        }
        if (this.fail === true) {
            gameFail();
        }
        if (this.victory === true) {
            winScreen();
        }
    }
    // location reset by reaching the sea
    point() {
        this.x = this.startX;
        this.y = this.startY;
    }
    // location reset by losing a life, if no remaining lives left, the death sound plays and the GameOver screen emerges
    damage() {

        this.x = this.startX;
        this.y = this.startY;

        if (this.life === 2) {
            lifeBar.removeChild(heart1);
        }
        if (this.life === 1) {
            lifeBar.removeChild(heart2);
        }
        if (this.life === 0) {
            death.play();
            death.volume = 0.1;
            lifeBar.removeChild(heart3);
        }
    }
}

function gameFail() {
    gameOverSign.style.display = "block";
}

function winScreen () {
    win.style.display = "block";
}
// player gets the same properties as our Hero Class
const player = new Hero();

// qualities like spawnlocation, rowlocation and speed are defined in the parentheses
const bug1 = new Enemy(-101, 83, 150);
const bug2 = new Enemy(-301, 166, 300);
const bug3 = new Enemy(0, 166, 190);
const bug4 = new Enemy(0, 0, 30);
const bug5 = new Enemy(0, 0, 400);


const allEnemies = [bug1, bug2, bug3, bug4, bug5];

// by using the arrow keys on your keyboard the handleInput function gets invoked, the moveSound too.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    moveSound.currentTime = 0;
    moveSound.play();
    player.handleInput(allowedKeys[e.keyCode]);
});