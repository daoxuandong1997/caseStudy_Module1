var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = new Ball(canvas.width/2, canvas.height - 120, 5, 2, 10);
var paddle = new Paddle(canvas.width / 2 - 50, 500, 100, 10, 10 );
var bricks = new Bricks(25,25,25,70,15,4,5);


var isGameOver = false;
var isGameWin = false;
var playerScore  = 0;
var maxScore = (bricks.row * bricks.col);

// khi nhấn xuống thanh ngang di chuyển ('key down')
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 37) {
        paddle.isMovingLeft = false;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = false;
    }
});
// khi nhả phím thanh ngang ngừng ('key up')
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        paddle.isMovingLeft = true;
    } else if (event.keyCode == 39) {
        paddle.isMovingRight = true;
    }
});

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius){
        isGameOver = true;
    }
}

function handleGameOver() {
    if (isGameWin){
        alert ("You Win");
    }else if (isGameOver){
        alert ( "Game Over");
    }
}

function startGame() {
    if (!isGameOver)
    {
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball.drawBall();
        paddle.drawPaddle();
        bricks.drawBricks();

        ball.handleBallCollideBounce();
        ball.handleBallCollidePaddle();

        ball.updateBallPosition();
        paddle.updatePaddlePosition();

        requestAnimationFrame(startGame);

        checkGameOver();
    }else {
        handleGameOver();
    };
}
// function playAgain() {
//
// }
