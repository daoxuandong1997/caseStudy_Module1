var Ball = function (x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    // dx, dy là tọa độ + thêm để bóng di chuyển
// ve ball
    this.drawBall = function () {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
    };
// cac ham tao chuyen dong ball
    this.updateBallPosition = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
// va cham voi canvas
    this.handleBallCollideBounce = function () {
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.dx = -this.dx;
        }
        if (this.y < this.radius) {
            this.dy = -this.dy;
        }
    };
//va cham voi thanh ngang
    this.handleBallCollidePaddle = function () {
        if (this.x + this.radius >= paddle.x && this.x + this.radius <= paddle.x + paddle.width && this.y + this.radius >= paddle.y) {
            this.dy = -this.dy;
        }
    };
}
