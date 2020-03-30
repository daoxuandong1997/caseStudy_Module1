var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = {
    x: canvas.width / 2,
    y: canvas.height - 120,
    dx: 5,
    dy: 2,
    radius : 10
}
var paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: 500,
    speed: 10,
    isMovingLeft: false,
    isMovingRight: false,
};
// class cua tat ca cac vien gach
var bricksConfig = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    width: 70,
    height: 15,
    totalRow: 4,
    totalCol: 5
};
var BricksList = [];
// khoi tao tat ca cac vien gach (doi tuong) dua vao mang da tao o tren dua vao cac thuoc tinh trong class bricksConfig
for (let i = 0; i < bricksConfig.totalRow; i++){
    for (let j = 0; j < bricksConfig.totalCol; j++){
        BricksList.push({
            x: bricksConfig.offsetX + j*(bricksConfig.width + bricksConfig.margin),
            y: bricksConfig.offsetY + i*(bricksConfig.height + bricksConfig.margin),
            isBroken: false
        })
    }
}
//
var isGameOver = false;
var isGameWin = false;
var playerScore  = 0;
var maxScore = (bricksConfig.totalRow * bricksConfig.totalCol);
// xu ly phim bam thanh ngang paddle
// khi nham xuong thanh ngang di chuyen 'key down'
document.addEventListener('keyup',function (event) {
    if (event.keyCode == 37){
        paddle.isMovingLeft = false;
    }else if (event.keyCode == 39){
        paddle.isMovingRight = false;
    }
});
// khi nhả phím thanh ngang ngừng 'key up'
document.addEventListener('keydown',function(event){
    if (event.keyCode == 37){
        paddle.isMovingLeft = true;
    }else if (event.keyCode == 39){
        paddle.isMovingRight = true;
    }
});
// cong thuc tinh do rong brick
// 2 * OFFSET + 5 * WIDTH + 4 * MARGIN = CANVAS.WIDTH
// OFFSET = MARGIN = 25;
// WIDTH = 70
// ROW = 4
// COL = 5
// ve brick
function drawBricks() {
    BricksList.forEach(function (b) {
        if (!b.isBroken){
        context.beginPath();
        context.rect(b.x, b.y, bricksConfig.width, bricksConfig.height);
        context.fillStyle = 'orange';
        context.fill();
        context.closePath();
        }
    });
}
// ve paddle
function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.strokeStyle = 'black';
    context.fillStyle = 'blue';
    context.stroke();
    context.fill()
    context.closePath();
}
// ve ball
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius,0,Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
    context.closePath();
}
// cac ham xu ly va cham va doi huong ball
// va cham voi brick
function handleBallCollideBrick() {
    BricksList.forEach(function (b) {
        if (!b.isBroken){
            if (ball.x >= b.x && ball.x <= b.x + bricksConfig.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + bricksConfig.height){
                    ball.dy = -ball.dy;
                    b.isBroken = true;
                    playerScore += 1;
                    console.log(playerScore);
                    if (playerScore >= maxScore){
                        isGameWin = true;
                        isGameOver = true;
                    }
            }
        }
    })
}
// va cham voi thanh ngang
function handleBallCollidePaddle() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y + ball.radius >= paddle.y){
        ball.dy  = -ball.dy;
    }
}
// va cham voi canvas
function handleBallCollideBounce() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius){
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius){
        ball.dy = -ball.dy;
    }
}
// cac ham tao chuyen dong ball
function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
// tao chuyen dong paddle
function updatePaddlePosition() {
    if (paddle.isMovingLeft) {
        paddle.x -= paddle.speed;
    }
    if (paddle.isMovingRight) {
        paddle.x += paddle.speed;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width;
    }
}
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
        drawBall();
        drawPaddle();
        drawBricks();

        handleBallCollideBounce();
        handleBallCollidePaddle();
        handleBallCollideBrick();

        updateBallPosition();
        updatePaddlePosition();

        requestAnimationFrame(startGame);

        checkGameOver();
    }else {
        handleGameOver();
    };
}
// function playAgain() {
//
// }
