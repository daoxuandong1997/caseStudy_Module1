var Paddle = function (x,y,width,height,speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.isMovingLeft = false;
    this.isMovingRight = false;
//ve paddle
    this.drawPaddle = function () {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.strokeStyle = 'black';
        context.fillStyle = 'blue';
        context.stroke();
        context.fill();
        context.closePath();
    };
// tao chuyển động paddle khi nhấn phím
    this.updatePaddlePosition = function () {
        if (this.isMovingLeft) {
            this.x -= this.speed;
        }
        if (this.isMovingRight) {
            this.x += this.speed;
        }
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
        }
    };

// xu ly phim bam thanh ngang paddle
    //va cham voi ball
    this.handlePaddleCollideBall = function () {
        if (ball.x + ball.radius >= this.x && ball.x + ball.radius <= this.x + this.width &&
            ball.y + ball.radius >= this.y){
            ball.dy = -ball.dy;
        }
    };

};