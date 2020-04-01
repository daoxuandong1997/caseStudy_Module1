var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = new Ball(canvas.width/2, canvas.height - 100, 5, 3, 10);
var paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 90, 100, 10, 10 );
var bricks = new Bricks(25,75,25,100,15,2,3);

var isGameOver = false;
var isGameWin = false;
var maxScore = (bricks.row * bricks.col);
var playGame = false;
var reset = false;
var lives = 3;

// khi nhấn xuống thanh ngang di chuyển ('key down')
document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 37:
            paddle.isMovingLeft = false;
            break;
        case 39:
            paddle.isMovingRight = false;
            break;
    }
});
// khi nhả phím thanh ngang ngừng ('key up')
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 37:
            paddle.isMovingLeft = true;
            break;
        case 39:
            paddle.isMovingRight = true;
            break;
        case 13:
            playGame = !playGame;
            startGame();
            break;
        // case 32:
        //     reset = true ;
        //     // document.location.reload();
        //     break;
    }
});

function score() {
    if (playerScore < maxScore) {
        drawScore(25,25,50,100);
    }else{
        isGameOver = true;
        isGameWin = true;
    }
};
function drawScore(size,x,y,maxWidth) {
    context.beginPath();
    context.font = size + "px Arial";
    context.fillStyle = "blue";
    context.fillText("Score: " + playerScore, x,y,maxWidth);
    context.closePath()
};

function drawLives(){
    context.beginPath();
    context.fillStyle = "red";
    context.font = "25px Arial";
    context.fillText("Lives: " + lives, canvas.width - bricks.offsetX - 100, 50,100);
    context.closePath();
};

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius ) {
        lives --;
        console.log(lives);
        if (lives < 0) {
            isGameOver = true;
        } else {
            ball.x = canvas.width / 2;
            ball.y = canvas.height - paddle.height - 2*ball.radius - 80;
            ball.dx = 3;
            ball.dy = 5;
            paddle.x = canvas.width/2 - 50;
        }
    }
};

function handleGameOver() {
    if (isGameWin){
        context.clearRect(0,0,canvas.width, canvas.height);
        alert ("You Win");
        context.font = "100px Arial";
        context.fillText("YOU WON !", canvas.width / 2 - 250, canvas.height / 2 ,500)
        document.addEventListener('keydown',function (event) {
            if (event.keyCode == 32){
                document.location.reload();
            }
        });
    }else {
        context.clearRect(0,0,canvas.width, canvas.height);
        alert ( "Game Over");
        drawScore(100,canvas.width/2 - 200, canvas.height/2,500);
        document.addEventListener('keydown',function (event) {
            if (event.keyCode == 32){
                document.location.reload();
            }
        });
    }
}

function startGame() {
    if (!isGameOver) {
        if (playGame) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            ball.drawBall();
            paddle.drawPaddle();
            bricks.drawBricks();
            //
            ball.handleBallCollideBounce();
            paddle.handlePaddleCollideBall();
            bricks.handleBrickCollideBall();
            //
            ball.updateBallPosition();
            paddle.updatePaddlePosition();

            score();
            drawLives();

            requestAnimationFrame(startGame);

            checkGameOver();
        } else {
            pauseGame();
        }
    } else {
        handleGameOver();
    };
};

function pauseGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
        ball.drawBall();
        paddle.drawPaddle();
        bricks.drawBricks();
    context.beginPath();
    context.fillStyle = "blue";
    context.font = "100px Arial";
    context.fillText("PAUSE - ENTER ĐỂ TIẾP TỤC CHƠI", canvas.width / 2 - 400, canvas.height / 2,800);
    context.closePath();

}
