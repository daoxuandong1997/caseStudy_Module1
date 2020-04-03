let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let ball = new Ball(canvas.width/2, canvas.height - 100, 3, 5, 10);
let paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 90, 100, 10, 10 );
let bricks = new Bricks(25,75,25,100,15,5,9);

let isGameOver = false;
let isGameWin = false;
let maxScore = (bricks.row * bricks.col);
let playGame = false;
let lives = 3;
let lv2 = 0;

function draw(content,color,size,x,y,maxWidth) {
        context.beginPath();
        context.font = size + "px Arial";
        context.fillStyle = color;
        context.fillText(content, x, y, maxWidth);
        context.closePath();
}

// let hitPaddleSound = new Sound("Paddle_ball_hit.mp3",true,"mygamesound");
// let hitBrickSound = new Sound("sound/ball_hit_brick.mp3",true,"mygamesound");
// let gameOverSound = new Sound("sound/game-over-sound-effect.mp3",true,"mygamesound");
// let gameMusic = new Sound("sound/audio_odyssey.mp3",true,"bg_music");
// let Sound = function(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     document.body.appendChild(this.sound);
//     this.play = function(){
//         this.sound.play();
//     }
//     this.stop = function(){
//         this.sound.pause();
//     }
// }

// let scoreBoard = [];

// khi nhả phím thanh ngang ngừng ('key up')
document.addEventListener('keyup', function (event) {
        if (lv2 === 0) {
            switch (event.keyCode) {
                case 37:
                    paddle.isMovingLeft = false;
                    break;
                case 39:
                    paddle.isMovingRight = false;
                    break;
            }
        }else {
            switch (event.keyCode) {
                case 39:
                    paddle.isMovingLeft = false;
                    break;
                case 37:
                    paddle.isMovingRight = false;
                    break;
            }
        }
});
// khi nhấn xuống thanh ngang di chuyển ('key down')
document.addEventListener('keydown', function (event) {
       if (lv2 === 0) {
           switch (event.keyCode) {
               case 37:
                   paddle.isMovingLeft = true;
                   break;
               case 39:
                   paddle.isMovingRight = true;
                   break;
           }
       }else{
           switch (event.keyCode) {
               case 39:
                   paddle.isMovingLeft = true;
                   break;
               case 37:
                   paddle.isMovingRight = true;
                   break;
           }
       }
});
// phim enter
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13){
        playGame = !playGame;
        startGame();
    }
});

function getLevel(playerScore) {
   if (playerScore === 10){
       lv2 ++;
    }
    setLevel();
}
function setLevel() {
      if (lv2 === 0){
          draw("Level 1","green",25,canvas.width/2 - 50, 50,100);
      }else {
          draw("Level 2", "black",25, canvas.width / 2 - 50, 50, 100);
      }
}

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius ) {
        lives --;
        if (lives > 0) {
                paddle.x = canvas.width/2 - 50;
                ball.x = canvas.width / 2;
                ball.y = canvas.height - paddle.height - 2*ball.radius - 90;
                ball.setDx(3);
                ball.setDy(5);
                console.log(ball.dx, ball.dy);
        } else {
           isGameOver = true;
        }
    }
    if (playerScore >= maxScore){
        isGameOver = true;
        isGameWin = true;
    }
}
function handleGameOver() {
    if (isGameWin){
        context.clearRect(0,0,canvas.width, canvas.height);
        alert ("You Win");
        draw("YOU WON !","red",100,canvas.width / 2 - 250, canvas.height / 2 ,500);
        document.addEventListener('keydown',function (event) {
            if (event.keyCode === 32){
                window.location.reload();
                // resetGame();
            }
        });
    }else {
        context.clearRect(0,0,canvas.width, canvas.height);
        alert ( "Game Over");
        draw("Your Score: " + playerScore, "blue",100,canvas.width/2 - 250, canvas.height/2,550)
        document.addEventListener('keydown',function (event) {
            if (event.keyCode === 32){
                window.location.reload();
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
            paddle.handlePaddleCollideBall(ball);
            bricks.handleBrickCollideBall(ball);
            //
            ball.updateBallPosition();
            getLevel(playerScore);
            // console.log(ball.dx, ball.dy);
            paddle.updatePaddlePosition();
            //
            draw("Score: "+playerScore,"blue",25,25,50,100);
            draw("Lives: "+lives,"red", 25,canvas.width - bricks.offsetX - 100, 50,100);
            //
            requestAnimationFrame(startGame);
            //
            checkGameOver();
        } else {
            pauseGame();
        }
    } else {
        handleGameOver();
    }
}
function pauseGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    bricks.drawBricks();
    draw("PAUSE - Nhấn Enter để tiếp tục chơi","blue",
        75,canvas.width / 2 - 400, canvas.height / 2 + 50,800);
}

        