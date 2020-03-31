var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = new Ball(canvas.width/2, canvas.height - 20, 5, 3, 10);
var paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 10, 100, 10, 10 );
var bricks = new Bricks(25,75,25,100,15,2,3);

var isGameOver = false;
var isGameWin = false;
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

function score() {
    if (playerScore < maxScore) {
        context.beginPath()
        context.font = "25px Arial";
        context.fillStyle = "blue";
        context.fillText("Score: " + playerScore, 25,50,100);
        context.closePath()
    }else{
        isGameOver = true;
        isGameWin = true;
    }
}

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius){
        isGameOver = true;
    }
}

function handleGameOver() {
    if (isGameWin){
        context.clearRect(0,0,canvas.width, canvas.height);
        alert ("You Win");
    }else {
        context.clearRect(0,0,canvas.width, canvas.height);
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
        //
        ball.handleBallCollideBounce();
        paddle.handlePaddleCollideBall();
        bricks.handleBrickCollideBall();
        //
        ball.updateBallPosition();
        paddle.updatePaddlePosition();

        score();

        requestAnimationFrame(startGame);

        checkGameOver();
    }else {
        handleGameOver();
    };
}
// function playAgain() {
//
// }
