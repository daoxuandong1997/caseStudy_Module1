let Ball = function (x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius;

    // dx, dy là tọa độ + thêm để bóng di chuyển
    this.setDx = function (dx) {
         this.dx = dx ;
    };
    this.setDy = function (dy) {
         this.dy = dy ;
    };
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
        this.x += this.dx  ;
        this.y += this.dy   ;
    };
// va cham voi canvas
    this.handleBallCollideBounce = function () {
        // x - radius < 0 ( cạnh chạm biên )
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.dx = -this.dx ;
        }
        if (this.y < this.radius) {
            this.dy = -this.dy ;
        }
    };
};
