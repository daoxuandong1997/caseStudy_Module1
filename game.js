var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = new Ball(canvas.width/2, canvas.height - 20, 5, 3, 10);
var paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 10, 100, 10, 10 );
var bricks = new Bricks(25,75,25,100,15,2,3);

var isGameOver = false;
var isGameWin = false;
var maxScore = (bricks.row * bricks.col);
var playGame = false;

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
            console.log(playGame);
            break;
    }
});

function score() {
    if (playerScore < maxScore) {
        context.beginPath();
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

context.beginPath();
var grd1 = context.createLinearGradient(0,0,600,0);
grd1.addColorStop(0,"red");
grd1.addColorStop(1,"blue");
context.fillStyle = grd1;
context.font = "100px Arial";
context.fillText("BOUNCING BALL", canvas.width / 2 - 200, canvas.height / 2 - 50,400);
context.closePath();

context.beginPath();
context.fillStyle = "blue";
context.font = "50px Arial";
context.fillText("Nhấn nút Enter để chơi !", canvas.width / 2 - 250, canvas.height / 2 + 50,500);
context.closePath();
