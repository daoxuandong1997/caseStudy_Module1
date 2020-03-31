// class cua tat ca cac vien gach
var bricksList = [];
var playerScore = 0;
var Bricks = function (offsetX, offsetY, margin, width, height, row, col) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.margin = margin;
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;

//lấy tọa độ từng viên gạch;
    for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
            bricksList.push({
                x: this.offsetX + j * (this.width + this.margin),
                y: this.offsetY + i * (this.height + this.margin),
                width: this.width,
                height: this.height,
                isBroken: false
            });
        }
    };

// cong thức tính do rộng brick
// 2 * OFFSET + 5 * WIDTH + 4 * MARGIN = CANVAS.WIDTH
// OFFSET = MARGIN = 25;
// WIDTH = 70
// ROW = 4
// COL = 5
// ve brick
    this.drawBricks = function () {
        bricksList.forEach(function (b) {
            if (!b.isBroken) {
                context.beginPath();
                context.rect(b.x, b.y, b.width, b.height);
                context.fillStyle = 'orange';
                context.fill();
                context.strokeStyle = 'black';
                context.stroke();
                context.closePath();
            }
        })
    };
//va cham voi ball
    this.handleBrickCollideBall = function() {
        bricksList.forEach(function (b) {
            if (!b.isBroken) {
                if (ball.x >= b.x && ball.x <= b.x + b.width &&
                    ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + b.height) {
                    ball.dy = -ball.dy;
                    b.isBroken = true;
                    playerScore += 1;
                    console.log(playerScore);
                }
            }
        })
    };
};

