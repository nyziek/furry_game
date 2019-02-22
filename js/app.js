var speedChoose = document.querySelector("#speed");
var restartButton = document.querySelector("#again");
var speed = undefined;


function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {

    var self = this;

    this.board = document.querySelectorAll("section#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function() {
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };

    this.showCoin = function() {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };

    this.startGame = function() {

        this.interval = undefined;
        this.intervalTime = speed;

        interval = setInterval(this.idSetInterval, this.intervalTime);

    };

    this.idSetInterval = function() {
        self.moveFurry();
    };

    this.moveFurry = function() {

        if(this.furry.direction === "right") {

            this.furry.x++;
            self.gameOver();
            if(this.furry.x <= 9) {
                self.showFurry();
                self.hideVisibleFurry();
                clearInterval(interval);
                interval = setInterval(this.idSetInterval, this.intervalTime);
            }

        } else if (this.furry.direction === "left") {

            this.furry.x--;
            self.gameOver();
            if(this.furry.x >= 0) {
                self.hideVisibleFurry();
                self.showFurry();
                clearInterval(interval);
                interval = setInterval(this.idSetInterval, this.intervalTime);
            }

        } else if (this.furry.direction === "up") {

            this.furry.y--;
            self.gameOver();
            if(this.furry.y >= 0) {
                self.hideVisibleFurry();
                self.showFurry();
                clearInterval(interval);
                interval = setInterval(this.idSetInterval, this.intervalTime);
            }

        } else if (this.furry.direction === "down") {

            this.furry.y++;
            self.gameOver();
            if(this.furry.y <= 9) {
                self.showFurry();
                self.hideVisibleFurry();
                clearInterval(interval);
                interval = setInterval(this.idSetInterval, this.intervalTime);
            }
        }

        self.checkCoinCollision();
    };

    this.hideVisibleFurry = function() {
        var visibleFurry = document.querySelector(".furry");
        visibleFurry.classList.remove("furry");
    };

    this.turnFurry = function(event) {

        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function() {

        if(self.furry.x === self.coin.x && self.furry.y === self.coin.y) {

            var visibleCoin = document.querySelector(".coin");
            visibleCoin.classList.remove("coin");

            this.score++;

            var scoreDisplay = document.querySelector("#score strong");
            scoreDisplay.innerText = self.score;

            var sound = new Audio("sounds/coin.wav");
            sound.play();

            this.coin = new Coin();

            self.showCoin();

            if(this.intervalTime >= 100) {
                this.intervalTime = this.intervalTime - 1;
            }
        }
    };

    this.gameOver = function() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            console.log("Oooops!");
            clearInterval(interval);
            self.hideVisibleFurry();

            var gameOverScreen = document.querySelector("#over");
            var sound = new Audio("sounds/gameover.wav");

            gameOverScreen.classList.remove("invisible");
            sound.play();
        }
    };
}

var game = new Game();

speedChoose.addEventListener("click", function(event) {

    event = event || window.event;

    var speedChoiceScreen = document.querySelector("#speed");

    speedChoiceScreen.classList.add("invisible");

    var button = event.target || event.srcElement;

    if(button.classList.contains("slow")) {
        speed = 1000;
    } else if(button.classList.contains("medium")) {
        speed = 500;
    } else {
        speed = 250;
    }

    game.showFurry();
    game.showCoin();
    game.startGame();
});

document.addEventListener("keydown", function(event) {

    game.turnFurry(event);
});

restartButton.addEventListener("click", function() {

    location.reload();
});
