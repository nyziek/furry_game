var startButton = document.querySelector("#start");

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

    this.interval = undefined;

    this.startGame = function() {

        interval = setInterval(this.idSetInterval, 250);

    };

    this.idSetInterval = function() {
        self.moveFurry();
    };

    this.moveFurry = function() {

        if(this.furry.direction === "right") {

            this.furry.x++;
            self.gameOver();
            self.showFurry();
            self.hideVisibleFurry();

        } else if (this.furry.direction === "left") {

            this.furry.x--;
            self.gameOver();
            self.hideVisibleFurry();
            self.showFurry();

        } else if (this.furry.direction === "up") {

            this.furry.y--;
            self.gameOver();
            self.hideVisibleFurry();
            self.showFurry();

        } else if (this.furry.direction === "down") {

            this.furry.y++;
            self.gameOver();
            self.showFurry();
            self.hideVisibleFurry();
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

            this.coin = new Coin();

            self.showCoin();

        }
    };

    this.gameOver = function() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            console.log("Oooops!");
            clearInterval(interval);
            self.hideVisibleFurry();
        }
    };
}

var game = new Game();

startButton.addEventListener("click", function() {

    game.showFurry();
    game.showCoin();
    game.startGame();
});

document.addEventListener("keydown", function(event) {

    game.turnFurry(event);
});





