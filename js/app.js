const gameOverSign = document.querySelector("#gameOver");
const title = document.querySelector("#titleScreen");

let playerImage = 'images/char-cat-girl.png';


var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step*5;
    this.sprite = 'images/enemy-bug.png';
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

let boyChar = false;
let catChar = false;
let princessChar = false;

function boySelector() {
    boyChar = true;
    playerChosen();
 }

 function catSelector() {
     catChar = true;
     playerChosen();
 }

function princessSelector() {
    princessChar = true;
    playerChosen();
}

function playerChosen() {
    
if (boyChar === true) {
    playerImage = document.querySelector("#boy");
    hideTitle();
}
else if (catChar === true) {
    playerImage = "images/char-cat-girl.png";
    hideTitle();
}
else if (princessChar === true) {
    playerImage = document.querySelector("#princess");
    hideTitle();
}
}

function hideTitle() {
    title.style.display = "none";
}

class Hero {
    constructor () {
        this.score = 0;
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
    update() {
        for (let enemy of allEnemies) {
            if ( this.y === enemy.y && (enemy.x + enemy.step > this.x +25 && enemy.x +25 < this.x + this.step)) {
                this.score -= 1;
                this.reset();
            }
        }
        if (this.y < 55) {
            this.score += 1;
            this.reset();
        }
        if (this.score === -3) {
            this.fail = true;
        }
        if (this.score === 3){
            this.victory = true;
        }
        if (this.fail === true) {
            gameFail();
        }
        if (this.victory === true) {
            setModal();
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}

function gameFail() {
    gameOverSign.style.display = "block";
}

function setModal () {
    modal.style.display = "block";
}

const player = new Hero();

const bug1 = new Enemy(-101, 0, 150);
const bug2 = new Enemy(-301, 83, 300);
const bug3 = new Enemy(0, 70, 190);
const bug4 = new Enemy(0, 166, 30);


const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
